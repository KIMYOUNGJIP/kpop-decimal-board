(function () {
  window.EDUGAME = window.EDUGAME || {};

  const DATA = window.EDUGAME_DATA || { meta: { title: "에듀게임" }, player: {}, stations: [] };
  const AUDIO = window.EDUGAME.audio;
  const MINIGAMES = window.EDUGAME.minigames;
  const SAVE_KEY = `edugame_save_${(DATA.meta && DATA.meta.id) || "default"}`;

  let state = loadState();
  let currentStation = null;
  let currentStep = "story"; // "story" | "game" | "quiz"
  let storyIdx = 0;
  let quizIdx = 0;
  let quizAnswered = false;
  let typeTimer = null;

  function defaultState() {
    return {
      coins: (DATA.player && DATA.player.startCoins) || 50,
      score: 0,
      cleared: [],
      ownedItems: [],
      quizLog: [],
      boardPos: 0
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) return Object.assign(defaultState(), JSON.parse(raw));
    } catch (_) {}
    return defaultState();
  }

  function saveState() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (_) {}
    updateHUD();
  }

  // --- 맞춤형 K-POP SVG 일러스트 생성기 ---
  function getTitleArtSVG() {
    return `
      <svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beamL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FFE066" stop-opacity="0.75"/>
            <stop offset="100%" stop-color="#FFE066" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="beamR" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FF7EB6" stop-opacity="0.75"/>
            <stop offset="100%" stop-color="#FF7EB6" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <!-- 별 & 음표 -->
        <circle cx="90" cy="50" r="4" fill="#FFF3B0"/>
        <circle cx="710" cy="60" r="5" fill="#FFF3B0"/>
        <circle cx="170" cy="90" r="3" fill="#BAE6FD"/>
        <circle cx="640" cy="95" r="3" fill="#FBCFE8"/>
        <text x="120" y="130" font-size="32" fill="#FFD45C">♪</text>
        <text x="660" y="135" font-size="34" fill="#FF9CEE">♫</text>
        <!-- 스포트라이트 빔 -->
        <polygon points="160,10 380,270 250,270" fill="url(#beamL)"/>
        <polygon points="640,10 550,270 420,270" fill="url(#beamR)"/>
        <!-- 메인 무대 배경 스크린 -->
        <rect x="210" y="40" width="380" height="200" rx="22" fill="#1E1B4B" stroke="#FFD45C" stroke-width="6"/>
        <rect x="228" y="58" width="344" height="164" rx="14" fill="#312E81"/>
        <!-- 스크린 속 하트 & 0.3 x 4 -->
        <path d="M400 175 C355 140 335 110 360 90 C380 75 400 95 400 105 C400 95 420 75 440 90 C465 110 445 140 400 175 Z" fill="#FF5C8D"/>
        <text x="400" y="205" text-anchor="middle" fill="#FFE066" font-family="Jua, sans-serif" font-size="22">★ 5학년 소수의 곱셈 투어 ★</text>
        <!-- 무대 바닥 -->
        <rect x="90" y="240" width="620" height="45" rx="14" fill="#2C7BE5" stroke="#fff" stroke-width="4"/>
        <rect x="120" y="285" width="560" height="35" rx="10" fill="#173A63"/>
        <!-- 스피커 -->
        <rect x="115" y="155" width="70" height="90" rx="12" fill="#1F2D4A" stroke="#94A3B8" stroke-width="3"/>
        <circle cx="150" cy="182" r="14" fill="#334155" stroke="#FFD45C" stroke-width="3"/>
        <circle cx="150" cy="220" r="18" fill="#334155" stroke="#38BDF8" stroke-width="3"/>
        <rect x="615" y="155" width="70" height="90" rx="12" fill="#1F2D4A" stroke="#94A3B8" stroke-width="3"/>
        <circle cx="650" cy="182" r="14" fill="#334155" stroke="#FFD45C" stroke-width="3"/>
        <circle cx="650" cy="220" r="18" fill="#334155" stroke="#38BDF8" stroke-width="3"/>
        <!-- 중앙 귀여운 아이돌 캐릭터 3명 -->
        <g transform="translate(310,165)">
          <circle cx="0" cy="15" r="24" fill="#FFE0BD"/>
          <path d="M-24 12 C-24 -12 24 -12 24 12 L26 26 L18 26 L18 10 L-18 10 L-18 26 L-26 26 Z" fill="#4C1D95"/>
          <circle cx="-8" cy="16" r="3" fill="#1E293B"/>
          <circle cx="8" cy="16" r="3" fill="#1E293B"/>
          <path d="M-5 24 Q0 29 5 24" stroke="#E11D48" stroke-width="2.5" fill="none"/>
          <rect x="-18" y="39" width="36" height="36" rx="10" fill="#FF5C8D"/>
        </g>
        <g transform="translate(400,150)">
          <circle cx="0" cy="15" r="27" fill="#FFE0BD"/>
          <path d="M-28 12 C-28 -16 28 -16 28 12 L28 20 L-28 20 Z" fill="#F59E0B"/>
          <circle cx="-9" cy="17" r="3.2" fill="#1E293B"/>
          <circle cx="9" cy="17" r="3.2" fill="#1E293B"/>
          <path d="M-6 26 Q0 31 6 26" stroke="#E11D48" stroke-width="2.5" fill="none"/>
          <rect x="-20" y="42" width="40" height="44" rx="12" fill="#38BDF8"/>
          <circle cx="30" cy="36" r="7" fill="#FFE066"/>
          <rect x="28" y="43" width="4" height="16" fill="#fff"/>
        </g>
        <g transform="translate(490,165)">
          <circle cx="0" cy="15" r="24" fill="#FFE0BD"/>
          <path d="M-24 12 C-24 -12 24 -12 24 12 L24 22 L-24 22 Z" fill="#EC4899"/>
          <circle cx="-8" cy="16" r="3" fill="#1E293B"/>
          <circle cx="8" cy="16" r="3" fill="#1E293B"/>
          <path d="M-5 24 Q0 29 5 24" stroke="#E11D48" stroke-width="2.5" fill="none"/>
          <rect x="-18" y="39" width="36" height="36" rx="10" fill="#A855F7"/>
        </g>
        <!-- 관객석 응원봉 -->
        <g fill="#FFE066">
          <circle cx="160" cy="325" r="8"/><circle cx="220" cy="332" r="8"/>
          <circle cx="290" cy="322" r="8"/><circle cx="510" cy="322" r="8"/>
          <circle cx="580" cy="332" r="8"/><circle cx="640" cy="325" r="8"/>
        </g>
      </svg>`;
  }

  function getPortraitSVG(idx) {
    const palettes = [
      { bg: "#FFE4E6", hair: "#4C1D95", top: "#FF5C8D", acc: "🥤" },
      { bg: "#FEF3C7", hair: "#D97706", top: "#F43F5E", acc: "💖" },
      { bg: "#DBEAFE", hair: "#1E293B", top: "#2563EB", acc: "📸" },
      { bg: "#EDE9FE", hair: "#7C3AED", top: "#10B981", acc: "🔍" },
      { bg: "#FCE7F3", hair: "#DB2777", top: "#F59E0B", acc: "🎀" },
      { bg: "#DCFCE7", hair: "#0F172A", top: "#8B5CF6", acc: "🌟" }
    ];
    const p = palettes[idx % palettes.length];
    return `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" fill="${p.bg}"/>
        <rect x="26" y="76" width="68" height="44" rx="20" fill="${p.top}"/>
        <circle cx="60" cy="52" r="28" fill="#FFE0BD"/>
        <path d="M30 50 C30 16 90 16 90 50 L92 64 L82 64 L82 44 L38 44 L38 64 L28 64 Z" fill="${p.hair}"/>
        <circle cx="49" cy="54" r="3.8" fill="#1E293B"/>
        <circle cx="71" cy="54" r="3.8" fill="#1E293B"/>
        <circle cx="42" cy="61" r="4.5" fill="#FDA4AF" opacity="0.7"/>
        <circle cx="78" cy="61" r="4.5" fill="#FDA4AF" opacity="0.7"/>
        <path d="M53 65 Q60 72 67 65" stroke="#E11D48" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- 헤드셋 마이크 -->
        <path d="M30 52 Q26 70 46 72" stroke="#334155" stroke-width="3.5" fill="none"/>
        <circle cx="47" cy="72" r="4" fill="#1E293B"/>
        <text x="90" y="34" font-size="22">${p.acc}</text>
      </svg>`;
  }

  function getStationSceneSVG(idx) {
    const themes = [
      { sky: "#FFF1F2", floor: "#FECDD3", title: "1구역 대기실: 0.3 L 음료 & 0.25 m 리본", emoji: "🥤🎀☁️", eq: "0.3 × 4 = 1.2 L" },
      { sky: "#FEF3C7", floor: "#FDE68A", title: "2구역 소품실: 0.6배 현수막 & 1.25배 하트", emoji: "🎏💖✨", eq: "8 × 0.6 = 4.8 m" },
      { sky: "#E0F2FE", floor: "#BAE6FD", title: "3구역 포토존: 가로 1.2 m × 세로 0.4 m", emoji: "📸🎭🧶", eq: "1.2 × 0.4 = 0.48 m²" },
      { sky: "#EDE9FE", floor: "#DDD6FE", title: "4구역 점검실: 소수점 위치 & 10배·100배", emoji: "🔍⭐📊", eq: "0.08 × 0.7 = 0.056" },
      { sky: "#FFEDD5", floor: "#FED7AA", title: "5구역 백스테이지: 6.4 L 음료 & 10 m 리본", emoji: "🧃🚩🔥", eq: "2.7 + 0.75 × 9 = 9.45" },
      { sky: "#DCFCE7", floor: "#BBF7D0", title: "6구역 파이널 앵콜: 가장 넓은 포스터", emoji: "🌟🎆🎤", eq: "3.2 × 0.6 = 1.92 m²" }
    ];
    const t = themes[idx % themes.length];
    return `
      <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="250" fill="${t.sky}"/>
        <rect y="250" width="640" height="110" fill="${t.floor}"/>
        <line x1="0" y1="250" x2="640" y2="250" stroke="#fff" stroke-width="5"/>
        <!-- 무대 조명 기둥 -->
        <rect x="40" y="30" width="24" height="220" rx="8" fill="#1E293B" opacity="0.15"/>
        <rect x="576" y="30" width="24" height="220" rx="8" fill="#1E293B" opacity="0.15"/>
        <!-- 중앙 칠판/모니터 카드 -->
        <rect x="130" y="55" width="380" height="165" rx="22" fill="#fff" stroke="#173A63" stroke-width="5"/>
        <text x="320" y="105" text-anchor="middle" font-size="44">${t.emoji}</text>
        <text x="320" y="152" text-anchor="middle" font-family="Jua, sans-serif" font-size="22" fill="#173A63">${t.title}</text>
        <rect x="195" y="168" width="250" height="36" rx="18" fill="#FFF1D6" stroke="#FFC531" stroke-width="3"/>
        <text x="320" y="193" text-anchor="middle" font-family="Jua, sans-serif" font-size="20" fill="#D9650A">${t.eq}</text>
      </svg>`;
  }

  // --- 화면 전환 & HUD ---
  function showScreen(id) {
    ["title-screen", "board-screen", "chapter-screen"].forEach((s) => {
      document.getElementById(s).classList.toggle("hidden", s !== id);
    });
  }

  function updateHUD() {
    const stations = DATA.stations || [];
    document.getElementById("hud-title").textContent = `🎤 ${(DATA.meta && DATA.meta.title) || "에듀게임"}`;
    document.getElementById("hud-progress").textContent = `🚩 완료 ${state.cleared.length} / ${stations.length}`;
    document.getElementById("hud-coins").textContent = `🪙 ${state.coins}`;
    document.getElementById("hud-score").textContent = `⭐ ${state.score}점`;
    const contBtn = document.getElementById("btn-start-cont");
    if (contBtn) contBtn.classList.toggle("hidden", state.cleared.length === 0 && state.score === 0);
  }

  function hasItem(id) {
    return (state.ownedItems || []).includes(id);
  }

  function renderBoard() {
    const grid = document.getElementById("board-grid");
    grid.innerHTML = "";
    const stations = DATA.stations || [];

    if (DATA.meta && DATA.meta.boardBg) {
      grid.className = "board-map-wrap";
      const frame = document.createElement("div");
      frame.className = "board-map-frame";
      const bg = document.createElement("img");
      bg.className = "board-bg-img";
      bg.src = DATA.meta.boardBg;
      bg.alt = "콘서트 투어 보드판";
      frame.appendChild(bg);

      stations.forEach((st, idx) => {
        const pin = st.boardPin || { x: 20 + (idx % 3) * 30, y: idx < 3 ? 28 : 72 };
        const btn = document.createElement("button");
        btn.type = "button";
        const isCleared = state.cleared.includes(st.id);
        const unlockedIdx = Math.min(state.cleared.length, stations.length - 1);
        const isCurrent = idx === unlockedIdx && !isCleared;
        const isLocked = idx > state.cleared.length && !hasItem("item_vip");
        btn.className = "map-pin-btn" + (isCurrent ? " active" : "") + (isCleared ? " cleared" : "");
        if (isLocked) btn.style.opacity = "0.62";
        btn.style.left = `${pin.x}%`;
        btn.style.top = `${pin.y}%`;
        const avatar = st.npcPortrait ? `<img src="${st.npcPortrait}" alt="${st.npcName}" />` : "";
        const statusIcon = isCleared ? "✅" : isCurrent ? "📍 도전" : "🔒";
        btn.innerHTML = `
          ${avatar}
          <div class="map-pin-info">
            <div class="map-pin-num">${idx + 1}구역 ${statusIcon}</div>
            <div class="map-pin-title">${st.title.replace(/^\d+구역:\s*/, "")}</div>
          </div>
        `;
        btn.onclick = () => {
          if (isLocked) {
            AUDIO.wrong();
            document.getElementById("board-status").textContent = `🔒 ${idx}구역을 먼저 완료해야 ${idx + 1}구역에 입장할 수 있어요!`;
            return;
          }
          AUDIO.click();
          state.boardPos = idx;
          saveState();
          openChapter(st, idx);
        };
        frame.appendChild(btn);
      });
      grid.appendChild(frame);
      return;
    }

    grid.className = "board-grid";
    stations.forEach((st, idx) => {
      const card = document.createElement("button");
      card.type = "button";
      const isCleared = state.cleared.includes(st.id);
      const isActive = idx === state.boardPos;
      card.className = "station-card" + (isActive ? " active" : "") + (isCleared ? " cleared" : "");
      const avatar = st.npcPortrait
        ? `<img src="${st.npcPortrait}" alt="${st.npcName}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.15);flex:none;" />`
        : `<span style="font-size:1.6rem;">${st.npcEmoji || "🎤"}</span>`;
      card.innerHTML = `
        ${isActive ? '<span class="st-player-pin">📍 현재 위치</span>' : ""}
        <div class="st-top">
          <span class="st-num">${idx + 1}구역</span>
          <span>${isCleared ? "✅ 완료" : "🚩 도전"}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          ${avatar}
          <div class="st-title">${st.title.replace(/^\d+구역:\s*/, "")}</div>
        </div>
        <div class="st-sub">파트너: ${st.npcName} · 보상 🪙${st.rewardCoins || 40}</div>
      `;
      card.onclick = () => {
        AUDIO.click();
        state.boardPos = idx;
        saveState();
        openChapter(st, idx);
      };
      grid.appendChild(card);
    });
  }

  // --- 장(Chapter) 플레이 플로우: 이야기 -> 게임 -> 문제 ---
  function setStepBadges(step) {
    const order = ["story", "game", "quiz"];
    const curIdx = order.indexOf(step);
    document.querySelectorAll("#steps span").forEach((el) => {
      const sIdx = order.indexOf(el.dataset.step);
      el.classList.toggle("on", sIdx === curIdx);
      el.classList.toggle("done", sIdx < curIdx);
    });
  }

  function typeText(el, text) {
    clearInterval(typeTimer);
    let i = 0;
    el.textContent = "";
    typeTimer = setInterval(() => {
      i += 2;
      el.textContent = text.slice(0, i);
      if (i >= text.length) clearInterval(typeTimer);
    }, 18);
  }

  function openChapter(station, idx) {
    currentStation = station;
    currentStep = "story";
    storyIdx = 0;
    quizIdx = 0;
    document.getElementById("cno").textContent = `${idx + 1}구역`;
    document.getElementById("cname").textContent = station.title.replace(/^\d+구역:\s*/, "");
    document.getElementById("tport").innerHTML = station.npcPortrait
      ? `<img src="${station.npcPortrait}" alt="${station.npcName}" style="width:100%;height:100%;object-fit:cover;display:block;" />`
      : getPortraitSVG(idx);
    document.getElementById("tname").textContent = station.npcName || "안내자";

    const tbg = document.getElementById("tbg");
    if (station.sceneBg) {
      tbg.style.backgroundImage = `url(${station.sceneBg})`;
      tbg.style.backgroundSize = "cover";
      tbg.style.backgroundPosition = "center";
      document.getElementById("scene-art").innerHTML = `
        <div style="position:relative;width:100%;height:100%;">
          <img src="${station.sceneBg}" alt="${station.title}" style="width:100%;height:100%;object-fit:cover;display:block;" />
          ${station.npcPortrait ? `<img class="scene-cast" src="${station.npcPortrait}" alt="${station.npcName}" style="position:absolute;right:6%;bottom:4%;height:68%;aspect-ratio:1/1;border-radius:24px;border:5px solid #fff;box-shadow:0 12px 26px rgba(0,0,0,.35);object-fit:cover;" />` : ""}
        </div>`;
    } else {
      tbg.style.backgroundImage = "";
      document.getElementById("scene-art").innerHTML = getStationSceneSVG(idx);
    }
    showScreen("chapter-screen");
    renderChapterStep();
  }

  function renderChapterStep() {
    const frame = document.getElementById("scene-frame");
    const mgStage = document.getElementById("minigame-stage");
    const tcard = document.getElementById("tcard");
    const ttext = document.getElementById("ttext");
    const tchoices = document.getElementById("tchoices");
    const tfeedback = document.getElementById("tfeedback");
    const prevBtn = document.getElementById("btn-ch-prev");
    const nextBtn = document.getElementById("btn-ch-next");

    setStepBadges(currentStep);
    tchoices.innerHTML = "";
    tfeedback.classList.add("hidden");
    tfeedback.className = "feedback-pill hidden";

    if (currentStep === "story") {
      frame.classList.remove("hidden");
      mgStage.classList.add("hidden");
      const lines = currentStation.dialogues || [];
      typeText(ttext, lines[storyIdx] || "");

      if (storyIdx === lines.length - 1 && currentStation.conceptCard) {
        const cc = currentStation.conceptCard;
        tcard.innerHTML = `<strong>📌 ${cc.title}</strong>${(cc.points || []).map((p) => `<div>• ${p}</div>`).join("")}`;
        tcard.classList.remove("hidden");
      } else {
        tcard.classList.add("hidden");
      }

      prevBtn.classList.toggle("hidden", storyIdx === 0);
      nextBtn.classList.remove("hidden");
      nextBtn.textContent = storyIdx === lines.length - 1 ? "미니게임 시작 ▶" : "다음 ▶ (Space)";
      return;
    }

    if (currentStep === "game") {
      frame.classList.add("hidden");
      mgStage.classList.remove("hidden");
      tcard.classList.add("hidden");
      prevBtn.classList.add("hidden");
      nextBtn.classList.add("hidden");

      typeText(ttext, `🎮 ${currentStation.minigame.title} — ${currentStation.minigame.instruction}`);
      MINIGAMES.render(currentStation.minigame, mgStage, (mgScore) => {
        state.score += Math.round(mgScore / 2);
        saveState();
        currentStep = "quiz";
        quizIdx = 0;
        renderChapterStep();
      });
      return;
    }

    if (currentStep === "quiz") {
      frame.classList.remove("hidden");
      mgStage.classList.add("hidden");
      tcard.classList.add("hidden");
      prevBtn.classList.add("hidden");

      const quizzes = currentStation.quizzes || [];
      const q = quizzes[quizIdx];
      quizAnswered = false;
      clearInterval(typeTimer);
      ttext.textContent = `[문제 ${quizIdx + 1}/${quizzes.length}] ${q.question}`;
      nextBtn.classList.add("hidden");

      const keys = ["A", "B", "C", "D"];
      tchoices.className = (q.choices || []).length === 2 ? "two" : "";

      if (hasItem("item_mic") && (q.choices || []).length > 2) {
        const hintBtn = document.createElement("button");
        hintBtn.type = "button";
        hintBtn.className = "pillbtn";
        hintBtn.style.alignSelf = "flex-start";
        hintBtn.textContent = "🎤 골드 마이크 찬스 (오답 1개 지우기)";
        hintBtn.onclick = () => {
          if (quizAnswered) return;
          AUDIO.click();
          const wrongBtns = Array.from(tchoices.querySelectorAll(".tch")).filter((_, i) => i !== q.answer);
          if (wrongBtns.length) {
            const pick = wrongBtns[Math.floor(Math.random() * wrongBtns.length)];
            pick.disabled = true;
            pick.style.opacity = "0.35";
            pick.style.textDecoration = "line-through";
          }
          hintBtn.disabled = true;
          hintBtn.textContent = "🎤 오답 1개를 지웠어요!";
        };
        tchoices.appendChild(hintBtn);
      }

      (q.choices || []).forEach((ch, cIdx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "tch";
        btn.innerHTML = `<span class="k">${keys[cIdx] || cIdx + 1}</span><span>${ch}</span>`;
        btn.onclick = () => {
          if (quizAnswered) return;
          quizAnswered = true;
          tchoices.querySelectorAll("button").forEach((b) => (b.disabled = true));
          const isOk = cIdx === q.answer;
          btn.classList.add(isOk ? "right" : "wrong");
          const choiceBtns = Array.from(tchoices.querySelectorAll(".tch"));
          if (!isOk && choiceBtns[q.answer]) {
            choiceBtns[q.answer].classList.add("right");
          }
          tfeedback.classList.remove("hidden");
          tfeedback.classList.add(isOk ? "ok" : "bad");
          let bonusMsg = "";
          if (isOk) {
            AUDIO.correct();
            cheerIdol();
            const bonus = hasItem("item_lightstick") ? 20 : 0;
            state.score += 50 + bonus;
            if (bonus) bonusMsg = " (🪄 응원봉 보너스 +20점!)";
          } else {
            AUDIO.wrong();
          }
          tfeedback.textContent = `${isOk ? "정답입니다! " : "아쉬워요! "}${q.explanation || ""}${bonusMsg}`;
          state.quizLog.push({ station: currentStation.title, correct: isOk });
          saveState();

          nextBtn.classList.remove("hidden");
          nextBtn.textContent = quizIdx + 1 < quizzes.length ? "다음 문제 ▶" : "구역 완료하기 🎉";
        };
        tchoices.appendChild(btn);
      });
    }
  }

  function launchConfetti(count) {
    const layer = document.createElement("div");
    layer.className = "confetti-layer";
    const colors = ["#FF5C8D", "#FFC531", "#2C7BE5", "#22A06B", "#A855F7", "#FF8A1F"];
    for (let i = 0; i < (count || 24); i++) {
      const p = document.createElement("div");
      p.className = "confetti-piece";
      p.style.left = `${Math.random() * 100}%`;
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = `${Math.random() * 0.35}s`;
      p.style.animationDuration = `${1.1 + Math.random() * 0.7}s`;
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 2200);
  }

  function cheerIdol() {
    launchConfetti(22);
    ["#tport", ".scene-cast"].forEach((sel) => {
      const el = document.querySelector(sel);
      if (!el) return;
      el.classList.remove("celebrate-jump");
      void el.offsetWidth;
      el.classList.add("celebrate-jump");
    });
  }

  function handleChapterNext() {
    AUDIO.click();
    if (currentStep === "story") {
      const lines = currentStation.dialogues || [];
      if (storyIdx + 1 < lines.length) {
        storyIdx++;
        renderChapterStep();
      } else {
        currentStep = "game";
        renderChapterStep();
      }
      return;
    }
    if (currentStep === "quiz" && quizAnswered) {
      const quizzes = currentStation.quizzes || [];
      if (quizIdx + 1 < quizzes.length) {
        quizIdx++;
        renderChapterStep();
      } else {
        finishStation();
      }
    }
  }

  function finishStation() {
    const baseReward = currentStation.rewardCoins || 40;
    const ribbonBonus = hasItem("item_ribbon") ? 15 : 0;
    const totalReward = baseReward + ribbonBonus;
    if (!state.cleared.includes(currentStation.id)) {
      state.cleared.push(currentStation.id);
      state.coins += totalReward;
    }
    saveState();
    if (AUDIO.fanfare) AUDIO.fanfare();
    else AUDIO.reward();
    launchConfetti(42);
    const allDone = state.cleared.length === (DATA.stations || []).length;
    openModal(allDone ? "🌟 콘서트 준비 완벽 성공!" : "🎉 구역 미션 완료!", (body) => {
      const portraitHtml = currentStation.npcPortrait
        ? `<img src="${currentStation.npcPortrait}" alt="${currentStation.npcName}" />`
        : `<div style="font-size:4rem;">${currentStation.npcEmoji || "🎤"}</div>`;
      body.innerHTML = `
        <div class="celebrate-hero">
          ${portraitHtml}
          <div class="stars-row">⭐ ⭐ ⭐</div>
          <div style="font-family:var(--display);font-size:1.22rem;color:var(--navy);">
            ${currentStation.npcName}: "최고야! ${currentStation.title} 완벽하게 해결했어!"
          </div>
          <div style="font-weight:700;color:var(--meok);">
            획득 코인: 🪙 +${totalReward}${ribbonBonus ? " (🎀 리본 보너스 +15)" : ""} · 누적 점수: ⭐ ${state.score}점
          </div>
        </div>
        ${allDone ? '<div class="feedback-box ok">🎊 6개 구역을 모두 완료해 K-POP 앵콜 무대가 열렸습니다!</div>' : ""}
      `;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn green";
      btn.textContent = "보드판으로 돌아가기";
      btn.onclick = () => {
        closeModal();
        showScreen("board-screen");
        renderBoard();
      };
      body.appendChild(btn);
    });
  }

  function openModal(title, renderFn) {
    document.getElementById("modal-title").textContent = title;
    const body = document.getElementById("modal-body");
    body.innerHTML = "";
    renderFn(body);
    document.getElementById("modal-backdrop").classList.remove("hidden");
  }

  function closeModal() {
    document.getElementById("modal-backdrop").classList.add("hidden");
  }

  function rollDice() {
    const stations = DATA.stations || [];
    if (!stations.length) return;
    const nextIdx = Math.min(state.cleared.length, stations.length - 1);
    AUDIO.click();
    state.boardPos = nextIdx;
    saveState();
    openChapter(stations[nextIdx], nextIdx);
  }

  function bindEvents() {
    const titleArt = document.getElementById("title-art");
    if (DATA.meta && DATA.meta.titleBg) {
      titleArt.innerHTML = `<img src="${DATA.meta.titleBg}" alt="무대 일러스트" style="height:100%;max-height:360px;width:auto;max-width:100%;border-radius:24px;border:5px solid #fff;box-shadow:0 14px 32px rgba(0,0,0,.38);object-fit:cover;" />`;
    } else {
      titleArt.innerHTML = getTitleArtSVG();
    }
    document.getElementById("btn-start-new").onclick = () => {
      AUDIO.click();
      state = defaultState();
      saveState();
      showScreen("board-screen");
      renderBoard();
    };
    document.getElementById("btn-start-cont").onclick = () => {
      AUDIO.click();
      showScreen("board-screen");
      renderBoard();
    };
    document.getElementById("btn-roll-dice").onclick = rollDice;
    document.getElementById("btn-back-board").onclick = () => {
      AUDIO.click();
      showScreen("board-screen");
      renderBoard();
    };
    document.getElementById("btn-ch-prev").onclick = () => {
      if (currentStep === "story" && storyIdx > 0) {
        AUDIO.click();
        storyIdx--;
        renderChapterStep();
      }
    };
    document.getElementById("btn-ch-next").onclick = handleChapterNext;
    document.getElementById("modal-close").onclick = closeModal;

    const toggleMute = () => {
      const m = AUDIO.toggleMute();
      ["btn-sound", "btn-sound-ch"].forEach((id) => {
        const b = document.getElementById(id);
        b.textContent = m ? "🔇" : "🔊";
        b.classList.toggle("mute", m);
      });
    };
    document.getElementById("btn-sound").onclick = toggleMute;
    document.getElementById("btn-sound-ch").onclick = toggleMute;

    document.getElementById("btn-codex").onclick = () => {
      openModal("📖 소수의 곱셈 핵심 도감", (body) => {
        (DATA.stations || []).forEach((s) => {
          const unlocked = state.cleared.includes(s.id);
          const div = document.createElement("div");
          div.className = "feedback-box " + (unlocked ? "ok" : "");
          if (!unlocked) div.style.background = "#F1F5F9";
          div.textContent = unlocked
            ? `✅ ${s.codexUnlock.title}: ${s.codexUnlock.summary}`
            : `🔒 ${s.title} (완료 시 해금)`;
          body.appendChild(div);
        });
      });
    };

    document.getElementById("btn-shop").onclick = () => {
      openModal("🛒 콘서트 소품 상점", (body) => {
        (DATA.items || []).forEach((item) => {
          const owned = state.ownedItems.includes(item.id);
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "choice-btn";
          btn.textContent = `${item.icon} ${item.name} (${item.price}코인) — ${owned ? "✅ 보유중" : item.desc}`;
          btn.disabled = owned || state.coins < item.price;
          btn.onclick = () => {
            state.coins -= item.price;
            state.ownedItems.push(item.id);
            AUDIO.reward();
            saveState();
            closeModal();
            renderBoard();
          };
          body.appendChild(btn);
        });
      });
    };

    document.getElementById("btn-report").onclick = () => {
      openModal("📊 교사 확인용 성취도 리포트", (body) => {
        const totalQ = state.quizLog.length;
        const okQ = state.quizLog.filter((x) => x.correct).length;
        body.innerHTML = `
          <p><strong>완료 구역:</strong> ${state.cleared.length} / ${(DATA.stations || []).length}</p>
          <p><strong>확인 퀴즈 정답률:</strong> ${totalQ ? Math.round((okQ / totalQ) * 100) : 0}% (${okQ}/${totalQ})</p>
          <p><strong>누적 점수:</strong> ⭐ ${state.score}점 | <strong>보유 코인:</strong> 🪙 ${state.coins}</p>
        `;
      });
    };

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        const modalOpen = !document.getElementById("modal-backdrop").classList.contains("hidden");
        if (modalOpen) return;
        const inBoard = !document.getElementById("board-screen").classList.contains("hidden");
        const inChapter = !document.getElementById("chapter-screen").classList.contains("hidden");
        if (inBoard) {
          e.preventDefault();
          rollDice();
        } else if (inChapter && (currentStep === "story" || (currentStep === "quiz" && quizAnswered))) {
          e.preventDefault();
          handleChapterNext();
        }
      }
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    updateHUD();
    showScreen("title-screen");
  });
})();
