    // Background Unique Visitor Tracker & Admin/Bot Protection
    (function() {
      try {
        const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
        const isAutomated = navigator.webdriver === true;
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('admin') || urlParams.has('master') || urlParams.has('owner')) {
          localStorage.setItem('canmyspec_admin', 'true');
        }
        const isAdmin = localStorage.getItem('canmyspec_admin') === 'true';

        // If automated test, crawler, or admin/owner: switch tracker to read-only badge (no count increase)
        if (isBot || isAutomated || isAdmin) {
          const tracker = document.getElementById('bgVisitorTracker');
          if (tracker) {
            tracker.src = 'https://visitor-badge.one9x.com/badge?page_id=canmyspec_uv&read=true';
          }
        }
      } catch (e) {
        // Fallback gracefully
      }
    })();
  