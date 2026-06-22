"use client";

import { DownloadIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { USER } from "@/data/user";

const BARCODE_BARS = [1,0,1,1,0,1,0,0,1,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,0,0,1,1];

export function VCardBoardingPass() {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  return (
    <a
      ref={cardRef}
      href="/vcard"
      id="vcard-boarding-pass"
      download
      className="vcard-boarding-pass-link block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Download vCard – Uday Dolas Contact Card"
    >
      <div
        className="vcard-ticket"
        style={{
          transform: isHovered
            ? `perspective(800px) rotateX(${(mousePos.y - 0.5) * -8}deg) rotateY(${(mousePos.x - 0.5) * 8}deg) scale(1.02)`
            : "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
        }}
      >
        {/* Holographic shimmer overlay */}
        <div
          className="vcard-holo"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.28) 0%, rgba(120,80,255,0.12) 30%, rgba(0,200,255,0.1) 60%, transparent 80%)`
              : "none",
          }}
        />

        {/* Left stub */}
        <div className="vcard-stub">
          <div className="vcard-stub-circles">
            <div className="vcard-circle-top" />
            <div className="vcard-circle-bottom" />
          </div>

          <div className="vcard-stub-content">
            {/* UD mark logo */}
            <div className="vcard-ud-mark">
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <rect x="2" y="2" width="4" height="14" />
                <rect x="2" y="14" width="6" height="4" />
                <rect x="14" y="2" width="4" height="14" />
                <rect x="8" y="14" width="6" height="4" />
                <rect x="6" y="2" width="8" height="4" />
              </svg>
            </div>
            <span className="vcard-stub-label">CONTACT</span>
            <span className="vcard-stub-sub">PASS</span>
          </div>
        </div>

        {/* Perforation */}
        <div className="vcard-perf" aria-hidden>
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i} className="vcard-perf-dot" />
          ))}
        </div>

        {/* Main body */}
        <div className="vcard-body">
          {/* Top header row */}
          <div className="vcard-body-header">
            <div className="vcard-badge">UD-CARD</div>
            <div className="vcard-barcode-small">
              {BARCODE_BARS.slice(0, 24).map((w, i) => (
                <span
                  key={i}
                  className="vcard-bar"
                  style={{ width: w ? "2px" : "1px", opacity: w ? 1 : 0.4 }}
                />
              ))}
            </div>
          </div>

          {/* Name block */}
          <div className="vcard-name-block">
            <div className="vcard-name">
              {USER.firstName}
              <span className="vcard-name-last">{USER.lastName}</span>
            </div>
          </div>

          {/* Info row */}
          <div className="vcard-info-row">
            <div className="vcard-info-col">
              <span className="vcard-info-label">ROLE</span>
              <span className="vcard-info-value">SOFTWARE ENG.</span>
            </div>
            <div className="vcard-info-col">
              <span className="vcard-info-label">CLASS</span>
              <span className="vcard-info-value">FULL STACK</span>
            </div>
            <div className="vcard-info-col">
              <span className="vcard-info-label">GATE</span>
              <span className="vcard-info-value">DEV-01</span>
            </div>
            <div className="vcard-info-col vcard-download-col">
              <DownloadIcon className="vcard-download-icon" />
            </div>
          </div>

          {/* Bottom barcode */}
          <div className="vcard-barcode-full">
            {BARCODE_BARS.map((w, i) => (
              <span
                key={i}
                className="vcard-bar"
                style={{ width: w ? "3px" : "1.5px", opacity: w ? 1 : 0.35 }}
              />
            ))}
            <span className="vcard-barcode-num">UD-2026-DOLAS-VCF</span>
          </div>
        </div>
      </div>

      <style>{`
        .vcard-boarding-pass-link {
          text-decoration: none;
          display: block;
        }

        .vcard-ticket {
          position: relative;
          display: flex;
          align-items: stretch;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #0f0f23 0%,
            #1a1035 25%,
            #0d1a2e 50%,
            #1a0d2e 75%,
            #0a0f1e 100%
          );
          box-shadow:
            0 8px 32px rgba(120, 80, 255, 0.25),
            0 2px 8px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255,255,255,0.08);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          cursor: pointer;
          min-height: 130px;
        }

        .vcard-ticket:hover {
          box-shadow:
            0 16px 48px rgba(120, 80, 255, 0.4),
            0 4px 16px rgba(0, 0, 0, 0.7),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .vcard-holo {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          pointer-events: none;
          z-index: 10;
          transition: opacity 0.2s ease;
          mix-blend-mode: screen;
        }

        /* Animated rainbow shimmer on the stub */
        .vcard-stub {
          position: relative;
          width: 88px;
          flex-shrink: 0;
          background: linear-gradient(
            170deg,
            #ff6ec7 0%,
            #a855f7 20%,
            #3b82f6 40%,
            #06b6d4 60%,
            #10b981 80%,
            #fbbf24 100%
          );
          background-size: 200% 200%;
          animation: holo-shift 4s ease infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes holo-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .vcard-stub-circles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .vcard-circle-top,
        .vcard-circle-bottom {
          position: absolute;
          right: -12px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #0a0a0a;
        }

        .vcard-circle-top {
          top: -12px;
        }

        .vcard-circle-bottom {
          bottom: -12px;
        }

        .vcard-stub-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          z-index: 1;
        }

        .vcard-ud-mark {
          width: 32px;
          height: 32px;
          color: rgba(0,0,0,0.85);
        }

        .vcard-ud-mark svg {
          width: 100%;
          height: 100%;
        }

        .vcard-stub-label {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 8px;
          font-weight: 700;
          color: rgba(0,0,0,0.75);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          writing-mode: vertical-lr;
          transform: rotate(180deg);
        }

        .vcard-stub-sub {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 7px;
          color: rgba(0,0,0,0.55);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Perforation */
        .vcard-perf {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding: 12px 0;
          width: 0;
          position: relative;
          overflow: visible;
        }

        .vcard-perf-dot {
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #0a0a0a;
          border: 1.5px dashed rgba(255,255,255,0.12);
          flex-shrink: 0;
        }

        /* Main body */
        .vcard-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 14px 18px 12px 20px;
          gap: 8px;
          min-width: 0;
        }

        .vcard-body-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .vcard-badge {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: rgba(168, 85, 247, 0.9);
          text-transform: uppercase;
          border: 1px solid rgba(168, 85, 247, 0.3);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .vcard-barcode-small {
          display: flex;
          align-items: stretch;
          height: 20px;
          gap: 1px;
        }

        .vcard-name-block {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .vcard-name-label {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 8px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .vcard-name {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 26px;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1;
          text-transform: uppercase;
        }

        .vcard-name-last {
          color: rgba(168, 85, 247, 0.9);
          margin-left: 6px;
        }

        .vcard-info-row {
          display: flex;
          gap: 16px;
          align-items: flex-end;
        }

        .vcard-info-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .vcard-info-label {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 7px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .vcard-info-value {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .vcard-download-col {
          flex: 0 0 auto;
          align-items: flex-end;
        }

        .vcard-download-icon {
          width: 18px;
          height: 18px;
          color: rgba(168, 85, 247, 0.8);
          animation: bounce-dl 2s ease-in-out infinite;
        }

        @keyframes bounce-dl {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }

        /* Bottom barcode */
        .vcard-barcode-full {
          display: flex;
          align-items: stretch;
          height: 24px;
          gap: 1px;
          position: relative;
          margin-top: 2px;
        }

        .vcard-bar {
          display: block;
          height: 100%;
          background: rgba(255,255,255,0.7);
          border-radius: 1px;
          flex-shrink: 0;
        }

        .vcard-barcode-num {
          position: absolute;
          bottom: -13px;
          left: 0;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-size: 7px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.08em;
        }
      `}</style>
    </a>
  );
}
