(function () {
  window.EDUGAME = window.EDUGAME || {};

  let ctx = null;
  let muted = false;

  function ensureContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        ctx = new AudioCtx();
      }
    }
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  // 크롬북/태블릿 첫 터치·클릭·키입력 시 오디오 잠금 자동 해제
  ["pointerdown", "keydown", "touchstart"].forEach((evt) => {
    window.addEventListener(evt, ensureContext, { once: true, passive: true });
  });

  function playTone(freq, duration, type, gainVal) {
    if (muted) return;
    const c = ensureContext();
    if (!c) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, c.currentTime);
    gain.gain.setValueAtTime(gainVal || 0.12, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + duration);
  }

  window.EDUGAME.audio = {
    unlock: ensureContext,
    isMuted: () => muted,
    toggleMute: () => {
      muted = !muted;
      return muted;
    },
    click: () => playTone(520, 0.06, "triangle", 0.08),
    step: () => playTone(220, 0.04, "sine", 0.04),
    correct: () => {
      playTone(523.25, 0.1, "triangle", 0.12);
      setTimeout(() => playTone(659.25, 0.12, "triangle", 0.12), 80);
      setTimeout(() => playTone(783.99, 0.18, "triangle", 0.14), 160);
    },
    wrong: () => {
      playTone(260, 0.14, "sawtooth", 0.08);
      setTimeout(() => playTone(195, 0.2, "sawtooth", 0.08), 110);
    },
    reward: () => {
      playTone(659.25, 0.09, "sine", 0.12);
      setTimeout(() => playTone(987.77, 0.2, "sine", 0.14), 90);
    }
  };
})();
