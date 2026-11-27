    var PAGE_SIZE = 24;
    var GPUS = [];
    var IDX = null;
    var staticCards = [];
    var staticFiltered = [];
    var dynMatches = [];
    var viewMode = 'static';
    var page = 1;
    var state = { gpu: '', ram: '', mode: 'all', os: '', genre: '', storage: '', deck: '', sort: 'popular', q: '' };
    var F = { t: 0, s: 1, min: 2, rec: 3, minL: 4, recL: 5, minRam: 6, recRam: 7, rev: 8, rt: 9, g: 10, img: 11, gb: 12, os: 13, deck: 14, yr: 15, mob: 16, mobSize: 17 };
    var TITLES = [];
    var GENRE_NAMES = {};
    var hiddenNoSize = 0;
    var PRESETS = {
      deck: { deck: 'verified' },
      small: { storage: '15' },
      tiny: { storage: '5' },
      action: { genre: 'action' },
      lowend: { gpu: 'gtx-1650', ram: '8' }
    };

    function $(id) { return document.getElementById(id); }

    function esc(v) {
      return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function fmt(n) {
      return window.CMS ? CMS.fmt(n || 0) : (n || 0).toLocaleString('en-US');
    }

    // Every UI string the page builds at runtime goes through here, so the
    // language switch re-renders the grid in the chosen language.
    function T(key, vars) {
      return window.CMS ? CMS.t(key, vars) : key;
    }

    function genreText(raw) {
      return String(raw || '').split('|').slice(0, 2).join(', ');
    }

    function activeFilterCount() {
      var n = 0;
      if (state.gpu) n++;
      if (state.ram) n++;
      if (state.mode === 'rec') n++;
      if (state.os) n++;
      if (state.genre) n++;
      if (state.storage) n++;
      if (state.deck) n++;
      if (state.sort !== 'popular') n++;
      if (state.q) n++;
      return n;
    }

    function renderActiveFilters() {
      var box = $('activeFilters');
      if (!box) return;
      var chips = [];
      function chip(key, label) {
        chips.push('<button type="button" class="af-badge" onclick="removeFilter(\'' + key + '\')" title="' + esc(T('index.removeFilter')) + '">' +
          '<span class="af-t">' + esc(label) + '</span> <span class="af-x">✕</span></button>');
      }
      if (state.q) chip('q', '“' + state.q + '”');
      if (state.gpu) {
        var gname = state.gpu;
        for (var i = 0; i < GPUS.length; i++) { if (GPUS[i].slug === state.gpu) gname = GPUS[i].name; }
        chip('gpu', gname);
      }
      if (state.ram) chip('ram', T('index.ramChip', { n: state.ram }));
      if (state.mode === 'rec') chip('mode', T('index.recOnlyChip'));
      if (state.os) chip('os', optionLabel('osSelect', state.os));
      if (state.genre) chip('genre', optionLabel('genreSelect', state.genre));
      if (state.storage) chip('storage', optionLabel('storageSelect', state.storage));
      if (state.deck) chip('deck', optionLabel('deckSelect', state.deck));
      if (state.sort !== 'popular') chip('sort', T('index.sortChip', { label: optionLabel('sortSelect', state.sort) }));
      box.innerHTML = chips.length
        ? '<span class="af-strong" style="font-size:12px;color:var(--text-muted);align-self:center;">' + esc(T('index.active')) + '</span>' + chips.join('')
        : '';
    }

    function updatePresetChips() {
      var map = { deck: 'presetDeck', small: 'presetSmall', tiny: 'presetTiny', action: 'presetAction', lowend: 'presetLowend' };
      for (var k in map) {
        var el = $(map[k]);
        if (el) el.className = 'preset-chip' + (presetActive(k) ? ' on' : '');
      }
    }

    function selectedHardware() {
      var g = null;
      for (var i = 0; i < GPUS.length; i++) { if (GPUS[i].slug === state.gpu) g = GPUS[i]; }
      var ram = state.ram ? parseInt(state.ram, 10) : null;
      return { gpu: g, ram: ram };
    }

    function loadScript(url, cb) {
      var s = document.createElement('script');
      s.src = url;
      s.onload = cb;
      document.head.appendChild(s);
    }

    function loadData() {
      return Promise.all([
        fetch('data/gpus.json').then(function (r) { return r.json(); }),
        fetch('data/spec_index.json').then(function (r) { return r.json(); })
      ]).then(function (res) {
        GPUS = res[0];
        IDX = res[1];
      }).catch(function () {
        GPUS = [];
        IDX = null;
      });
    }

    function buildGpuSelect() {
      var sel = $('gpuSelect');
      var byGroup = {};
      var order = [];
      GPUS.forEach(function (g) {
        if (!byGroup[g.group]) { byGroup[g.group] = []; order.push(g.group); }
        byGroup[g.group].push(g);
      });
      order.forEach(function (groupName) {
        var og = document.createElement('optgroup');
        og.label = groupName;
        byGroup[groupName].forEach(function (g) {
          var o = document.createElement('option');
          o.value = g.slug;
          o.textContent = g.name;
          og.appendChild(o);
        });
        sel.appendChild(og);
      });
    }

    function readUrlState() {
      var p = new URLSearchParams(window.location.search);
      state.gpu = p.get('gpu') || '';
      state.ram = p.get('ram') || '';
      state.mode = p.get('mode') === 'rec' ? 'rec' : 'all';
      state.os = ['windows', 'mac', 'linux', 'mobile'].indexOf(p.get('os')) > -1 ? p.get('os') : '';
      state.genre = p.get('genre') || '';
      state.storage = ['5', '15', '30', '50', '100'].indexOf(p.get('storage')) > -1 ? p.get('storage') : '';
      state.deck = ['verified', 'playable', 'unsupported'].indexOf(p.get('deck')) > -1 ? p.get('deck') : '';
      state.sort = ['popular', 'rated', 'lowspec', 'newest', 'az'].indexOf(p.get('sort')) > -1 ? p.get('sort') : 'popular';
      state.q = p.get('q') || '';
      if (state.q) { $('gameSearch').value = state.q; }
    }

    function writeUrlState() {
      var p = new URLSearchParams();
      if (state.gpu) p.set('gpu', state.gpu);
      if (state.ram) p.set('ram', state.ram);
      if (state.mode === 'rec') p.set('mode', 'rec');
      if (state.os) p.set('os', state.os);
      if (state.genre) p.set('genre', state.genre);
      if (state.storage) p.set('storage', state.storage);
      if (state.deck) p.set('deck', state.deck);
      if (state.sort !== 'popular') p.set('sort', state.sort);
      if (state.q) p.set('q', state.q);
      if (window.CMS) CMS.injectLang(p);
      var qs = p.toString();
      history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
    }

    function syncControls() {
      $('gpuSelect').value = state.gpu || '';
      $('ramSelect').value = state.ram || '';
      $('modeSelect').value = state.mode;
      $('osSelect').value = state.os;
      $('genreSelect').value = state.genre;
      $('storageSelect').value = state.storage;
      $('deckSelect').value = state.deck;
      $('sortSelect').value = state.sort;
      $('gameSearch').value = state.q;
      updateClearButton();
    }

    function updateClearButton() {
      $('searchClear').style.display = state.q ? 'flex' : 'none';
    }

    function hasOption(selId, value) {
      var sel = $(selId);
      if (!sel) return false;
      for (var i = 0; i < sel.options.length; i++) { if (sel.options[i].value === value) return true; }
      return false;
    }

    function optionLabel(selId, value) {
      var sel = $(selId);
      if (!sel) return value;
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value === value) {
          return sel.options[i].textContent.replace(/\s*\([\d,]+\)\s*$/, '').trim();
        }
      }
      return value;
    }

    // Genre slugs from the menu are matched against the names stored in the index.
    function buildGenreMap() {
      GENRE_NAMES = {};
      var sel = $('genreSelect');
      for (var i = 0; i < sel.options.length; i++) {
        var v = sel.options[i].value;
        if (!v) continue;
        GENRE_NAMES[v] = sel.options[i].getAttribute('data-name') || sel.options[i].textContent.replace(/\s*\([\d,]+\)\s*$/, '').trim();
      }
    }

    function onFilterChange() { page = 1; writeUrlState(); render(); }

    function onSearchInput() {
      state.q = $('gameSearch').value.trim();
      // A title search asks "does this game run?", so the 60 FPS-only view is
      // lifted while searching; each card still carries its own badge.
      if (state.q && state.mode === 'rec') {
        state.mode = 'all';
        $('modeSelect').value = 'all';
      }
      updateClearButton();
      renderSuggest();
      page = 1;
      writeUrlState();
      render();
    }

    function onSearchKey(e) {
      if (e.key === 'Escape') { hideSuggest(); return; }
      if (e.key !== 'Enter') return;
      e.preventDefault();
      hideSuggest();
      page = 1;
      writeUrlState();
      render();
      scrollToGrid();
    }

    function onGpuChange() {
      var slug = $('gpuSelect').value;
      state.gpu = slug;
      for (var i = 0; i < GPUS.length; i++) {
        if (GPUS[i].slug === slug && GPUS[i].presetRam) {
          state.ram = String(GPUS[i].presetRam);
          $('ramSelect').value = state.ram;
        }
      }
      onFilterChange();
    }

    function onRamChange() { state.ram = $('ramSelect').value; onFilterChange(); }
    function onModeChange() { state.mode = $('modeSelect').value; onFilterChange(); }
    function onOsChange() { state.os = $('osSelect').value; onFilterChange(); }
    function onGenreChange() { state.genre = $('genreSelect').value; onFilterChange(); }
    function onStorageChange() { state.storage = $('storageSelect').value; onFilterChange(); }
    function onDeckChange() { state.deck = $('deckSelect').value; onFilterChange(); }
    function onSortChange() { state.sort = $('sortSelect').value; onFilterChange(); }

    function clearSearch() {
      state.q = '';
      $('gameSearch').value = '';
      hideSuggest();
      updateClearButton();
      page = 1;
      writeUrlState();
      render();
      $('gameSearch').focus();
    }

    function resetFilter() {
      state = { gpu: '', ram: '', mode: 'all', os: '', genre: '', storage: '', deck: '', sort: 'popular', q: '' };
      $('gameSearch').value = '';
      hideSuggest();
      syncControls();
      page = 1;
      writeUrlState();
      render();
    }

    function removeFilter(key) {
      if (key === 'q') { clearSearch(); return; }
      if (key === 'mode') state.mode = 'all';
      else if (key === 'sort') state.sort = 'popular';
      else state[key] = '';
      syncControls();
      page = 1;
      writeUrlState();
      render();
    }

    function toggleMoreFilters() {
      expandMoreFilters(!$('filterPanel').classList.contains('expanded'));
    }

    function expandMoreFilters(open) {
      var panel = $('filterPanel');
      if (!panel) return;
      if (open) panel.classList.add('expanded'); else panel.classList.remove('expanded');
      $('moreFiltersBtn').setAttribute('aria-expanded', open ? 'true' : 'false');
      $('moreFiltersLabel').textContent = T(open ? 'index.hideFilters' : 'index.moreFilters');
    }

    function presetActive(kind) {
      var p = PRESETS[kind];
      if (!p) return false;
      for (var k in p) {
        if (Object.prototype.hasOwnProperty.call(p, k) && String(state[k]) !== String(p[k])) return false;
      }
      return true;
    }

    function applyPreset(kind) {
      var p = PRESETS[kind];
      if (!p) return;
      var off = presetActive(kind);
      for (var k in p) {
        if (!Object.prototype.hasOwnProperty.call(p, k)) continue;
        state[k] = off ? '' : p[k];
      }
      if (state.genre && !hasOption('genreSelect', state.genre)) state.genre = '';
      if (state.gpu && !hasOption('gpuSelect', state.gpu)) { state.gpu = ''; state.ram = ''; }
      if (state.os || state.genre || state.storage || state.deck) expandMoreFilters(true);
      syncControls();
      page = 1;
      writeUrlState();
      render();
      scrollToGrid();
    }

    // ---------------------------------------------------------------- suggestions
    function buildTitleIndex() {
      if (!IDX) return;
      TITLES = IDX.games.map(function (a) {
        return { a: a, key: String(a[F.t]).toLowerCase(), slug: String(a[F.s]) };
      });
    }

    function suggestMatches(q, limit) {
      var starts = [], contains = [];
      for (var i = 0; i < TITLES.length; i++) {
        var item = TITLES[i];
        var at = item.key.indexOf(q);
        if (at === 0) starts.push(item);
        else if (at > 0) contains.push(item);
        if (starts.length >= limit) break;
      }
      return starts.concat(contains).slice(0, limit);
    }

    function hideSuggest() {
      var box = $('searchSuggest');
      if (box) box.style.display = 'none';
    }

    function renderSuggest() {
      var box = $('searchSuggest');
      if (!box) return;
      var q = state.q.toLowerCase();
      if (q.length < 2 || !IDX || !TITLES.length) { box.style.display = 'none'; return; }

      var hits = suggestMatches(q, 6);
      var totalTitles = 0;
      for (var i = 0; i < TITLES.length; i++) { if (TITLES[i].key.indexOf(q) !== -1) totalTitles++; }

      var html = '';
      if (!hits.length) {
        html = '<div class="suggest-empty">' + esc(T('index.suggestEmpty', { q: state.q })) + '</div>';
      } else {
        hits.forEach(function (hit) {
          var a = hit.a;
          html += '<a class="suggest-item" href="games/' + esc(hit.slug) + '.html" role="option">' +
            '<img class="suggest-thumb" src="' + esc(a[F.img]) + '" alt="" loading="lazy">' +
            '<span class="suggest-main"><span class="suggest-title">' + esc(a[F.t]) + '</span>' +
            '<span class="suggest-meta">' + esc(String(a[F.g] || '').split('|').join(', ')) +
            (a[F.mob] ? ' · \ud83d\udcf1 ' + esc(a[F.mob]) : ' · GPU: ' + esc(a[F.recL] || T('index.seeSteam'))) +
            '</span></span></a>';
        });
        html += '<button type="button" class="suggest-all" onclick="showAllResults()">' +
          esc(T(totalTitles === 1 ? 'index.suggestAll' : 'index.suggestAllPlural', { n: fmt(totalTitles) })) + '</button>';
      }
      box.innerHTML = html;
      box.style.display = 'block';
    }

    function showAllResults() {
      hideSuggest();
      page = 1;
      render();
      scrollToGrid();
    }

    function copyShareLink() {
      var btn = $('copyLinkBtn');
      var url = window.location.href;
      var done = function () {
        btn.textContent = T('index.copied');
        setTimeout(function () { btn.textContent = T('index.copyLink'); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () { window.prompt(T('index.copyPrompt'), url); });
      } else {
        window.prompt(T('index.copyPrompt'), url);
      }
    }

    function matchesQuery(item, q) {
      if (!q) return true;
      return String(item[F.t] || '').toLowerCase().indexOf(q) !== -1;
    }

    function sortMatches(out) {
      var s = state.sort || 'popular';
      out.sort(function (x, y) {
        var a = x.a, b = y.a;
        if (s === 'rated') {
          var r = (b[F.rt] || 0) - (a[F.rt] || 0);
          if (r !== 0) return r;
        } else if (s === 'lowspec') {
          var ra = a[F.rec] == null ? 9999 : a[F.rec];
          var rb = b[F.rec] == null ? 9999 : b[F.rec];
          if (ra !== rb) return ra - rb;
        } else if (s === 'newest') {
          var ya = a[F.yr] || 0, yb = b[F.yr] || 0;
          if (ya !== yb) return yb - ya;
        } else if (s === 'az') {
          return String(a[F.t]).localeCompare(String(b[F.t]));
        }
        var d = (b[F.rev] || 0) - (a[F.rev] || 0);
        if (d !== 0) return d;
        var t = (b[F.rt] || 0) - (a[F.rt] || 0);
        if (t !== 0) return t;
        return String(a[F.t]).localeCompare(String(b[F.t]));
      });
      return out;
    }

    function computeMatches() {
      var hw = selectedHardware();
      var H = hw.gpu ? hw.gpu.score : null;
      var R = hw.ram;
      var q = state.q.toLowerCase();
      var osBit = state.os === 'windows' ? 1 : state.os === 'mac' ? 2 : state.os === 'linux' ? 4 : state.os === 'mobile' ? 8 : 0;
      var genreName = state.genre ? GENRE_NAMES[state.genre] : '';
      var sizeLimit = state.storage ? parseFloat(state.storage) : null;
      var out = [];
      hiddenNoSize = 0;
      var games = IDX.games;
      for (var i = 0; i < games.length; i++) {
        var a = games[i];
        if (!matchesQuery(a, q)) continue;
        if (osBit && !(a[F.os] & osBit)) continue;
        if (genreName && String(a[F.g] || '').split('|').indexOf(genreName) === -1) continue;
        if (sizeLimit != null) {
          if (a[F.gb] == null) { hiddenNoSize++; continue; }
          if (a[F.gb] >= sizeLimit) continue;
        }
        if (state.deck === 'verified' && a[F.deck] !== 3) continue;
        if (state.deck === 'playable' && (a[F.deck] || 0) < 2) continue;
        if (state.deck === 'unsupported' && a[F.deck] !== 1) continue;
        var recPass = true, minPass = true;
        if (H != null) {
          recPass = a[F.rec] != null && a[F.rec] <= H;
          minPass = a[F.min] != null && a[F.min] <= H;
        }
        if (R != null) {
          if (recPass && a[F.recRam] != null && a[F.recRam] > R) recPass = false;
          if (minPass && a[F.minRam] != null && a[F.minRam] > R) minPass = false;
        }
        if (state.mode === 'rec' && !recPass) continue;
        if (!recPass && !minPass) continue;
        out.push({ a: a, rec: recPass });
      }
      return sortMatches(out);
    }

    function cardHtml(rec, a) {
      var badge, status, alt;
      if (a[F.mob]) {
        // A mobile title carries its system and download size instead of a GPU and
        // a 60 FPS target, which it does not have.
        badge = T('index.cardMobile', { label: a[F.mob] });
        status = a[F.mobSize] ? '<span class="fps-badge">' + esc(a[F.mobSize]) + '</span>' : '';
        alt = esc(a[F.t]) + ' mobile requirements';
      } else {
        var reqLabel = (rec ? a[F.recL] : a[F.minL]) || T('index.seeSteam');
        badge = T('index.cardGpu', { label: reqLabel });
        status = rec
          ? '<span class="fps-badge">' + esc(T('index.badgeFps')) + '</span>'
          : '<span class="min-badge">' + esc(T('index.badgeMin')) + '</span>';
        alt = esc(a[F.t]) + ' PC specs';
      }
      return '<a href="games/' + esc(a[F.s]) + '.html" class="game-card" data-title="' + esc(String(a[F.t]).toLowerCase()) + '">' +
        '<img src="' + esc(a[F.img]) + '" alt="' + alt + '" class="game-img" loading="lazy">' +
        '<div class="game-body"><h3 class="game-title">' + esc(a[F.t]) + '</h3>' +
        '<div class="game-genre">' + esc(genreText(a[F.g])) + '</div>' +
        '<div class="spec-badge-box"><span class="gpu-badge">' + esc(badge) + '</span>' + status + '</div>' +
        '</div></a>';
    }

    function drawPager(total, goTo, emptyMsg) {
      var controls = $('paginationControls');
      var info = $('pageInfo');
      controls.innerHTML = '';
      var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
      if (page > totalPages) page = totalPages;
      var start = (page - 1) * PAGE_SIZE;
      if (total === 0) { info.textContent = emptyMsg || T('index.noMatches'); return; }
      info.textContent = T('index.pageInfo', {
        from: fmt(start + 1), to: fmt(Math.min(start + PAGE_SIZE, total)),
        total: fmt(total), page: fmt(page), pages: fmt(totalPages)
      });

      var prev = document.createElement('button');
      prev.className = 'page-btn';
      prev.textContent = T('index.prev');
      prev.disabled = page === 1;
      prev.onclick = function () { page--; goTo(); scrollToGrid(); };
      controls.appendChild(prev);

      // A phone cannot fit the numbered strip; Prev / current / Next stays on one row.
      if (window.innerWidth <= 560) {
        addPageBtn(page, controls, goTo);
      } else {
        var startP = Math.max(1, page - 2), endP = Math.min(totalPages, page + 2);
        if (page <= 3) endP = Math.min(totalPages, 5);
        if (page >= totalPages - 2) startP = Math.max(1, totalPages - 4);
        if (startP > 1) {
          addPageBtn(1, controls, goTo);
          if (startP > 2) addEllipsis(controls);
        }
        for (var p = startP; p <= endP; p++) addPageBtn(p, controls, goTo);
        if (endP < totalPages) {
          if (endP < totalPages - 1) addEllipsis(controls);
          addPageBtn(totalPages, controls, goTo);
        }
      }

      var next = document.createElement('button');
      next.className = 'page-btn';
      next.textContent = T('index.next');
      next.disabled = page === totalPages;
      next.onclick = function () { page++; goTo(); scrollToGrid(); };
      controls.appendChild(next);
    }

    function addPageBtn(p, container, goTo) {
      var btn = document.createElement('button');
      btn.className = 'page-btn' + (p === page ? ' active' : '');
      btn.textContent = p;
      btn.onclick = function () { page = p; goTo(); scrollToGrid(); };
      container.appendChild(btn);
    }

    function addEllipsis(container) {
      var span = document.createElement('span');
      span.style.color = 'var(--text-muted)';
      span.style.padding = '0 4px';
      span.textContent = '...';
      container.appendChild(span);
    }

    function scrollToGrid() {
      var grid = $('dynamicGrid').style.display === 'none' ? $('gamesContainer') : $('dynamicGrid');
      if (grid) {
        var y = grid.getBoundingClientRect().top + window.pageYOffset - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }

    function renderStatic() {
      var q = state.q.toLowerCase();
      staticFiltered = staticCards.filter(function (c) {
        return !q || (c.getAttribute('data-title') || '').indexOf(q) !== -1;
      });
      $('gamesContainer').style.display = 'grid';
      $('dynamicGrid').style.display = 'none';
      var pages = Math.max(1, Math.ceil(staticFiltered.length / PAGE_SIZE));
      if (page > pages) page = pages;
      staticCards.forEach(function (c) { c.style.display = 'none'; });
      var start = (page - 1) * PAGE_SIZE;
      staticFiltered.slice(start, start + PAGE_SIZE).forEach(function (c) { c.style.display = 'flex'; });
      $('gridTitle').textContent = T(q ? 'index.gridTitleSearch' : 'index.gridTitleDefault');
      $('gridSubtitle').textContent = T('index.gridSubDefault');
      var total = staticFiltered.length;
      drawPager(total, renderStatic);
      $('filterResult').textContent = '';
      renderActiveFilters();
      updatePresetChips();
    }

    function renderDynamic() {
      dynMatches = computeMatches();
      var hw = selectedHardware();
      $('gamesContainer').style.display = 'none';
      $('dynamicGrid').style.display = 'grid';
      var pages = Math.max(1, Math.ceil(dynMatches.length / PAGE_SIZE));
      if (page > pages) page = pages;
      var start = (page - 1) * PAGE_SIZE;
      var slice = dynMatches.slice(start, start + PAGE_SIZE);
      $('dynamicGrid').innerHTML = slice.map(function (m) { return cardHtml(m.rec, m.a); }).join('');
      var emptyMsg = T('index.noMatches');
      if (dynMatches.length === 0) {
        emptyMsg = state.q
          ? T('index.emptySearch', { q: state.q })
          : (activeFilterCount() > 1
            ? T('index.emptyCombo')
            : T('index.emptySingle'));
      }
      drawPager(dynMatches.length, renderDynamic, emptyMsg);

      var recCount = 0;
      dynMatches.forEach(function (m) { if (m.rec) recCount++; });
      var parts = [];
      if (hw.gpu) {
        parts.push(hw.ram
          ? T('index.resRunRam', { n: fmt(dynMatches.length), gpu: esc(hw.gpu.name), ram: hw.ram })
          : T('index.resRun', { n: fmt(dynMatches.length), gpu: esc(hw.gpu.name) }));
        parts.push(T('index.resFps', { n: fmt(recCount) }));
        if (state.mode === 'all' && recCount < dynMatches.length) parts.push(T('index.resMinOnly', { n: fmt(dynMatches.length - recCount) }));
      } else {
        parts.push(T('index.resFiltered', { n: fmt(dynMatches.length) }));
        if (state.mode === 'rec') parts.push(T('index.resPickGpu'));
      }
      if (hiddenNoSize) parts.push(T('index.resNoSize', { n: fmt(hiddenNoSize) }));
      $('filterResult').innerHTML = parts.join(' ');
      $('gridTitle').textContent = hw.gpu ? T('index.gridTitleGpu', { gpu: hw.gpu.name })
        : T(state.q ? 'index.gridTitleSearch' : 'index.gridTitleFiltered');
      var n = activeFilterCount();
      $('gridSubtitle').textContent = n ? T(n === 1 ? 'index.gridSubActive' : 'index.gridSubActivePlural', { n: fmt(n) }) : T('index.gridSubFiltered');
      renderActiveFilters();
      updatePresetChips();
    }

    function needsData() {
      return !!(state.gpu || state.ram || state.q || state.os || state.genre || state.storage ||
        state.deck || state.mode === 'rec' || state.sort !== 'popular');
    }

    function render() {
      if (needsData() && IDX) { renderDynamic(); return; }
      if (needsData() && !IDX) {
        $('filterResult').textContent = T('index.loading');
        renderActiveFilters();
        return;
      }
      viewMode = 'static';
      renderStatic();
    }

    // ---------------------------------------------------------------- detect my pc
    var lastDetect = null;

    function renderDetectPanel(res) {
      var panel = $('detectPanel');
      if (!panel) return;
      if (!res) { panel.classList.remove('on'); panel.innerHTML = ''; return; }
      var lines = window.CMSDetect ? CMSDetect.lines(res) : [];
      panel.innerHTML = lines.map(function (line, i) {
        return '<p' + (i === lines.length - 1 ? ' class="dp-note"' : '') + '>' + line + '</p>';
      }).join('');
      panel.classList.add('on');
    }

    function detectMyPc() {
      var btn = $('detectBtn');
      var panel = $('detectPanel');
      if (panel) { panel.innerHTML = '<p>' + esc(T('detect.working')) + '</p>'; panel.classList.add('on'); }
      if (btn) btn.disabled = true;
      // One tick lets the "reading hardware" line paint before WebGL is queried.
      setTimeout(function () {
        var res = null;
        try { res = window.CMSDetect ? CMSDetect.sniff(GPUS) : null; } catch (e) { res = null; }
        if (res) {
          if (res.gpu && hasOption('gpuSelect', res.gpu.slug)) {
            state.gpu = res.gpu.slug;
            for (var i = 0; i < GPUS.length; i++) {
              if (GPUS[i].slug === state.gpu && GPUS[i].presetRam && !res.ram) state.ram = String(GPUS[i].presetRam);
            }
          }
          if (res.ram) state.ram = String(res.ram);
          if (res.osState === 'ok' && res.os) state.os = res.os;
          // The same detection feeds the deal hub and the "my PC" page: one saved
          // profile instead of three places asking again.
          if (window.CMSPc) {
            try {
              CMSPc.save({
                gpu: state.gpu || '',
                gpuName: (function () {
                  for (var j = 0; j < GPUS.length; j++) if (GPUS[j].slug === state.gpu) return GPUS[j].name;
                  return '';
                })(),
                score: (function () {
                  for (var k = 0; k < GPUS.length; k++) if (GPUS[k].slug === state.gpu) return GPUS[k].score;
                  return null;
                })(),
                vram: (function () {
                  for (var m = 0; m < GPUS.length; m++) if (GPUS[m].slug === state.gpu) return GPUS[m].vram;
                  return null;
                })(),
                ram: state.ram ? parseInt(state.ram, 10) : null,
                os: res.os || '',
                detected: true
              });
            } catch (e) { /* private mode: the filter still works for this page */ }
          }
          if (state.os || state.genre || state.storage || state.deck) expandMoreFilters(true);
          syncControls();
          page = 1;
          writeUrlState();
          render();
          lastDetect = res;
          renderDetectPanel(res);
        }
        if (btn) btn.disabled = false;
      }, 30);
    }

    // Re-render everything this page builds itself when the language changes.
    if (window.CMS) {
      CMS.onChange(function () {
        var panel = $('filterPanel');
        expandMoreFilters(panel && panel.classList.contains('expanded'));
        updateClearButton();
        render();
        if (lastDetect) renderDetectPanel(lastDetect);
      });
    }

    // The visitor tracker decides between write and read mode; this tab never displays a count.

    document.addEventListener('DOMContentLoaded', function () {
      staticCards = Array.prototype.slice.call(document.querySelectorAll('#gamesContainer .game-card'));
      readUrlState();
      updateClearButton();
      render();
      loadData().then(function () {
        if (GPUS.length) buildGpuSelect();
        // A visitor who saved a PC on the deal hub or the game pages starts here
        // with that hardware already selected, so both views agree.
        if (window.CMSPc) {
          var savedPc = CMSPc.get();
          if (savedPc && savedPc.gpu && !readUrlState.gpuFromUrl) {
            var p = new URLSearchParams(window.location.search);
            if (!p.get('gpu') && !p.get('ram') && hasOption('gpuSelect', savedPc.gpu)) {
              state.gpu = savedPc.gpu;
              if (savedPc.ram) state.ram = String(savedPc.ram);
            }
          }
        }
        // A link from an old guide may name a card this build no longer lists.
        if (state.gpu && !GPUS.some(function (g) { return g.slug === state.gpu; })) {
          state.gpu = '';
          writeUrlState();
        }
        buildGenreMap();
        if (state.genre && !hasOption('genreSelect', state.genre)) {
          state.genre = '';
          writeUrlState();
        }
        buildTitleIndex();
        syncControls();
        if (state.os || state.genre || state.storage || state.deck) expandMoreFilters(true);
        render();
        renderSuggest();
      });
      document.addEventListener('click', function (e) {
        if (e.target && e.target.closest && !e.target.closest('.search-wrapper')) hideSuggest();
      });
    });
  