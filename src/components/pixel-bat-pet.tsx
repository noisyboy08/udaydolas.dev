"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const SCALE = 3;

// We pin `transform-origin: 32px 34px` on the .bat (the visual sprite center
// in box-shadow coords — sprite spans y∈[4,64], x≈[1,62] across all animation
// frames, so the midpoint is ~(32, 34)). With origin AT the visual center,
// scale and rotation both leave the visual center invariant: it stays at
// element-coord (32, 34), i.e. viewport (cssLeft + 32, cssTop + 34).
// So to position the visual sprite center at viewport (vx, vy):
// cssLeft = vx - 32; cssTop = vy - 34. This is true for any rotation.
const BAT_CENTER_X = 32;
const BAT_CENTER_Y = 34;

const FOLLOW_DISTANCE = 56;
const SMOOTH_FACTOR = 0.1;

// How long the mouse must be still before the bat flies home to perch.
const PERCH_IDLE_MS = 5000;
// Top margin the bat keeps from the avatar in follow mode (so it can never
// dive down into the avatar/About area while chasing the cursor).
const FOLLOW_TOP_MARGIN = 12;
// While perched, the visual sprite-center sits this far BELOW the wordmark's
// bottom edge. The bat sprite is drawn head-up and is ~90px tall after scale
// (half-height ~45 px). PERCH_HANG_PX = 50 puts the bat's head/ears just
// below "UD" and the body+wings centered nicely under it.
const PERCH_HANG_PX = 50;
// Horizontal nudge from the UD wordmark's center. 0 = directly under the
// middle of "UD"; positive = nudge right, negative = nudge left.
const PERCH_X_OFFSET = 0;

// Click-to-irritate detection.
const CLICK_HIT_RADIUS = 70;
const ANNOYANCE_RESET_MS = 2200;
const IRRITATE_THRESHOLD = 3;
const FIRE_DURATION_MS = 2200;

type Gesture =
  | "hello"
  | "backflip"
  | "dragonFly"
  | "spin"
  | "heart"
  | "wiggle"
  | "somersault"
  | "shake"
  | "sparkle"
  | "sneeze"
  | "listen"
  | "stretch"
  | "groom";

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function PixelBatPet() {
  const { resolvedTheme } = useTheme();
  const batRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    setShouldRender(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pixel-bat-enabled");
      setIsEnabled(saved !== "false");
    }
  }, []);

  useEffect(() => {
    const handleBatChange = () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("pixel-bat-enabled");
        setIsEnabled(saved !== "false");
      }
    };

    window.addEventListener("pixel-bat-changed", handleBatChange);
    return () => {
      window.removeEventListener("pixel-bat-changed", handleBatChange);
    };
  }, []);

  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Escape") {
        e.preventDefault();
        setIsEnabled((prev) => {
          const next = !prev;
          if (typeof window !== "undefined") {
            localStorage.setItem("pixel-bat-enabled", String(next));
            window.dispatchEvent(new Event("pixel-bat-changed"));
          }
          return next;
        });
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => {
      window.removeEventListener("keydown", handleGlobalKey);
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setNotificationText(
      isEnabled ? "Pixel Bat Pet Enabled!" : "Pixel Bat Pet Disabled!"
    );
    setShowNotification(true);
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isEnabled]);

  // Imperatively inject the stylesheet so it loads regardless of dev-mode
  // quirks with React 19's JSX <link> hoisting.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.head.querySelector(`link[data-pixel-bat="true"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/pixel-bat/bat.css";
    link.dataset.pixelBat = "true";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (!shouldRender || !isEnabled) return;
    const bat = batRef.current;
    if (!bat) return;

    let cancelled = false;
    let rafId = 0;

    let currentX = window.innerWidth / 2;
    let currentY = 200;
    let targetX = currentX;
    let targetY = currentY;

    type Mode = "follow" | "going-home" | "perched" | "gesture" | "fire";
    let mode: Mode = "follow";

    let lastMoveAt = performance.now();
    let lastMouseX = currentX;
    let lastMouseY = currentY;

    // Fly-home animation state.
    let homeStartAt = 0;
    let homeFromX = 0;
    let homeFromY = 0;

    // Annoyance / fire state.
    let annoyance = 0;
    let lastAnnoyAt = 0;
    let firingUntil = 0;

    // Visibility (hidden when scrolled past About section).
    // Start as hidden=true so the first updateVisibility() call on the
    // home page correctly transitions hidden→visible and fades the bat in.
    // On non-home pages it simply stays hidden.
    let isHidden = true;
    bat.style.transition = "opacity 0.4s ease";
    bat.style.opacity = "0";

    const setBatPosition = (x: number, y: number) => {
      bat.style.left = `${x - BAT_CENTER_X}px`;
      bat.style.top = `${y - BAT_CENTER_Y}px`;
    };

    setBatPosition(currentX, currentY);

    // ---------- Page anchors -------------------------------------------------

    const findAvatarRect = (): DOMRect | null => {
      const img = document.querySelector<HTMLImageElement>(
        'img[alt$="\'s avatar"]'
      );
      return img ? img.getBoundingClientRect() : null;
    };

    const findAboutEl = (): HTMLElement | null =>
      document.getElementById("about");

    // The "UD" wordmark inside the ProfileCover — this is the bat's home;
    // it hangs upside-down from the top of the cover banner like a real bat
    // hanging from a rafter. We grab the wordmark element AND its parent
    // (the cover banner) so we can position relative to the banner's
    // actual top edge instead of approximating it from the wordmark size.
    const findCoverMark = (): { mark: DOMRect; cover: DOMRect } | null => {
      const el = document.getElementById("js-cover-mark");
      if (!el || !el.parentElement) return null;
      return {
        mark: el.getBoundingClientRect(),
        cover: el.parentElement.getBoundingClientRect(),
      };
    };

    const computePerchTarget = (): { x: number; y: number } | null => {
      const found = findCoverMark();
      if (found) {
        const { mark } = found;
        // Hang from the bottom edge of the "UD" wordmark, centered under
        // the letters. Y is mark.bottom + PERCH_HANG_PX so the rotated
        // sprite's "feet" (now at the visual top after the 180° flip)
        // sit right on the bottom line of "UD" and the body dangles
        // beneath the letters.
        return {
          x: mark.left + mark.width / 2 + PERCH_X_OFFSET,
          y: Math.max(mark.bottom + PERCH_HANG_PX, 60),
        };
      }
      // Fall back to floating just above the avatar on pages without the
      // cover mark (e.g. /blog post detail).
      const avatar = findAvatarRect();
      if (!avatar) return null;
      return {
        x: avatar.left + avatar.width / 2 + 36,
        y: avatar.top - 50,
      };
    };

    // Constrain the bat's Y so it never flies below the top of the avatar
    // image while chasing the cursor.
    const getMaxY = () => {
      const avatar = findAvatarRect();
      if (!avatar) {
        const about = findAboutEl();
        const aboutTop = about
          ? about.getBoundingClientRect().top
          : Number.POSITIVE_INFINITY;
        return Math.min(aboutTop - 28, window.innerHeight - 40);
      }
      return avatar.top - FOLLOW_TOP_MARGIN;
    };

    const updateVisibility = () => {
      // Hide once the avatar has scrolled out of view (bat sticks to the hero).
      // The cover/wordmark is above the avatar, so once the avatar is gone the
      // perch context is meaningless and we tuck the bat away.
      // Also hide completely on pages that have no hero anchors at all
      // (e.g. /blog, /components) — if neither avatar, cover mark, nor #about
      // exist in the DOM, this is not the home page hero and we hide the bat.
      const avatar = findAvatarRect();
      const coverMark = findCoverMark();
      const about = findAboutEl();

      // No hero anchors at all → not on the home/profile page, hide the bat.
      if (!avatar && !coverMark && !about) {
        if (!isHidden) {
          isHidden = true;
          bat.style.opacity = "0";
        }
        return;
      }

      let past = false;
      if (avatar) {
        past = avatar.bottom < 0;
      } else {
        past = about ? about.getBoundingClientRect().bottom < 0 : false;
      }
      if (past !== isHidden) {
        isHidden = past;
        bat.style.opacity = past ? "0" : "1";
      }
    };

    // ---------- Wing-animation helpers ---------------------------------------

    // Pause at a CONSISTENT frame (0% keyframe) instead of wherever the
    // wing-flap happened to be when we paused. We restart the animation
    // and pause it on the first frame in two style updates separated by
    // a forced reflow so the browser registers the animation reset.
    const pauseWings = () => {
      bat.style.animation = "none";
      // Force layout flush so the "none" is actually applied before we
      // re-arm the animation in the paused state.
      void bat.offsetWidth;
      bat.style.animation = "bat 0.9s steps(1) infinite paused";
    };
    const resumeWings = () => {
      bat.style.animation = "bat 0.9s steps(1) infinite running";
    };

    // ---------- Audio (Web Audio synthesised SFX) ----------------------------
    // We synth sounds on the fly so the component ships zero audio assets.
    // Browsers block AudioContext until the first user gesture; we lazily
    // create / resume it inside the event handlers that already react to
    // user interaction. Persisted mute is read from localStorage.

    let audioCtx: AudioContext | null = null;
    let muted = false;
    try {
      muted = localStorage.getItem("pixel-bat:muted") === "1";
    } catch {
      muted = false;
    }

    const ensureAudio = (): AudioContext | null => {
      if (cancelled) return null;
      if (!audioCtx) {
        try {
          const Ctor =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext?: typeof AudioContext })
              .webkitAudioContext;
          if (!Ctor) return null;
          audioCtx = new Ctor();
        } catch {
          audioCtx = null;
        }
      }
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    };

    const playChirp = () => {
      if (muted) return;
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      for (let i = 0; i < 2; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain).connect(ctx.destination);
        const f0 = 1800 + i * 300;
        osc.frequency.setValueAtTime(f0, now);
        osc.frequency.exponentialRampToValueAtTime(f0 * 0.7, now + 0.05);
        osc.frequency.exponentialRampToValueAtTime(f0 * 1.2, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(f0 * 0.9, now + 0.25);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.32);
      }
    };

    const playSqueak = () => {
      if (muted) return;
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain).connect(ctx.destination);
      osc.frequency.setValueAtTime(2500, now);
      osc.frequency.exponentialRampToValueAtTime(1900, now + 0.12);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.2);
    };

    const playAngry = () => {
      if (muted) return;
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.connect(gain).connect(ctx.destination);
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.32);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.42);
    };

    const playFurious = () => {
      if (muted) return;
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.connect(gain).connect(ctx.destination);
        const f0 = 3000 + i * 500;
        osc.frequency.setValueAtTime(f0, now);
        osc.frequency.exponentialRampToValueAtTime(f0 * 1.5, now + 0.1);
        osc.frequency.exponentialRampToValueAtTime(f0 * 0.5, now + 0.32);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.42);
      }
    };

    const playFlutter = () => {
      if (muted) return;
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.connect(gain).connect(ctx.destination);
        osc.frequency.value = 120 + i * 40;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.03);
        gain.gain.linearRampToValueAtTime(0, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.24);
      }
    };

    const playKiss = () => {
      if (muted) return;
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.connect(gain).connect(ctx.destination);
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(1300, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.18);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.004, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.22);
    };

    const playChime = () => {
      if (muted) return;
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Three-note arpeggio (C–E–G in 5th octave) with sine bells.
      const freqs = [523.25, 659.25, 783.99];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.connect(gain).connect(ctx.destination);
        const t = now + i * 0.07;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.06, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.005, t + 0.4);
        osc.start(t);
        osc.stop(t + 0.45);
      });
    };

    const playWhoosh = () => {
      if (muted) return;
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dur = 0.35;
      // Filtered noise sweep.
      const buffer = ctx.createBuffer(
        1,
        Math.floor(ctx.sampleRate * dur),
        ctx.sampleRate
      );
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + dur * 0.5);
      filter.frequency.exponentialRampToValueAtTime(400, now + dur);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.04);
      gain.gain.linearRampToValueAtTime(0, now + dur);
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start(now);
      noise.stop(now + dur);
    };

    const playLand = () => {
      if (muted) return;
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.connect(gain).connect(ctx.destination);
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.18);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.004, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.24);
    };

    const playFireBurst = () => {
      if (muted) return;
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dur = 0.22;
      const buffer = ctx.createBuffer(
        1,
        Math.floor(ctx.sampleRate * dur),
        ctx.sampleRate
      );
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        // Pink-ish noise to sound crackly rather than hissy.
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(600, now + dur);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + dur);
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start(now);
      noise.stop(now + dur);
    };

    const playSneeze = () => {
      if (muted) return;
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Inhale (low → mid).
      const inhale = ctx.createOscillator();
      const ig = ctx.createGain();
      inhale.type = "triangle";
      inhale.connect(ig).connect(ctx.destination);
      inhale.frequency.setValueAtTime(220, now);
      inhale.frequency.exponentialRampToValueAtTime(420, now + 0.18);
      ig.gain.setValueAtTime(0.05, now);
      ig.gain.exponentialRampToValueAtTime(0.005, now + 0.2);
      inhale.start(now);
      inhale.stop(now + 0.22);
      // Achoo burst.
      const burstAt = now + 0.22;
      const burst = ctx.createOscillator();
      const bg = ctx.createGain();
      burst.type = "sawtooth";
      burst.connect(bg).connect(ctx.destination);
      burst.frequency.setValueAtTime(1400, burstAt);
      burst.frequency.exponentialRampToValueAtTime(600, burstAt + 0.18);
      bg.gain.setValueAtTime(0.09, burstAt);
      bg.gain.exponentialRampToValueAtTime(0.005, burstAt + 0.22);
      burst.start(burstAt);
      burst.stop(burstAt + 0.24);
    };

    const setMuted = (next: boolean) => {
      muted = next;
      try {
        localStorage.setItem("pixel-bat:muted", muted ? "1" : "0");
      } catch {
        /* ignore */
      }
      // Tiny click feedback so the user knows the toggle worked.
      if (!muted) playSqueak();
    };

    // ---------- Mouse following ---------------------------------------------

    const handleMouseMove = (e: MouseEvent) => {
      lastMoveAt = performance.now();
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      if (mode === "perched" || mode === "going-home") {
        // Wake up — fly back toward the cursor.
        mode = "follow";
        resumeWings();
      }
      if (mode !== "follow") return;

      const dx = currentX - e.clientX;
      const dy = currentY - e.clientY;
      const angle = Math.atan2(dy, dx);
      targetX = e.clientX + Math.cos(angle) * FOLLOW_DISTANCE;
      targetY = e.clientY + Math.sin(angle) * FOLLOW_DISTANCE;
    };

    // ---------- Main RAF loop ------------------------------------------------

    const animate = () => {
      if (cancelled) return;

      updateVisibility();

      // While hidden we still tick (so when shown again we're already in
      // place), but skip the trail-particle / heavy work.
      if (mode !== "gesture" && mode !== "fire") {
        const now = performance.now();
        const idleMs = now - lastMoveAt;

        // Trigger the slow flight home after PERCH_IDLE_MS of mouse stillness.
        if (mode === "follow" && idleMs > PERCH_IDLE_MS) {
          const perch = computePerchTarget();
          if (perch) {
            mode = "going-home";
            homeStartAt = now;
            homeFromX = currentX;
            homeFromY = currentY;
          }
        }

        let goalX = targetX;
        let goalY = targetY;
        const easeFactor = SMOOTH_FACTOR;

        if (mode === "going-home") {
          const perch = computePerchTarget();
          if (!perch) {
            mode = "follow";
          } else {
            // Slow, deliberate glide toward the perch over ~1.8 s. The
            // sprite is already drawn head-up, so we keep it upright and
            // just bank slightly into the flight curve (no 180° flip).
            const t = Math.min((now - homeStartAt) / 1800, 1);
            const e = easeInOutCubic(t);
            currentX = homeFromX + (perch.x - homeFromX) * e;
            currentY = homeFromY + (perch.y - homeFromY) * e;
            const wobble = Math.sin(now / 260) * 4;
            setBatPosition(currentX + wobble, currentY);
            // Bank into the curve, settling to 0° as we land on the perch.
            const dx = perch.x - homeFromX;
            const dy = perch.y - homeFromY;
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            bat.style.transform = `scale(${SCALE}) rotate(${angle * 0.06 * (1 - e)}deg)`;
            if (t >= 1) {
              mode = "perched";
              currentX = perch.x;
              currentY = perch.y;
              pauseWings();
              playLand();
            }
            rafId = requestAnimationFrame(animate);
            return;
          }
        }

        if (mode === "perched") {
          const perch = computePerchTarget();
          if (!perch) {
            // Cover/avatar disappeared (route change?), revert to follow.
            mode = "follow";
            resumeWings();
          } else {
            // Sit perched under the UD letters with a tiny breathing sway.
            // No flip — the sprite is already head-up so this looks like
            // the bat has gripped the bottom of "UD" and is resting.
            currentX += (perch.x - currentX) * 0.08;
            currentY += (perch.y - currentY) * 0.08;
            const sway = Math.sin(now / 1100) * 1.4;
            const tilt = Math.sin(now / 1300) * 2; // gentle resting tilt
            setBatPosition(currentX + sway, currentY);
            bat.style.transform = `scale(${SCALE}) rotate(${tilt}deg)`;
            rafId = requestAnimationFrame(animate);
            return;
          }
        }

        // mode === "follow"
        const maxY = getMaxY();
        if (goalY > maxY) goalY = maxY;
        if (goalY < 60) goalY = 60;
        if (goalX < 60) goalX = 60;
        if (goalX > window.innerWidth - 60) goalX = window.innerWidth - 60;

        currentX += (goalX - currentX) * easeFactor;
        currentY += (goalY - currentY) * easeFactor;

        const wobble = Math.sin(now / 220) * 5;
        const wobbleY = Math.sin(now / 350) * 3;
        setBatPosition(currentX + wobble, currentY + wobbleY);

        const dx = goalX - currentX;
        const dy = goalY - currentY;
        const moveAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
        bat.style.transform = `scale(${SCALE}) rotate(${moveAngle * 0.05}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // ---------- Idle blink (cute) -------------------------------------------

    const blinkInterval = window.setInterval(() => {
      if (mode === "gesture" || mode === "fire") return;
      bat.classList.add("blink");
      window.setTimeout(() => bat.classList.remove("blink"), 150);
    }, 2400);

    // Quiet random chirp while the bat is alert / following the cursor.
    // We skip while perched or scrolled-off so it stays calm.
    const idleChirpInterval = window.setInterval(() => {
      if (muted || isHidden) return;
      if (mode !== "follow") return;
      if (Math.random() < 0.35) playChirp();
    }, 9000);

    // ---------- Spawn helpers ------------------------------------------------

    const trailParticles = new Set<HTMLElement>();

    const spawnTrail = (x: number, y: number, cls = "dragon-trail") => {
      const p = document.createElement("div");
      p.className = cls;
      p.style.position = "fixed";
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.pointerEvents = "none";
      p.style.zIndex = "9998";
      document.body.appendChild(p);
      trailParticles.add(p);

      let opacity = 1;
      const fade = () => {
        if (cancelled) {
          p.remove();
          trailParticles.delete(p);
          return;
        }
        opacity -= 0.05;
        p.style.opacity = `${opacity}`;
        if (opacity > 0) {
          requestAnimationFrame(fade);
        } else {
          p.remove();
          trailParticles.delete(p);
        }
      };
      requestAnimationFrame(fade);
    };

    const spawnHeart = (x: number, y: number) => {
      const heart = document.createElement("div");
      heart.textContent = "♥";
      heart.style.position = "fixed";
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9998";
      heart.style.color = "#ff4d6d";
      heart.style.fontSize = "40px";
      heart.style.lineHeight = "1";
      heart.style.textShadow =
        "0 0 12px rgba(255,77,109,0.85), 0 0 24px rgba(255,77,109,0.4)";
      heart.style.transform = "translate(-50%, -50%) scale(0.4)";
      heart.style.willChange = "transform, opacity";
      document.body.appendChild(heart);
      trailParticles.add(heart);

      const start = performance.now();
      const drift = (Math.random() - 0.5) * 50;
      const step = () => {
        if (cancelled) {
          heart.remove();
          trailParticles.delete(heart);
          return;
        }
        const t = Math.min((performance.now() - start) / 1600, 1);
        const ny = y - 90 * t;
        const nx = x + drift * t;
        // Pulse so it looks like a beating heart.
        const pulse = 1 + Math.sin(t * Math.PI * 6) * 0.08;
        // Pop-in scale at the start, fade-out at the end.
        const popIn = Math.min(t / 0.15, 1);
        const fade = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;
        heart.style.left = `${nx}px`;
        heart.style.top = `${ny}px`;
        heart.style.opacity = `${fade}`;
        heart.style.transform = `translate(-50%, -50%) scale(${(0.4 + 0.9 * popIn) * pulse})`;
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          heart.remove();
          trailParticles.delete(heart);
        }
      };
      requestAnimationFrame(step);
    };

    const spawnFireToward = (
      sx: number,
      sy: number,
      tx: number,
      ty: number
    ) => {
      const f = document.createElement("div");
      // Skip the .fire-particle CSS class so its 12 px size doesn't override
      // our larger inline sizing — we draw the fireball ourselves here.
      f.style.position = "fixed";
      f.style.left = `${sx}px`;
      f.style.top = `${sy}px`;
      f.style.width = "26px";
      f.style.height = "26px";
      f.style.borderRadius = "50%";
      f.style.background =
        "radial-gradient(circle, #ffd54a 0%, #ff7b00 35%, #d11414 70%, transparent 100%)";
      f.style.boxShadow =
        "0 0 16px rgba(255,123,0,0.85), 0 0 32px rgba(209,20,20,0.7)";
      f.style.pointerEvents = "none";
      f.style.zIndex = "9998";
      f.style.transform = "translate(-50%, -50%) scale(0.5)";
      f.style.willChange = "transform, opacity, left, top";
      document.body.appendChild(f);
      trailParticles.add(f);

      const start = performance.now();
      const dx = tx - sx;
      const dy = ty - sy;
      const drift = (Math.random() - 0.5) * 50;
      const driftAngle = Math.atan2(dy, dx) + Math.PI / 2;
      const step = () => {
        if (cancelled) {
          f.remove();
          trailParticles.delete(f);
          return;
        }
        const t = Math.min((performance.now() - start) / 700, 1);
        const e = easeOutCubic(t);
        const x = sx + dx * e + Math.cos(driftAngle) * drift * t;
        const y = sy + dy * e + Math.sin(driftAngle) * drift * t;
        f.style.left = `${x}px`;
        f.style.top = `${y}px`;
        f.style.opacity = `${1 - t}`;
        const s = 0.5 + t * 1.4;
        f.style.transform = `translate(-50%, -50%) scale(${s})`;
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          f.remove();
          trailParticles.delete(f);
        }
      };
      requestAnimationFrame(step);
    };

    const spawnSparkle = (x: number, y: number) => {
      const s = document.createElement("div");
      s.textContent = "✦";
      s.style.position = "fixed";
      s.style.left = `${x}px`;
      s.style.top = `${y}px`;
      s.style.pointerEvents = "none";
      s.style.zIndex = "9998";
      s.style.color = "#ffe066";
      s.style.fontSize = "26px";
      s.style.lineHeight = "1";
      s.style.textShadow =
        "0 0 10px rgba(255,224,102,0.85), 0 0 20px rgba(255,180,0,0.5)";
      s.style.transform = "translate(-50%, -50%) scale(0.2) rotate(0deg)";
      s.style.willChange = "transform, opacity";
      document.body.appendChild(s);
      trailParticles.add(s);

      const start = performance.now();
      const drift = (Math.random() - 0.5) * 60;
      const lift = 40 + Math.random() * 30;
      const step = () => {
        if (cancelled) {
          s.remove();
          trailParticles.delete(s);
          return;
        }
        const t = Math.min((performance.now() - start) / 1200, 1);
        const ny = y - lift * t;
        const nx = x + drift * t;
        const popIn = Math.min(t / 0.2, 1);
        const fade = t < 0.6 ? 1 : 1 - (t - 0.6) / 0.4;
        s.style.left = `${nx}px`;
        s.style.top = `${ny}px`;
        s.style.opacity = `${fade}`;
        s.style.transform = `translate(-50%, -50%) scale(${0.2 + popIn * 1}) rotate(${t * 360}deg)`;
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          s.remove();
          trailParticles.delete(s);
        }
      };
      requestAnimationFrame(step);
    };

    // ---------- Gestures -----------------------------------------------------

    const doHello = () =>
      new Promise<void>((resolve) => {
        bat.classList.add("hello");
        const start = performance.now();
        const duration = 900;
        const baseX = currentX;
        const baseY = currentY;
        const step = () => {
          if (cancelled) {
            bat.classList.remove("hello");
            resolve();
            return;
          }
          const t = Math.min((performance.now() - start) / duration, 1);
          const wave = Math.sin(t * Math.PI * 4) * 22;
          setBatPosition(baseX, baseY - 4 * Math.sin(t * Math.PI));
          bat.style.transform = `scale(${SCALE}) rotate(${wave}deg)`;
          if (t < 1) requestAnimationFrame(step);
          else {
            bat.classList.remove("hello");
            bat.style.transform = `scale(${SCALE})`;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    const doBackflip = () =>
      new Promise<void>((resolve) => {
        bat.classList.add("backflip");
        const start = performance.now();
        const duration = 850;
        const baseX = currentX;
        const baseY = currentY;
        const hopX = 70;
        const hopHeight = 110;
        const step = () => {
          if (cancelled) {
            bat.classList.remove("backflip");
            resolve();
            return;
          }
          const t = Math.min((performance.now() - start) / duration, 1);
          const e = easeInOutCubic(t);
          const x = baseX + Math.sin(e * Math.PI) * hopX * 0.6;
          const y = baseY - Math.sin(e * Math.PI) * hopHeight;
          const rotation = -e * 720;
          setBatPosition(x, y);
          bat.style.transform = `scale(${SCALE}) rotate(${rotation}deg)`;
          if (t < 1) requestAnimationFrame(step);
          else {
            bat.classList.remove("backflip");
            bat.style.transform = `scale(${SCALE})`;
            currentX = baseX;
            currentY = baseY;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    const doDragonFly = () =>
      new Promise<void>((resolve) => {
        bat.classList.add("dragon-fly");
        const start = performance.now();
        const duration = 2600;
        const startX = currentX;
        const startY = currentY;
        const cx = window.innerWidth / 2;

        const aboutTop = (() => {
          const a = findAboutEl();
          return a ? a.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
        })();
        const upperBound = Math.min(
          aboutTop - FOLLOW_TOP_MARGIN,
          window.innerHeight - 80
        );
        const cy = Math.max(140, Math.min(upperBound - 80, 280));
        const radiusX = Math.min(window.innerWidth * 0.38, 480);
        const radiusY = Math.min((upperBound - 80) * 0.45, 130);

        let lastTrailAt = 0;

        const step = () => {
          if (cancelled) {
            bat.classList.remove("dragon-fly");
            resolve();
            return;
          }
          const now = performance.now();
          const t = Math.min((now - start) / duration, 1);
          const e = easeInOutCubic(t);
          const phase = e * Math.PI * 2;
          const denom = 1 + Math.sin(phase) * Math.sin(phase);
          const f8x = (radiusX * Math.cos(phase)) / denom;
          const f8y = (radiusY * Math.sin(phase) * Math.cos(phase)) / denom;

          const blendIn = Math.min(t / 0.15, 1);
          const blendOut = Math.min((1 - t) / 0.15, 1);
          const blend = Math.min(blendIn, blendOut);
          const tx = cx + f8x;
          const ty = cy + f8y;
          const x = startX + (tx - startX) * blend;
          const y = startY + (ty - startY) * blend;

          const ahead = Math.min(t + 0.01, 1) * Math.PI * 2;
          const dn = 1 + Math.sin(ahead) * Math.sin(ahead);
          const aheadX = cx + (radiusX * Math.cos(ahead)) / dn;
          const aheadY =
            cy + (radiusY * Math.sin(ahead) * Math.cos(ahead)) / dn;
          const angleDeg =
            (Math.atan2(aheadY - ty, aheadX - tx) * 180) / Math.PI;

          currentX = x;
          currentY = y;
          setBatPosition(x, y);
          bat.style.transform = `scale(${SCALE}) rotate(${angleDeg * 0.4}deg)`;

          if (now - lastTrailAt > 28) {
            spawnTrail(x, y);
            lastTrailAt = now;
          }

          if (t < 1) requestAnimationFrame(step);
          else {
            bat.classList.remove("dragon-fly");
            bat.style.transform = `scale(${SCALE})`;
            currentX = startX;
            currentY = startY;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    const doSpin = () =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const duration = 700;
        const baseX = currentX;
        const baseY = currentY;
        const step = () => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((performance.now() - start) / duration, 1);
          const e = easeOutCubic(t);
          const rotation = e * 360;
          const lift = Math.sin(t * Math.PI) * 18;
          setBatPosition(baseX, baseY - lift);
          bat.style.transform = `scale(${SCALE}) rotate(${rotation}deg)`;
          if (t < 1) requestAnimationFrame(step);
          else {
            bat.style.transform = `scale(${SCALE})`;
            currentX = baseX;
            currentY = baseY;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    const doHeart = () =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const duration = 1200;
        const baseX = currentX;
        const baseY = currentY;
        let lastEmit = 0;
        const step = () => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((performance.now() - start) / duration, 1);
          const wobble = Math.sin(t * Math.PI * 3) * 6;
          setBatPosition(baseX + wobble, baseY - 6 * Math.sin(t * Math.PI));
          bat.style.transform = `scale(${SCALE * (1 + 0.05 * Math.sin(t * Math.PI * 4))})`;
          if (performance.now() - lastEmit > 220) {
            spawnHeart(currentX, currentY - 30);
            lastEmit = performance.now();
          }
          if (t < 1) requestAnimationFrame(step);
          else {
            bat.style.transform = `scale(${SCALE})`;
            currentX = baseX;
            currentY = baseY;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    const doWiggle = () =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const duration = 500;
        const baseX = currentX;
        const baseY = currentY;
        const step = () => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((performance.now() - start) / duration, 1);
          const shake = Math.sin(t * Math.PI * 10) * 14;
          setBatPosition(baseX + shake, baseY);
          bat.style.transform = `scale(${SCALE}) rotate(${shake * 0.5}deg)`;
          if (t < 1) requestAnimationFrame(step);
          else {
            bat.style.transform = `scale(${SCALE})`;
            currentX = baseX;
            currentY = baseY;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    // Vertical somersault loop — like a tiny in-place loop-the-loop.
    const doSomersault = () =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const duration = 900;
        const baseX = currentX;
        const baseY = currentY;
        const radius = 55;
        const step = () => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((performance.now() - start) / duration, 1);
          const e = easeInOutCubic(t);
          // Trace a circular loop centered above the bat.
          const angle = -Math.PI / 2 + e * Math.PI * 2;
          const x = baseX + Math.cos(angle) * radius;
          const y = baseY - radius + Math.sin(angle) * radius;
          const rotation = e * 360;
          setBatPosition(x, y);
          bat.style.transform = `scale(${SCALE}) rotate(${rotation}deg)`;
          if (t < 1) requestAnimationFrame(step);
          else {
            bat.style.transform = `scale(${SCALE})`;
            currentX = baseX;
            currentY = baseY;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    // Quick all-over shake, like a wet dog drying off.
    const doShake = () =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const duration = 700;
        const baseX = currentX;
        const baseY = currentY;
        const step = () => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((performance.now() - start) / duration, 1);
          const decay = 1 - t;
          const shakeX = Math.sin(t * Math.PI * 16) * 10 * decay;
          const shakeY = Math.cos(t * Math.PI * 14) * 6 * decay;
          const tilt = Math.sin(t * Math.PI * 18) * 14 * decay;
          setBatPosition(baseX + shakeX, baseY + shakeY);
          bat.style.transform = `scale(${SCALE}) rotate(${tilt}deg)`;
          if (t < 1) requestAnimationFrame(step);
          else {
            bat.style.transform = `scale(${SCALE})`;
            currentX = baseX;
            currentY = baseY;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    // Sneeze — recoil back, then snap forward with a tiny shake.
    const doSneeze = () =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const duration = 700;
        const baseX = currentX;
        const baseY = currentY;
        const step = () => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((performance.now() - start) / duration, 1);
          // Recoil from 0..0.4, snap forward 0.4..0.6, settle 0.6..1.
          let dx = 0;
          let dy = 0;
          let scale = SCALE;
          if (t < 0.4) {
            const k = t / 0.4;
            dx = -10 * easeOutCubic(k);
            dy = -8 * easeOutCubic(k);
            scale = SCALE * (1 + 0.08 * k);
          } else if (t < 0.6) {
            const k = (t - 0.4) / 0.2;
            dx = -10 + 28 * easeOutCubic(k);
            dy = -8 + 14 * easeOutCubic(k);
            scale = SCALE * 1.08;
            if (k > 0.7) {
              // Spawn sparkle at "atchoo" moment.
              if (Math.random() < 0.6)
                spawnSparkle(baseX + dx + 30, baseY + dy);
            }
          } else {
            const k = (t - 0.6) / 0.4;
            const wobble = Math.sin(k * Math.PI * 6) * 4 * (1 - k);
            dx = 18 + wobble;
            dy = 6;
            scale = SCALE * (1.08 - 0.08 * k);
          }
          setBatPosition(baseX + dx, baseY + dy);
          bat.style.transform = `scale(${scale})`;
          if (t < 1) requestAnimationFrame(step);
          else {
            bat.style.transform = `scale(${SCALE})`;
            currentX = baseX;
            currentY = baseY;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    // Sparkle dance — gentle bob while emitting golden ✦ stars.
    const doSparkle = () =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const duration = 1300;
        const baseX = currentX;
        const baseY = currentY;
        let lastEmit = 0;
        const step = () => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((performance.now() - start) / duration, 1);
          const bob = Math.sin(t * Math.PI * 4) * 8;
          const tilt = Math.sin(t * Math.PI * 6) * 6;
          setBatPosition(baseX, baseY + bob);
          bat.style.transform = `scale(${SCALE}) rotate(${tilt}deg)`;
          if (performance.now() - lastEmit > 140) {
            const ox = (Math.random() - 0.5) * 80;
            const oy = (Math.random() - 0.5) * 60;
            spawnSparkle(baseX + ox, baseY + bob + oy);
            lastEmit = performance.now();
          }
          if (t < 1) requestAnimationFrame(step);
          else {
            bat.style.transform = `scale(${SCALE})`;
            currentX = baseX;
            currentY = baseY;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    // Real-bat gestures ------------------------------------------------------

    // Listen — head tilts side to side like a bat tracking sound with its
    // ears, with a quiet echolocation chirp echo on each tilt.
    const doListen = () =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const duration = 1300;
        const baseX = currentX;
        const baseY = currentY;
        let lastChirpAt = 0;
        const step = () => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((performance.now() - start) / duration, 1);
          // Two complete L-R-L tilts.
          const tilt = Math.sin(t * Math.PI * 4) * 18;
          // Small lean in the direction of tilt — like cocking the head.
          const lean = Math.sin(t * Math.PI * 4) * 6;
          setBatPosition(baseX + lean, baseY);
          bat.style.transform = `scale(${SCALE}) rotate(${tilt}deg)`;
          // Two soft echolocation chirps near the extremes of the tilt.
          if (performance.now() - lastChirpAt > 320) {
            const peak = Math.abs(Math.cos(t * Math.PI * 4));
            if (peak < 0.15) {
              playChirp();
              lastChirpAt = performance.now();
            }
          }
          if (t < 1) requestAnimationFrame(step);
          else {
            bat.style.transform = `scale(${SCALE})`;
            currentX = baseX;
            currentY = baseY;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    // Stretch — yawn-stretch with a soft inhale; the sprite scales up
    // briefly as if extending its wings before settling back.
    const doStretch = () =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const duration = 1100;
        const baseX = currentX;
        const baseY = currentY;
        const step = () => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((performance.now() - start) / duration, 1);
          // Slow scale up to ~1.18x, hold, then ease back.
          let s: number;
          if (t < 0.45) s = 1 + 0.18 * easeOutCubic(t / 0.45);
          else if (t < 0.7) s = 1.18;
          else s = 1.18 - 0.18 * easeOutCubic((t - 0.7) / 0.3);
          // Drift up slightly as wings fully extend.
          const lift = -8 * Math.sin(t * Math.PI);
          setBatPosition(baseX, baseY + lift);
          bat.style.transform = `scale(${SCALE * s})`;
          if (t < 1) requestAnimationFrame(step);
          else {
            bat.style.transform = `scale(${SCALE})`;
            currentX = baseX;
            currentY = baseY;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    // Groom — preening: small circular head movements + tiny squeaks, like
    // a bat cleaning its fur.
    const doGroom = () =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const duration = 1500;
        const baseX = currentX;
        const baseY = currentY;
        let lastSqueakAt = 0;
        const step = () => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((performance.now() - start) / duration, 1);
          // Three quick circles traced near the body.
          const angle = t * Math.PI * 6;
          const dx = Math.cos(angle) * 6;
          const dy = Math.sin(angle) * 4;
          setBatPosition(baseX + dx, baseY + dy);
          bat.style.transform = `scale(${SCALE}) rotate(${Math.sin(angle) * 8}deg)`;
          // Soft squeak each lap.
          if (performance.now() - lastSqueakAt > 430) {
            playSqueak();
            lastSqueakAt = performance.now();
          }
          if (t < 1) requestAnimationFrame(step);
          else {
            bat.style.transform = `scale(${SCALE})`;
            currentX = baseX;
            currentY = baseY;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    const performGesture = async (g: Gesture) => {
      if (mode === "gesture" || mode === "fire") return;
      mode = "gesture";
      resumeWings();
      // Trigger an opening sound for the gesture; some gestures schedule
      // additional sounds inside their animation (sneeze burst, sparkle
      // chime intervals, etc.).
      switch (g) {
        case "hello":
          playChirp();
          break;
        case "backflip":
        case "somersault":
          playFlutter();
          break;
        case "dragonFly":
          playFlutter();
          window.setTimeout(() => !cancelled && playFlutter(), 800);
          window.setTimeout(() => !cancelled && playFlutter(), 1700);
          break;
        case "spin":
          playWhoosh();
          break;
        case "heart":
          playKiss();
          break;
        case "sparkle":
          playChime();
          break;
        case "wiggle":
        case "shake":
          playSqueak();
          break;
        case "sneeze":
          playSneeze();
          break;
        case "stretch":
          // Soft yawn = slow inhale with a gentle exhale tail.
          playSneeze();
          break;
        case "groom":
        case "listen":
          // These gestures schedule their own internal sound bursts.
          break;
      }
      try {
        if (g === "hello") await doHello();
        else if (g === "backflip") await doBackflip();
        else if (g === "dragonFly") await doDragonFly();
        else if (g === "spin") await doSpin();
        else if (g === "heart") await doHeart();
        else if (g === "wiggle") await doWiggle();
        else if (g === "somersault") await doSomersault();
        else if (g === "shake") await doShake();
        else if (g === "sparkle") await doSparkle();
        else if (g === "sneeze") await doSneeze();
        else if (g === "listen") await doListen();
        else if (g === "stretch") await doStretch();
        else if (g === "groom") await doGroom();
      } finally {
        mode = "follow";
        targetX = lastMouseX;
        targetY = lastMouseY;
        // NOTE: do NOT reset lastMoveAt here. Otherwise the perch idle
        // timer would restart after every random gesture and the bat
        // would never naturally fly home to the avatar.
      }
    };

    // ---------- Fire breath (irritated) -------------------------------------

    const startFireBreath = () => {
      if (mode === "fire") return;
      mode = "fire";
      resumeWings();
      bat.classList.add("dragon-fly"); // reuse fast wing flap for fury
      firingUntil = performance.now() + FIRE_DURATION_MS;

      let lastFireAt = 0;
      let lastShakeAt = 0;
      const baseAngle = 0;

      const tick = () => {
        if (cancelled) return;
        const now = performance.now();
        if (now >= firingUntil) {
          bat.classList.remove("dragon-fly");
          bat.style.transform = `scale(${SCALE}) rotate(${baseAngle}deg)`;
          annoyance = 0;
          mode = "follow";
          lastMoveAt = now;
          return;
        }

        // Subtle furious shake.
        const shake = Math.sin(now / 35) * 4;
        if (now - lastShakeAt > 16) {
          setBatPosition(currentX + shake, currentY);
          // Aim head toward cursor.
          const dx = lastMouseX - currentX;
          const dy = lastMouseY - currentY;
          const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
          bat.style.transform = `scale(${SCALE}) rotate(${ang * 0.1}deg)`;
          lastShakeAt = now;
        }

        if (now - lastFireAt > 60) {
          // Spawn 2-3 fire particles per pulse.
          for (let i = 0; i < 3; i++) {
            const jitterX = (Math.random() - 0.5) * 24;
            const jitterY = (Math.random() - 0.5) * 24;
            spawnFireToward(
              currentX + jitterX,
              currentY + jitterY,
              lastMouseX,
              lastMouseY
            );
          }
          lastFireAt = now;
          // Crackle on every other pulse so it doesn't get noisy.
          if (Math.random() < 0.55) playFireBurst();
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    // ---------- Click-to-irritate -------------------------------------------

    const handlePointerDown = (e: PointerEvent) => {
      if (isHidden) return;
      const dx = e.clientX - currentX;
      const dy = e.clientY - currentY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > CLICK_HIT_RADIUS) return;

      const now = performance.now();
      if (now - lastAnnoyAt > ANNOYANCE_RESET_MS) {
        annoyance = 1;
      } else {
        annoyance += 1;
      }
      lastAnnoyAt = now;

      if (annoyance >= IRRITATE_THRESHOLD) {
        playFurious();
        startFireBreath();
      } else if (annoyance === 1) {
        // Soft squeak handled by the wiggle gesture's sound.
        performGesture("wiggle");
      } else {
        // Escalating: 2nd poke = angry growl + shake.
        playAngry();
        performGesture("shake");
      }
    };

    // ---------- Random idle gestures (cute, less frequent) ------------------

    const gestureInterval = window.setInterval(() => {
      if (mode !== "follow") return;
      if (Math.random() < 0.4) {
        const pool: Gesture[] = [
          "hello",
          "heart",
          "spin",
          "backflip",
          "somersault",
          "shake",
          "sparkle",
          "sneeze",
          "listen",
          "stretch",
          "groom",
        ];
        performGesture(pool[Math.floor(Math.random() * pool.length)]);
      }
    }, 16000);

    // ---------- Keyboard shortcuts (when no input/textarea is focused) -------

    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) {
          return;
        }
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.code) {
        case "KeyH":
          performGesture("hello");
          break;
        case "KeyB":
          performGesture("backflip");
          break;
        case "KeyG":
          performGesture("dragonFly");
          break;
        case "KeyS":
          performGesture("spin");
          break;
        case "KeyL":
          performGesture("heart");
          break;
        case "KeyO":
          performGesture("somersault");
          break;
        case "KeyW":
          performGesture("shake");
          break;
        case "KeyP":
          performGesture("sparkle");
          break;
        case "KeyN":
          performGesture("sneeze");
          break;
        case "KeyI":
          performGesture("listen");
          break;
        case "KeyY":
          performGesture("stretch");
          break;
        case "KeyJ":
          performGesture("groom");
          break;
        case "KeyM":
          setMuted(!muted);
          break;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, true);
    window.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handlePointerDown, true);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", updateVisibility);
      window.clearInterval(blinkInterval);
      window.clearInterval(idleChirpInterval);
      window.clearInterval(gestureInterval);
      cancelAnimationFrame(rafId);
      trailParticles.forEach((p) => p.remove());
      trailParticles.clear();
      // Close the audio context so it stops consuming resources.
      audioCtx?.close().catch(() => {});
      audioCtx = null;
    };
  }, [shouldRender, isEnabled]);

  if (!shouldRender) return null;

  // Light theme: invert the dark sprite so the bat reads as white. Dark
  // theme: leave the natural dark sprite alone. No glow in either mode.
  const filter = resolvedTheme === "light" ? "invert(1)" : "none";

  return (
    <>
      {showNotification && (
        <div className="fixed right-6 bottom-6 z-[9999] flex animate-in items-center gap-2 rounded-full border border-zinc-200 bg-white/95 px-4 py-2.5 text-xs font-semibold text-zinc-900 shadow-xl backdrop-blur-md transition-all duration-300 fade-in slide-in-from-bottom-3 dark:border-zinc-800 dark:bg-zinc-950/95 dark:text-zinc-50">
          <div
            className={`h-2 w-2 rounded-full ${isEnabled ? "animate-pulse bg-emerald-500" : "bg-red-500"}`}
          />
          <span>{notificationText}</span>
          <span className="ml-2 rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-800">
            Ctrl + Esc
          </span>
        </div>
      )}
      {isEnabled && (
        <div
          ref={batRef}
          id="pixel-bat-pet"
          className="bat"
          aria-hidden="true"
          style={{ filter }}
        />
      )}
    </>
  );
}
