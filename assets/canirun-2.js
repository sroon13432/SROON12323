    (function () {
      var F = { t: 0, slug: 1, min: 2, rec: 3, minGpu: 4, recGpu: 5, minRam: 6, recRam: 7,
                reviews: 8, rating: 9, genre: 10, image: 11, size: 12, os: 13, deck: 14,
                year: 15, mobile: 16, mobileSize: 17, free: 18 };
      var IDX = null;
      var pc = null;
      var tab = 'run';
      var shown = 0;
      var PAGE = 36;
      var rows = [];
      var grid = document.getElementById('gameGrid');
      var moreBtn = document.getElementById('moreBtn');
      var statusEl = document.getElementById('pcStatus');
      var chipsEl = document.getElementById('summaryChips');
      var subEl = document.getElementById('resultSub');
      var gpuSel = document.getElementById('pcGpu');
      var ramSel = document.getElementById('pcRam');

      function esc(v) {
        return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;')
          .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      }
      function num(v) { return v === null || v === undefined || v === '' ? null : parseFloat(v); }

      function level(row) {
        if (!pc || !pc.score) return '';
        var minS = num(row[F.min]), recS = num(row[F.rec]);
        var minR = num(row[F.minRam]), recR = num(row[F.recRam]);
        var ram = num(pc.ram);
        var gpuRec = recS !== null && pc.score >= recS;
        var gpuMin = minS !== null && pc.score >= minS;
        var ramRec = recR === null || ram === null || ram >= recR;
        var ramMin = minR === null || ram === null || ram >= minR;
        if (gpuRec && ramRec) return 'rec';
        if (gpuMin && ramMin) return 'min';
        return 'no';
      }

      function matches(row) {
        var lv = level(row);
        if (tab === 'rec') return lv === 'rec';
        if (tab === 'run') return lv === 'rec' || lv === 'min';
        if (!pc || !pc.score) return false;
        var base = lv === 'rec' || lv === 'min';
        if (!base) return false;
        if (tab === 'popular') return (row[F.reviews] || 0) >= 500;
        if (tab === 'lowspec') return num(row[F.rec]) !== null && num(row[F.rec]) <= 130;
        if (tab === 'free') return row[F.free] === 1;
        if (tab === 'deck') return row[F.deck] === 3;
        if (tab === 'small') return num(row[F.size]) !== null && num(row[F.size]) <= 15;
        return true;
      }

      function card(row) {
        var lv = level(row);
        var badge = lv === 'rec'
          ? '<span class="g-badge rec">Runs well</span>'
          : (lv === 'min' ? '<span class="g-badge min">Runs at minimum</span>' : '');
        if (!badge && row[F.free] === 1) badge = '<span class="g-badge free">Free to play</span>';
        var size = num(row[F.size]);
        var meta = [];
        if (row[F.recGpu]) meta.push('Rec: ' + row[F.recGpu]);
        if (size) meta.push((size % 1 ? size.toFixed(1) : size) + ' GB');
        if (row[F.year]) meta.push(row[F.year]);
        return '<a class="g-card" href="../games/' + esc(row[F.slug]) + '.html">'
          + '<img src="' + esc(row[F.image]) + '" alt="' + esc(row[F.t]) + ' requirements" loading="lazy" decoding="async">'
          + '<div class="g-body">' + badge
          + '<div class="g-title">' + esc(row[F.t]) + '</div>'
          + '<div class="g-meta">' + esc(meta.join(' · ')) + '</div>'
          + '</div></a>';
      }

      function paint() {
        if (!IDX) return;
        var all = IDX.games;
        rows = all.filter(matches);
        if (!pc || !pc.score) {
          subEl.textContent = 'Pick your card above — the list fills in as soon as it is set.';
          chipsEl.innerHTML = '';
          grid.innerHTML = '';
          moreBtn.style.display = 'none';
          return;
        }
        var rec = 0, min = 0;
        for (var i = 0; i < all.length; i++) {
          var lv = level(all[i]);
          if (lv === 'rec') rec++;
          else if (lv === 'min') min++;
        }
        subEl.textContent = rows.length.toLocaleString() + ' of ' + all.length.toLocaleString()
          + ' titles in the database match this filter.';
        chipsEl.innerHTML = '<span class="ok">' + (rec + min).toLocaleString()
          + ' games run on ' + esc(pc.gpuName || 'your card') + '</span>'
          + '<span class="ok">' + rec.toLocaleString() + ' at the recommended tier</span>'
          + '<span class="mid">' + min.toLocaleString() + ' at the minimum tier</span>';
        shown = 0;
        grid.innerHTML = '';
        append();
      }

      function append() {
        var next = rows.slice(shown, shown + PAGE);
        var html = '';
        for (var i = 0; i < next.length; i++) html += card(next[i]);
        grid.insertAdjacentHTML('beforeend', html);
        shown += next.length;
        moreBtn.style.display = shown < rows.length ? 'block' : 'none';
        moreBtn.textContent = 'Show more games (' + (rows.length - shown).toLocaleString() + ' left)';
      }

      function readPc() {
        if (!window.CMSPc) return;
        pc = CMSPc.get();
        if (pc) {
          if (pc.gpu) gpuSel.value = pc.gpu;
          if (pc.ram) ramSel.value = String(pc.ram);
        }
        paintStatus();
        paint();
        paintDeals();
      }

      function paintStatus() {
        if (pc && pc.score) {
          statusEl.innerHTML = 'Showing games for <strong>' + esc(pc.gpuName || pc.gpu)
            + '</strong>' + (pc.ram ? ' with ' + esc(pc.ram) + ' GB RAM' : '')
            + ' (GPU tier ' + esc(pc.score) + ')' + (pc.detected ? ' — detected in your browser' : ' — saved in this browser') + '.';
        } else {
          statusEl.textContent = 'Choose your card to see what it runs. The choice is saved in this browser only.';
        }
      }

      function paintDeals() {
        var cards = Array.prototype.slice.call(document.querySelectorAll('#dealGrid [data-rec]'));
        cards.forEach(function (el) {
          var slot = el.querySelector('.pc-slot');
          if (!slot || !window.CMSPc) return;
          slot.innerHTML = CMSPc.badgeHtml(pc, {
            minScore: num(el.getAttribute('data-min')),
            recScore: num(el.getAttribute('data-rec')),
            minRam: num(el.getAttribute('data-minram')),
            recRam: num(el.getAttribute('data-recram'))
          }, '../deals/index.html');
        });
      }

      if (window.CMSPc) {
        Promise.all([
          fetch('../data/gpus.json').then(function (r) { return r.json(); }).catch(function () { return []; }),
          fetch('../data/spec_index.json').then(function (r) { return r.json(); }).catch(function () { return null; })
        ]).then(function (res) {
          var gpus = res[0] || [];
          IDX = res[1];
          var groups = {};
          gpus.forEach(function (g) {
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
          readPc();
        });

        gpuSel.addEventListener('change', function () { pc = CMSPc.fromParts(gpuSel.value, ramSel.value, false); paintStatus(); paint(); paintDeals(); });
        ramSel.addEventListener('change', function () { pc = CMSPc.fromParts(gpuSel.value, ramSel.value, false); paintStatus(); paint(); });
        var btn = document.getElementById('pcDetect');
        btn.addEventListener('click', function () {
          btn.disabled = true;
          statusEl.textContent = 'Reading your browser’s GPU and memory report…';
          CMSPc.detect().then(function (found) {
            btn.disabled = false;
            if (found) {
              if (found.gpu) gpuSel.value = found.gpu;
              if (found.ram) ramSel.value = String(found.ram);
            }
            readPc();
          });
        });
        document.getElementById('tabs').addEventListener('click', function (ev) {
          var t = ev.target.closest('.tab');
          if (!t) return;
          Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (b) { b.className = 'tab'; });
          t.className = 'tab on';
          tab = t.getAttribute('data-tab');
          paint();
        });
        moreBtn.addEventListener('click', append);
      }
    })();
  