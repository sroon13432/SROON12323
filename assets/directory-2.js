    // Progressive enhancement only: without JS the page is a complete, crawlable index.
    (function () {
      var input = document.getElementById('dirSearch');
      var count = document.getElementById('dirCount');
      var blocks = Array.prototype.slice.call(document.querySelectorAll('.letter-block'));
      if (!input || !count || !blocks.length) return;

      var items = [];
      blocks.forEach(function (block) {
        Array.prototype.forEach.call(block.querySelectorAll('ul.dir-list li'), function (li) {
          var a = li.firstElementChild;
          items.push({ li: li, block: block, text: (a ? a.textContent : '').toLowerCase() });
        });
      });
      count.textContent = items.length + ' games';

      input.addEventListener('input', function () {
        var q = input.value.trim().toLowerCase();
        var shown = 0;
        var visible = {};
        for (var i = 0; i < items.length; i++) {
          var match = !q || items[i].text.indexOf(q) !== -1;
          items[i].li.style.display = match ? '' : 'none';
          if (match) { shown++; visible[items[i].block.id] = true; }
        }
        blocks.forEach(function (block) {
          block.style.display = visible[block.id] ? '' : 'none';
        });
        count.textContent = q ? (shown + ' of ' + items.length + ' games') : (items.length + ' games');
      });
    })();
  