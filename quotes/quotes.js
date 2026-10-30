(function () {
  var ORDER = ['Faith', 'Wisdom', 'Encouragement', 'Scripture'];
  var statusEl = document.getElementById('status');
  var listEl = document.getElementById('quotes');
  var updEl = document.getElementById('updated');
  function setStatus(msg, isErr) {
    statusEl.textContent = msg;
    statusEl.className = 'status' + (isErr ? ' error' : '');
    statusEl.hidden = !msg;
  }
  fetch('data.json', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (data) {
      var records = Array.isArray(data) ? data : (data && data.records) || [];
      if (data && data.updated) {
        var d = new Date(data.updated);
        updEl.textContent = 'Last updated: ' + (isNaN(d) ? data.updated : d.toLocaleString());
        updEl.hidden = false;
      }
      var items = records.filter(function (r) { return r && r.Show === true && r.Quote; })
        .sort(function (a, b) { return (Number(a.Order) || 0) - (Number(b.Order) || 0); });
      if (!items.length) { setStatus('No quotes yet.'); return; }
      var groups = {};
      items.forEach(function (r) {
        var c = r.Category || 'Other';
        (groups[c] = groups[c] || []).push(r);
      });
      var cats = ORDER.filter(function (c) { return groups[c]; })
        .concat(Object.keys(groups).filter(function (c) { return ORDER.indexOf(c) < 0; }));
      cats.forEach(function (c) {
        var sec = document.createElement('section');
        var h = document.createElement('h2');
        h.textContent = c;
        sec.appendChild(h);
        groups[c].forEach(function (r) {
          var card = document.createElement('div');
          card.className = 'card';
          card.textContent = r.Quote;
          sec.appendChild(card);
        });
        listEl.appendChild(sec);
      });
      setStatus('');
    })
    .catch(function (e) { setStatus('Could not load quotes. ' + e.message, true); });
})();
