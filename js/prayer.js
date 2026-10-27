(function () {
  'use strict';
  var SHEET_ID = '1bxarB_CCoLxtAtmXJBVKG8ibXMEyHSqNE6f3W6CXViY';
  var CSV_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?tqx=out:csv&sheet=Prayer';
  var GROUPS = ['Our Church', 'Our Community', 'Outreach', 'Answered Prayers'];

  function parseCSV(text) {
    var rows = [], row = [], field = '', i = 0, q = false, c;
    text = text.replace(/^\uFEFF/, '');
    while (i < text.length) {
      c = text[i];
      if (q) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; } else { q = false; }
        } else { field += c; }
      } else if (c === '"') { q = true; }
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); rows.push(row); row = []; field = '';
      } else { field += c; }
      i++;
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function norm(s) { return String(s || '').trim().toLowerCase(); }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function status(box, msg) {
    box.textContent = '';
    box.appendChild(el('p', 'prayer-status', msg));
  }

  function render(box, rows) {
    if (!rows.length) { status(box, 'No prayer requests are listed right now. Please check back soon.'); return; }
    var header = rows[0].map(norm);
    function col(name) { return header.indexOf(name); }
    var iO = col('order'), iC = col('category'), iT = col('prayer request'), iD = col('date added'), iS = col('show');
    var items = [];
    rows.slice(1).forEach(function (r, idx) {
      if (norm(r[iS]) !== 'yes') return;
      var text = String(r[iT] || '').trim();
      if (!text) return;
      var n = parseFloat(r[iO]);
      items.push({ order: isNaN(n) ? Infinity : n, idx: idx, cat: String(r[iC] || '').trim(), text: text, date: String(r[iD] || '').trim() });
    });
    items.sort(function (a, b) { return a.order - b.order || a.idx - b.idx; });
    if (!items.length) { status(box, 'No prayer requests are listed right now. Please check back soon.'); return; }

    var buckets = {}, order = GROUPS.concat(['Other']);
    order.forEach(function (g) { buckets[g] = []; });
    items.forEach(function (it) {
      var g = GROUPS.filter(function (x) { return norm(x) === norm(it.cat); })[0] || 'Other';
      buckets[g].push(it);
    });

    box.textContent = '';
    order.forEach(function (g, gi) {
      if (!buckets[g].length) return;
      var sec = el('section', 'prayer-group');
      var h = el('h2', null, g);
      h.id = 'prayer-group-' + gi;
      sec.setAttribute('aria-labelledby', h.id);
      sec.appendChild(h);
      buckets[g].forEach(function (it) {
        var card = el('article', 'card prayer-item');
        card.appendChild(el('p', 'prayer-text', it.text));
        if (it.date) card.appendChild(el('p', 'prayer-date', 'Added ' + it.date));
        sec.appendChild(card);
      });
      box.appendChild(sec);
    });
  }

  function init() {
    var box = document.getElementById('prayer-list');
    if (!box) return;
    fetch(CSV_URL, { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (t) {
        if (/^\s*</.test(t)) throw new Error('Not CSV');
        render(box, parseCSV(t));
      })
      .catch(function () {
        status(box, 'Sorry, the prayer list could not be loaded right now. Please try again later, or join us for Friday Prayer & Fasting.');
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
