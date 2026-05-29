// Interactive Bat Pet Script
class BatPet {
  constructor() {
    this.bat = document.getElementById('bat');
    this.isSleeping = false;
    this.audioContext = null;
    this.currentX = window.innerWidth / 2;
    this.currentY = window.innerHeight / 2;
    this.targetX = this.currentX;
    this.targetY = this.currentY;
    this.isDarkBackground = true;
    this.isIrritated = false;
    this.annoyanceLevel = 0;
    
    this.init();
  }

  init() {
    this.bat.addEventListener('click', () => this.onBatClick());
    this.bat.addEventListener('touchstart', () => this.onBatClick());
    
    // Initialize Web Audio API
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Start behaviors
    this.startMouseFollowing();
    this.startRandomBehaviors();
    this.startBackgroundToggle();
    this.startKeyboardShortcuts();
    this.startAnnoyanceTracking();
    
    // Set initial position
    this.bat.style.left = `${this.currentX}px`;
    this.bat.style.top = `${this.currentY}px`;
  }

  // Play chirp sound when bat is clicked
  onBatClick() {
    this.wakeUp();
    this.annoyanceLevel++;
    
    // Different sounds based on annoyance level
    if (this.annoyanceLevel < 3) {
      this.playChirpSound();
    } else if (this.annoyanceLevel < 6) {
      this.playAngrySound();
    } else {
      this.playFuriousSound();
      this.isIrritated = true;
      this.breatheFire();
    }
    
    this.createClickParticles();
  }

  // Wake up from sleep
  wakeUp() {
    if (this.isSleeping) {
      this.isSleeping = false;
      this.bat.classList.remove('sleeping');
      this.playSqueakSound();
    }
  }

  // Generate realistic bat chirp sound
  playChirpSound() {
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    
    // Create multiple oscillators for complex chirp
    for (let i = 0; i < 2; i++) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      // Bat chirp frequencies (ultrasonic-like effect, lowered for hearing)
      const baseFreq = 1800 + (i * 300);
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 0.05);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.25);

      // Envelope
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.3);

      osc.start(now);
      osc.stop(now + 0.3);
    }
  }

  // Play cute squeak sound
  playSqueakSound() {
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    // High-pitched squeak
    osc.frequency.setValueAtTime(2500, now);
    osc.frequency.exponentialRampToValueAtTime(2000, now + 0.1);

    // Envelope
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Play flying sound
  playFlyingSound() {
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    
    // Create fluttering wing sound with multiple oscillators
    for (let i = 0; i < 4; i++) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      // Wing flutter frequencies
      osc.frequency.value = 120 + (i * 40);
      osc.type = 'triangle';
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.03);
      gain.gain.linearRampToValueAtTime(0, now + 0.2);

      osc.start(now);
      osc.stop(now + 0.2);
    }
  }

  // Play angry sound
  playAngrySound() {
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    
    // Lower, growling sound
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);
    osc.type = 'sawtooth';
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // Play furious sound
  playFuriousSound() {
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    
    // Aggressive screech
    for (let i = 0; i < 3; i++) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      const baseFreq = 3000 + (i * 500);
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + 0.3);
      osc.type = 'sawtooth';
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.start(now);
      osc.stop(now + 0.4);
    }
  }

  // Start random behaviors
  startRandomBehaviors() {
    // Random chirping every 4-8 seconds
    setInterval(() => {
      if (!this.isSleeping && Math.random() < 0.4) {
        this.playChirpSound();
        this.bat.classList.add('chirp');
        setTimeout(() => this.bat.classList.remove('chirp'), 400);
      }
    }, Math.random() * 4000 + 4000);

    // Blink animation every 2-4 seconds
    setInterval(() => {
      if (!this.isSleeping) {
        this.bat.classList.add('blink');
        setTimeout(() => this.bat.classList.remove('blink'), 150);
      }
    }, Math.random() * 2000 + 2000);

    // Random gestures every 8-12 seconds
    setInterval(() => {
      if (!this.isSleeping) {
        const gestures = ['hello', 'backflip', 'dragonFly'];
        const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
        this.performGesture(randomGesture);
      }
    }, Math.random() * 4000 + 8000);

    // Sleep behavior - bat goes to sleep randomly
    setInterval(() => {
      if (!this.isSleeping && Math.random() < 0.2) {
        this.goToSleep();
      }
    }, 15000);
  }

  // Perform a gesture animation
  performGesture(gesture) {
    this.wakeUp();
    
    switch(gesture) {
      case 'hello':
        this.doHelloGesture();
        break;
      case 'backflip':
        this.doBackflip();
        break;
      case 'dragonFly':
        this.doDragonFly();
        break;
    }
  }

  // Hello gesture - bat waves
  doHelloGesture() {
    this.bat.classList.add('hello');
    this.playChirpSound();
    
    // Wave animation
    let waveCount = 0;
    const waveInterval = setInterval(() => {
      const rotation = Math.sin(waveCount * Math.PI / 2) * 30;
      this.bat.style.transform = `scale(4) rotate(${rotation}deg)`;
      waveCount++;
      
      if (waveCount > 6) {
        clearInterval(waveInterval);
        this.bat.classList.remove('hello');
        this.bat.style.transform = 'scale(4)';
      }
    }, 100);
  }

  // Backflip gesture
  doBackflip() {
    this.playFlyingSound();
    this.bat.classList.add('backflip');
    
    let rotation = 0;
    const startX = this.currentX;
    const startY = this.currentY;
    const jumpHeight = 100;
    
    const animateBackflip = () => {
      rotation += 15;
      const progress = rotation / 360;
      
      // Jump up and down
      const jumpY = startY - Math.sin(progress * Math.PI) * jumpHeight;
      
      this.bat.style.transform = `scale(4) rotate(${rotation}deg)`;
      this.bat.style.top = `${jumpY}px`;
      
      if (rotation < 360) {
        requestAnimationFrame(animateBackflip);
      } else {
        this.bat.classList.remove('backflip');
        this.bat.style.transform = 'scale(4)';
        this.currentY = startY;
      }
    };
    
    animateBackflip();
  }

  // Dragon fly gesture - dramatic flight pattern (fills screen)
  doDragonFly() {
    this.playFlyingSound();
    this.bat.classList.add('dragon-fly');
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    let progress = 0;
    
    const animateDragonFly = () => {
      progress += 0.015;
      
      // Large spiral pattern covering the whole screen
      const radius = (progress * Math.PI * 4) * 100;
      const offsetX = Math.cos(progress * Math.PI * 6) * radius;
      const offsetY = Math.sin(progress * Math.PI * 6) * radius;
      const rotation = progress * 720; // Multiple rotations
      
      this.currentX = centerX + offsetX;
      this.currentY = centerY + offsetY;
      
      this.bat.style.left = `${this.currentX}px`;
      this.bat.style.top = `${this.currentY}px`;
      this.bat.style.transform = `scale(4) rotate(${rotation}deg)`;
      
      // Create trail particles
      if (Math.random() < 0.3) {
        this.createTrailParticle();
      }
      
      if (progress < 1) {
        requestAnimationFrame(animateDragonFly);
      } else {
        this.bat.classList.remove('dragon-fly');
        this.bat.style.transform = 'scale(4)';
        // Return to center
        this.currentX = centerX;
        this.currentY = centerY;
      }
    };
    
    animateDragonFly();
  }

  // Create trail particle for dragon fly
  createTrailParticle() {
    const particle = document.createElement('div');
    particle.className = 'dragon-trail';
    particle.style.left = `${this.currentX}px`;
    particle.style.top = `${this.currentY}px`;
    
    document.body.appendChild(particle);
    
    let opacity = 1;
    const animateTrail = () => {
      opacity -= 0.05;
      particle.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animateTrail);
      } else {
        particle.remove();
      }
    };
    
    requestAnimationFrame(animateTrail);
  }

  // Breathe fire on mouse cursor when irritated
  breatheFire() {
    const fireInterval = setInterval(() => {
      if (!this.isIrritated) {
        clearInterval(fireInterval);
        return;
      }
      
      // Create fire particles toward mouse
      for (let i = 0; i < 5; i++) {
        const fireParticle = document.createElement('div');
        fireParticle.className = 'fire-particle';
        
        const rect = this.bat.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        
        fireParticle.style.left = `${startX}px`;
        fireParticle.style.top = `${startY}px`;
        
        document.body.appendChild(fireParticle);
        
        // Get mouse position
        const endX = this.targetX + 128;
        const endY = this.targetY + 128;
        
        let x = startX;
        let y = startY;
        let opacity = 1;
        
        const animateFire = () => {
          const dx = endX - startX;
          const dy = endY - startY;
          x += dx * 0.1;
          y += dy * 0.1;
          opacity -= 0.08;
          
          fireParticle.style.left = `${x}px`;
          fireParticle.style.top = `${y}px`;
          fireParticle.style.opacity = opacity;
          
          if (opacity > 0) {
            requestAnimationFrame(animateFire);
          } else {
            fireParticle.remove();
          }
        };
        
        requestAnimationFrame(animateFire);
      }
    }, 100);
    
    // Stop being irritated after 3 seconds
    setTimeout(() => {
      this.isIrritated = false;
      this.annoyanceLevel = 0;
      clearInterval(fireInterval);
    }, 3000);
  }

  // Go to sleep
  goToSleep() {
    this.isSleeping = true;
    this.bat.classList.add('sleeping');
    
    // Sleep for 5-10 seconds
    setTimeout(() => {
      if (this.isSleeping) {
        this.wakeUp();
      }
    }, Math.random() * 5000 + 5000);
  }

  // Start mouse following
  startMouseFollowing() {
    document.addEventListener('mousemove', (e) => {
      if (!this.isSleeping) {
        // Calculate distance from mouse
        const mouseDistance = 30; // Keep bat 30px away from cursor
        
        // Calculate angle from mouse to bat
        const dx = this.currentX - e.clientX;
        const dy = this.currentY - e.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        // Calculate target position at distance from mouse
        if (distance < mouseDistance) {
          // If too close, move away
          this.targetX = e.clientX + Math.cos(angle) * mouseDistance;
          this.targetY = e.clientY + Math.sin(angle) * mouseDistance;
        } else {
          // If at good distance, follow loosely
          this.targetX = e.clientX + Math.cos(angle) * mouseDistance;
          this.targetY = e.clientY + Math.sin(angle) * mouseDistance;
        }
        
        // Calculate rotation based on movement direction
        const deltaX = this.targetX - this.currentX;
        const deltaY = this.targetY - this.currentY;
        const moveAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        
        // Apply slight rotation
        this.bat.style.transform = `scale(4) rotate(${moveAngle * 0.05}deg)`;
      }
    });
    
    // Smooth animation loop for following mouse
    const animate = () => {
      if (!this.isSleeping) {
        // Smooth interpolation (slower for distant following)
        this.currentX += (this.targetX - this.currentX) * 0.12;
        this.currentY += (this.targetY - this.currentY) * 0.12;
        
        // Add slight wobble for flying effect
        const wobble = Math.sin(Date.now() / 200) * 5;
        
        this.bat.style.left = `${this.currentX + wobble}px`;
        this.bat.style.top = `${this.currentY + wobble}px`;
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }

  // Start background toggle
  startBackgroundToggle() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'KeyT') {
        this.toggleBackground();
      }
    });
    
    // Also add double click on background to toggle
    document.addEventListener('dblclick', (e) => {
      if (e.target.classList.contains('container')) {
        this.toggleBackground();
      }
    });
  }

  // Start keyboard shortcuts for gestures
  startKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (this.isSleeping) this.wakeUp();
      
      switch(e.code) {
        case 'KeyH':
          this.performGesture('hello');
          break;
        case 'KeyB':
          this.performGesture('backflip');
          break;
        case 'KeyD':
          this.performGesture('dragonFly');
          break;
      }
    });
  }

  // Start annoyance tracking (decreases over time)
  startAnnoyanceTracking() {
    setInterval(() => {
      if (this.annoyanceLevel > 0) {
        this.annoyanceLevel = Math.max(0, this.annoyanceLevel - 1);
      }
    }, 2000);
  }

  // Toggle background and bat color
  toggleBackground() {
    this.isDarkBackground = !this.isDarkBackground;
    const container = document.querySelector('.container');
    
    if (this.isDarkBackground) {
      // Dark background, white bat
      container.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
      this.bat.style.filter = 'none';
    } else {
      // Light background, dark bat
      container.style.background = 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 50%, #d0d0d0 100%)';
      this.bat.style.filter = 'invert(1)';
    }
    
    // Play sound on toggle
    this.playChirpSound();
  }

  // Create particle effect on click
  createClickParticles() {
    const rect = this.bat.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      
      const angle = (i / 8) * Math.PI * 2;
      const velocity = 30 + Math.random() * 20;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      document.body.appendChild(particle);
      
      let x = centerX;
      let y = centerY;
      let opacity = 1;
      
      const animateParticle = () => {
        x += vx * 0.1;
        y += vy * 0.1;
        opacity -= 0.05;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
          requestAnimationFrame(animateParticle);
        } else {
          particle.remove();
        }
      };
      
      requestAnimationFrame(animateParticle);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const batPet = new BatPet();
});
