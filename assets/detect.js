/* CanMySpec "Detect My PC" — reads the visitor's GPU, OS and RAM in the browser.
 *
 * Nothing leaves the page: the GPU comes from the WebGL renderer string, the OS
 * from the user-agent hints and the RAM from navigator.deviceMemory. Browsers
 * often mask the GPU ("Apple GPU") or cap the RAM report at 8 GB, so this file
 * reports what it actually found and says plainly when it could not read
 * something instead of guessing a card.
 */
(function () {
  'use strict';

  /* Words that appear in renderer strings but carry no model information.
     Dropping them lets "INTEL(R) UHD GRAPHICS 620" match the "UHD 620" option. */
  var NOISE = {
    ANGLE: 1, OPENGL: 1, OPENGLES: 1, VULKAN: 1, METAL: 1, RENDERER: 1, D3D11: 1, D3D12: 1,
    DIRECT3D: 1, DIRECT3D11: 1, NVIDIA: 1, GEFORCE: 1, AMD: 1, RADEON: 1, INTEL: 1, APPLE: 1,
    CORPORATION: 1, CORP: 1, INC: 1, LTD: 1, LLC: 1, GRAPHICS: 1, GRAPHIC: 1, GPU: 1,
    FAMILY: 1, SERIES: 1, MOBILE: 1, VERSION: 1, UNSPECIFIED: 1, COMPATIBILITY: 1, PROFILE: 1,
    GOOGLE: 1, MESA: 1, DRM: 1, VS: 1, PS: 1, R: 1, TM: 1, C: 1
  };

  function readRenderer() {
    var kinds = ['webgl2', 'webgl', 'experimental-webgl'];
    for (var i = 0; i < kinds.length; i++) {
      var gl = null;
      try {
        var canvas = document.createElement('canvas');
        gl = canvas.getContext(kinds[i], { failIfMajorPerformanceCaveat: false });
      } catch (e) { gl = null; }
      if (!gl) continue;
      try {
        var info = gl.getExtension('WEBGL_debug_renderer_info');
        var raw = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : null;
        if (!raw) raw = gl.getParameter(gl.RENDERER);
        try {
          var lose = gl.getExtension('WEBGL_lose_context');
          if (lose) lose.loseContext();
        } catch (e2) { /* context cleanup is best effort */ }
        if (raw) return String(raw);
      } catch (e3) { /* a blocked extension means an unreadable GPU, not a crash */ }
    }
    return null;
  }

  function tokens(raw) {
    var parts = String(raw || '').toUpperCase().replace(/[^A-Z0-9]+/g, ' ').split(' ');
    var out = [];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (!p || NOISE[p]) continue;
      out.push(p);
    }
    return out;
  }

  function hasSequence(hay, needle) {
    if (!needle.length || needle.length > hay.length) return -1;
    for (var i = 0; i + needle.length <= hay.length; i++) {
      var ok = true;
      for (var j = 0; j < needle.length; j++) {
        if (hay[i + j] !== needle[j]) { ok = false; break; }
      }
      if (ok) return i;
    }
    return -1;
  }

  function isSoftware(raw) {
    return /swiftshader|llvmpipe|softpipe|software rasterizer|basic render driver|microsoft basic|mesa offscreen/i.test(String(raw || ''));
  }

  function isAppleSilicon(raw) {
    var s = String(raw || '');
    if (!/apple/i.test(s)) return false;
    return /apple\s*(m\d|gpu|a\d)/i.test(s) || /metal/i.test(s);
  }

  /* Match the renderer against the cards this site tracks. The longest name
     wins, so "RTX 4070 Ti" is preferred over "RTX 4070" when both appear. */
  function matchGpu(list, raw) {
    var hay = tokens(raw);
    var best = null;
    var bestLen = 0;
    var bestPos = 1e9;
    for (var i = 0; i < list.length; i++) {
      var opt = list[i];
      if (!opt || opt.kind !== 'gpu' || !opt.name) continue;
      var needle = tokens(opt.name);
      if (!needle.length) continue;
      var pos = hasSequence(hay, needle);
      if (pos < 0) continue;
      if (needle.length > bestLen || (needle.length === bestLen && pos < bestPos)) {
        best = opt;
        bestLen = needle.length;
        bestPos = pos;
      }
    }
    if (best) return { option: best, approximate: false };

    /* A card we do not list (e.g. RX 7900 GRE) still shares a brand and model
       number with one we do; say so rather than picking nothing. */
    for (var k = 0; k < list.length; k++) {
      var cand = list[k];
      if (!cand || cand.kind !== 'gpu' || !cand.name) continue;
      var cwords = tokens(cand.name);
      if (cwords.length < 2) continue;
      var brand = cwords[0];
      var number = null;
      for (var n = 1; n < cwords.length; n++) { if (/^\d+$/.test(cwords[n])) { number = cwords[n]; break; } }
      if (!number) continue;
      if (hay.indexOf(brand) === -1 || hay.indexOf(number) === -1) continue;
      // Fewer extra words means a closer name; on a tie take the slower card,
      // so an untracked model is never flattered with a faster one's score.
      if (!best || cwords.length < bestLen ||
          (cwords.length === bestLen && (cand.score || 0) < (best.score || 0))) {
        best = cand;
        bestLen = cwords.length;
      }
    }
    if (best) return { option: best, approximate: true };
    return { option: null, approximate: false };
  }

  function readOs() {
    var platform = '';
    try {
      platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
    } catch (e) { platform = navigator.platform || ''; }
    var ua = navigator.userAgent || '';
    var touchMac = /Mac/i.test(platform) && navigator.maxTouchPoints > 1 && /Mobile/i.test(ua);
    var mobile = /Android|iPhone|iPad|iPod|Windows Phone|Mobile/i.test(ua) && !/Windows NT/i.test(ua);
    var os = '';
    if (/Win/i.test(platform) || /Windows NT/i.test(ua)) os = 'windows';
    else if (/Mac/i.test(platform) || /Mac OS X/i.test(ua)) os = touchMac ? '' : 'mac';
    else if (/CrOS/i.test(ua)) os = 'linux';
    else if (/Linux|X11/i.test(platform) || /Linux|X11/i.test(ua)) os = 'linux';
    return { os: os, mobile: mobile || touchMac };
  }

  function readRam() {
    var dm = navigator.deviceMemory;
    if (dm === undefined || dm === null || isNaN(dm)) return { value: null, state: 'unknown', raw: null };
    var val = Number(dm);
    if (val >= 8) return { value: 8, state: 'capped', raw: val };
    if (val >= 4) return { value: 4, state: 'reported', raw: val };
    return { value: null, state: 'low', raw: val };
  }

  function sniff(list) {
    var raw = readRenderer();
    var result = {
      renderer: raw,
      gpu: null,
      gpuState: 'unknown',
      approximate: false,
      os: '',
      osState: 'unknown',
      mobile: false,
      ram: null,
      ramState: 'unknown',
      ramRaw: null
    };

    var osInfo = readOs();
    result.os = osInfo.os;
    result.mobile = osInfo.mobile;
    result.osState = osInfo.mobile ? 'mobile' : (osInfo.os ? 'ok' : 'unknown');

    var ram = readRam();
    result.ram = ram.value;
    result.ramState = ram.state;
    result.ramRaw = ram.raw;

    if (!raw) {
      result.gpuState = 'no-webgl';
      return result;
    }
    if (isSoftware(raw)) {
      result.gpuState = 'software';
      return result;
    }
    if (isAppleSilicon(raw)) {
      result.gpuState = 'apple';
      if (result.osState === 'unknown') result.os = 'mac';
      if (result.osState !== 'mobile') result.osState = 'ok';
      return result;
    }
    var hit = matchGpu(list || [], raw);
    if (hit.option) {
      result.gpu = hit.option;
      result.approximate = hit.approximate;
      result.gpuState = hit.approximate ? 'approx' : 'match';
      return result;
    }
    /* No model number at all means the browser hid the card rather than
       reporting one we lack. */
    var modelish = tokens(raw).some(function (t) {
      return /\d/.test(t) || /^(RTX|GTX|RX|ARC|UHD|IRIS|HD|R9)$/.test(t) || /^M\d$/.test(t);
    });
    result.gpuState = modelish ? 'unknown' : 'masked';
    return result;
  }

  function shortRaw(raw) {
    var s = String(raw || '');
    return s.length > 96 ? s.slice(0, 93) + '\u2026' : s;
  }

  function t(key, vars) {
    if (window.CMS && window.CMS.t) return window.CMS.t(key, vars);
    return key;
  }

  function osLabel(os) {
    if (os === 'windows') return t('detect.osWindows');
    if (os === 'mac') return t('detect.osMac');
    if (os === 'linux') return t('detect.osLinux');
    return '';
  }

  /* Human-readable lines, translated, for whichever page ran the detection. */
  function lines(res) {
    var out = [];
    if (!res) return out;
    var raw = shortRaw(res.renderer);
    switch (res.gpuState) {
      case 'match':
        out.push(t('detect.gpuLine', { gpu: res.gpu.name }));
        break;
      case 'approx':
        out.push(t('detect.gpuApprox', { gpu: res.gpu.name, raw: raw }));
        break;
      case 'masked':
        out.push(t('detect.gpuMasked', { raw: raw }));
        break;
      case 'apple':
        out.push(t('detect.gpuApple', { raw: raw }));
        break;
      case 'software':
        out.push(t('detect.gpuSoftware', { raw: raw }));
        break;
      case 'no-webgl':
        out.push(t('detect.gpuNoWebgl'));
        break;
      default:
        out.push(t('detect.gpuUnknown', { raw: raw }));
    }
    if (res.osState === 'ok' && res.os) out.push(t('detect.osLine', { os: osLabel(res.os) }));
    else if (res.osState === 'mobile') out.push(t('detect.osMobile'));
    else out.push(t('detect.osUnknown'));

    if (res.ramState === 'capped') out.push(t('detect.ramCapped'));
    else if (res.ramState === 'reported') out.push(t('detect.ramLine', { n: res.ram }));
    else if (res.ramState === 'low') out.push(t('detect.ramLow'));
    else out.push(t('detect.ramUnknown'));

    var n = applied(res);
    out.push(n ? t('detect.summary', { n: n }) : t('detect.summaryNone'));
    out.push(t('detect.privateNote'));
    return out;
  }

  function applied(res) {
    if (!res) return 0;
    var n = 0;
    if (res.gpu) n++;
    if (res.osState === 'ok' && res.os) n++;
    if (res.ram) n++;
    return n;
  }

  var STYLE_ID = 'cms-detect-style';
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var css = '' +
      '.detect-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:0 0 14px;}' +
      '.detect-btn{display:inline-flex;align-items:center;gap:7px;background:rgba(99,102,241,0.16);border:1px solid #6366f1;color:#e0e7ff;' +
      'font-family:inherit;font-size:13.5px;font-weight:700;padding:10px 16px;border-radius:9px;cursor:pointer;min-height:42px;}' +
      '.detect-btn:hover{background:rgba(99,102,241,0.32);color:#fff;}' +
      '.detect-btn:disabled{opacity:.6;cursor:progress;}' +
      '.detect-hint{font-size:12px;color:#94a3b8;}' +
      '.detect-panel{display:none;margin-top:4px;margin-bottom:14px;background:#0f172a;border:1px solid #334155;border-radius:10px;' +
      'padding:12px 14px;font-size:12.5px;line-height:1.7;color:#cbd5e1;}' +
      '.detect-panel.on{display:block;}' +
      '.detect-panel p{margin:0;}' +
      '.detect-panel p+p{margin-top:4px;}' +
      '.detect-panel .dp-note{color:#94a3b8;font-size:11.5px;}' +
      '.detect-panel .dp-ok{color:#a7f3d0;}' +
      '@media (max-width:768px){.detect-btn{width:100%;justify-content:center;min-height:46px;font-size:14px;}' +
      '.detect-panel{font-size:12.5px;padding:12px;}}';
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectStyle);
  } else {
    injectStyle();
  }

  window.CMSDetect = {
    sniff: sniff,
    lines: lines,
    applied: applied,
    readRenderer: readRenderer
  };
})();
