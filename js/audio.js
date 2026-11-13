(function () {
  window.EDUGAME = window.EDUGAME || {};

  let ctx = null;
  let muted = false;
  let bgmTimer = null;
  let bgmStep = 0;

  // 경쾌한 K-POP 칩튠 BGM 멜로디 (C Major 펜타토닉/팝 진행, 16스텝 루프)
  const MELODY = [
    523.25, 0, 659.25, 783.99, 659.25, 0, 880.0, 783.99,
    698.46, 0, 659.25, 587.33, 523.25, 587.33, 659.25, 0
  ];
  const BASS = [
    130.81, 130.81, 196.0, 196.0, 164.81, 164.81, 220.0, 220.0,
    174.61, 174.61, 130.81, 130.81, 146.83, 146.83, 196.0, 196.0
  ];

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
    if (ctx && !bgmTimer && !muted) {
      startBGM();
    }
    return ctx;
  }

  // 크롬북/태블릿 첫 터치·클릭·키입력 시 오디오 잠금 해제 & BGM 자동 시작
  ["pointerdown", "keydown", "touchstart"].forEach((evt) => {
    window.addEventListener(evt, ensureContext, { once: true, passive: true });
  });

  function playTone(freq, duration, type, gainVal, delay) {
    if (muted || !freq) return;
    const c = ensureContext();
    if (!c) return;
    const startAt = c.currentTime + (delay || 0);
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, startAt);
    gain.gain.setValueAtTime(gainVal || 0.1, startAt);
    gain.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(startAt);
    osc.stop(startAt + duration);
  }

  const HARMONY = [
    329.63, 392.0, 329.63, 392.0, 392.0, 493.88, 392.0, 493.88,
    349.23, 440.0, 349.23, 440.0, 392.0, 493.88, 392.0, 493.88
  ];

  function startBGM() {
    if (bgmTimer || muted) return;
    bgmTimer = setInterval(() => {
      if (muted || !ctx || ctx.state !== "running") return;
      const mel = MELODY[bgmStep % MELODY.length];
      const har = HARMONY[bgmStep % HARMONY.length];
      const bas = BASS[bgmStep % BASS.length];
      if (mel) playTone(mel, 0.18, "triangle", 0.032, 0);
      if (har) playTone(har, 0.16, "sine", 0.018, 0);
      if (bas) playTone(bas, 0.22, "sine", 0.028, 0);
      bgmStep++;
    }, 240);
  }

  function stopBGM() {
    if (bgmTimer) {
      clearInterval(bgmTimer);
      bgmTimer = null;
    }
  }

  window.EDUGAME.audio = {
    unlock: ensureContext,
    isMuted: () => muted,
    toggleMute: () => {
      muted = !muted;
      if (muted) stopBGM();
      else {
        ensureContext();
        startBGM();
      }
      return muted;
    },
    click: () => {
      playTone(587.33, 0.05, "triangle", 0.08, 0);
      playTone(880.0, 0.06, "sine", 0.05, 0.02);
    },
    step: () => playTone(293.66, 0.05, "sine", 0.05, 0),
    correct: () => {
      // 밝은 정답 차임 + 반짝임
      playTone(523.25, 0.12, "triangle", 0.12, 0);
      playTone(659.25, 0.12, "triangle", 0.12, 0.07);
      playTone(783.99, 0.14, "triangle", 0.13, 0.14);
      playTone(1046.5, 0.26, "sine", 0.14, 0.21);
    },
    wrong: () => {
      playTone(261.63, 0.14, "sawtooth", 0.07, 0);
      playTone(196.0, 0.24, "sawtooth", 0.07, 0.11);
    },
    reward: () => {
      playTone(659.25, 0.1, "triangle", 0.12, 0);
      playTone(880.0, 0.1, "triangle", 0.12, 0.08);
      playTone(1174.66, 0.24, "sine", 0.13, 0.16);
    },
    fanfare: () => {
      // 스테이지 클리어 팡파레
      const notes = [
        [523.25, 0, 0.12],
        [659.25, 0.1, 0.12],
        [783.99, 0.2, 0.14],
        [1046.5, 0.32, 0.38],
        [783.99, 0.48, 0.14],
        [1046.5, 0.62, 0.45]
      ];
      notes.forEach(([f, d, dur]) => playTone(f, dur, "triangle", 0.13, d));
      playTone(523.25, 0.45, "sine", 0.08, 0.62);
    }
  };
})();
