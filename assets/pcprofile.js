/* CanMySpec "My PC" profile — one place that remembers hardware a visitor chose
 * or had detected, and turns it into a verdict against a game's published
 * requirements.
 *
 * The profile lives in localStorage only (key `canmyspec_pc`); nothing is sent
 * anywhere. The scores it compares against are the same GPU tier index the
 * home-page filter and the game-page checker already use (data/gpus.json), and
 * the requirement numbers come from the page's own data attributes, which
 * build.py takes from the game's Steam specification rows.
 */
(function () {
  'use strict';

  var KEY = 'canmyspec_pc';
  var gpus = null;          // [{slug,name,score,vram,group,kind}]
  var loading = null;

  function num(v) {
    if (v === null || v === undefined || v === '') return null;
    var n = parseFloat(v);
    return isNaN(n) ? null : n;
  }

  function esc(v) {
    return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function load(url) {
    if (gpus) return Promise.resolve(gpus);
    if (loading) return loading;
    loading = fetch(url || '../data/gpus.json')
      .then(function (r) { return r.json(); })
      .then(function (list) { gpus = Array.isArray(list) ? list : []; return gpus; })
      .catch(function () { gpus = []; return gpus; });
    return loading;
  }

  function bySlug(slug) {
    if (!gpus) return null;
    for (var i = 0; i < gpus.length; i++) {
      if (gpus[i].slug === slug) return gpus[i];
    }
    return null;
  }

  function get() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var pc = JSON.parse(raw);
      if (!pc || typeof pc !== 'object') return null;
      return pc;
    } catch (e) { return null; }
  }

  function save(pc) {
    if (!pc) { clear(); return null; }
    var out = {
      gpu: pc.gpu || '',
      gpuName: pc.gpuName || '',
      score: num(pc.score),
      vram: num(pc.vram),
      ram: num(pc.ram),
      os: pc.os || '',
      detected: !!pc.detected,
      at: new Date().toISOString()
    };
    try { localStorage.setItem(KEY, JSON.stringify(out)); } catch (e) { /* private mode */ }
    return out;
  }

  function clear() {
    try { localStorage.removeItem(KEY); } catch (e) { /* private mode */ }
  }

  /* Store the hardware a select/detect produced, resolving the score from the
     GPU list so a caller cannot save a score that disagrees with the table. */
  function fromParts(slug, ramValue, detected) {
    var g = slug ? bySlug(slug) : null;
    return save({
      gpu: g ? g.slug : (slug || ''),
      gpuName: g ? g.name : '',
      score: g ? g.score : null,
      vram: g ? g.vram : null,
      ram: num(ramValue),
      os: (window.CMSDetect ? (function () { try { return CMSDetect.sniff(gpus || []).os || ''; } catch (e) { return ''; } })() : ''),
      detected: !!detected
    });
  }

  /* Detect the visitor's hardware with detect.js and keep what it found. */
  function detect() {
    return load().then(function (list) {
      var found = null;
      try { found = window.CMSDetect ? CMSDetect.sniff(list) : null; } catch (e) { found = null; }
      if (!found) return null;
      return save({
        gpu: found.gpu ? found.gpu.slug : '',
        gpuName: found.gpu ? found.gpu.name : '',
        score: found.gpu ? found.gpu.score : null,
        vram: found.gpu ? found.gpu.vram : null,
        ram: found.ram,
        os: found.os,
        detected: true
      });
    });
  }

  /* Verdict against one game's requirement numbers. */
  function verdict(pc, req) {
    var recScore = num(req.recScore), minScore = num(req.minScore);
    var recRam = num(req.recRam), minRam = num(req.minRam);
    if (!pc || pc.score === null || pc.score === undefined) return { level: 'unknown' };
    if (recScore === null && minScore === null) return { level: 'unknown' };
    var ram = num(pc.ram);
    var gpuRec = recScore !== null && pc.score >= recScore;
    var gpuMin = minScore !== null && pc.score >= minScore;
    var ramRec = recRam === null || ram === null || ram >= recRam;
    var ramMin = minRam === null || ram === null || ram >= minRam;
    if (gpuRec && ramRec) return { level: 'rec' };
    if (gpuMin && ramMin) return { level: 'min' };
    return { level: 'below', gpu: !gpuMin, ram: !ramMin };
  }

  var LABELS = {
    rec: { text: 'Runs well', cls: 'rec' },
    min: { text: 'Runs at minimum', cls: 'min' },
    below: { text: 'Upgrade needed', cls: 'below' },
    unknown: { text: 'Check my PC', cls: 'unknown' }
  };

  function badgeHtml(pc, req, href) {
    var v = verdict(pc, req);
    var label = LABELS[v.level];
    if (v.level === 'unknown') {
      return '<a class="pc-badge unknown" href="' + (href || 'can-i-run/index.html') + '">'
        + '\uD83E\uDDE0 ' + esc(label.text) + '</a>';
    }
    return '<span class="pc-badge ' + label.cls + '">' + esc(label.text) + '</span>';
  }

  /* The cheapest card in the table that clears a score, and the next step up
     from the visitor's own card. Scores are the site's GPU tier index. */
  function cardsAtLeast(score) {
    if (!gpus || score === null) return [];
    var out = gpus.filter(function (g) {
      return g.kind === 'gpu' && typeof g.score === 'number' && g.score >= score;
    });
    out.sort(function (a, b) { return a.score - b.score || (a.name > b.name ? 1 : -1); });
    return out;
  }

  function nextStep(fromScore, needScore) {
    var pool = cardsAtLeast(fromScore === null ? 0 : fromScore + 1);
    if (!pool.length) return null;
    // The step that just clears the requirement is the cheapest sensible upgrade;
    // when the visitor's card already clears it, the next tier up is the step.
    for (var i = 0; i < pool.length; i++) {
      if (pool[i].score >= needScore) return pool[i];
    }
    return pool[0];
  }

  function money(n) { return String(n); }

  function upgradePlan(pc, req) {
    var v = verdict(pc, req);
    if (v.level === 'unknown' || v.level === 'rec') return null;
    var plan = { gpu: null, ram: null, level: v.level };
    var recScore = num(req.recScore), minScore = num(req.minScore);
    var recRam = num(req.recRam), minRam = num(req.minRam);
    var ram = num(pc.ram);
    var target = v.level === 'below' ? 'min' : 'rec';
    var needScore = target === 'min' ? minScore : recScore;
    var needRam = target === 'min' ? minRam : recRam;
    if (needScore !== null && pc.score < needScore) {
      var step = nextStep(pc.score, needScore) || cardsAtLeast(needScore)[0] || null;
      if (step) {
        plan.gpu = {
          target: target,
          need: needScore,
          card: step,
          ratio: pc.score ? (step.score / pc.score) : null,
          label: target === 'min' ? (req.minLabel || '') : (req.recLabel || '')
        };
      }
    }
    if (needRam !== null && ram !== null && ram < needRam) {
      plan.ram = { target: target, from: ram, to: needRam };
    }
    if (!plan.gpu && !plan.ram) return null;
    return plan;
  }

  /* HTML for the upgrade panel under a game page's check result. */
  function upgradeHtml(pc, req, opts) {
    opts = opts || {};
    var plan = upgradePlan(pc, req);
    if (!plan) return { html: '', cleared: verdict(pc, req).level === 'rec' };
    var rows = [];
    if (plan.gpu) {
      var card = plan.gpu.card;
      var ratio = plan.gpu.ratio ? (Math.round(plan.gpu.ratio * 10) / 10) + '\u00d7' : '';
      rows.push('<li><strong>Graphics card</strong>: from ' + esc(pc.gpuName || 'your card')
        + (pc.score ? ' (tier ' + money(pc.score) + ')' : '')
        + ' to <strong>' + esc(card.name) + '</strong> (tier ' + money(card.score) + ')'
        + (ratio ? ' \u2014 ' + ratio + ' the GPU score' : '')
        + '. That clears the ' + esc(plan.gpu.target === 'min' ? 'minimum' : 'recommended')
        + ' tier' + (plan.gpu.label ? ' (' + esc(plan.gpu.label) + ')' : '') + '.</li>');
    }
    if (plan.ram) {
      rows.push('<li><strong>Memory</strong>: from ' + money(plan.ram.from) + ' GB to at least '
        + money(plan.ram.to) + ' GB of system RAM.</li>');
    }
    var note = plan.level === 'below'
      ? 'One step gets this game to its published minimum. Two steps (the recommended card) give the target the store lists for the game.'
      : 'Your card clears the minimum. This is the step that reaches the recommended tier.';
    var cpu = '';
    if (opts.cpu) {
      cpu = '<p class="up-x-note">CPU: the store asks for <strong>' + esc(opts.cpu) + '</strong>. '
        + 'This site tracks GPU and memory requirements by tier; check your processor against that line.</p>';
    }
    var html = '<div class="up-x"><p class="up-x-head">\uD83D\uDD27 What to change to run it</p>'
      + '<ul class="up-x-list">' + rows.join('') + '</ul>'
      + '<p class="up-x-note">' + note + '</p>' + cpu + '</div>';
    return { html: html, cleared: false };
  }

  /* A game page's Steam price banner was rendered when that page was built. The
     store moves; the snapshot the deal hub uses is fresher. Match this page's
     game id against it: refresh the numbers when the deal still exists and hide
     the banner when it does not, so a page never advertises a price that ended. */
  function syncDealBanner() {
    var el = document.getElementById('steamDeal');
    if (!el) return;
    var slug = '';
    try {
      var m = String(location.pathname).match(/\/games\/([^\/]+)\.html$/);
      if (m) slug = decodeURIComponent(m[1]);
    } catch (e) { slug = ''; }
    fetch('../data/deals.json', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (snap) {
        var items = (snap.items || []).concat(snap.free || []);
        var hit = null;
        for (var i = 0; i < items.length; i++) {
          if (slug && items[i].game_id === slug) { hit = items[i]; break; }
        }
        if (!hit) { el.style.display = 'none'; return; }
        var line = el.querySelector('.deal-line');
        var stamp = el.querySelector('.deal-stamp');
        if (line) {
          line.innerHTML = '<strong>' + hit.discount_percent + '% off</strong> right now \u2014 '
            + esc(hit.final_text) + ' <s>' + esc(hit.initial_text) + '</s>';
        }
        if (stamp) {
          stamp.textContent = 'Price read ' + String(hit.checked_at || '').slice(0, 16).replace('T', ' ')
            + ' UTC \u00b7 Steam publishes no end time for a store sale';
        }
      })
      .catch(function () { /* the rendered banner stays as a dated record */ });
  }

  if (document.getElementById('steamDeal')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', syncDealBanner);
    } else {
      syncDealBanner();
    }
  }

  window.CMSPc = {
    KEY: KEY,
    load: load,
    get: get,
    save: save,
    clear: clear,
    fromParts: fromParts,
    detect: detect,
    verdict: verdict,
    badgeHtml: badgeHtml,
    upgradePlan: upgradePlan,
    upgradeHtml: upgradeHtml,
    syncDealBanner: syncDealBanner,
    cardsAtLeast: cardsAtLeast,
    all: function () { return gpus || []; }
  };
})();
