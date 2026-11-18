    (function () {
      var input = document.getElementById('boardSearch');
      var board = document.getElementById('board');
      var rows = [].slice.call(board.querySelectorAll('.board-row'));
      var countEl = document.getElementById('filterCount');
      var emptyEl = document.getElementById('emptyNote');
      var chips = [].slice.call(document.querySelectorAll('#catChips .chip'));
      var activeCat = 'all';
      var total = rows.length;

      function apply() {
        var q = (input.value || '').trim().toLowerCase();
        var shown = 0;
        rows.forEach(function (row) {
          var okCat = activeCat === 'all' || row.getAttribute('data-cat') === activeCat;
          var okText = !q || (row.getAttribute('data-q') || '').indexOf(q) !== -1;
          var show = okCat && okText;
          row.style.display = show ? '' : 'none';
          if (show) shown++;
        });
        countEl.textContent = (shown === total)
          ? total + ' questions on this page'
          : shown + ' of ' + total + ' questions on this page match';
        emptyEl.style.display = shown ? 'none' : '';
      }

      input.addEventListener('input', apply);
      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          chips.forEach(function (c) { c.classList.remove('current'); });
          chip.classList.add('current');
          activeCat = chip.getAttribute('data-cat') || 'all';
          apply();
        });
      });
    })();
  