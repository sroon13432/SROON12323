    // The checker compares the visitor's GPU tier and RAM with this game's own
    // published requirements, loaded from the same index the home page filter uses.
    (function () {
      var box = document.getElementById('specChecker');
      var gpuSel = document.getElementById('userGpu');
      var ramSel = document.getElementById('userRam');
      var res = document.getElementById('checkResult');
      var bySlug = {};
      var loaded = null;
      var lastDetect = null;
      var ogCards = null;
      var ogPresets = null;

      function T(key, vars) { return window.CMS ? CMS.t(key, vars) : key; }
      function esc(v) {
        return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;')
          .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      }
      function num(v) { return v === '' || v === null || v === undefined ? null : parseFloat(v); }
      function and() { return T('common.and'); }

      function loadGpus() {
        if (loaded) return loaded;
        loaded = fetch('../data/gpus.json').then(function (r) { return r.json(); }).catch(function () { return []; });
        return loaded;
      }

      function labelGroups() {
        if (ogCards) ogCards.label = T('game.optGroupCards');
        if (ogPresets) ogPresets.label = T('game.optGroupPresets');
      }

      loadGpus().then(function (list) {
        ogCards = document.createElement('optgroup');
        ogCards.label = T('game.optGroupCards');
        ogPresets = document.createElement('optgroup');
        ogPresets.label = T('game.optGroupPresets');
        list.forEach(function (g) {
          bySlug[g.slug] = g;
          var o = document.createElement('option');
          o.value = g.slug;
          o.textContent = g.name;
          (g.kind === 'preset' ? ogPresets : ogCards).appendChild(o);
        });
        if (ogCards.children.length) gpuSel.appendChild(ogCards);
        if (ogPresets.children.length) gpuSel.appendChild(ogPresets);
        if (lastDetect) renderDetect(lastDetect);
        // A visitor who already told another page what their PC is does not have
        // to pick it again here: the profile saved in localStorage fills the form.
        if (window.CMSPc) {
          var saved = CMSPc.get();
          if (saved) {
            if (saved.gpu && bySlug[saved.gpu]) gpuSel.value = saved.gpu;
            if (saved.ram) ramSel.value = String(saved.ram);
            if (gpuSel.value) window.checkSpecs();
          }
        }
      });

      function renderDetect(result) {
        var panel = document.getElementById('detectPanel');
        if (!panel) return;
        if (!result) { panel.classList.remove('on'); panel.innerHTML = ''; return; }
        var lines = window.CMSDetect ? CMSDetect.lines(result) : [];
        var html = lines.map(function (line, i) {
          return '<p' + (i === lines.length - 1 ? ' class="dp-note"' : '') + '>' + line + '</p>';
        }).join('');
        if (gpuSel.value) html += '<p class="dp-ok">' + esc(T('detect.checkerApplied')) + '</p>';
        panel.innerHTML = html;
        panel.classList.add('on');
      }

      window.detectPcForChecker = function () {
        var btn = document.getElementById('detectBtn');
        var panel = document.getElementById('detectPanel');
        if (panel) { panel.innerHTML = '<p>' + esc(T('detect.working')) + '</p>'; panel.classList.add('on'); }
        if (btn) btn.disabled = true;
        loadGpus().then(function (list) {
          var found = null;
          try { found = window.CMSDetect ? CMSDetect.sniff(list) : null; } catch (e) { found = null; }
          if (found) {
            if (found.gpu && bySlug[found.gpu.slug]) gpuSel.value = found.gpu.slug;
            if (found.ram) ramSel.value = String(found.ram);
            lastDetect = found;
            renderDetect(found);
            if (gpuSel.value) window.checkSpecs();
          }
          if (btn) btn.disabled = false;
        });
      };

      window.checkSpecs = function () {
        var g = bySlug[gpuSel.value];
        var res_style = function (bg, border, color) {
          res.style.background = bg; res.style.borderColor = border; res.style.color = color;
        };
        if (!g) {
          res.style.display = 'block';
          res_style('rgba(245, 158, 11, 0.12)', '#f59e0b', '#fcd34d');
          res.textContent = T('game.pickGpu');
          return;
        }
        var ram = num(ramSel.value);
        var recScore = num(box.dataset.rec), minScore = num(box.dataset.min);
        var recRam = num(box.dataset.recram), minRam = num(box.dataset.minram);
        if (recScore === null && minScore === null) {
          res.style.display = 'block';
          res_style('rgba(99, 102, 241, 0.12)', '#6366f1', '#c7d2fe');
          res.textContent = T('game.noRequirement');
          return;
        }
        var label = g.name + (ram ? T('game.withRam', { n: ram }) : '');
        var gpuOkRec = recScore !== null && g.score >= recScore;
        var gpuOkMin = minScore !== null && g.score >= minScore;
        // RAM is only a limit when the visitor told us how much they have.
        var ramOkRec = recRam === null || ram === null || ram >= recRam;
        var ramOkMin = minRam === null || ram === null || ram >= minRam;
        var recOk = gpuOkRec && ramOkRec;
        var minOk = gpuOkMin && ramOkMin;
        var recLabel = box.dataset.reclabel || 'n/a';
        var minLabel = box.dataset.minlabel || 'n/a';
        var html;
        if (recOk) {
          html = T('game.resultRec', { label: esc(label), req: esc(recLabel), target: esc(box.dataset.rectarget) });
          res_style('rgba(16, 185, 129, 0.15)', '#10b981', '#34d399');
        } else if (minOk) {
          var why = [];
          if (!gpuOkRec) why.push(T('game.whyGpuRec', { label: esc(recLabel) }));
          if (!ramOkRec) why.push(T('game.whyRamRec', { n: recRam }));
          html = T('game.resultMin', { label: esc(label), min: esc(minLabel), target: esc(box.dataset.mintarget), why: why.join(and()) });
          res_style('rgba(245, 158, 11, 0.12)', '#f59e0b', '#fcd34d');
        } else {
          var short = [];
          if (!gpuOkMin) short.push(T('game.whyGpuMin', { label: esc(minLabel) }));
          if (!ramOkMin) short.push(T('game.whyRamMin', { n: minRam }));
          html = T('game.resultBelow', { label: esc(label), why: short.join(and()) });
          res_style('rgba(239, 68, 68, 0.12)', '#ef4444', '#fca5a5');
        }
        res.innerHTML = html;
        res.style.display = 'block';
        // Remember the pick for the deal hub and the "games my PC can run" page,
        // then show the concrete upgrade: which card and how much memory.
        var guide = document.getElementById('upgradeGuide');
        if (window.CMSPc) {
          CMSPc.load('../data/gpus.json').then(function () {
            CMSPc.fromParts(g.slug, ramSel.value, false);
            if (!guide) return;
            var plan = CMSPc.upgradeHtml(
              { gpuName: g.name, score: g.score, ram: ram },
              { minScore: minScore, recScore: recScore, minRam: minRam, recRam: recRam,
                minLabel: box.dataset.minlabel, recLabel: box.dataset.reclabel },
              { cpu: box.dataset.reccpu || box.dataset.mincpu || '' });
            guide.innerHTML = plan.html
              ? plan.html + '<p style="margin-top:10px;font-size:13px;"><a href="../can-i-run/index.html" style="color:#a5b4fc;font-weight:600;">All games and Steam deals your PC can run \u2192</a></p>'
              : '';
          });
        }
        var link = document.getElementById('seeAllLink');
        if (link) link.href = '../index.html?gpu=' + encodeURIComponent(g.slug) + (ram ? '&ram=' + ram : '');
      };

      // Language switch: relabel the select groups, the check result and the
      // detection panel, all of which this script rebuilt in English.
      if (window.CMS) {
        CMS.onChange(function () {
          labelGroups();
          if (lastDetect) renderDetect(lastDetect);
          if (res.style.display === 'block' && gpuSel.value) window.checkSpecs();
        });
      }
    })();
  