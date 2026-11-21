/* CanMySpec UI language layer (English / 한국어 / 日本語)
 *
 * One shared file for the home page, the 29 hardware guides and the 2,459 game
 * pages, so a translated page costs a single cached request instead of inlined
 * copy. Pages mark their own text with data-i18n="key"; anything the page scripts
 * build at runtime asks CMS.t('key', vars). Game titles, Steam requirement
 * strings and other publisher text stay in their original English.
 *
 * Language order: ?lang= → localStorage → navigator.language → English.
 */
(function () {
  'use strict';

  var LANGS = ['en', 'ko', 'ja'];
  var STORE_KEY = 'cms_lang';
  var STORE_EXPLICIT = 'cms_lang_explicit';

  var EN = {
    /* ---------------- shared chrome ---------------- */
    'common.home': 'Home',
    'common.pcGames': 'PC Games',
    'common.privacy': 'Privacy Policy',
    'common.terms': 'Terms of Service',
    'common.about': 'About & Contact',
    'common.sitemap': 'XML Sitemap',
    'common.gpuGuides': 'GPU & Spec Guides',
    'common.freeTools': '\ud83d\udee0\ufe0f Free AI Tools',
    'common.hardwareFilter': 'Hardware filter',
    'common.langLabel': 'Language',
    'common.langEn': 'English',
    'common.langKo': '\ud55c\uad6d\uc5b4',
    'common.langJa': '\u65e5\u672c\u8a9e',
    'common.footerIndex': '\u00a9 2026 CanMySpec.com \u00b7 PC System Requirements & Hardware Benchmarks Database',
    'common.footerGuides': '\u00a9 2026 CanMySpec.com \u00b7 Requirements are the official figures published by each game\u2019s publisher.',
    'common.footerGame': '\u00a9 2026 CanMySpec.com \u00b7 All game trademarks and assets belong to their respective publishers.',

    /* ---------------- home page ---------------- */
    'index.heroTitle': 'Can My PC Run It?',
    'index.heroSubtitle': 'Official PC system requirements, GPU benchmarks, and optimal 60 FPS graphics settings for thousands of PC games.',
    'index.searchPlaceholder': 'Search game (e.g. Cyberpunk, Wukong, Elden Ring...)',
    'index.searchAria': 'Search games',
    'index.searchClearAria': 'Clear search',
    'index.quickPicks': 'Quick picks:',
    'index.presetDeck': '\ud83c\udfae Deck Verified',
    'index.presetSmall': '\ud83d\udcbe Under 15 GB',
    'index.presetTiny': '\ud83e\udeb6 Under 5 GB',
    'index.presetAction': '\u2694\ufe0f Action',
    'index.presetLowend': '\ud83d\udcbb Low-spec friendly',
    'index.statGames': '🎮 <strong>{n}</strong> Benchmarked Games',
    'index.statFps': '\u26a1 60 FPS Target Guides',
    'index.statLive': '\ud83d\udd0d Live Instant Filter',
    'index.filterTitle': '\ud83c\udfaf Find games my PC can run',
    'index.filterDesc': 'Pick your GPU and RAM, then narrow by OS, genre or install size \u2014 every filter combines',
    'index.labelGpu': 'Graphics card (GPU)',
    'index.labelRam': 'System RAM',
    'index.labelShow': 'Show',
    'index.labelOs': 'Operating system',
    'index.labelGenre': 'Genre',
    'index.labelStorage': 'Install size',
    'index.labelDeck': 'Steam Deck',
    'index.labelSort': 'Sort',
    'index.gpuPlaceholder': 'Select your GPU\u2026',
    'index.anyRam': 'Any RAM',
    'index.ramGb': '{n} GB',
    'index.ramGbPlus': '{n} GB+',
    'index.modeAll': 'Every game it can run',
    'index.modeRec': 'Only 60 FPS recommended',
    'index.moreFilters': 'More filters',
    'index.hideFilters': 'Hide extra filters',
    'index.anyOs': 'Any OS ({n})',
    'index.osWindows': 'Windows ({n})',
    'index.osMac': 'macOS ({n})',
    'index.osLinux': 'Linux / SteamOS ({n})',
    'index.osMobile': 'iOS / Android ({n})',
    'index.anyGenre': 'Any genre',
    'index.anySize': 'Any install size',
    'index.sizeUnder': 'Under {n} GB ({c})',
    'index.anyDeck': 'Any status',
    'index.deckVerified': '\u2605 Verified ({n})',
    'index.deckPlayable': 'Playable or better ({n})',
    'index.deckUnsupported': 'Unsupported ({n})',
    'index.sortPopular': 'Most popular (reviews)',
    'index.sortRated': 'Highest rated (% positive)',
    'index.sortLowspec': 'Lowest spec (easy to run)',
    'index.sortNewest': 'Newest first',
    'index.sortAz': 'A \u2013 Z',
    'index.copyLink': '\ud83d\udd17 Copy link to this filter',
    'index.copied': '\u2705 Link copied',
    'index.copyPrompt': 'Copy this link:',
    'index.resetAll': 'Reset all',
    'index.filterNote': 'OS and Steam Deck status come from Steam\u2019s live store platform data: macOS and Linux mean a native build is listed (Proton playability is not counted), and Deck status is Steam\u2019s own Verified / Playable / Unsupported rating. Install sizes are listed for {sized} of {total} games \u2014 titles without a listed size are hidden while an install-size filter is on.',
    'index.quickHubs': 'Popular guides:',
    'index.gridTitleDefault': 'Featured Trending PC Games',
    'index.gridTitleSearch': 'Search results',
    'index.gridTitleFiltered': 'Filtered games',
    'index.gridTitleGpu': 'Games {gpu} can run',
    'index.gridSubDefault': 'Instant Search Enabled',
    'index.gridSubActive': '{n} filter active',
    'index.gridSubActivePlural': '{n} filters active',
    'index.gridSubActivePlural': '{n} filters active',
    'index.gridSubFiltered': 'Filtered from the full database',
    'index.pageInfo': 'Showing {from} - {to} of {total} games (Page {page} of {pages})',
    'index.prev': '\u2190 Prev',
    'index.next': 'Next \u2192',
    'index.noMatches': 'No matching games found.',
    'index.emptySearch': 'No game matching \u201c{q}\u201d also matches the other filters. Remove one of them, or clear the search, to widen the list.',
    'index.emptyCombo': 'No games match this combination. Remove a filter from the row above to widen the list.',
    'index.emptySingle': 'No games match this filter. Try a different setting.',
    'index.active': 'Active:',
    'index.removeFilter': 'Remove this filter',
    'index.recOnlyChip': '60 FPS recommended only',
    'index.ramChip': '{n} GB RAM',
    'index.sortChip': 'Sort: {label}',
    'index.suggestEmpty': 'No game title contains \u201c{q}\u201d. Try a shorter word.',
    'index.suggestAll': 'Show {n} title match in the grid \u2192',
    'index.suggestAllPlural': 'Show {n} title matches in the grid \u2192',
    'index.resRun': '<strong>{n}</strong> games run on {gpu}',
    'index.resRunRam': '<strong>{n}</strong> games run on {gpu} with {ram} GB RAM',
    'index.resFps': '\u00b7 <strong>{n}</strong> at 60 FPS on recommended settings',
    'index.resMinOnly': '\u00b7 {n} at minimum settings only',
    'index.resFiltered': '<strong>{n}</strong> games match these filters',
    'index.resPickGpu': '\u00b7 pick a GPU to see which reach 60 FPS on it',
    'index.resNoSize': '\u00b7 {n} games without a listed install size aren\u2019t shown',
    'index.hubTitle': 'Browse games by GPU & PC specs',
    'index.hubDesc': 'Every guide lists the games that hardware runs at 60 FPS, matched from official Steam requirements.',
    'index.hubGpus': 'Graphics cards',
    'index.hubSpecs': 'Laptops, handhelds & budget builds',
    'index.hubAll': 'See all GPU & PC spec guides \u2192',
    'index.cardGpu': 'GPU: {label}',
    'index.badgeFps': '60 FPS',
    'index.badgeMin': 'Minimum',
    'index.loading': 'Loading the full game index\u2026',
    'index.seeSteam': 'See official page',

    /* ---------------- genre names ---------------- */
    'genre.action': 'Action ({n})',
    'genre.indie': 'Indie ({n})',
    'genre.adventure': 'Adventure ({n})',
    'genre.rpg': 'RPG ({n})',
    'genre.casual': 'Casual ({n})',
    'genre.simulation': 'Simulation ({n})',
    'genre.strategy': 'Strategy ({n})',
    'genre.free': 'Free To Play ({n})',
    'genre.mmo': 'Massively Multiplayer ({n})',
    'genre.racing': 'Racing ({n})',
    'genre.sports': 'Sports ({n})',
    'genre.earlyaccess': 'Early Access ({n})',

    /* ---------------- hardware guide pages ---------------- */
    'hub.statFps': 'Games at 60 FPS (recommended)',
    'hub.statMin': 'Playable at minimum specs',
    'hub.statTotal': 'Games in the database',
    'hub.searchPlaceholder': 'Search the games on this page\u2026',
    'hub.openFilter': 'Open this hardware in the full filter \u2192',
    'hub.recTitle': 'Best games on this hardware at 60 FPS',
    'hub.minTitle': 'Playable at minimum settings',
    'hub.howTitle': 'How this list is matched',
    'hub.howP1': 'Every entry comes from the official minimum and recommended requirements published on each game\u2019s Steam store page. We compare the GPU and RAM each game asks for against the hardware in this guide, and mark a game <strong>60 FPS at recommended settings</strong> only when its recommended requirement is met, or <strong>playable at minimum</strong> when only the minimum is met.',
    'hub.howP2': 'GPU tiers are ordered by approximate 1080p relative performance, so a card is compared against the required card rather than by name. Requirements that only name a VRAM size ("2 GB VRAM") are placed on the same scale. Where Steam publishes no recommended GPU, the game is never marked as 60 FPS recommended.',
    'hub.howP3': 'Lists are sorted by Steam review count, so the most played games come first. Counts are rebuilt every time the database grows \u2014 see <a href="../index.html">the full hardware filter</a> for an exact match against your own GPU, RAM and frame target.',
    'hub.chipsTitle': 'Other GPU & PC spec guides',
    'hub.faqTitle': 'Frequently asked questions',
    'hub.emptyRec': 'No game in the database lists a recommended requirement this hardware meets.',
    'hub.emptyMin': 'No game here only meets the minimum requirement on this hardware \u2014 every match clears the recommended spec.',
    'hub.emptySearch': 'No game on this page matches that search.',
    'hub.recNoteAll': 'All {n} games whose recommended GPU and RAM requirements this hardware meets, sorted by Steam review count.',
    'hub.recNoteLimited': 'Showing the {limit} most reviewed of {n} games whose recommended requirements this hardware meets. Search the box above to narrow them.',
    'hub.recNoteNone': 'This hardware falls below the recommended GPU of every tracked game.',
    'hub.minNote': 'These titles list a minimum requirement this hardware meets but a recommended one it does not: expect low settings and lower frame rates.',
    'hub.minNoteLimited': 'Showing the {limit} most reviewed of {n} games that only meet the minimum requirement on this hardware.',
    'hub.chipGpus': 'Graphics cards',
    'hub.chipSpecs': 'Laptops, handhelds & budget builds',
    'hub.guidesCrumb': 'GPU & PC Spec Guides',
    'hub.h1': 'Games You Can Run on {full}',

    /* ---------------- hardware guide index ---------------- */
    'hubIndex.title': 'Games by GPU & PC Spec',
    'hubIndex.lead': '{hubs} guides covering every graphics card tier we track, plus laptops, handhelds and budget builds. Each page lists the games that hardware runs at 60 FPS on recommended settings, then the ones that only meet minimum specs \u2014 all matched from the official Steam requirements of {total} games.',
    'hubIndex.gpus': 'Graphics cards',
    'hubIndex.specs': 'Laptops, handhelds & budget builds',
    'hubIndex.cardMeta': '{rec} games at 60 FPS \u00b7 {min} playable',

    /* ---------------- game pages ---------------- */
    'game.verdictLabel': '\ud83d\ude80 Recommended GPU:',
    'game.verdictTarget': 'Target: 60 FPS',
    'game.specsTitle': 'Official PC System Requirements',
    'game.minTitle': 'Minimum Requirements',
    'game.recTitle': 'Recommended Requirements',
    'game.ultraTitle': '4K Ultra / Enthusiast',
    'game.os': 'OS',
    'game.cpu': 'CPU',
    'game.gpu': 'GPU',
    'game.ram': 'RAM',
    'game.vram': 'VRAM',
    'game.storage': 'Storage',
    'game.directx': 'DirectX',
    'game.hwTitle': 'Which GPUs Run {title}?',
    'game.hwLabelMin': 'Minimum GPU',
    'game.hwLabelRec': 'Recommended GPU (60 FPS)',
    'game.hwLabelMemory': 'Memory',
    'game.hwTier': '{tier} tier',
    'game.hwTierRecommended': 'Recommended: {v}',
    'game.hwNotStated': 'Not stated',
    'game.hwRecLabel': '60 FPS on recommended settings:',
    'game.hwRecText': 'this card and everything above it \u2014 guides for',
    'game.hwMinLabel': 'Minimum settings only:',
    'game.hwMinText': 'below the recommended card \u2014 guides for',
    'game.hwAllGuides': 'All GPU & PC spec guides',
    'game.hwFilterMine': 'Filter all games by your own hardware',
    'game.checkerTitle': '\u26a1 Can My PC Run {title}? Instant Hardware Checker',
    'game.checkerDesc': 'Choose your graphics card and RAM to compare them with the official requirements above.',
    'game.checkerBtn': 'Check Compatibility',
    'game.seeAll': 'See every game your PC can run \u2192',
    'game.optTitle': 'Best Graphic Settings & FPS Boost Tips',
    'game.affTitle': 'Need a Hardware Upgrade for {title}?',
    'game.affText': 'Compare lowest prices on RTX 40-Series GPUs, gaming laptops, and high-speed NVMe SSDs.',
    'game.affBtn': 'Check Lowest Deals \ud83d\udc49',
    'game.faqTitle': 'Frequently Asked Questions',
    'game.relatedTitle': 'Explore More PC Benchmarks',
    'game.optGroupCards': 'Graphics cards',
    'game.optGroupPresets': 'Laptops, handhelds & budget builds',
    'game.anyRam': 'Any RAM',
    'game.pickGpu': 'Pick your graphics card first, then check again.',
    'game.noRequirement': 'This store page does not publish a GPU requirement we can compare against, so there is nothing to check here.',
    'game.resultRec': '\u2705 <strong>60 FPS recommended:</strong> {label} meets the recommended requirement ({req}). The publisher\u2019s target is {target}.',
    'game.resultMin': '\u26a0\ufe0f <strong>Minimum only:</strong> {label} meets the minimum requirement ({min}) and should hold {target} at low settings. For the 60 FPS target, {why}.',
    'game.resultBelow': '\u274c <strong>Below minimum:</strong> {label} \u2014 {why}. Expect frame rates well under the publisher\u2019s minimum target.',
    'game.whyGpuRec': 'the recommended GPU is {label}',
    'game.whyRamRec': 'the recommended RAM is {n} GB',
    'game.whyGpuMin': 'the GPU is below the minimum ({label})',
    'game.whyRamMin': 'the RAM is below the minimum ({n} GB)',
    'game.withRam': ' with {n} GB RAM',

    /* ---------------- hardware detection ---------------- */
    'detect.btn': '\ud83d\udda5\ufe0f Detect My PC',
    'detect.again': '\ud83d\udd04 Detect again',
    'detect.working': 'Reading your hardware\u2026',
    'detect.gpuLine': 'GPU: {gpu}',
    'detect.gpuApprox': 'GPU: {gpu} \u2014 your browser reports \u201c{raw}\u201d, which we matched to the closest card we track.',
    'detect.gpuMasked': 'GPU: hidden by your browser. For privacy it reports only \u201c{raw}\u201d, so nothing was pre-selected \u2014 pick your card in the list above.',
    'detect.gpuUnknown': 'GPU: \u201c{raw}\u201d is not a card we track, so the GPU filter stayed empty \u2014 pick yours above.',
    'detect.gpuApple': 'GPU: Apple silicon ({raw}) \u2014 our card list covers NVIDIA, AMD and Intel only, so nothing was pre-selected. The macOS filter is applied instead.',
    'detect.gpuNoWebgl': 'GPU: this browser exposes no WebGL, so the graphics card could not be read. Pick yours above.',
    'detect.gpuSoftware': 'GPU: your browser is drawing in software (\u201c{raw}\u201d), which hides the real card. Pick yours above.',
    'detect.osLine': 'OS: {os}',
    'detect.osUnknown': 'OS: not recognised, so the OS filter stayed open.',
    'detect.osWindows': 'Windows',
    'detect.osMac': 'macOS',
    'detect.osLinux': 'Linux',
    'detect.osMobile': 'OS: this looks like a phone or tablet \u2014 the filters describe Windows, macOS and Linux PCs, so the OS filter was left alone.',
    'detect.ramLine': 'RAM: {n} GB reported by the browser.',
    'detect.ramCapped': 'RAM: the browser only reports up to 8 GB, so 8 GB was selected. If your PC has 16 GB or more, choose it yourself above.',
    'detect.ramUnknown': 'RAM: this browser does not share memory size \u2014 choose your RAM above.',
    'detect.ramLow': 'RAM: the browser reports less than 4 GB, the smallest option we list \u2014 choose your RAM above.',
    'detect.summary': '{n} filters applied from your PC.',
    'detect.summaryNone': 'Nothing could be applied automatically.',
    'detect.privateNote': 'Detection runs entirely in your browser; nothing is sent anywhere.',
    'detect.checkerApplied': 'Your hardware was filled in \u2014 the check below was run for you.'
  };

  var KO = {
    'common.home': '\ud648',
    'common.pcGames': 'PC \uac8c\uc784',
    'common.privacy': '\uac1c\uc778\uc815\ubcf4\ucc98\ub9ac\ubc29\uce68',
    'common.terms': '\uc774\uc6a9\uc57d\uad00',
    'common.about': '\uc0ac\uc774\ud2b8 \uc18c\uac1c\u00b7\ubb38\uc758',
    'common.sitemap': 'XML \uc0ac\uc774\ud2b8\ub9f5',
    'common.gpuGuides': 'GPU\u00b7\uc0ac\uc591 \uac00\uc774\ub4dc',
    'common.freeTools': '\ud83d\udee0\ufe0f \ubb34\ub8cc AI \ud234',
    'common.hardwareFilter': '\ud558\ub4dc\uc6e8\uc5b4 \ud544\ud130',
    'common.langLabel': '\uc5b8\uc5b4',
    'common.langEn': '\uc601\uc5b4',
    'common.langKo': '\ud55c\uad6d\uc5b4',
    'common.langJa': '\uc77c\ubcf8\uc5b4',
    'common.footerIndex': '\u00a9 2026 CanMySpec.com \u00b7 PC \ucd5c\uc18c\u00b7\uad8c\uc7a5 \uc0ac\uc591 \ubc0f \ud558\ub4dc\uc6e8\uc5b4 \ubca4\uce58\ub9c8\ud06c \ub370\uc774\ud130\ubca0\uc774\uc2a4',
    'common.footerGuides': '\u00a9 2026 CanMySpec.com \u00b7 \uc0ac\uc591\uc740 \uac01 \uac8c\uc784\uc758 \ud37c\ube14\ub9ac\uc154\uac00 \uacf5\uac1c\ud55c \uacf5\uc2dd \uc218\uce58\uc785\ub2c8\ub2e4.',
    'common.footerGame': '\u00a9 2026 CanMySpec.com \u00b7 \ubaa8\ub4e0 \uac8c\uc784 \uc0c1\ud45c\uc640 \uc774\ubbf8\uc9c0\ub294 \uac01 \ud37c\ube14\ub9ac\uc154\uc758 \uc18c\uc720\ubb3c\uc785\ub2c8\ub2e4.',

    'index.heroTitle': '\ub0b4 PC\ub85c \ub3cc\uc544\uac08\uae4c?',
    'index.heroSubtitle': '\uc218\ucc9c \uac1c PC \uac8c\uc784\uc758 \uacf5\uc2dd \uc2dc\uc2a4\ud15c \uc694\uad6c \uc0ac\uc591, GPU \ubca4\uce58\ub9c8\ud06c\uc640 60 FPS\ub97c \uc704\ud55c \ucd5c\uc801 \uadf8\ub798\ud53d \uc124\uc815\uc744 \ud55c\ub208\uc5d0 \ud655\uc778\ud558\uc138\uc694.',
    'index.searchPlaceholder': '게임 검색 (예: 사이버펑크, 오공, 엘든 링...)',
    'index.searchAria': '\uac8c\uc784 \uac80\uc0c9',
    'index.searchClearAria': '\uac80\uc0c9\uc5b4 \uc9c0\uc6b0\uae30',
    'index.quickPicks': '\ube60\ub978 \uc120\ud0dd:',
    'index.presetDeck': '\ud83c\udfae Deck \uac80\uc99d',
    'index.presetSmall': '\ud83d\udcbe 15 GB \ubbf8\ub9cc',
    'index.presetTiny': '\ud83e\udeb6 5 GB \ubbf8\ub9cc',
    'index.presetAction': '\u2694\ufe0f \uc561\uc158',
    'index.presetLowend': '\ud83d\udcbb \uc800\uc0ac\uc591\uc5d0 \uac15\ud55c',
    'index.statGames': '\ud83c\udfae <strong>{n}</strong>\uac1c \uac8c\uc784 \ubca4\uce58\ub9c8\ud06c',
    'index.statFps': '\u26a1 60 FPS \ubaa9\ud45c \uac00\uc774\ub4dc',
    'index.statLive': '\ud83d\udd0d \uc2e4\uc2dc\uac04 \uc989\uc2dc \ud544\ud130',
    'index.filterTitle': '\ud83c\udfaf \ub0b4 PC\ub85c \ub3cc\ub9ac\ub294 \uac8c\uc784 \ucc3e\uae30',
    'index.filterDesc': 'GPU\uc640 RAM\uc744 \uace0\ub978 \ub4a4 OS\u00b7\uc7a5\ub974\u00b7\uc124\uce58 \uc6a9\ub7c9\uc73c\ub85c \uc881\ud600 \ubcf4\uc138\uc694 \u2014 \ubaa8\ub4e0 \ud544\ud130\uac00 \ud568\uaed8 \uc801\uc6a9\ub429\ub2c8\ub2e4',
    'index.labelGpu': '\uadf8\ub798\ud53d\uce74\ub4dc(GPU)',
    'index.labelRam': '\uc2dc\uc2a4\ud15c RAM',
    'index.labelShow': '\ubcf4\uae30',
    'index.labelOs': '\uc6b4\uc601\uccb4\uc81c',
    'index.labelGenre': '\uc7a5\ub974',
    'index.labelStorage': '\uc124\uce58 \uc6a9\ub7c9',
    'index.labelDeck': 'Steam Deck',
    'index.labelSort': '\uc815\ub82c',
    'index.gpuPlaceholder': 'GPU\ub97c \uc120\ud0dd\ud558\uc138\uc694\u2026',
    'index.anyRam': 'RAM \ubb34\uad00',
    'index.ramGb': '{n} GB',
    'index.ramGbPlus': '{n} GB \uc774\uc0c1',
    'index.modeAll': '\uc2e4\ud589 \uac00\ub2a5\ud55c \ubaa8\ub4e0 \uac8c\uc784',
    'index.modeRec': '60 FPS \uad8c\uc7a5 \uc0ac\uc591\ub9cc',
    'index.moreFilters': '\ud544\ud130 \ub354 \ubcf4\uae30',
    'index.hideFilters': '\ucd94\uac00 \ud544\ud130 \uc811\uae30',
    'index.anyOs': '\ubaa8\ub4e0 OS ({n})',
    'index.osWindows': 'Windows ({n})',
    'index.osMac': 'macOS ({n})',
    'index.osLinux': 'Linux / SteamOS ({n})',
    'index.osMobile': 'iOS / Android ({n})',
    'index.anyGenre': '\ubaa8\ub4e0 \uc7a5\ub974',
    'index.anySize': '\ubaa8\ub4e0 \uc6a9\ub7c9',
    'index.sizeUnder': '{n} GB \ubbf8\ub9cc ({c})',
    'index.anyDeck': '\ubaa8\ub4e0 \ub4f1\uae09',
    'index.deckVerified': '\u2605 Verified ({n})',
    'index.deckPlayable': 'Playable \uc774\uc0c1 ({n})',
    'index.deckUnsupported': 'Unsupported ({n})',
    'index.sortPopular': '\uc778\uae30\uc21c (\ub9ac\ubdf0 \uc218)',
    'index.sortRated': '\ud3c9\uc810\uc21c (\uae0d\uc815\ub960)',
    'index.sortLowspec': '\uc0ac\uc591 \ub0ae\uc740\uc21c (\uc26c\uc6b4 \uac8c\uc784)',
    'index.sortNewest': '\ucd5c\uc2e0\uc21c',
    'index.sortAz': 'A \u2013 Z',
    'index.copyLink': '\ud83d\udd17 \uc774 \ud544\ud130 \ub9c1\ud06c \ubcf5\uc0ac',
    'index.copied': '\u2705 \ub9c1\ud06c \ubcf5\uc0ac\ub428',
    'index.copyPrompt': '\uc774 \ub9c1\ud06c\ub97c \ubcf5\uc0ac\ud558\uc138\uc694:',
    'index.resetAll': '\uc804\uccb4 \ucd08\uae30\ud654',
    'index.filterNote': 'OS\uc640 Steam Deck \uc815\ubcf4\ub294 Steam \uc2a4\ud1a0\uc5b4\uc758 \uc2e4\uc2dc\uac04 \ud50c\ub7ab\ud3fc \ub370\uc774\ud130\ub97c \ub530\ub985\ub2c8\ub2e4. macOS\u00b7Linux\ub294 \ub124\uc774\ud2f0\ube0c \ube4c\ub4dc\uac00 \ub4f1\ub85d\ub41c \uacbd\uc6b0\ub9cc \ud45c\uc2dc\ud558\uace0(Proton \ud638\ud658\uc740 \uc81c\uc678), Deck \ub4f1\uae09\uc740 Steam \uacf5\uc2dd Verified\u00b7Playable\u00b7Unsupported \ud310\uc815\uc785\ub2c8\ub2e4. \uc124\uce58 \uc6a9\ub7c9\uc740 \uc804\uccb4 {total}\uac1c \uc911 {sized}\uac1c \uac8c\uc784\uc5d0\ub9cc \uacf5\uac1c\ub418\uc5b4, \uc6a9\ub7c9 \ud544\ud130\ub97c \ucf1c\uba74 \uc6a9\ub7c9 \ubbf8\uacf5\uac1c \uac8c\uc784\uc740 \ubaa9\ub85d\uc5d0\uc11c \ube60\uc9d1\ub2c8\ub2e4.',
    'index.quickHubs': '\uc778\uae30 \uac00\uc774\ub4dc:',
    'index.gridTitleDefault': '\ucd94\ucc9c \uc778\uae30 PC \uac8c\uc784',
    'index.gridTitleSearch': '\uac80\uc0c9 \uacb0\uacfc',
    'index.gridTitleFiltered': '\ud544\ud130\ub41c \uac8c\uc784',
    'index.gridTitleGpu': '{gpu}\ub85c \ub3cc\ub9ac\ub294 \uac8c\uc784',
    'index.gridSubDefault': '\uc989\uc2dc \uac80\uc0c9 \uc0ac\uc6a9 \uac00\ub2a5',
    'index.gridSubActive': '\ud544\ud130 {n}\uac1c \uc801\uc6a9 \uc911',
    'index.gridSubActivePlural': '\ud544\ud130 {n}\uac1c \uc801\uc6a9 \uc911',
    'index.gridSubActivePlural': '\ud544\ud130 {n}\uac1c \uc801\uc6a9 \uc911',
    'index.gridSubFiltered': '\uc804\uccb4 \ub370\uc774\ud130\ubca0\uc774\uc2a4\uc5d0\uc11c \ud544\ud130\ub9c1',
    'index.pageInfo': '{total}\uac1c \uc911 {from} - {to}\ubc88 \ud45c\uc2dc (\ud398\uc774\uc9c0 {page} / {pages})',
    'index.prev': '\u2190 \uc774\uc804',
    'index.next': '\ub2e4\uc74c \u2192',
    'index.noMatches': '\uc870\uac74\uc5d0 \ub9de\ub294 \uac8c\uc784\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.',
    'index.emptySearch': '\u201c{q}\u201d\uc640 \uac19\uc740 \uac8c\uc784 \uc911 \ub2e4\ub978 \ud544\ud130\ub97c \ubaa8\ub450 \ub9cc\uc871\ud558\ub294 \uac8c\uc784\uc774 \uc5c6\uc2b5\ub2c8\ub2e4. \ud544\ud130\ub97c \ud558\ub098 \ud574\uc81c\ud558\uac70\ub098 \uac80\uc0c9\uc5b4\ub97c \uc9c0\uc6b0\uba74 \ubaa9\ub85d\uc774 \ub113\uc5b4\uc9d1\ub2c8\ub2e4.',
    'index.emptyCombo': '\uc774 \uc870\uac74\uc5d0 \ub9de\ub294 \uac8c\uc784\uc774 \uc5c6\uc2b5\ub2c8\ub2e4. \uc704 \ud589\uc5d0\uc11c \ud544\ud130\ub97c \ud558\ub098 \ud574\uc81c\ud574 \ubcf4\uc138\uc694.',
    'index.emptySingle': '\uc774 \ud544\ud130\uc5d0 \ub9de\ub294 \uac8c\uc784\uc774 \uc5c6\uc2b5\ub2c8\ub2e4. \ub2e4\ub978 \uc124\uc815\uc744 \uc120\ud0dd\ud574 \ubcf4\uc138\uc694.',
    'index.active': '\uc801\uc6a9 \uc911:',
    'index.removeFilter': '\uc774 \ud544\ud130 \ud574\uc81c',
    'index.recOnlyChip': '60 FPS \uad8c\uc7a5 \uc0ac\uc591\ub9cc',
    'index.ramChip': 'RAM {n} GB',
    'index.sortChip': '\uc815\ub82c: {label}',
    'index.suggestEmpty': '\u201c{q}\u201d\uac00 \ud3ec\ud568\ub41c \uac8c\uc784 \uc81c\ubaa9\uc774 \uc5c6\uc2b5\ub2c8\ub2e4. \ub354 \uc9e7\uac8c \uc785\ub825\ud574 \ubcf4\uc138\uc694.',
    'index.suggestAll': '\uc81c\ubaa9\uc774 \uc77c\uce58\ud558\ub294 {n}\uac1c \uac8c\uc784\uc744 \ubaa9\ub85d\uc5d0\uc11c \ubcf4\uae30 \u2192',
    'index.suggestAllPlural': '\uc81c\ubaa9\uc774 \uc77c\uce58\ud558\ub294 {n}\uac1c \uac8c\uc784\uc744 \ubaa9\ub85d\uc5d0\uc11c \ubcf4\uae30 \u2192',
    'index.resRun': '<strong>{n}</strong>\uac1c \uac8c\uc784\uc774 {gpu}\uc5d0\uc11c \uc2e4\ud589\ub429\ub2c8\ub2e4',
    'index.resRunRam': '<strong>{n}</strong>\uac1c \uac8c\uc784\uc774 {gpu} + RAM {ram} GB\uc5d0\uc11c \uc2e4\ud589\ub429\ub2c8\ub2e4',
    'index.resFps': '\u00b7 \uad8c\uc7a5 \uc124\uc815\uc5d0\uc11c 60 FPS: <strong>{n}</strong>\uac1c',
    'index.resMinOnly': '\u00b7 \ucd5c\uc18c \uc0ac\uc591\uc5d0\uc11c\ub9cc: {n}\uac1c',
    'index.resFiltered': '\uc774 \ud544\ud130\ub97c \ub9cc\uc871\ud558\ub294 \uac8c\uc784 <strong>{n}</strong>\uac1c',
    'index.resPickGpu': '\u00b7 GPU\ub97c \uc120\ud0dd\ud558\uba74 \uc5b4\ub290 \uac8c\uc784\uc774 60 FPS\uc778\uc9c0 \ubcf4\uc785\ub2c8\ub2e4',
    'index.resNoSize': '\u00b7 \uc124\uce58 \uc6a9\ub7c9\uc774 \uacf5\uac1c\ub418\uc9c0 \uc54a\uc740 \uac8c\uc784 {n}\uac1c\ub294 \ud45c\uc2dc\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4',
    'index.hubTitle': 'GPU\u00b7PC \uc0ac\uc591\ubcc4\ub85c \uac8c\uc784 \ucc3e\uae30',
    'index.hubDesc': '\uac01 \uac00\uc774\ub4dc\ub294 \ud574\ub2f9 \ud558\ub4dc\uc6e8\uc5b4\ub85c 60 FPS\ub85c \ub3cc\ub9ac\ub294 \uac8c\uc784\uc744 Steam \uacf5\uc2dd \uc0ac\uc591\uc5d0\uc11c \ub9e4\uce6d\ud574 \ubcf4\uc5ec \uc90d\ub2c8\ub2e4.',
    'index.hubGpus': '\uadf8\ub798\ud53d\uce74\ub4dc',
    'index.hubSpecs': '\ub178\ud2b8\ubd81\u00b7\ud578\ub4dc\ud5ec\ub4dc\u00b7\ubcf4\uae09\ud615 PC',
    'index.hubAll': '\ubaa8\ub4e0 GPU\u00b7\uc0ac\uc591 \uac00\uc774\ub4dc \ubcf4\uae30 \u2192',
    'index.cardGpu': 'GPU: {label}',
    'index.badgeFps': '60 FPS',
    'index.badgeMin': '\ucd5c\uc18c \uc0ac\uc591',
    'index.loading': '\uc804\uccb4 \uac8c\uc784 \uc778\ub371\uc2a4\ub97c \ubd88\ub7ec\uc624\ub294 \uc911\u2026',
    'index.seeSteam': '\uacf5\uc2dd \ud398\uc774\uc9c0 \ubcf4\uae30',

    'genre.action': '\uc561\uc158 ({n})',
    'genre.indie': '\uc778\ub514 ({n})',
    'genre.adventure': '\uc5b4\ub4dc\ubca4\ucc98 ({n})',
    'genre.rpg': 'RPG ({n})',
    'genre.casual': '\uce90\uc8fc\uc5bc ({n})',
    'genre.simulation': '\uc2dc\ubbac\ub808\uc774\uc158 ({n})',
    'genre.strategy': '\uc804\ub7b5 ({n})',
    'genre.free': '\ubb34\ub8cc \ud50c\ub808\uc774 ({n})',
    'genre.mmo': '\ub300\uaddc\ubaa8 \uba40\ud2f0\ud50c\ub808\uc774 ({n})',
    'genre.racing': '\ub808\uc774\uc2f1 ({n})',
    'genre.sports': '\uc2a4\ud3ec\uce20 ({n})',
    'genre.earlyaccess': '\uc5b4\ub4dc\ubca4\ucc98 ({n})',

    'hub.statFps': '60 FPS \uac8c\uc784 (\uad8c\uc7a5 \uc0ac\uc591)',
    'hub.statMin': '\ucd5c\uc18c \uc0ac\uc591\uc73c\ub85c \uc2e4\ud589 \uac00\ub2a5',
    'hub.statTotal': '\ub370\uc774\ud130\ubca0\uc774\uc2a4 \ub4f1\ub85d \uac8c\uc784',
    'hub.searchPlaceholder': '\uc774 \ud398\uc774\uc9c0\uc758 \uac8c\uc784 \uac80\uc0c9\u2026',
    'hub.openFilter': '\uc774 \ud558\ub4dc\uc6e8\uc5b4\ub85c \uc804\uccb4 \ud544\ud130 \uc5f4\uae30 \u2192',
    'hub.recTitle': '\uc774 \ud558\ub4dc\uc6e8\uc5b4\ub85c 60 FPS\ub85c \uc990\uae30\ub294 \uac8c\uc784',
    'hub.minTitle': '\ucd5c\uc18c \uc0ac\uc591\uc73c\ub85c \uc990\uae30\ub294 \uac8c\uc784',
    'hub.howTitle': '\uc774 \ubaa9\ub85d\uc740 \uc5b4\ub5bb\uac8c \ub9e4\uce6d\ub418\ub098\uc694?',
    'hub.howP1': '\ubaa8\ub4e0 \ud56d\ubaa9\uc740 \uac01 \uac8c\uc784\uc758 Steam \uc2a4\ud1a0\uc5b4 \ud398\uc774\uc9c0\uc5d0 \uacf5\uac1c\ub41c \uacf5\uc2dd \ucd5c\uc18c\u00b7\uad8c\uc7a5 \uc0ac\uc591\uc5d0\uc11c \ucd9c\ubc1c\ud569\ub2c8\ub2e4. \uac8c\uc784\uc774 \uc694\uad6c\ud558\ub294 GPU\uc640 RAM\uc744 \uc774 \uac00\uc774\ub4dc\uc758 \ud558\ub4dc\uc6e8\uc5b4\uc640 \ube44\uad50\ud574, \uad8c\uc7a5 \uc0ac\uc591\uc744 \ub9cc\uc871\ud558\uba74 <strong>\uad8c\uc7a5 \uc124\uc815\uc5d0\uc11c 60 FPS</strong>, \ucd5c\uc18c \uc0ac\uc591\ub9cc \ub9cc\uc871\ud558\uba74 <strong>\ucd5c\uc18c \uc0ac\uc591\uc73c\ub85c \uc2e4\ud589 \uac00\ub2a5</strong>\uc73c\ub85c \ud45c\uc2dc\ud569\ub2c8\ub2e4.',
    'hub.howP2': 'GPU \ub4f1\uae09\uc740 1080p \uc0c1\ub300 \uc131\ub2a5 \ucd94\uc815\uce58\ub85c \uc815\ub82c\ub418\uc5b4 \uc788\uc5b4, \uc774\ub984\uc774 \uc544\ub2c8\ub77c \uc131\ub2a5\uc73c\ub85c \ube44\uad50\ud569\ub2c8\ub2e4. VRAM \ud06c\uae30\ub9cc \uc801\ud78c \uc0ac\uc591(\u201c2 GB VRAM\u201d)\ub3c4 \uac19\uc740 \ucd95\uc5d0 \ub193\uc2b5\ub2c8\ub2e4. Steam\uc5d0 \uad8c\uc7a5 GPU\uac00 \uc5c6\ub294 \uac8c\uc784\uc740 60 FPS \uad8c\uc7a5\uc73c\ub85c \ud45c\uc2dc\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.',
    'hub.howP3': '\ubaa9\ub85d\uc740 Steam \ub9ac\ubdf0 \uc218 \uc21c\uc774\uba70, \uac00\uc7a5 \ub9ce\uc774 \uc990\uae34 \uac8c\uc784\uc774 \uc55e\uc5d0 \uc635\ub2c8\ub2e4. \ub370\uc774\ud130\ubca0\uc774\uc2a4\uac00 \uc99d\uc124\ub420 \ub54c\ub9c8\ub2e4 \uc9d1\uacc4\uac00 \ub2e4\uc2dc \uacc4\uc0b0\ub418\uba70, \ub0b4 GPU\u00b7RAM\u00b7\ud504\ub808\uc784 \ubaa9\ud45c\uc5d0 \uc815\ud655\ud788 \ub9de\ucd94\ub824\uba74 <a href="../index.html">\uc804\uccb4 \ud558\ub4dc\uc6e8\uc5b4 \ud544\ud130</a>\ub97c \uc0ac\uc6a9\ud558\uc138\uc694.',
    'hub.chipsTitle': '\ub2e4\ub978 GPU\u00b7PC \uc0ac\uc591 \uac00\uc774\ub4dc',
    'hub.faqTitle': '\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38',
    'hub.emptyRec': '\uc774 \ud558\ub4dc\uc6e8\uc5b4\uac00 \uad8c\uc7a5 \uc0ac\uc591\uc744 \ub9cc\uc871\ud558\ub294 \uac8c\uc784\uc774 \ub370\uc774\ud130\ubca0\uc774\uc2a4\uc5d0 \uc5c6\uc2b5\ub2c8\ub2e4.',
    'hub.emptyMin': '\uc774 \ud558\ub4dc\uc6e8\uc5b4\uc5d0\uc11c \ucd5c\uc18c \uc0ac\uc591\ub9cc \ub9cc\uc871\ud558\ub294 \uac8c\uc784\uc774 \uc5c6\uc2b5\ub2c8\ub2e4 \u2014 \ubaa8\ub4e0 \uac8c\uc784\uc774 \uad8c\uc7a5 \uc0ac\uc591\uc744 \ub118\uc2b5\ub2c8\ub2e4.',
    'hub.emptySearch': '\uc774 \ud398\uc774\uc9c0\uc5d0\uc11c \uac80\uc0c9\uc5b4\uc640 \uc77c\uce58\ud558\ub294 \uac8c\uc784\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.',
    'hub.recNoteAll': '\uc774 \ud558\ub4dc\uc6e8\uc5b4\uac00 \uad8c\uc7a5 GPU\u00b7RAM \uc0ac\uc591\uc744 \ub9cc\uc871\ud558\ub294 \uac8c\uc784 {n}\uac1c \uc804\uccb4\ub97c Steam \ub9ac\ubdf0 \uc218 \uc21c\uc73c\ub85c \uc815\ub82c\ud588\uc2b5\ub2c8\ub2e4.',
    'hub.recNoteLimited': '\uad8c\uc7a5 \uc0ac\uc591\uc744 \ub9cc\uc871\ud558\ub294 {n}\uac1c \uc911 \ub9ac\ubdf0\uac00 \uac00\uc7a5 \ub9ce\uc740 {limit}\uac1c\ub97c \ubcf4\uc5ec \uc90d\ub2c8\ub2e4. \uc704 \uac80\uc0c9\uc0c1\uc790\ub85c \uc881\ud600 \ubcf4\uc138\uc694.',
    'hub.recNoteNone': '\uc774 \ud558\ub4dc\uc6e8\uc5b4\ub294 \ucd94\uc801 \uc911\uc778 \ubaa8\ub4e0 \uac8c\uc784\uc758 \uad8c\uc7a5 GPU\ubcf4\ub2e4 \ub0ae\uc2b5\ub2c8\ub2e4.',
    'hub.minNote': '\ucd5c\uc18c \uc0ac\uc591\uc740 \ub9cc\uc871\ud558\uc9c0\ub9cc \uad8c\uc7a5 \uc0ac\uc591\uc740 \ubabb \ub9cc\uc871\ud558\ub294 \uac8c\uc784\uc785\ub2c8\ub2e4. \ub0ae\uc740 \uc124\uc815\uacfc \ub0ae\uc740 \ud504\ub808\uc784\uc744 \uc608\uc0c1\ud558\uc138\uc694.',
    'hub.minNoteLimited': '\uc774 \ud558\ub4dc\uc6e8\uc5b4\uc5d0\uc11c \ucd5c\uc18c \uc0ac\uc591\ub9cc \ub9cc\uc871\ud558\ub294 {n}\uac1c \uc911 \ub9ac\ubdf0\uac00 \uac00\uc7a5 \ub9ce\uc740 {limit}\uac1c\ub97c \ubcf4\uc5ec \uc90d\ub2c8\ub2e4.',
    'hub.chipGpus': '\uadf8\ub798\ud53d\uce74\ub4dc',
    'hub.chipSpecs': '\ub178\ud2b8\ubd81\u00b7\ud578\ub4dc\ud5ec\ub4dc\u00b7\ubcf4\uae09\ud615 PC',
    'hub.guidesCrumb': 'GPU\u00b7PC \uc0ac\uc591 \uac00\uc774\ub4dc',
    'hub.h1': '{name}\uc5d0\uc11c \ub3cc\ub9ac\ub294 \uac8c\uc784',

    'hubIndex.title': 'GPU\u00b7PC \uc0ac\uc591\ubcc4 \uac8c\uc784',
    'hubIndex.lead': '\ucd94\uc801 \uc911\uc778 \ubaa8\ub4e0 \uadf8\ub798\ud53d\uce74\ub4dc \ub4f1\uae09\uacfc \ub178\ud2b8\ubd81\u00b7\ud578\ub4dc\ud5ec\ub4dc\u00b7\ubcf4\uae09\ud615 PC\ub97c \ub2f4\uc740 \uac00\uc774\ub4dc {hubs}\uac1c\uc785\ub2c8\ub2e4. \uac01 \ud398\uc774\uc9c0\ub294 \ud574\ub2f9 \ud558\ub4dc\uc6e8\uc5b4\ub85c \uad8c\uc7a5 \uc124\uc815 60 FPS\ub85c \ub3cc\ub9ac\ub294 \uac8c\uc784\uacfc \ucd5c\uc18c \uc0ac\uc591\ub9cc \ub9cc\uc871\ud558\ub294 \uac8c\uc784\uc744 \ub098\ub204\uc5b4 \ubcf4\uc5ec \uc8fc\uba70, \ubaa8\ub450 {total}\uac1c \uac8c\uc784\uc758 Steam \uacf5\uc2dd \uc0ac\uc591\uc5d0\uc11c \ub9e4\uce6d\ud55c \uac83\uc785\ub2c8\ub2e4.',
    'hubIndex.gpus': '\uadf8\ub798\ud53d\uce74\ub4dc',
    'hubIndex.specs': '\ub178\ud2b8\ubd81\u00b7\ud578\ub4dc\ud5ec\ub4dc\u00b7\ubcf4\uae09\ud615 PC',
    'hubIndex.cardMeta': '60 FPS {rec}\uac1c \u00b7 \uc2e4\ud589 \uac00\ub2a5 {min}\uac1c',

    'game.verdictLabel': '\ud83d\ude80 \uad8c\uc7a5 GPU:',
    'game.verdictTarget': '\ubaa9\ud45c: 60 FPS',
    'game.specsTitle': '\uacf5\uc2dd PC \uc2dc\uc2a4\ud15c \uc0ac\uc591',
    'game.minTitle': '\ucd5c\uc18c \uc0ac\uc591',
    'game.recTitle': '\uad8c\uc7a5 \uc0ac\uc591',
    'game.ultraTitle': '4K \uc6b8\ud2b8\ub77c / \ud558\uc774\uc5d4\ub4dc',
    'game.os': 'OS',
    'game.cpu': 'CPU',
    'game.gpu': 'GPU',
    'game.ram': 'RAM',
    'game.vram': 'VRAM',
    'game.storage': '\uc800\uc7a5\uacf5\uac04',
    'game.directx': 'DirectX',
    'game.hwTitle': '{title} \u2014 \uc5b4\ub290 GPU\uc5d0\uc11c \ub3cc\uc544\uac08\uae4c?',
    'game.hwLabelMin': '\ucd5c\uc18c GPU',
    'game.hwLabelRec': '\uad8c\uc7a5 GPU (60 FPS)',
    'game.hwLabelMemory': '\uba54\ubaa8\ub9ac',
    'game.hwTier': '{tier} \ud2f0\uc5b4',
    'game.hwTierRecommended': '\uad8c\uc7a5: {v}',
    'game.hwNotStated': '\ubbf8\uacf5\uac1c',
    'game.hwRecLabel': '\uad8c\uc7a5 \uc124\uc815\uc5d0\uc11c 60 FPS:',
    'game.hwRecText': '\uc774 \uce74\ub4dc \uc774\uc0c1\uc774\uba74 \uac00\ub2a5 \u2014 \uac00\uc774\ub4dc:',
    'game.hwMinLabel': '\ucd5c\uc18c \uc124\uc815\uc5d0\uc11c\ub9cc:',
    'game.hwMinText': '\uad8c\uc7a5 \uce74\ub4dc\ubcf4\ub2e4 \ub0ae\uc74c \u2014 \uac00\uc774\ub4dc:',
    'game.hwAllGuides': '\ubaa8\ub4e0 GPU\u00b7PC \uc0ac\uc591 \uac00\uc774\ub4dc',
    'game.hwFilterMine': '\ub0b4 \ud558\ub4dc\uc6e8\uc5b4\ub85c \uc804\uccb4 \uac8c\uc784 \ud544\ud130\ud558\uae30',
    'game.checkerTitle': '\u26a1 {title} \ub0b4 PC\uc5d0\uc11c \ub3cc\uc544\uac08\uae4c? \uc989\uc2dc \ud558\ub4dc\uc6e8\uc5b4 \uccb4\ud06c',
    'game.checkerDesc': '\uadf8\ub798\ud53d\uce74\ub4dc\uc640 RAM\uc744 \uace0\ub974\uba74 \uc704\uc758 \uacf5\uc2dd \uc0ac\uc591\uacfc \ube44\uad50\ud574 \uc90d\ub2c8\ub2e4.',
    'game.checkerBtn': '\ud638\ud658\uc131 \ud655\uc778',
    'game.seeAll': '\ub0b4 PC\ub85c \ub3cc\ub9ac\ub294 \ubaa8\ub4e0 \uac8c\uc784 \ubcf4\uae30 \u2192',
    'game.optTitle': '\ucd5c\uc801 \uadf8\ub798\ud53d \uc124\uc815\uacfc FPS \ud5a5\uc0c1 \ud301',
    'game.affTitle': '{title} \u2014 \ud558\ub4dc\uc6e8\uc5b4 \uc5c5\uadf8\ub808\uc774\ub4dc\uac00 \ud544\uc694\ud558\uc2e0\uac00\uc694?',
    'game.affText': 'RTX 40 \uc2dc\ub9ac\uc988 GPU, \uac8c\uc774\ubc0d \ub178\ud2b8\ubd81, \uace0\uc18d NVMe SSD\uc758 \ucd5c\uc800\uac00\ub97c \ube44\uad50\ud574 \ubcf4\uc138\uc694.',
    'game.affBtn': '\ucd5c\uc800\uac00 \ud655\uc778 \ud83d\udc49',
    'game.faqTitle': '\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38',
    'game.relatedTitle': '\ub2e4\ub978 PC \ubca4\uce58\ub9c8\ud06c \ubcf4\uae30',
    'game.optGroupCards': '\uadf8\ub798\ud53d\uce74\ub4dc',
    'game.optGroupPresets': '\ub178\ud2b8\ubd81\u00b7\ud578\ub4dc\ud5ec\ub4dc\u00b7\ubcf4\uae09\ud615 PC',
    'game.anyRam': 'RAM \ubb34\uad00',
    'game.pickGpu': '\uba3c\uc800 \uadf8\ub798\ud53d\uce74\ub4dc\ub97c \uc120\ud0dd\ud55c \ub4a4 \ub2e4\uc2dc \ud655\uc778\ud574 \uc8fc\uc138\uc694.',
    'game.noRequirement': '\uc774 \uc2a4\ud1a0\uc5b4 \ud398\uc774\uc9c0\ub294 \ube44\uad50\ud560 \uc218 \uc788\ub294 GPU \uc0ac\uc591\uc744 \uacf5\uac1c\ud558\uc9c0 \uc54a\uc544 \ud655\uc778\ud560 \ud56d\ubaa9\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.',
    'game.resultRec': '\u2705 <strong>60 FPS \uad8c\uc7a5:</strong> {label}\uc740(\ub294) \uad8c\uc7a5 \uc0ac\uc591({req})\uc744 \ub9cc\uc871\ud569\ub2c8\ub2e4. \ud37c\ube14\ub9ac\uc154 \ubaa9\ud45c\ub294 {target}\uc785\ub2c8\ub2e4.',
    'game.resultMin': '\u26a0\ufe0f <strong>\ucd5c\uc18c \uc0ac\uc591\ub9cc \ucda9\uc871:</strong> {label}\uc740(\ub294) \ucd5c\uc18c \uc0ac\uc591({min})\uc744 \ub9cc\uc871\ud558\uba70 \ub0ae\uc740 \uc124\uc815\uc5d0\uc11c {target}\uc744 \uae30\ub300\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. 60 FPS\ub97c \uc704\ud574\uc11c\ub294 {why}.',
    'game.resultBelow': '\u274c <strong>\ucd5c\uc18c \uc0ac\uc591 \ubbf8\ub2ec:</strong> {label} \u2014 {why}. \ud37c\ube14\ub9ac\uc154\uc758 \ucd5c\uc18c \ubaa9\ud45c\ubcf4\ub2e4 \ud06c\uac8c \ub0ae\uc740 \ud504\ub808\uc784\uc744 \uc608\uc0c1\ud558\uc138\uc694.',
    'game.whyGpuRec': '\uad8c\uc7a5 GPU\ub294 {label}',
    'game.whyRamRec': '\uad8c\uc7a5 RAM\uc740 {n} GB',
    'game.whyGpuMin': 'GPU\uac00 \ucd5c\uc18c \uc0ac\uc591\ubcf4\ub2e4 \ub0ae\uc74c({label})',
    'game.whyRamMin': 'RAM\uc774 \ucd5c\uc18c \uc0ac\uc591\ubcf4\ub2e4 \ub0ae\uc74c({n} GB)',
    'game.withRam': ' + RAM {n} GB',

    'detect.btn': '\ud83d\udda5\ufe0f \ub0b4 PC \uc790\ub3d9 \uac10\uc9c0',
    'detect.again': '\ud83d\udd04 \ub2e4\uc2dc \uac10\uc9c0',
    'detect.working': '\ud558\ub4dc\uc6e8\uc5b4\ub97c \uc77d\ub294 \uc911\u2026',
    'detect.gpuLine': 'GPU: {gpu}',
    'detect.gpuApprox': 'GPU: {gpu} \u2014 \ube0c\ub77c\uc6b0\uc800\uac00 \u201c{raw}\u201d\ub77c\uace0 \ubcf4\uace0\ud574 \uac00\uc7a5 \uac00\uae4c\uc6b4 \uce74\ub4dc\ub85c \ub9e4\uce6d\ud588\uc2b5\ub2c8\ub2e4.',
    'detect.gpuMasked': 'GPU: \ube0c\ub77c\uc6b0\uc800\uac00 \uac00\ub824 \ub454 \uc0c1\ud0dc\uc785\ub2c8\ub2e4. \uac1c\uc778\uc815\ubcf4 \ubcf4\ud638 \uc815\ucc45\uc0c1 \u201c{raw}\u201d\ub9cc \ubcf4\uace0\ud558\ubbc0\ub85c \uc790\ub3d9 \uc120\ud0dd\ud558\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4 \u2014 \uc704 \ubaa9\ub85d\uc5d0\uc11c \uc9c1\uc811 \uace8\ub77c \uc8fc\uc138\uc694.',
    'detect.gpuUnknown': 'GPU: \u201c{raw}\u201d\ub294 \uc800\ud76c\uac00 \ucd94\uc801\ud558\ub294 \uce74\ub4dc\uac00 \uc544\ub2c8\ub77c GPU \ud544\ud130\ub97c \ube44\uc6cc \ub450\uc5c8\uc2b5\ub2c8\ub2e4 \u2014 \uc704\uc5d0\uc11c \uc9c1\uc811 \uc120\ud0dd\ud574 \uc8fc\uc138\uc694.',
    'detect.gpuApple': 'GPU: \uc560\ud50c \uc2e4\ub9ac\ucf58({raw}) \u2014 \uc800\ud76c \ubaa9\ub85d\uc740 NVIDIA\u00b7AMD\u00b7Intel\ub9cc \ub2e4\ub8e8\ubbc0\ub85c GPU\ub294 \uc120\ud0dd\ud558\uc9c0 \uc54a\uace0 macOS \ud544\ud130\ub97c \uc801\uc6a9\ud588\uc2b5\ub2c8\ub2e4.',
    'detect.gpuNoWebgl': 'GPU: \uc774 \ube0c\ub77c\uc6b0\uc800\ub294 WebGL\uc744 \uc81c\uacf5\ud558\uc9c0 \uc54a\uc544 \uadf8\ub798\ud53d\uce74\ub4dc\ub97c \uc77d\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc704\uc5d0\uc11c \uc9c1\uc811 \uc120\ud0dd\ud574 \uc8fc\uc138\uc694.',
    'detect.gpuSoftware': 'GPU: \ube0c\ub77c\uc6b0\uc800\uac00 \uc18c\ud504\ud2b8\uc6e8\uc5b4\ub85c \uadf8\ub9ac\uace0 \uc788\uc5b4(\u201c{raw}\u201d) \uc2e4\uc81c \uce74\ub4dc\uac00 \uac00\ub824\uc84c\uc2b5\ub2c8\ub2e4. \uc704\uc5d0\uc11c \uc9c1\uc811 \uc120\ud0dd\ud574 \uc8fc\uc138\uc694.',
    'detect.osLine': 'OS: {os}',
    'detect.osUnknown': 'OS: \uc778\uc2dd\ud560 \uc218 \uc5c6\uc5b4 OS \ud544\ud130\ub97c \uadf8\ub300\ub85c \ub450\uc5c8\uc2b5\ub2c8\ub2e4.',
    'detect.osWindows': 'Windows',
    'detect.osMac': 'macOS',
    'detect.osLinux': 'Linux',
    'detect.osMobile': 'OS: \ud734\ub300\ud3f0\u00b7\ud0dc\ube14\ub9bf\uc73c\ub85c \ubcf4\uc785\ub2c8\ub2e4 \u2014 \uc774 \ud544\ud130\ub294 Windows\u00b7macOS\u00b7Linux PC \uae30\uc900\uc774\ub77c OS \ud544\ud130\ub97c \uadf8\ub300\ub85c \ub450\uc5c8\uc2b5\ub2c8\ub2e4.',
    'detect.ramLine': 'RAM: \ube0c\ub77c\uc6b0\uc800 \ubcf4\uace0 {n} GB.',
    'detect.ramCapped': 'RAM: \ube0c\ub77c\uc6b0\uc800 \ubcf4\uc548 \uc815\ucc45\uc0c1 \ucd5c\ub300 8 GB\uae4c\uc9c0\ub9cc \uc778\uc2dd\ub418\uc5b4 8 GB\ub85c \uc120\ud0dd\ud588\uc2b5\ub2c8\ub2e4. 16 GB \uc774\uc0c1\uc774\uba74 \uc704\uc5d0\uc11c \uc9c1\uc811 \uace8\ub77c \uc8fc\uc138\uc694.',
    'detect.ramUnknown': 'RAM: \uc774 \ube0c\ub77c\uc6b0\uc800\ub294 \uba54\ubaa8\ub9ac \ud06c\uae30\ub97c \uacf5\uac1c\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4 \u2014 \uc704\uc5d0\uc11c RAM\uc744 \uc120\ud0dd\ud574 \uc8fc\uc138\uc694.',
    'detect.ramLow': 'RAM: \ube0c\ub77c\uc6b0\uc800 \ubcf4\uace0\uac00 4 GB \ubbf8\ub9cc\uc774\ub77c \uc120\ud0dd\ud560 \uc218 \uc788\ub294 \ucd5c\uc18c \uc635\uc158\ubcf4\ub2e4 \uc791\uc2b5\ub2c8\ub2e4 \u2014 \uc704\uc5d0\uc11c RAM\uc744 \uc120\ud0dd\ud574 \uc8fc\uc138\uc694.',
    'detect.summary': '\ub0b4 PC\uc5d0\uc11c \ud544\ud130 {n}\uac1c\ub97c \uc801\uc6a9\ud588\uc2b5\ub2c8\ub2e4.',
    'detect.summaryNone': '\uc790\ub3d9\uc73c\ub85c \uc801\uc6a9\ud560 \uc218 \uc788\ub294 \ud56d\ubaa9\uc774 \uc5c6\uc5c8\uc2b5\ub2c8\ub2e4.',
    'detect.privateNote': '\uac10\uc9c0\ub294 \ubaa8\ub450 \ube0c\ub77c\uc6b0\uc800 \uc548\uc5d0\uc11c \ucc98\ub9ac\ub418\uba70 \uc5b4\ub290 \uacf3\uc73c\ub85c\ub3c4 \uc804\uc1a1\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.',
    'detect.checkerApplied': '\ud558\ub4dc\uc6e8\uc5b4\ub97c \uc790\ub3d9\uc73c\ub85c \ucc44\uc6e0\uc2b5\ub2c8\ub2e4 \u2014 \uc544\ub798 \ud638\ud658\uc131 \ud655\uc778\ub3c4 \uc2e4\ud589\ud588\uc2b5\ub2c8\ub2e4.'
  };

  var JA = {
    'common.home': '\u30db\u30fc\u30e0',
    'common.pcGames': 'PC\u30b2\u30fc\u30e0',
    'common.privacy': '\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u30dd\u30ea\u30b7\u30fc',
    'common.terms': '\u5229\u7528\u898f\u7d04',
    'common.about': '\u30b5\u30a4\u30c8\u60c5\u5831\u30fb\u304a\u554f\u3044\u5408\u308f\u305b',
    'common.sitemap': 'XML\u30b5\u30a4\u30c8\u30de\u30c3\u30d7',
    'common.gpuGuides': 'GPU\u30fb\u30b9\u30da\u30c3\u30af\u30ac\u30a4\u30c9',
    'common.freeTools': '\ud83d\udee0\ufe0f \u7121\u6599AI\u30c4\u30fc\u30eb',
    'common.hardwareFilter': '\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u30d5\u30a3\u30eb\u30bf\u30fc',
    'common.langLabel': '\u8a00\u8a9e',
    'common.langEn': '\u82f1\u8a9e',
    'common.langKo': '\u30d5\u30f3\u30b0\u30c3\u30b4',
    'common.langJa': '\u65e5\u672c\u8a9e',
    'common.footerIndex': '\u00a9 2026 CanMySpec.com \u00b7 PC\u52d5\u4f5c\u74b0\u5883\u30fb\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u30d9\u30f3\u30c1\u30de\u30fc\u30af\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9',
    'common.footerGuides': '\u00a9 2026 CanMySpec.com \u00b7 \u52d5\u4f5c\u74b0\u5883\u306f\u5404\u30b2\u30fc\u30e0\u306e\u30d1\u30d6\u30ea\u30c3\u30b7\u30e3\u30fc\u304c\u516c\u8868\u3057\u3066\u3044\u308b\u516c\u5f0f\u306e\u6570\u5024\u3067\u3059\u3002',
    'common.footerGame': '\u00a9 2026 CanMySpec.com \u00b7 \u5404\u30b2\u30fc\u30e0\u306e\u5546\u6a19\u30fb\u753b\u50cf\u306f\u305d\u308c\u305e\u308c\u306e\u30d1\u30d6\u30ea\u30c3\u30b7\u30e3\u30fc\u306b\u5e30\u5c5e\u3057\u307e\u3059\u3002',

    'index.heroTitle': 'PC\u3067\u52d5\u304f\uff1f',
    'index.heroSubtitle': '\u6570\u5343\u306ePC\u30b2\u30fc\u30e0\u306e\u516c\u5f0f\u52d5\u4f5c\u74b0\u5883\u3001GPU\u30d9\u30f3\u30c1\u30de\u30fc\u30af\u300160FPS\u306e\u305f\u3081\u306e\u6700\u9069\u30b0\u30e9\u30d5\u30a3\u30c3\u30af\u8a2d\u5b9a\u3092\u307e\u3068\u3081\u3066\u78ba\u8a8d\u3067\u304d\u307e\u3059\u3002',
    'index.searchPlaceholder': '\u30b2\u30fc\u30e0\u3092\u691c\u7d22\uff08\u4f8b\uff1a\u30b5\u30a4\u30d0\u30fc\u30d1\u30f3\u30af\u3001\u30aa\u30ea\u30b8\u30f3\u3001\u30a8\u30eb\u30c7\u30f3\u30ea\u30f3\u30b0\u2026\uff09',
    'index.searchAria': '\u30b2\u30fc\u30e0\u3092\u691c\u7d22',
    'index.searchClearAria': '\u691c\u7d22\u3092\u30af\u30ea\u30a2',
    'index.quickPicks': '\u30af\u30a4\u30c3\u30af\u9078\u629e\uff1a',
    'index.presetDeck': '\ud83c\udfae Deck\u8a8d\u5b9a',
    'index.presetSmall': '\ud83d\udcbe 15GB\u672a\u6e80',
    'index.presetTiny': '\ud83e\udeb6 5GB\u672a\u6e80',
    'index.presetAction': '\u2694\ufe0f \u30a2\u30af\u30b7\u30e7\u30f3',
    'index.presetLowend': '\ud83d\udcbb \u4f4e\u30b9\u30da\u30c3\u30af\u5411\u3051',
    'index.statGames': '\ud83c\udfae <strong>{n}</strong>\u672c\u306e\u30d9\u30f3\u30c1\u30de\u30fc\u30af\u6e08\u307f',
    'index.statFps': '\u26a1 60FPS\u76ee\u6a19\u30ac\u30a4\u30c9',
    'index.statLive': '\ud83d\udd0d \u30ea\u30a2\u30eb\u30bf\u30a4\u30e0\u5373\u6642\u30d5\u30a3\u30eb\u30bf\u30fc',
    'index.filterTitle': '\ud83c\udfaf \u81ea\u5206\u306ePC\u3067\u52d5\u304f\u30b2\u30fc\u30e0\u3092\u63a2\u3059',
    'index.filterDesc': 'GPU\u3068RAM\u3092\u9078\u3073\u3001OS\u30fb\u30b8\u30e3\u30f3\u30eb\u30fb\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u5bb9\u91cf\u3067\u7d5e\u308a\u8fbc\u3081\u307e\u3059 \u2014 \u3059\u3079\u3066\u306e\u30d5\u30a3\u30eb\u30bf\u30fc\u304c\u7d44\u307f\u5408\u308f\u3055\u308c\u307e\u3059',
    'index.labelGpu': '\u30b0\u30e9\u30d5\u30a3\u30c3\u30af\u30ab\u30fc\u30c9\uff08GPU\uff09',
    'index.labelRam': '\u30b7\u30b9\u30c6\u30e0RAM',
    'index.labelShow': '\u8868\u793a',
    'index.labelOs': '\u30aa\u30da\u30ec\u30fc\u30c6\u30a3\u30f3\u30b0\u30b7\u30b9\u30c6\u30e0',
    'index.labelGenre': '\u30b8\u30e3\u30f3\u30eb',
    'index.labelStorage': '\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u5bb9\u91cf',
    'index.labelDeck': 'Steam Deck',
    'index.labelSort': '\u4e26\u3073\u66ff\u3048',
    'index.gpuPlaceholder': 'GPU\u3092\u9078\u629e\u2026',
    'index.anyRam': 'RAM\u4e0d\u554f',
    'index.ramGb': '{n} GB',
    'index.ramGbPlus': '{n} GB\u4ee5\u4e0a',
    'index.modeAll': '\u5b9f\u884c\u3067\u304d\u308b\u5168\u30b2\u30fc\u30e0',
    'index.modeRec': '60FPS\u63a8\u5968\u306e\u307f',
    'index.moreFilters': '\u30d5\u30a3\u30eb\u30bf\u30fc\u3092\u8ffd\u52a0',
    'index.hideFilters': '\u8ffd\u52a0\u30d5\u30a3\u30eb\u30bf\u30fc\u3092\u9589\u3058\u308b',
    'index.anyOs': '\u3059\u3079\u3066\u306eOS ({n})',
    'index.osWindows': 'Windows ({n})',
    'index.osMac': 'macOS ({n})',
    'index.osLinux': 'Linux / SteamOS ({n})',
    'index.osMobile': 'iOS / Android ({n})',
    'index.anyGenre': '\u3059\u3079\u3066\u306e\u30b8\u30e3\u30f3\u30eb',
    'index.anySize': '\u3059\u3079\u3066\u306e\u5bb9\u91cf',
    'index.sizeUnder': '{n} GB\u672a\u6e80 ({c})',
    'index.anyDeck': '\u3059\u3079\u3066\u306e\u8a8d\u5b9a',
    'index.deckVerified': '\u2605 Verified ({n})',
    'index.deckPlayable': 'Playable\u4ee5\u4e0a ({n})',
    'index.deckUnsupported': 'Unsupported ({n})',
    'index.sortPopular': '\u4eba\u6c17\u9806\uff08\u30ec\u30d3\u30e5\u30fc\u6570\uff09',
    'index.sortRated': '\u8a55\u4fa1\u9806\uff08\u597d\u8a55\u7387\uff09',
    'index.sortLowspec': '\u4f4e\u30b9\u30da\u30c3\u30af\u9806',
    'index.sortNewest': '\u65b0\u7740\u9806',
    'index.sortAz': 'A \u2013 Z',
    'index.copyLink': '\ud83d\udd17 \u3053\u306e\u30d5\u30a3\u30eb\u30bf\u30fc\u306e\u30ea\u30f3\u30af\u3092\u30b3\u30d4\u30fc',
    'index.copied': '\u2705 \u30ea\u30f3\u30af\u3092\u30b3\u30d4\u30fc\u3057\u307e\u3057\u305f',
    'index.copyPrompt': '\u3053\u306e\u30ea\u30f3\u30af\u3092\u30b3\u30d4\u30fc\u3057\u3066\u304f\u3060\u3055\u3044\uff1a',
    'index.resetAll': '\u3059\u3079\u3066\u30ea\u30bb\u30c3\u30c8',
    'index.filterNote': 'OS\u3068Steam Deck\u306e\u60c5\u5831\u306fSteam\u30b9\u30c8\u30a2\u306e\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u30c7\u30fc\u30bf\u306b\u57fa\u3065\u304d\u307e\u3059\u3002macOS\u30fbLinux\u306f\u30cd\u30a4\u30c6\u30a3\u30d6\u7248\u304c\u767b\u9332\u3055\u308c\u3066\u3044\u308b\u5834\u5408\u306e\u307f\u8868\u793a\u3057\uff08Proton\u306b\u3088\u308b\u52d5\u4f5c\u306f\u542b\u307f\u307e\u305b\u3093\uff09\u3001Deck\u306e\u8a8d\u5b9a\u306fSteam\u516c\u5f0f\u306eVerified\u30fbPlayable\u30fbUnsupported\u3067\u3059\u3002\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u5bb9\u91cf\u306f\u5168{total}\u4ef6\u4e2d{sized}\u4ef6\u306e\u307f\u516c\u958b\u306e\u305f\u3081\u3001\u5bb9\u91cf\u30d5\u30a3\u30eb\u30bf\u30fc\u3092\u6307\u5b9a\u3059\u308b\u3068\u5bb9\u91cf\u4e0d\u660e\u306e\u30bf\u30a4\u30c8\u30eb\u306f\u8868\u793a\u3055\u308c\u307e\u305b\u3093\u3002',
    'index.quickHubs': '\u4eba\u6c17\u30ac\u30a4\u30c9\uff1a',
    'index.gridTitleDefault': '\u6ce8\u76ee\u306e\u4eba\u6c17PC\u30b2\u30fc\u30e0',
    'index.gridTitleSearch': '\u691c\u7d22\u7d50\u679c',
    'index.gridTitleFiltered': '\u30d5\u30a3\u30eb\u30bf\u30fc\u6e08\u307f\u30b2\u30fc\u30e0',
    'index.gridTitleGpu': '{gpu}\u3067\u52d5\u304f\u30b2\u30fc\u30e0',
    'index.gridSubDefault': '\u5373\u6642\u691c\u7d22\u5bfe\u5fdc',
    'index.gridSubActive': '\u30d5\u30a3\u30eb\u30bf\u30fc{n}\u4ef6\u3092\u9069\u7528\u4e2d',
    'index.gridSubActivePlural': '\u30d5\u30a3\u30eb\u30bf\u30fc{n}\u4ef6\u3092\u9069\u7528\u4e2d',
    'index.gridSubActivePlural': '\u30d5\u30a3\u30eb\u30bf\u30fc{n}\u4ef6\u3092\u9069\u7528\u4e2d',
    'index.gridSubFiltered': '\u5168\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u304b\u3089\u7d5e\u8fbc\u307f',
    'index.pageInfo': '{total}\u4ef6\u4e2d {from} - {to}\u4ef6\u3092\u8868\u793a\uff08{page} / {pages} \u30da\u30fc\u30b8\uff09',
    'index.prev': '\u2190 \u524d\u3078',
    'index.next': '\u6b21\u3078 \u2192',
    'index.noMatches': '\u6761\u4ef6\u306b\u5408\u3046\u30b2\u30fc\u30e0\u304c\u3042\u308a\u307e\u305b\u3093\u3002',
    'index.emptySearch': '\u300c{q}\u300d\u306b\u4e00\u81f4\u3057\u3001\u304b\u3064\u4ed6\u306e\u30d5\u30a3\u30eb\u30bf\u30fc\u3092\u3059\u3079\u3066\u6e80\u305f\u3059\u30b2\u30fc\u30e0\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u30d5\u30a3\u30eb\u30bf\u30fc\u3092\u4e00\u3064\u5916\u3059\u304b\u3001\u691c\u7d22\u3092\u30af\u30ea\u30a2\u3059\u308b\u3068\u4e00\u89a7\u304c\u5e83\u304c\u308a\u307e\u3059\u3002',
    'index.emptyCombo': '\u3053\u306e\u7d44\u307f\u5408\u308f\u305b\u306b\u5408\u3046\u30b2\u30fc\u30e0\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u4e0a\u306e\u884c\u304b\u3089\u30d5\u30a3\u30eb\u30bf\u30fc\u3092\u4e00\u3064\u5916\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
    'index.emptySingle': '\u3053\u306e\u30d5\u30a3\u30eb\u30bf\u30fc\u306b\u5408\u3046\u30b2\u30fc\u30e0\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u5225\u306e\u8a2d\u5b9a\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002',
    'index.active': '\u9069\u7528\u4e2d\uff1a',
    'index.removeFilter': '\u3053\u306e\u30d5\u30a3\u30eb\u30bf\u30fc\u3092\u5916\u3059',
    'index.recOnlyChip': '60FPS\u63a8\u5968\u306e\u307f',
    'index.ramChip': 'RAM {n} GB',
    'index.sortChip': '\u4e26\u3073\u66ff\u3048\uff1a{label}',
    'index.suggestEmpty': '\u300c{q}\u300d\u3092\u542b\u3080\u30b2\u30fc\u30e0\u540d\u306f\u3042\u308a\u307e\u305b\u3093\u3002\u3082\u3063\u3068\u77ed\u3044\u8a9e\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
    'index.suggestAll': '\u540d\u524d\u304c\u4e00\u81f4\u3059\u308b{n}\u4ef6\u3092\u4e00\u89a7\u3067\u898b\u308b \u2192',
    'index.suggestAllPlural': '\u540d\u524d\u304c\u4e00\u81f4\u3059\u308b{n}\u4ef6\u3092\u4e00\u89a7\u3067\u898b\u308b \u2192',
    'index.resRun': '<strong>{n}</strong>\u4ef6\u304c{gpu}\u3067\u5b9f\u884c\u3067\u304d\u307e\u3059',
    'index.resRunRam': '<strong>{n}</strong>\u4ef6\u304c{gpu}\uff0bRAM {ram} GB\u3067\u5b9f\u884c\u3067\u304d\u307e\u3059',
    'index.resFps': '\u00b7 \u63a8\u5968\u8a2d\u5b9a\u306760FPS\uff1a<strong>{n}</strong>\u4ef6',
    'index.resMinOnly': '\u00b7 \u6700\u4f4e\u8a2d\u5b9a\u306e\u307f\uff1a{n}\u4ef6',
    'index.resFiltered': '\u3053\u306e\u30d5\u30a3\u30eb\u30bf\u30fc\u306b\u5408\u3046\u30b2\u30fc\u30e0 <strong>{n}</strong>\u4ef6',
    'index.resPickGpu': '\u00b7 GPU\u3092\u9078\u3076\u3068\u3069\u306e\u30b2\u30fc\u30e0\u304c60FPS\u304b\u308f\u304b\u308a\u307e\u3059',
    'index.resNoSize': '\u00b7 \u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u5bb9\u91cf\u304c\u975e\u516c\u958b\u306e{n}\u4ef6\u306f\u8868\u793a\u3055\u308c\u307e\u305b\u3093',
    'index.hubTitle': 'GPU\u30fbPC\u30b9\u30da\u30c3\u30af\u5225\u306b\u30b2\u30fc\u30e0\u3092\u63a2\u3059',
    'index.hubDesc': '\u5404\u30ac\u30a4\u30c9\u306f\u3001\u305d\u306e\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u3067\u63a8\u5968\u8a2d\u5b9a60FPS\u3067\u52d5\u304f\u30b2\u30fc\u30e0\u3092Steam\u516c\u5f0f\u306e\u52d5\u4f5c\u74b0\u5883\u304b\u3089\u62bd\u51fa\u3057\u3066\u4e00\u89a7\u5316\u3057\u3066\u3044\u307e\u3059\u3002',
    'index.hubGpus': '\u30b0\u30e9\u30d5\u30a3\u30c3\u30af\u30ab\u30fc\u30c9',
    'index.hubSpecs': '\u30ce\u30fc\u30c8PC\u30fb\u30cf\u30f3\u30c9\u30d8\u30eb\u30c9\u30fb\u4f4e\u4e88\u7b97PC',
    'index.hubAll': 'GPU\u30fb\u30b9\u30da\u30c3\u30af\u30ac\u30a4\u30c9\u4e00\u89a7\u3078 \u2192',
    'index.cardGpu': 'GPU: {label}',
    'index.badgeFps': '60 FPS',
    'index.badgeMin': '\u6700\u4f4e\u8a2d\u5b9a',
    'index.loading': '\u5168\u30b2\u30fc\u30e0\u306e\u30a4\u30f3\u30c7\u30c3\u30af\u30b9\u3092\u8aad\u307f\u8fbc\u3093\u3067\u3044\u307e\u3059\u2026',
    'index.seeSteam': '\u516c\u5f0f\u30da\u30fc\u30b8\u3092\u898b\u308b',

    'genre.action': '\u30a2\u30af\u30b7\u30e7\u30f3 ({n})',
    'genre.indie': '\u30a4\u30f3\u30c7\u30a3\u30fc ({n})',
    'genre.adventure': '\u30a2\u30c9\u30d9\u30f3\u30c1\u30e3\u30fc ({n})',
    'genre.rpg': 'RPG ({n})',
    'genre.casual': '\u30ab\u30b8\u30e5\u30a2\u30eb ({n})',
    'genre.simulation': '\u30b7\u30df\u30e5\u30ec\u30fc\u30b7\u30e7\u30f3 ({n})',
    'genre.strategy': '\u30b9\u30c8\u30e9\u30c6\u30b8\u30fc ({n})',
    'genre.free': '\u7121\u6599\u30d7\u30ec\u30a4 ({n})',
    'genre.mmo': '\u5927\u898f\u6a21\u30de\u30eb\u30c1\u30d7\u30ec\u30a4 ({n})',
    'genre.racing': '\u30ec\u30fc\u30b7\u30f3\u30b0 ({n})',
    'genre.sports': '\u30b9\u30dd\u30fc\u30c4 ({n})',
    'genre.earlyaccess': '\u30a2\u30fc\u30ea\u30fc\u30a2\u30af\u30bb\u30b9 ({n})',

    'hub.statFps': '60FPS\u30b2\u30fc\u30e0\uff08\u63a8\u5968\u8a2d\u5b9a\uff09',
    'hub.statMin': '\u6700\u4f4e\u8a2d\u5b9a\u3067\u5b9f\u884c\u53ef\u80fd',
    'hub.statTotal': '\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u767b\u9332\u30b2\u30fc\u30e0',
    'hub.searchPlaceholder': '\u3053\u306e\u30da\u30fc\u30b8\u306e\u30b2\u30fc\u30e0\u3092\u691c\u7d22\u2026',
    'hub.openFilter': '\u3053\u306e\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u3067\u5168\u4f53\u30d5\u30a3\u30eb\u30bf\u30fc\u3092\u958b\u304f \u2192',
    'hub.recTitle': '\u3053\u306e\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u306760FPS\u3067\u904a\u3079\u308b\u30b2\u30fc\u30e0',
    'hub.minTitle': '\u6700\u4f4e\u8a2d\u5b9a\u3067\u904a\u3079\u308b\u30b2\u30fc\u30e0',
    'hub.howTitle': '\u3053\u306e\u4e00\u89a7\u306e\u7167\u5408\u65b9\u6cd5',
    'hub.howP1': '\u5168\u3066\u306e\u9805\u76ee\u306f\u3001\u5404\u30b2\u30fc\u30e0\u306eSteam\u30b9\u30c8\u30a2\u30da\u30fc\u30b8\u3067\u516c\u8868\u3055\u308c\u3066\u3044\u308b\u516c\u5f0f\u306e\u6700\u4f4e\u30fb\u63a8\u5968\u52d5\u4f5c\u74b0\u5883\u306b\u57fa\u3065\u3044\u3066\u3044\u307e\u3059\u3002\u30b2\u30fc\u30e0\u304c\u8981\u6c42\u3059\u308bGPU\u3068RAM\u3092\u3053\u306e\u30ac\u30a4\u30c9\u306e\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u3068\u6bd4\u8f03\u3057\u3001\u63a8\u5968\u8981\u4ef6\u3092\u6e80\u305f\u3059\u5834\u5408\u306f<strong>\u63a8\u5968\u8a2d\u5b9a\u306760FPS</strong>\u3001\u6700\u4f4e\u8981\u4ef6\u306e\u307f\u306e\u5834\u5408\u306f<strong>\u6700\u4f4e\u8a2d\u5b9a\u3067\u5b9f\u884c\u53ef\u80fd</strong>\u3068\u3057\u3066\u8868\u793a\u3057\u307e\u3059\u3002',
    'hub.howP2': 'GPU\u30c6\u30a3\u30a2\u306f1080p\u306e\u76f8\u5bfe\u6027\u80fd\u306e\u6982\u7b97\u3067\u4e26\u3093\u3067\u3044\u308b\u305f\u3081\u3001\u540d\u524d\u3067\u306f\u306a\u304f\u6027\u80fd\u3067\u6bd4\u8f03\u3055\u308c\u307e\u3059\u3002VRAM\u5bb9\u91cf\u3060\u3051\u3092\u8a18\u3057\u305f\u8981\u4ef6\uff08\u300c2 GB VRAM\u300d\uff09\u3082\u540c\u3058\u8ef8\u306b\u914d\u7f6e\u3057\u307e\u3059\u3002Steam\u306b\u63a8\u5968GPU\u306e\u8a18\u8f09\u304c\u306a\u3044\u30b2\u30fc\u30e0\u306f\u300160FPS\u63a8\u5968\u3068\u3057\u3066\u8868\u793a\u3057\u307e\u305b\u3093\u3002',
    'hub.howP3': '\u4e00\u89a7\u306fSteam\u306e\u30ec\u30d3\u30e5\u30fc\u6570\u9806\u3067\u3001\u3088\u304f\u904a\u3070\u308c\u3066\u3044\u308b\u30b2\u30fc\u30e0\u304c\u4e0a\u306b\u6765\u307e\u3059\u3002\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u304c\u62e1\u5f35\u3055\u308c\u308b\u305f\u3073\u306b\u96c6\u8a08\u3057\u76f4\u3057\u307e\u3059 \u2014 \u81ea\u5206\u306eGPU\u30fbRAM\u30fb\u30d5\u30ec\u30fc\u30e0\u76ee\u6a19\u3067\u6b63\u78ba\u306b\u7167\u5408\u3059\u308b\u306b\u306f<a href="../index.html">\u5168\u4f53\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u30d5\u30a3\u30eb\u30bf\u30fc</a>\u3092\u3054\u5229\u7528\u304f\u3060\u3055\u3044\u3002',
    'hub.chipsTitle': '\u4ed6\u306eGPU\u30fbPC\u30b9\u30da\u30c3\u30af\u30ac\u30a4\u30c9',
    'hub.faqTitle': '\u3088\u304f\u3042\u308b\u8cea\u554f',
    'hub.emptyRec': '\u3053\u306e\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u304c\u63a8\u5968\u8981\u4ef6\u3092\u6e80\u305f\u3059\u30b2\u30fc\u30e0\u306f\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u306b\u3042\u308a\u307e\u305b\u3093\u3002',
    'hub.emptyMin': '\u3053\u306e\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u3067\u6700\u4f4e\u8981\u4ef6\u306e\u307f\u3092\u6e80\u305f\u3059\u30b2\u30fc\u30e0\u306f\u3042\u308a\u307e\u305b\u3093 \u2014 \u3059\u3079\u3066\u63a8\u5968\u8981\u4ef6\u3092\u6e80\u305f\u3057\u3066\u3044\u307e\u3059\u3002',
    'hub.emptySearch': '\u3053\u306e\u30da\u30fc\u30b8\u3067\u305d\u306e\u691c\u7d22\u306b\u5408\u3046\u30b2\u30fc\u30e0\u306f\u3042\u308a\u307e\u305b\u3093\u3002',
    'hub.recNoteAll': '\u3053\u306e\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u304c\u63a8\u5968GPU\u30fbRAM\u8981\u4ef6\u3092\u6e80\u305f\u3059{n}\u4ef6\u3092Steam\u30ec\u30d3\u30e5\u30fc\u6570\u9806\u306b\u4e26\u3079\u3066\u3044\u307e\u3059\u3002',
    'hub.recNoteLimited': '\u63a8\u5968\u8981\u4ef6\u3092\u6e80\u305f\u3059{n}\u4ef6\u306e\u3046\u3061\u3001\u30ec\u30d3\u30e5\u30fc\u304c\u591a\u3044{limit}\u4ef6\u3092\u8868\u793a\u3057\u3066\u3044\u307e\u3059\u3002\u4e0a\u306e\u691c\u7d22\u30dc\u30c3\u30af\u30b9\u3067\u7d5e\u308a\u8fbc\u3081\u307e\u3059\u3002',
    'hub.recNoteNone': '\u3053\u306e\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u306f\u8ffd\u8de1\u3059\u308b\u5168\u30b2\u30fc\u30e0\u306e\u63a8\u5968GPU\u3092\u4e0b\u56de\u3063\u3066\u3044\u307e\u3059\u3002',
    'hub.minNote': '\u6700\u4f4e\u8981\u4ef6\u306f\u6e80\u305f\u3059\u304c\u63a8\u5968\u8981\u4ef6\u306b\u5c4a\u304b\u306a\u3044\u30bf\u30a4\u30c8\u30eb\u3067\u3059\u3002\u4f4e\u3044\u8a2d\u5b9a\u3068\u4f4e\u3044\u30d5\u30ec\u30fc\u30e0\u30ec\u30fc\u30c8\u3092\u60f3\u5b9a\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
    'hub.minNoteLimited': '\u3053\u306e\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u3067\u6700\u4f4e\u8981\u4ef6\u306e\u307f\u3092\u6e80\u305f\u3059{n}\u4ef6\u306e\u3046\u3061\u3001\u30ec\u30d3\u30e5\u30fc\u304c\u591a\u3044{limit}\u4ef6\u3092\u8868\u793a\u3057\u3066\u3044\u307e\u3059\u3002',
    'hub.chipGpus': '\u30b0\u30e9\u30d5\u30a3\u30c3\u30af\u30ab\u30fc\u30c9',
    'hub.chipSpecs': '\u30ce\u30fc\u30c8PC\u30fb\u30cf\u30f3\u30c9\u30d8\u30eb\u30c9\u30fb\u4f4e\u4e88\u7b97PC',
    'hub.guidesCrumb': 'GPU\u30fbPC\u30b9\u30da\u30c3\u30af\u30ac\u30a4\u30c9',
    'hub.h1': '{name}\u3067\u904a\u3079\u308b\u30b2\u30fc\u30e0',

    'hubIndex.title': 'GPU\u30fbPC\u30b9\u30da\u30c3\u30af\u5225\u30b2\u30fc\u30e0',
    'hubIndex.lead': '\u8ffd\u8de1\u3057\u3066\u3044\u308b\u3059\u3079\u3066\u306eGPU\u30c6\u30a3\u30a2\u3068\u3001\u30ce\u30fc\u30c8PC\u30fb\u30cf\u30f3\u30c9\u30d8\u30eb\u30c9\u30fb\u4f4e\u4e88\u7b97PC\u3092\u7db2\u7f85\u3059\u308b{hubs}\u4ef6\u306e\u30ac\u30a4\u30c9\u3067\u3059\u3002\u5404\u30da\u30fc\u30b8\u3067\u306f\u3001\u305d\u306e\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u3067\u63a8\u5968\u8a2d\u5b9a60FPS\u306b\u9054\u3059\u308b\u30b2\u30fc\u30e0\u3068\u3001\u6700\u4f4e\u8981\u4ef6\u306e\u307f\u306e\u30b2\u30fc\u30e0\u3092\u5206\u3051\u3066\u8868\u793a\u3057\u307e\u3059 \u2014 \u3059\u3079\u3066{total}\u4ef6\u306eSteam\u516c\u5f0f\u52d5\u4f5c\u74b0\u5883\u304b\u3089\u7167\u5408\u3057\u305f\u3082\u306e\u3067\u3059\u3002',
    'hubIndex.gpus': '\u30b0\u30e9\u30d5\u30a3\u30c3\u30af\u30ab\u30fc\u30c9',
    'hubIndex.specs': '\u30ce\u30fc\u30c8PC\u30fb\u30cf\u30f3\u30c9\u30d8\u30eb\u30c9\u30fb\u4f4e\u4e88\u7b97PC',
    'hubIndex.cardMeta': '60FPS {rec}\u4ef6 \u00b7 \u5b9f\u884c\u53ef\u80fd {min}\u4ef6',

    'game.verdictLabel': '\ud83d\ude80 \u63a8\u5968GPU:',
    'game.verdictTarget': '\u76ee\u6a19: 60 FPS',
    'game.specsTitle': '\u516c\u5f0fPC\u52d5\u4f5c\u74b0\u5883',
    'game.minTitle': '\u6700\u4f4e\u52d5\u4f5c\u74b0\u5883',
    'game.recTitle': '\u63a8\u5968\u52d5\u4f5c\u74b0\u5883',
    'game.ultraTitle': '4K\u30a6\u30eb\u30c8\u30e9 / \u30cf\u30a4\u30a8\u30f3\u30c9',
    'game.os': 'OS',
    'game.cpu': 'CPU',
    'game.gpu': 'GPU',
    'game.ram': 'RAM',
    'game.vram': 'VRAM',
    'game.storage': '\u30b9\u30c8\u30ec\u30fc\u30b8',
    'game.directx': 'DirectX',
    'game.hwTitle': '{title}\u3092\u52d5\u304b\u3059GPU\u306f\uff1f',
    'game.hwLabelMin': '\u6700\u4f4eGPU',
    'game.hwLabelRec': '\u63a8\u5968GPU\uff0860FPS\uff09',
    'game.hwLabelMemory': '\u30e1\u30e2\u30ea',
    'game.hwTier': '{tier}\u30c6\u30a3\u30a2',
    'game.hwTierRecommended': '\u63a8\u5968: {v}',
    'game.hwNotStated': '\u8a18\u8f09\u306a\u3057',
    'game.hwRecLabel': '\u63a8\u5968\u8a2d\u5b9a\u306760FPS\uff1a',
    'game.hwRecText': '\u3053\u306e\u30ab\u30fc\u30c9\u4ee5\u4e0a\u3067\u5b9f\u884c\u53ef\u80fd \u2014 \u30ac\u30a4\u30c9\uff1a',
    'game.hwMinLabel': '\u6700\u4f4e\u8a2d\u5b9a\u306e\u307f\uff1a',
    'game.hwMinText': '\u63a8\u5968\u30ab\u30fc\u30c9\u672a\u6e80 \u2014 \u30ac\u30a4\u30c9\uff1a',
    'game.hwAllGuides': 'GPU\u30fbPC\u30b9\u30da\u30c3\u30af\u30ac\u30a4\u30c9\u4e00\u89a7',
    'game.hwFilterMine': '\u81ea\u5206\u306e\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u3067\u5168\u30b2\u30fc\u30e0\u3092\u30d5\u30a3\u30eb\u30bf\u30fc',
    'game.checkerTitle': '\u26a1 {title}\u306f\u81ea\u5206\u306ePC\u3067\u52d5\u304f\uff1f\u5373\u6642\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u30c1\u30a7\u30c3\u30af',
    'game.checkerDesc': '\u30b0\u30e9\u30d5\u30a3\u30c3\u30af\u30ab\u30fc\u30c9\u3068RAM\u3092\u9078\u3076\u3068\u3001\u4e0a\u306e\u516c\u5f0f\u52d5\u4f5c\u74b0\u5883\u3068\u6bd4\u8f03\u3057\u307e\u3059\u3002',
    'game.checkerBtn': '\u5bfe\u5fdc\u3092\u78ba\u8a8d',
    'game.seeAll': '\u81ea\u5206\u306ePC\u3067\u52d5\u304f\u5168\u30b2\u30fc\u30e0\u3092\u898b\u308b \u2192',
    'game.optTitle': '\u6700\u9069\u30b0\u30e9\u30d5\u30a3\u30c3\u30af\u8a2d\u5b9a\u3068FPS\u5411\u4e0a\u306e\u30b3\u30c4',
    'game.affTitle': '{title}\u306e\u305f\u3081\u306bPC\u3092\u30a2\u30c3\u30d7\u30b0\u30ec\u30fc\u30c9\u3057\u307e\u305b\u3093\u304b\uff1f',
    'game.affText': 'RTX 40\u30b7\u30ea\u30fc\u30baGPU\u3001\u30b2\u30fc\u30df\u30f3\u30b0\u30ce\u30fc\u30c8\u3001\u9ad8\u901fNVMe SSD\u306e\u6700\u5b89\u5024\u3092\u6bd4\u8f03\u3067\u304d\u307e\u3059\u3002',
    'game.affBtn': '\u6700\u5b89\u5024\u3092\u898b\u308b \ud83d\udc49',
    'game.faqTitle': '\u3088\u304f\u3042\u308b\u8cea\u554f',
    'game.relatedTitle': '\u4ed6\u306ePC\u30d9\u30f3\u30c1\u30de\u30fc\u30af\u3092\u898b\u308b',
    'game.optGroupCards': '\u30b0\u30e9\u30d5\u30a3\u30c3\u30af\u30ab\u30fc\u30c9',
    'game.optGroupPresets': '\u30ce\u30fc\u30c8PC\u30fb\u30cf\u30f3\u30c9\u30d8\u30eb\u30c9\u30fb\u4f4e\u4e88\u7b97PC',
    'game.anyRam': 'RAM\u4e0d\u554f',
    'game.pickGpu': '\u5148\u306b\u30b0\u30e9\u30d5\u30a3\u30c3\u30af\u30ab\u30fc\u30c9\u3092\u9078\u3093\u3067\u304b\u3089\u518d\u5ea6\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
    'game.noRequirement': '\u3053\u306e\u30b9\u30c8\u30a2\u30da\u30fc\u30b8\u306f\u6bd4\u8f03\u3067\u304d\u308bGPU\u8981\u4ef6\u3092\u516c\u8868\u3057\u3066\u3044\u306a\u3044\u305f\u3081\u3001\u78ba\u8a8d\u3067\u304d\u308b\u9805\u76ee\u304c\u3042\u308a\u307e\u305b\u3093\u3002',
    'game.resultRec': '\u2705 <strong>60FPS\u63a8\u5968:</strong> {label}\u306f\u63a8\u5968\u8981\u4ef6\uff08{req}\uff09\u3092\u6e80\u305f\u3057\u3066\u3044\u307e\u3059\u3002\u30d1\u30d6\u30ea\u30c3\u30b7\u30e3\u30fc\u306e\u76ee\u6a19\u306f{target}\u3067\u3059\u3002',
    'game.resultMin': '\u26a0\ufe0f <strong>\u6700\u4f4e\u8981\u4ef6\u306e\u307f\u6e80\u8db3:</strong> {label}\u306f\u6700\u4f4e\u8981\u4ef6\uff08{min}\uff09\u3092\u6e80\u305f\u3057\u3001\u4f4e\u3044\u8a2d\u5b9a\u3067{target}\u304c\u671f\u5f85\u3067\u304d\u307e\u3059\u300260FPS\u306b\u306f{why}\u3002',
    'game.resultBelow': '\u274c <strong>\u6700\u4f4e\u8981\u4ef6\u672a\u6e80:</strong> {label} \u2014 {why}\u3002\u30d1\u30d6\u30ea\u30c3\u30b7\u30e3\u30fc\u306e\u6700\u4f4e\u76ee\u6a19\u3092\u5927\u304d\u304f\u4e0b\u56de\u308b\u30d5\u30ec\u30fc\u30e0\u30ec\u30fc\u30c8\u306b\u306a\u308a\u307e\u3059\u3002',
    'game.whyGpuRec': '\u63a8\u5968GPU\u306f{label}',
    'game.whyRamRec': '\u63a8\u5968RAM\u306f{n} GB',
    'game.whyGpuMin': 'GPU\u304c\u6700\u4f4e\u8981\u4ef6\u672a\u6e80\uff08{label}\uff09',
    'game.whyRamMin': 'RAM\u304c\u6700\u4f4e\u8981\u4ef6\u672a\u6e80\uff08{n} GB\uff09',
    'game.withRam': '\uff0bRAM {n} GB',

    'detect.btn': '\ud83d\udda5\ufe0f PC\u81ea\u52d5\u691c\u51fa',
    'detect.again': '\ud83d\udd04 \u3082\u3046\u4e00\u5ea6\u691c\u51fa',
    'detect.working': '\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u3092\u8aad\u307f\u53d6\u3063\u3066\u3044\u307e\u3059\u2026',
    'detect.gpuLine': 'GPU: {gpu}',
    'detect.gpuApprox': 'GPU: {gpu} \u2014 \u30d6\u30e9\u30a6\u30b6\u306f\u300c{raw}\u300d\u3068\u5831\u544a\u3057\u305f\u305f\u3081\u3001\u8ffd\u8de1\u3057\u3066\u3044\u308b\u30ab\u30fc\u30c9\u3067\u6700\u3082\u8fd1\u3044\u3082\u306e\u306b\u7167\u5408\u3057\u307e\u3057\u305f\u3002',
    'detect.gpuMasked': 'GPU: \u30d6\u30e9\u30a6\u30b6\u304c\u975e\u8868\u793a\u306b\u3057\u3066\u3044\u307e\u3059\u3002\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u4fdd\u8b77\u306e\u305f\u3081\u300c{raw}\u300d\u306e\u307f\u306e\u5831\u544a\u306a\u306e\u3067\u81ea\u52d5\u9078\u629e\u306f\u305b\u305a\u3001\u4e0a\u306e\u30ea\u30b9\u30c8\u304b\u3089\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002',
    'detect.gpuUnknown': 'GPU: \u300c{raw}\u300d\u306f\u8ffd\u8de1\u5bfe\u8c61\u306e\u30ab\u30fc\u30c9\u3067\u306f\u306a\u3044\u305f\u3081GPU\u30d5\u30a3\u30eb\u30bf\u30fc\u306f\u7a7a\u306e\u307e\u307e\u3067\u3059 \u2014 \u4e0a\u3067\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
    'detect.gpuApple': 'GPU: Apple\u30b7\u30ea\u30b3\u30f3\uff08{raw}\uff09 \u2014 \u5f53\u30b5\u30a4\u30c8\u306e\u30ea\u30b9\u30c8\u306fNVIDIA\u30fbAMD\u30fbIntel\u306e\u307f\u306a\u306e\u3067GPU\u306f\u9078\u629e\u305b\u305a\u3001macOS\u30d5\u30a3\u30eb\u30bf\u30fc\u3092\u9069\u7528\u3057\u307e\u3057\u305f\u3002',
    'detect.gpuNoWebgl': 'GPU: \u3053\u306e\u30d6\u30e9\u30a6\u30b6\u306fWebGL\u3092\u63d0\u4f9b\u3057\u306a\u3044\u305f\u3081\u30b0\u30e9\u30d5\u30a3\u30c3\u30af\u30ab\u30fc\u30c9\u3092\u8aad\u3081\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u4e0a\u3067\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
    'detect.gpuSoftware': 'GPU: \u30d6\u30e9\u30a6\u30b6\u304c\u30bd\u30d5\u30c8\u30a6\u30a7\u30a2\u63cf\u753b\uff08\u300c{raw}\u300d\uff09\u306e\u305f\u3081\u5b9f\u969b\u306e\u30ab\u30fc\u30c9\u304c\u96a0\u308c\u3066\u3044\u307e\u3059\u3002\u4e0a\u3067\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
    'detect.osLine': 'OS: {os}',
    'detect.osUnknown': 'OS: \u5224\u5b9a\u3067\u304d\u306a\u304b\u3063\u305f\u305f\u3081OS\u30d5\u30a3\u30eb\u30bf\u30fc\u306f\u305d\u306e\u307e\u307e\u3067\u3059\u3002',
    'detect.osWindows': 'Windows',
    'detect.osMac': 'macOS',
    'detect.osLinux': 'Linux',
    'detect.osMobile': 'OS: \u643a\u5e2f\u96fb\u8a71\u30fb\u30bf\u30d6\u30ec\u30c3\u30c8\u306e\u3088\u3046\u3067\u3059 \u2014 \u3053\u306e\u30d5\u30a3\u30eb\u30bf\u30fc\u306fWindows\u30fbmacOS\u30fbLinux\u306ePC\u304c\u5bfe\u8c61\u306a\u306e\u3067OS\u30d5\u30a3\u30eb\u30bf\u30fc\u306f\u305d\u306e\u307e\u307e\u3067\u3059\u3002',
    'detect.ramLine': 'RAM: \u30d6\u30e9\u30a6\u30b6\u5831\u544a\u306f{n} GB\u3067\u3059\u3002',
    'detect.ramCapped': 'RAM: \u30d6\u30e9\u30a6\u30b6\u306e\u5236\u9650\u3067\u6700\u59278 GB\u307e\u3067\u3057\u304b\u8aad\u3081\u306a\u3044\u305f\u30818 GB\u3092\u9078\u629e\u3057\u307e\u3057\u305f\u300216 GB\u4ee5\u4e0a\u306a\u3089\u4e0a\u3067\u81ea\u5206\u3067\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002',
    'detect.ramUnknown': 'RAM: \u3053\u306e\u30d6\u30e9\u30a6\u30b6\u306f\u30e1\u30e2\u30ea\u5bb9\u91cf\u3092\u516c\u958b\u3057\u307e\u305b\u3093 \u2014 \u4e0a\u3067RAM\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002',
    'detect.ramLow': 'RAM: \u30d6\u30e9\u30a6\u30b6\u5831\u544a\u304c4 GB\u672a\u6e80\u3067\u3001\u9078\u629e\u53ef\u80fd\u306a\u6700\u5c0f\u306e\u9078\u629e\u80a2\u3088\u308a\u5c0f\u3055\u3044\u305f\u3081\u9078\u629e\u3057\u307e\u305b\u3093\u3067\u3057\u305f \u2014 \u4e0a\u3067RAM\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044\u3002',
    'detect.summary': '\u81ea\u5206\u306ePC\u304b\u3089{n}\u4ef6\u306e\u30d5\u30a3\u30eb\u30bf\u30fc\u3092\u9069\u7528\u3057\u307e\u3057\u305f\u3002',
    'detect.summaryNone': '\u81ea\u52d5\u3067\u9069\u7528\u3067\u304d\u308b\u9805\u76ee\u306f\u3042\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002',
    'detect.privateNote': '\u691c\u51fa\u306f\u3059\u3079\u3066\u30d6\u30e9\u30a6\u30b6\u5185\u3067\u5b8c\u7d50\u3057\u3001\u3069\u3053\u3078\u3082\u9001\u4fe1\u3055\u308c\u307e\u305b\u3093\u3002',
    'detect.checkerApplied': '\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u3092\u81ea\u52d5\u3067\u5165\u529b\u3057\u307e\u3057\u305f \u2014\u4e0b\u306e\u5bfe\u5fdc\u78ba\u8a8d\u3082\u5b9f\u884c\u3057\u307e\u3057\u305f\u3002'
  };

  /* Keys added after the main tables: the conjunction used to join two reasons,
     and the performance-tier phrases the build writes under each hardware card. */
  var EXTRA = {
    en: {
      'common.and': ' and ',
      'game.tierFlagship': 'Flagship tier',
      'game.tierHighend': 'High-end tier',
      'game.tierUppermid': 'Upper mid-range tier',
      'game.tierMidrange': 'Mid-range tier',
      'game.tierEntry': 'Entry-level gaming tier',
      'game.tierLowend': 'Low-end tier',
      'game.tierVerylow': 'Very low-end tier',
      'game.tierLegacy': 'Legacy tier',
      'game.tierNot': 'Specification not stated',
      'common.directory': 'Game Directory',
      'common.guides': 'PC Gaming Guides',
      'directory.crumb': 'Game Directory',
      'directory.h1': 'All {n} PC Games: System Requirements Directory',
      'directory.lead': 'Every game in the CanMySpec database, in one alphabetical index. Pick a title to see its official Steam minimum and recommended requirements, the GPUs that reach 60 FPS, and an instant hardware check against your own PC.',
      'directory.filter': 'Filter games by name\u2026',
      'directory.cta': 'Open the hardware filter \u2192',
      'game.similarTitle': '\ud83c\udfae Similar Games You Can Check',
      'game.similarNote': 'Titles with the same genre or a comparable GPU requirement, so you can compare system requirements side by side.',
      /* ---------------- mobile titles (App Store) ---------------- */
      'common.mobileGames': 'Mobile Games',
      'index.cardMobile': '\ud83d\udcf1 {label}',
      'mobile.specsTitle': 'Official Mobile Requirements ({store})',
      'mobile.cardTitle': 'Store listing',
      'mobile.minOsLabel': '\ud83d\udcf1 Minimum OS:',
      'mobile.deviceTag': 'iPhone & iPad',
      'mobile.deviceTagIos': 'iPhone & iPad',
      'mobile.deviceTagAndroid': 'Android phones & tablets',
      'mobile.os': 'Minimum OS',
      'mobile.storage': 'Download size',
      'mobile.devices': 'Supported devices',
      'mobile.price': 'Price',
      'mobile.released': 'Released',
      'mobile.sourceNote': 'Every value on this page is taken from the {store} listing for this build; nothing is estimated.',
      'mobile.storeLink': 'Open the {store} page \u2197',
      'mobile.allMobile': 'Browse the mobile catalogue',
      'mobile.shotsTitle': 'Screenshots from the {store}',
      'mobile.optTitle': 'Before You Install: Storage & Compatibility',
      'mobile.similarTitle': '\ud83c\udfae Similar Mobile Games You Can Check',
      'mobile.similarNote': 'Other mobile titles in the catalogue, so you can compare download size and system support side by side.',
      'mobile.affTitle': 'Need more storage or a power bank for {title}?',
      'mobile.affText': 'Compare low prices on microSD cards, chargers, power banks and phone accessories.',
      'mobile.relatedTitle': 'Explore More Mobile Game Requirements'
    },
    ko: {
      'common.and': ' \uadf8\ub9ac\uace0 ',
      'game.tierFlagship': '\ud50c\ub798\uadf8\uc2ed \ud2f0\uc5b4',
      'game.tierHighend': '\ud558\uc774\uc5d4\ub4dc \ud2f0\uc5b4',
      'game.tierUppermid': '\uc911\uc0c1\uc704 \ud2f0\uc5b4',
      'game.tierMidrange': '\uc911\uae09 \ud2f0\uc5b4',
      'game.tierEntry': '\uc785\ubb38 \uac8c\uc774\ubc0d \ud2f0\uc5b4',
      'game.tierLowend': '\uc800\uc0ac\uc591 \ud2f0\uc5b4',
      'game.tierVerylow': '\ucd08\uc800\uc0ac\uc591 \ud2f0\uc5b4',
      'game.tierLegacy': '\ub808\uac70\uc2dc \ud2f0\uc5b4',
      'game.tierNot': '\uc0ac\uc591 \ubbf8\uacf5\uac1c',
      'common.directory': '\uc804\uccb4 \uac8c\uc784 \ubaa9\ub85d',
      'common.guides': 'PC \uac8c\uc784 \uac00\uc774\ub4dc',
      'directory.crumb': '\uc804\uccb4 \uac8c\uc784 \ubaa9\ub85d',
      'directory.h1': 'PC \uac8c\uc784 {n}\uc885 \uc804\uccb4 \ubaa9\ub85d \u00b7 \uc0ac\uc591 \ud55c\ub208\uc5d0 \ubcf4\uae30',
      'directory.lead': 'CanMySpec \ub370\uc774\ud130\ubca0\uc774\uc2a4\uc758 \ubaa8\ub4e0 \uac8c\uc784\uc744 \uc54c\ud30c\ubcb3 \uc21c\uc11c\ub85c \ubaa8\uc558\uc2b5\ub2c8\ub2e4. \uac8c\uc784\uc744 \uace0\ub974\uba74 Steam \uacf5\uc2dd \ucd5c\uc18c\u00b7\uad8c\uc7a5 \uc0ac\uc591\uacfc 60FPS\uc5d0 \ub3c4\ub2ec\ud558\ub294 GPU, \ub0b4 PC\uc640 \ubc14\ub85c \ube44\uad50\ud558\ub294 \ud558\ub4dc\uc6e8\uc5b4 \uccb4\ud06c\uac00 \ub098\uc635\ub2c8\ub2e4.',
      'directory.filter': '\uac8c\uc784 \uc774\ub984\uc73c\ub85c \ucc3e\uae30\u2026',
      'directory.cta': '\ud558\ub4dc\uc6e8\uc5b4 \ud544\ud130 \uc5f4\uae30 \u2192',
      'game.similarTitle': '\ud83c\udfae \ud568\uaed8 \ubcf4\uba74 \uc88b\uc740 \ube44\uc2b7\ud55c \uac8c\uc784',
      'game.similarNote': '\uac19\uc740 \uc7a5\ub974\uc774\uac70\ub098 \uc694\uad6c \uc0ac\uc591\uc774 \ube44\uc2b7\ud55c \uac8c\uc784\uc785\ub2c8\ub2e4. \uc0ac\uc591\uc744 \ub098\ub780\ud788 \ube44\uad50\ud574 \ubcf4\uc138\uc694.',
      /* ---------------- \ubaa8\ubc14\uc77c \uac8c\uc784 ---------------- */
      'common.mobileGames': '\ubaa8\ubc14\uc77c \uac8c\uc784',
      'index.cardMobile': '\ud83d\udcf1 {label}',
      'mobile.specsTitle': '\uacf5\uc2dd \ubaa8\ubc14\uc77c \uc0ac\uc591 ({store})',
      'mobile.cardTitle': '\uc2a4\ud1a0\uc5b4 \ub4f1\ub85d \uc815\ubcf4',
      'mobile.minOsLabel': '\ud83d\udcf1 \ucd5c\uc18c OS:',
      'mobile.deviceTag': '\uc544\uc774\ud3f0 & \uc544\uc774\ud328\ub4dc',
      'mobile.deviceTagIos': '\uc544\uc774\ud3f0 & \uc544\uc774\ud328\ub4dc',
      'mobile.deviceTagAndroid': '\uc548\ub4dc\ub85c\uc774\ub4dc \uae30\uae30',
      'mobile.os': '\ucd5c\uc18c OS',
      'mobile.storage': '\ub2e4\uc6b4\ub85c\ub4dc \uc6a9\ub7c9',
      'mobile.devices': '\uc9c0\uc6d0 \uae30\uae30',
      'mobile.price': '\uac00\uaca9',
      'mobile.released': '\ucd9c\uc2dc\uc77c',
      'mobile.sourceNote': '\uc774 \ud398\uc774\uc9c0\uc758 \ubaa8\ub4e0 \uac12\uc740 \uc774 \ube4c\ub4dc\uc758 {store} \ub4f1\ub85d \uc815\ubcf4\uc5d0\uc11c \uadf8\ub300\ub85c \uac00\uc838\uc654\uc73c\uba70 \ucd94\uc815\uce58\ub294 \uc5c6\uc2b5\ub2c8\ub2e4.',
      'mobile.storeLink': '{store} \ud398\uc774\uc9c0 \uc5f4\uae30 \u2197',
      'mobile.allMobile': '\ubaa8\ubc14\uc77c \uac8c\uc784 \ub458\ub7ec\ubcf4\uae30',
      'mobile.shotsTitle': '{store} \uc2a4\ud06c\ub9b0\uc0f7',
      'mobile.optTitle': '\uc124\uce58 \uc804 \ud655\uc778: \uc6a9\ub7c9\uacfc \ud638\ud658\uc131',
      'mobile.similarTitle': '\ud83c\udfae \ud568\uaed8 \ubcf4\uba74 \uc88b\uc740 \ubaa8\ubc14\uc77c \uac8c\uc784',
      'mobile.similarNote': '\uce74\ud0c8\ub85c\uadf8\uc758 \ub2e4\ub978 \ubaa8\ubc14\uc77c \uac8c\uc784\uc785\ub2c8\ub2e4. \ub2e4\uc6b4\ub85c\ub4dc \uc6a9\ub7c9\uacfc \uc9c0\uc6d0 \uc2dc\uc2a4\ud15c\uc744 \ub098\ub780\ud788 \ube44\uad50\ud574 \ubcf4\uc138\uc694.',
      'mobile.affTitle': '{title}\uc6a9 \uc800\uc7a5\uacf5\uac04\uc774\ub098 \ubcf4\uc870\ubc30\ud130\ub9ac\uac00 \ud544\uc694\ud558\uc2e0\uac00\uc694?',
      'mobile.affText': '\ub9c8\uc774\ud06c\ub85cSD \uce74\ub4dc, \ucda9\uc804\uae30, \ubcf4\uc870\ubc30\ud130\ub9ac, \ud734\ub300\ud3f0 \uc561\uc138\uc11c\ub9ac\ub97c \ucd5c\uc800\uac00\ub85c \ube44\uad50\ud574 \ubcf4\uc138\uc694.',
      'mobile.relatedTitle': '\ub2e4\ub978 \ubaa8\ubc14\uc77c \uac8c\uc784 \uc0ac\uc591 \ubcf4\uae30'
    },
    ja: {
      'common.and': '\u3001',
      'game.tierFlagship': '\u30d5\u30e9\u30c3\u30b0\u30b7\u30c3\u30d7\u30c6\u30a3\u30a2',
      'game.tierHighend': '\u30cf\u30a4\u30a8\u30f3\u30c9\u30c6\u30a3\u30a2',
      'game.tierUppermid': '\u30df\u30c9\u30eb\u30cf\u30a4\u30c6\u30a3\u30a2',
      'game.tierMidrange': '\u30df\u30c9\u30eb\u30c6\u30a3\u30a2',
      'game.tierEntry': '\u30a8\u30f3\u30c8\u30ea\u30fc\u30b2\u30fc\u30df\u30f3\u30b0\u30c6\u30a3\u30a2',
      'game.tierLowend': '\u30ed\u30fc\u30a8\u30f3\u30c9\u30c6\u30a3\u30a2',
      'game.tierVerylow': '\u8d85\u30ed\u30fc\u30a8\u30f3\u30c9\u30c6\u30a3\u30a2',
      'game.tierLegacy': '\u30ec\u30ac\u30b7\u30fc\u30c6\u30a3\u30a2',
      'game.tierNot': '\u4e0d\u660e',
      'common.directory': '\u30b2\u30fc\u30e0\u4e00\u89a7',
      'common.guides': 'PC\u30b2\u30fc\u30e0\u30ac\u30a4\u30c9',
      'directory.crumb': '\u30b2\u30fc\u30e0\u4e00\u89a7',
      'directory.h1': 'PC\u30b2\u30fc\u30e0{n}\u672c\u306e\u5168\u30ea\u30b9\u30c8\u30fb\u52d5\u4f5c\u74b0\u5883\u4e00\u89a7',
      'directory.lead': 'CanMySpec\u306e\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u306b\u3042\u308b\u5168\u30b2\u30fc\u30e0\u3092\u30a2\u30eb\u30d5\u30a1\u30d9\u30c3\u30c8\u9806\u306b\u307e\u3068\u3081\u307e\u3057\u305f\u3002\u30bf\u30a4\u30c8\u30eb\u3092\u9078\u3076\u3068\u3001Steam\u516c\u5f0f\u306e\u6700\u5c0f\u30fb\u63a8\u5968\u52d5\u4f5c\u74b0\u5883\u300160FPS\u306b\u5c4a\u304fGPU\u3001\u81ea\u5206\u306ePC\u3068\u306e\u6bd4\u8f03\u30c1\u30a7\u30c3\u30af\u304c\u8868\u793a\u3055\u308c\u307e\u3059\u3002',
      'directory.filter': '\u30b2\u30fc\u30e0\u540d\u3067\u7d5e\u308a\u8fbc\u3080\u2026',
      'directory.cta': '\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u30d5\u30a3\u30eb\u30bf\u30fc\u3092\u958b\u304f \u2192',
      'game.similarTitle': '\ud83c\udfae \u3042\u308f\u305b\u3066\u898b\u305f\u3044\u985e\u4f3c\u30b2\u30fc\u30e0',
      'game.similarNote': '\u540c\u3058\u30b8\u30e3\u30f3\u30eb\u3001\u307e\u305f\u306f\u5fc5\u8981\u30b9\u30da\u30c3\u30af\u304c\u8fd1\u3044\u30bf\u30a4\u30c8\u30eb\u3067\u3059\u3002\u52d5\u4f5c\u74b0\u5883\u3092\u4e26\u3079\u3066\u6bd4\u8f03\u3067\u304d\u307e\u3059\u3002',
      /* ---------------- \u30e2\u30d0\u30a4\u30eb\u30b2\u30fc\u30e0 ---------------- */
      'common.mobileGames': '\u30e2\u30d0\u30a4\u30eb\u30b2\u30fc\u30e0',
      'index.cardMobile': '\ud83d\udcf1 {label}',
      'mobile.specsTitle': '\u516c\u5f0f\u30e2\u30d0\u30a4\u30eb\u52d5\u4f5c\u74b0\u5883\uff08{store}\uff09',
      'mobile.cardTitle': '\u30b9\u30c8\u30a2\u63b2\u8f09\u60c5\u5831',
      'mobile.minOsLabel': '\ud83d\udcf1 \u6700\u4f4eOS:',
      'mobile.deviceTag': 'iPhone & iPad',
      'mobile.deviceTagIos': 'iPhone & iPad',
      'mobile.deviceTagAndroid': 'Android\u7aef\u672b',
      'mobile.os': '\u6700\u4f4eOS',
      'mobile.storage': '\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u5bb9\u91cf',
      'mobile.devices': '\u5bfe\u5fdc\u30c7\u30d0\u30a4\u30b9',
      'mobile.price': '\u4fa1\u683c',
      'mobile.released': '\u30ea\u30ea\u30fc\u30b9',
      'mobile.sourceNote': '\u3053\u306e\u30da\u30fc\u30b8\u306e\u6570\u5024\u306f\u3059\u3079\u3066\u3053\u306e\u30d3\u30eb\u30c9\u306e{store}\u63b2\u8f09\u60c5\u5831\u306b\u3088\u308b\u3082\u306e\u3067\u3001\u63a8\u6e2c\u306f\u542b\u307f\u307e\u305b\u3093\u3002',
      'mobile.storeLink': '{store}\u306e\u30da\u30fc\u30b8\u3092\u958b\u304f \u2197',
      'mobile.allMobile': '\u30e2\u30d0\u30a4\u30eb\u30b2\u30fc\u30e0\u3092\u898b\u308b',
      'mobile.shotsTitle': '{store}\u306e\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8',
      'mobile.optTitle': '\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u524d\u306b\u78ba\u8a8d\uff1a\u5bb9\u91cf\u3068\u5bfe\u5fdc\u72b6\u6cc1',
      'mobile.similarTitle': '\ud83c\udfae \u3042\u308f\u305b\u3066\u898b\u305f\u3044\u30e2\u30d0\u30a4\u30eb\u30b2\u30fc\u30e0',
      'mobile.similarNote': '\u30ab\u30bf\u30ed\u30b0\u5185\u306e\u4ed6\u306e\u30e2\u30d0\u30a4\u30eb\u30bf\u30a4\u30c8\u30eb\u3067\u3059\u3002\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u5bb9\u91cf\u3068\u5bfe\u5fdcOS\u3092\u4e26\u3079\u3066\u6bd4\u8f03\u3067\u304d\u307e\u3059\u3002',
      'mobile.affTitle': '{title}\u7528\u306e\u30b9\u30c8\u30ec\u30fc\u30b8\u3084\u30e2\u30d0\u30a4\u30eb\u30d0\u30c3\u30c6\u30ea\u30fc\u306f\u304a\u6301\u3061\u3067\u3059\u304b\uff1f',
      'mobile.affText': 'microSD\u30ab\u30fc\u30c9\u3001\u5145\u96fb\u5668\u3001\u30e2\u30d0\u30a4\u30eb\u30d0\u30c3\u30c6\u30ea\u30fc\u3001\u30b9\u30de\u30db\u30a2\u30af\u30bb\u30b5\u30ea\u30fc\u3092\u6700\u5b89\u5024\u3067\u6bd4\u8f03\u3067\u304d\u307e\u3059\u3002',
      'mobile.relatedTitle': '\u4ed6\u306e\u30e2\u30d0\u30a4\u30eb\u30b2\u30fc\u30e0\u306e\u52d5\u4f5c\u74b0\u5883\u3092\u898b\u308b'
    }
  };

  function merge(base, extra) {
    for (var k in extra) { if (Object.prototype.hasOwnProperty.call(extra, k)) base[k] = extra[k]; }
    return base;
  }
  merge(EN, EXTRA.en);
  merge(KO, EXTRA.ko);
  merge(JA, EXTRA.ja);

  var DICT = { en: EN, ko: KO, ja: JA };

  /* ------------------------------------------------------------------ state */
  function normLang(value) {
    var v = String(value || '').toLowerCase();
    if (v.indexOf('ko') === 0) return 'ko';
    if (v.indexOf('ja') === 0) return 'ja';
    if (v.indexOf('en') === 0) return 'en';
    return '';
  }

  function store(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  function load(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function queryLang() {
    try {
      return normLang(new URLSearchParams(window.location.search).get('lang'));
    } catch (e) { return ''; }
  }

  function detect() {
    var fromUrl = queryLang();
    if (fromUrl) return fromUrl;
    var saved = normLang(load(STORE_KEY));
    if (saved) return saved;
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < list.length; i++) {
      var hit = normLang(list[i]);
      if (hit) return hit;
    }
    return 'en';
  }

  var current = detect();
  // Only a link that names a language or a visitor who switched it marks the
  // choice as explicit; an auto-detected language stays out of the URL so shared
  // links keep their clean form.
  var explicit = !!queryLang() || load(STORE_EXPLICIT) === 'true';
  store(STORE_KEY, current);

  /* ---------------------------------------------------------------- lookup */
  function varsOf(el) {
    var raw = el.getAttribute('data-vars');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function fill(text, vars) {
    if (!vars) return text;
    return String(text).replace(/\{(\w+)\}/g, function (whole, key) {
      return vars[key] !== undefined && vars[key] !== null ? String(vars[key]) : whole;
    });
  }

  function known(key) {
    var table = DICT[current] || EN;
    var text = table[key];
    if (text === undefined) text = EN[key];
    return text;
  }

  function t(key, vars) {
    var text = known(key);
    if (text === undefined) return key;
    return fill(text, vars);
  }

  function fmt(n) {
    var num = Number(n);
    if (!isFinite(num)) return String(n);
    try {
      return num.toLocaleString(current === 'ko' ? 'ko-KR' : current === 'ja' ? 'ja-JP' : 'en-US');
    } catch (e) { return String(num); }
  }

  /* --------------------------------------------------------------- applying */
  var ATTRS = [
    ['data-i18n', 'textContent'],
    ['data-i18n-html', 'innerHTML'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-title', 'title']
  ];

  function applyNode(node) {
    for (var a = 0; a < ATTRS.length; a++) {
      var attr = ATTRS[a][0], prop = ATTRS[a][1];
      if (!node.hasAttribute || !node.hasAttribute(attr)) continue;
      var key = node.getAttribute(attr);
      if (!key) continue;
      var text = known(key);
      if (text === undefined) continue;
      text = fill(text, varsOf(node));
      if (prop === 'placeholder') node.setAttribute('placeholder', text);
      else if (prop === 'title') node.setAttribute('title', text);
      else if (prop === 'aria-label') node.setAttribute('aria-label', text);
      else node[prop] = text;
    }
  }

  function apply(root) {
    var scope = root || document;
    if (scope.nodeType === 1 && scope.hasAttribute && (scope.hasAttribute('data-i18n') || scope.hasAttribute('data-i18n-html'))) {
      applyNode(scope);
    }
    var nodes = scope.querySelectorAll ? scope.querySelectorAll('[data-i18n],[data-i18n-html],[data-i18n-placeholder],[data-i18n-aria],[data-i18n-title]') : [];
    for (var i = 0; i < nodes.length; i++) applyNode(nodes[i]);
    document.documentElement.setAttribute('lang', current);
    return current;
  }

  /* -------------------------------------------------------------- switcher */
  var STYLE_ID = 'cms-i18n-style';
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var css = '' +
      '.lang-switch{display:inline-flex;align-items:center;gap:2px;background:#0f172a;border:1px solid #334155;border-radius:9px;padding:2px;}' +
      '.lang-btn{background:none;border:none;color:#94a3b8;font:inherit;font-size:12px;font-weight:700;letter-spacing:.3px;padding:6px 9px;border-radius:7px;cursor:pointer;line-height:1;min-height:30px;}' +
      '.lang-btn:hover{color:#fff;}' +
      '.lang-btn[aria-pressed="true"]{background:#6366f1;color:#fff;}' +
      '.lang-switch-host{display:flex;justify-content:flex-end;}' +
      '@media (max-width:768px){.lang-btn{min-height:44px;min-width:44px;font-size:13px;padding:10px 12px;}}';
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildSwitchers() {
    var hosts = document.querySelectorAll('[data-lang-mount]');
    for (var i = 0; i < hosts.length; i++) {
      var host = hosts[i];
      if (host.getAttribute('data-lang-built') === '1') continue;
      var wrap = document.createElement('div');
      wrap.className = 'lang-switch';
      wrap.setAttribute('role', 'group');
      wrap.setAttribute('aria-label', t('common.langLabel'));
      var labels = { en: 'EN', ko: 'KO', ja: 'JA' };
      var titles = { en: 'common.langEn', ko: 'common.langKo', ja: 'common.langJa' };
      for (var j = 0; j < LANGS.length; j++) {
        var lang = LANGS[j];
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'lang-btn';
        btn.setAttribute('data-lang', lang);
        btn.setAttribute('lang', lang);
        btn.textContent = labels[lang];
        btn.title = t(titles[lang]);
        wrap.appendChild(btn);
      }
      host.innerHTML = '';
      host.appendChild(wrap);
      host.setAttribute('data-lang-built', '1');
      host.classList.add('lang-switch-host');
    }
    markActive();
  }

  function markActive() {
    var btns = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-lang') === current;
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function injectLangParam() {
    if (!explicit) return;
    try {
      var url = new URL(window.location.href);
      if (url.searchParams.get('lang') !== current) {
        url.searchParams.set('lang', current);
        window.history.replaceState(null, '', url.pathname + (url.searchParams.toString() ? '?' + url.searchParams.toString() : '') + url.hash);
      }
    } catch (e) { /* older browser: the choice still lives in localStorage */ }
  }

  var listeners = [];

  function setLang(lang) {
    var target = normLang(lang);
    if (!target || target === current) {
      if (target === current) markActive();
      return current;
    }
    current = target;
    explicit = true;
    store(STORE_KEY, current);
    store(STORE_EXPLICIT, 'true');
    injectLangParam();
    buildSwitchers();
    refreshSwitcherLabels();
    apply(document);
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](current); } catch (e) { /* one listener must not stop the rest */ }
    }
    return current;
  }

  function refreshSwitcherLabels() {
    var wraps = document.querySelectorAll('.lang-switch');
    for (var i = 0; i < wraps.length; i++) wraps[i].setAttribute('aria-label', t('common.langLabel'));
    var keys = { en: 'common.langEn', ko: 'common.langKo', ja: 'common.langJa' };
    var btns = document.querySelectorAll('.lang-btn');
    for (var j = 0; j < btns.length; j++) {
      var code = btns[j].getAttribute('data-lang');
      btns[j].title = t(keys[code] || 'common.langLabel');
    }
  }

  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('.lang-btn') : null;
    if (!btn) return;
    e.preventDefault();
    setLang(btn.getAttribute('data-lang'));
  });

  function boot() {
    injectStyle();
    buildSwitchers();
    apply(document);
    injectLangParam();
  }

  window.CMS = {
    lang: function () { return current; },
    setLang: setLang,
    t: t,
    fmt: fmt,
    apply: apply,
    onChange: function (fn) { if (typeof fn === 'function') listeners.push(fn); },
    explicitLang: function () { return explicit ? current : ''; },
    injectLang: function (params) {
      if (explicit && params && params.set) params.set('lang', current);
      return params;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
