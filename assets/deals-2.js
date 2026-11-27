    (function () {
      var list = [];
      var pc = null;
      var onlyMine = false;
      var grid = document.getElementById('dealGrid');
      var cards = grid ? Array.prototype.slice.call(grid.querySelectorAll('.deal-card')) : [];
      var valueEl = document.getElementById('pcValue');
      var gpuSel = document.getElementById('pcGpu');
      var ramSel = document.getElementById('pcRam');
      var noteEl = document.getElementById('pcNote');
      var toggle = document.getElementById('pcToggle');
      var toggleWrap = document.getElementById('pcToggleWrap');
      var lowToggle = document.getElementById('lowToggle');
      var onlyLow = false;
      var emptyEl = document.getElementById('dealEmpty');
      var countEl = document.getElementById('dealCount');
      var baseCount = countEl ? countEl.textContent : '';

      function num(v) { return v === null || v === undefined || v === '' ? null : parseFloat(v); }

      function readReq(card) {
        return {
          minScore: num(card.getAttribute('data-min')),
          recScore: num(card.getAttribute('data-rec')),
          minRam: num(card.getAttribute('data-minram')),
          recRam: num(card.getAttribute('data-recram'))
        };
      }

      function paint() {
        var runs = 0;
        var shown = 0;
        cards.forEach(function (card) {
          var slot = card.querySelector('.pc-slot');
          var req = readReq(card);
          var v = pc && window.CMSPc ? CMSPc.verdict(pc, req) : { level: 'unknown' };
          if (slot) slot.innerHTML = window.CMSPc ? CMSPc.badgeHtml(pc, req, '../can-i-run/index.html') : '';
          var passes = v.level === 'rec' || v.level === 'min';
          if (passes) runs++;
          var showPc = !onlyMine || passes;
          var showLow = !onlyLow || card.getAttribute('data-low') === '1';
          var show = showPc && showLow;
          if (show) shown++;
          card.style.display = show ? '' : 'none';
        });
        if (emptyEl) emptyEl.style.display = shown === 0 ? 'block' : 'none';
        if (countEl) {
          countEl.textContent = (onlyMine || onlyLow)
            ? shown + ' of ' + cards.length + ' deals shown'
            : baseCount;
        }
        if (valueEl) {
          if (!pc || !pc.score) {
            valueEl.textContent = 'not set yet';
          } else {
            valueEl.textContent = (pc.gpuName || pc.gpu || 'GPU') + (pc.ram ? ' · ' + pc.ram + ' GB RAM' : '');
          }
        }
        if (toggleWrap) toggleWrap.className = 'pc-toggle' + (pc && pc.score ? '' : ' off');
        if (noteEl) {
          noteEl.textContent = pc && pc.score
            ? 'Each card now says whether this game runs on ' + (pc.gpuName || 'your card') + '. The badge follows the saved choice on game pages and on the news desk. Nothing leaves your browser.'
            : 'Pick or detect your hardware once: every deal below then says whether it runs on your PC, and the same choice follows you to the game pages and to the “my PC” list. Nothing leaves your browser.';
        }
      }

      function save() {
        if (!window.CMSPc) return;
        pc = CMSPc.fromParts(gpuSel.value, ramSel.value, false);
        paint();
      }

      if (window.CMSPc) {
        pc = CMSPc.get();
        CMSPc.load('../data/gpus.json').then(function (gpus) {
          list = gpus || [];
          var groups = {};
          list.forEach(function (g) {
            var key = g.kind === 'preset' ? 'Laptops, handhelds & budget builds' : g.group;
            (groups[key] = groups[key] || []).push(g);
          });
          Object.keys(groups).forEach(function (label) {
            var og = document.createElement('optgroup');
            og.label = label;
            groups[label].forEach(function (g) {
              var o = document.createElement('option');
              o.value = g.slug;
              o.textContent = g.name;
              og.appendChild(o);
            });
            gpuSel.appendChild(og);
          });
          if (pc) {
            if (pc.gpu) gpuSel.value = pc.gpu;
            if (pc.ram) ramSel.value = String(pc.ram);
          }
          paint();
        });
        gpuSel.addEventListener('change', save);
        ramSel.addEventListener('change', save);
        var detectBtn = document.getElementById('pcDetect');
        if (detectBtn) {
          detectBtn.addEventListener('click', function () {
            detectBtn.disabled = true;
            noteEl.textContent = 'Reading your browser’s GPU and memory report…';
            CMSPc.detect().then(function (found) {
              detectBtn.disabled = false;
              if (found) {
                pc = found;
                if (found.gpu) gpuSel.value = found.gpu;
                if (found.ram) ramSel.value = String(found.ram);
              }
              paint();
            });
          });
        }
        if (toggle) {
          toggle.addEventListener('change', function () {
            onlyMine = toggle.checked && pc && pc.score;
            if (toggle.checked && !(pc && pc.score)) {
              noteEl.textContent = 'Pick your GPU first (or press Detect my PC) — then this filter can hide the deals your PC cannot run.';
              toggle.checked = false;
              onlyMine = false;
            }
            paint();
          });
        }
        if (lowToggle) {
          lowToggle.addEventListener('change', function () {
            onlyLow = lowToggle.checked;
            paint();
          });
        }
        paint();
      }
    })();
  