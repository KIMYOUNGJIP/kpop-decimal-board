(function () {
  window.EDUGAME = window.EDUGAME || {};

  function shuffle(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderMiniGame(mg, container, onComplete) {
    container.innerHTML = "";
    const audio = window.EDUGAME.audio;
    const type = (mg && mg.type) || "ox_quiz";
    const payload = (mg && mg.payload) || {};

    const intro = el("p", "", (mg && mg.instruction) || "미션을 완료하세요!");
    intro.style.margin = "0";
    intro.style.fontWeight = "600";
    container.appendChild(intro);

    if (type === "matching") {
      const pairs = payload.pairs || [];
      let selectedLeft = null;
      let matched = 0;
      const rightItems = shuffle(pairs.map((p, idx) => ({ idx, text: p.right })));

      const grid = el("div", "");
      grid.style.display = "grid";
      grid.style.gridTemplateColumns = "1fr 1fr";
      grid.style.gap = "10px";

      const leftCol = el("div", "");
      const rightCol = el("div", "");
      leftCol.style.display = "flex";
      leftCol.style.flexDirection = "column";
      leftCol.style.gap = "8px";
      rightCol.style.display = "flex";
      rightCol.style.flexDirection = "column";
      rightCol.style.gap = "8px";

      pairs.forEach((p, idx) => {
        const btn = el("button", "choice-btn", p.left);
        btn.type = "button";
        btn.onclick = () => {
          if (btn.disabled) return;
          audio.click();
          leftCol.querySelectorAll("button").forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
          selectedLeft = { idx, btn };
        };
        leftCol.appendChild(btn);
      });

      rightItems.forEach((item) => {
        const btn = el("button", "choice-btn", item.text);
        btn.type = "button";
        btn.onclick = () => {
          if (btn.disabled || !selectedLeft) return;
          if (selectedLeft.idx === item.idx) {
            audio.correct();
            selectedLeft.btn.classList.remove("selected");
            selectedLeft.btn.classList.add("ok");
            selectedLeft.btn.disabled = true;
            btn.classList.add("ok");
            btn.disabled = true;
            selectedLeft = null;
            matched++;
            if (matched === pairs.length) {
              setTimeout(() => onComplete(100), 350);
            }
          } else {
            audio.wrong();
            btn.classList.add("bad");
            setTimeout(() => btn.classList.remove("bad"), 400);
          }
        };
        rightCol.appendChild(btn);
      });

      grid.append(leftCol, rightCol);
      container.appendChild(grid);
      return;
    }

    if (type === "fill_blank") {
      const blanks = payload.blanks || [];
      const choices = shuffle(blanks.concat(payload.distractors || []));
      const filled = [];
      const sentenceBox = el("div", "feedback-box");
      sentenceBox.style.background = "#f1f5f9";
      sentenceBox.style.fontSize = "1.05rem";

      function updateSentence() {
        let i = 0;
        sentenceBox.textContent = (payload.sentence || "").replace(/\[___\]/g, () => {
          const val = filled[i];
          i++;
          return val ? `[ ${val} ]` : "[ ___ ]";
        });
      }
      updateSentence();

      const btnWrap = el("div", "");
      btnWrap.style.display = "flex";
      btnWrap.style.flexWrap = "wrap";
      btnWrap.style.gap = "8px";

      choices.forEach((word) => {
        const btn = el("button", "btn-secondary", word);
        btn.type = "button";
        btn.onclick = () => {
          if (filled.length >= blanks.length) return;
          audio.click();
          filled.push(word);
          btn.disabled = true;
          updateSentence();
          if (filled.length === blanks.length) {
            const ok = blanks.every((b, idx) => filled[idx] === b);
            if (ok) {
              audio.correct();
              sentenceBox.classList.add("ok");
              setTimeout(() => onComplete(100), 450);
            } else {
              audio.wrong();
              sentenceBox.classList.add("bad");
              setTimeout(() => {
                filled.length = 0;
                sentenceBox.classList.remove("bad");
                btnWrap.querySelectorAll("button").forEach((b) => (b.disabled = false));
                updateSentence();
              }, 700);
            }
          }
        };
        btnWrap.appendChild(btn);
      });
      container.append(sentenceBox, btnWrap);
      return;
    }

    if (type === "timeline") {
      const answer = payload.items || [];
      const current = shuffle(answer);
      const list = el("div", "");
      list.style.display = "flex";
      list.style.flexDirection = "column";
      list.style.gap = "8px";

      function redraw() {
        list.innerHTML = "";
        current.forEach((text, idx) => {
          const row = el("div", "");
          row.style.display = "flex";
          row.style.alignItems = "center";
          row.style.gap = "8px";
          const label = el("div", "choice-btn", `${idx + 1}. ${text}`);
          label.style.flex = "1";
          label.style.padding = "10px 12px";
          label.style.borderRadius = "10px";
          const up = el("button", "btn-secondary", "▲");
          up.type = "button";
          up.disabled = idx === 0;
          up.onclick = () => {
            audio.click();
            [current[idx - 1], current[idx]] = [current[idx], current[idx - 1]];
            redraw();
          };
          const down = el("button", "btn-secondary", "▼");
          down.type = "button";
          down.disabled = idx === current.length - 1;
          down.onclick = () => {
            audio.click();
            [current[idx + 1], current[idx]] = [current[idx], current[idx + 1]];
            redraw();
          };
          row.append(label, up, down);
          list.appendChild(row);
        });
      }
      redraw();

      const submit = el("button", "btn-primary", "순서 확인");
      submit.type = "button";
      submit.onclick = () => {
        const ok = answer.every((v, i) => current[i] === v);
        if (ok) {
          audio.correct();
          onComplete(100);
        } else {
          audio.wrong();
          submit.textContent = "순서가 달라요! 다시 맞춰보세요";
        }
      };
      container.append(list, submit);
      return;
    }

    if (type === "ox_quiz") {
      const qs = payload.questions || [];
      let idx = 0;
      let score = 0;
      const qBox = el("div", "feedback-box");
      qBox.style.background = "#f1f5f9";
      const btnRow = el("div", "");
      btnRow.style.display = "grid";
      btnRow.style.gridTemplateColumns = "1fr 1fr";
      btnRow.style.gap = "12px";

      function showQ() {
        if (idx >= qs.length) {
          onComplete(Math.round((score / Math.max(1, qs.length)) * 100));
          return;
        }
        qBox.textContent = `(${idx + 1}/${qs.length}) ${qs[idx].q}`;
      }

      function answerOX(val) {
        const ok = qs[idx].isO === val;
        if (ok) {
          audio.correct();
          score++;
        } else {
          audio.wrong();
        }
        idx++;
        showQ();
      }

      const oBtn = el("button", "btn-primary", "⭕ O (맞다)");
      const xBtn = el("button", "btn-secondary", "❌ X (아니다)");
      oBtn.type = "button";
      xBtn.type = "button";
      oBtn.onclick = () => answerOX(true);
      xBtn.onclick = () => answerOX(false);
      btnRow.append(oBtn, xBtn);
      container.append(qBox, btnRow);
      showQ();
      return;
    }

    if (type === "classify") {
      const buckets = payload.buckets || ["분류 A", "분류 B"];
      const items = shuffle(payload.items || []);
      let idx = 0;
      const card = el("div", "feedback-box");
      card.style.background = "#eff6ff";
      card.style.textAlign = "center";
      card.style.fontSize = "1.1rem";

      const row = el("div", "");
      row.style.display = "grid";
      row.style.gridTemplateColumns = `repeat(${buckets.length}, 1fr)`;
      row.style.gap = "10px";

      function showItem() {
        if (idx >= items.length) {
          onComplete(100);
          return;
        }
        card.textContent = `(${idx + 1}/${items.length}) "${items[idx].text}"`;
      }

      buckets.forEach((bName, bIdx) => {
        const bBtn = el("button", "btn-primary", bName);
        bBtn.type = "button";
        bBtn.onclick = () => {
          if (items[idx].bucket === bIdx) {
            audio.correct();
            idx++;
            showItem();
          } else {
            audio.wrong();
          }
        };
        row.appendChild(bBtn);
      });
      container.append(card, row);
      showItem();
      return;
    }

    if (type === "word_combine") {
      const answer = payload.answer || "";
      const chars = shuffle(answer.split("").concat(payload.extraChars || []));
      let picked = "";
      const hint = el("div", "feedback-box", `힌트: ${payload.hint || ""}`);
      hint.style.background = "#f1f5f9";
      const out = el("div", "feedback-box", "선택한 글자: ");
      out.style.background = "#eff6ff";
      const pad = el("div", "");
      pad.style.display = "flex";
      pad.style.flexWrap = "wrap";
      pad.style.gap = "8px";

      chars.forEach((ch) => {
        const b = el("button", "btn-secondary", ch);
        b.type = "button";
        b.onclick = () => {
          audio.click();
          picked += ch;
          b.disabled = true;
          out.textContent = `선택한 글자: ${picked}`;
          if (picked.length === answer.length) {
            if (picked === answer) {
              audio.correct();
              setTimeout(() => onComplete(100), 350);
            } else {
              audio.wrong();
              setTimeout(() => {
                picked = "";
                out.textContent = "선택한 글자: ";
                pad.querySelectorAll("button").forEach((x) => (x.disabled = false));
              }, 600);
            }
          }
        };
        pad.appendChild(b);
      });
      container.append(hint, out, pad);
      return;
    }

    if (type === "balance") {
      const box = el("div", "feedback-box", `${payload.prompt || ""}\n기준: [ ${payload.leftLabel || ""} ]`);
      box.style.background = "#f1f5f9";
      const opts = el("div", "");
      opts.style.display = "flex";
      opts.style.flexDirection = "column";
      opts.style.gap = "8px";
      (payload.options || []).forEach((opt) => {
        const b = el("button", "choice-btn", opt.label);
        b.type = "button";
        b.onclick = () => {
          if (opt.correct) {
            audio.correct();
            b.classList.add("ok");
            setTimeout(() => onComplete(100), 350);
          } else {
            audio.wrong();
            b.classList.add("bad");
          }
        };
        opts.appendChild(b);
      });
      container.append(box, opts);
      return;
    }

    if (type === "hidden_clue" || type === "map_pin") {
      const clues = type === "hidden_clue" ? payload.clues || [] : [Object.assign({ id: "pin", label: "목표 위치" }, payload.target || { x: 50, y: 50, r: 15 })];
      let found = 0;
      const area = el("div", "");
      area.style.position = "relative";
      area.style.width = "100%";
      area.style.height = "260px";
      area.style.borderRadius = "12px";
      area.style.background = payload.bgImage ? `url(${payload.bgImage}) center/cover no-repeat` : "linear-gradient(135deg, #dbeafe, #fef3c7)";
      area.style.border = "2px solid #cbd5e1";

      clues.forEach((c) => {
        const spot = el("button", "", type === "hidden_clue" ? `🔍 ${c.label}` : "📍");
        spot.type = "button";
        spot.style.position = "absolute";
        spot.style.left = `${c.x}%`;
        spot.style.top = `${c.y}%`;
        spot.style.transform = "translate(-50%, -50%)";
        spot.style.background = type === "hidden_clue" ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.35)";
        spot.onclick = () => {
          if (spot.disabled) return;
          audio.correct();
          spot.disabled = true;
          spot.style.background = "#bbf7d0";
          found++;
          if (found >= clues.length) {
            setTimeout(() => onComplete(100), 350);
          }
        };
        area.appendChild(spot);
      });
      container.appendChild(area);
      return;
    }

    // Fallback
    const done = el("button", "btn-primary", "미션 완료");
    done.type = "button";
    done.onclick = () => {
      audio.correct();
      onComplete(100);
    };
    container.appendChild(done);
  }

  window.EDUGAME.minigames = { render: renderMiniGame };
})();
