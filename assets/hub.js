    function filterHubList() {
      const q = document.getElementById('hubSearch').value.toLowerCase().trim();
      ['recGrid', 'minGrid'].forEach(function (id) {
        const grid = document.getElementById(id);
        const empty = document.getElementById(id === 'recGrid' ? 'recEmpty' : 'minEmpty');
        let visible = 0;
        Array.prototype.forEach.call(grid.querySelectorAll('.game-card'), function (card) {
          const hit = !q || (card.getAttribute('data-title') || '').indexOf(q) !== -1;
          card.style.display = hit ? 'flex' : 'none';
          if (hit) visible++;
        });
        if (empty) empty.style.display = visible ? 'none' : 'block';
      });
    }
  