/* Mobile menu toggle + copy buttons. The site works without JavaScript:
   when JS is off, the menu links simply stay visible. */
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        nav.classList.toggle('open', !open);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
          toggle.setAttribute('aria-expanded', 'false');
          nav.classList.remove('open');
          toggle.focus();
        }
      });
    }

    var buttons = document.querySelectorAll('.copy-btn');
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        var label = btn.textContent;
        function done(msg) {
          btn.textContent = msg;
          setTimeout(function () { btn.textContent = label; }, 2000);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { done('Copied!'); },
            function () { done(text); });
        } else {
          done(text);
        }
      });
    });
  });
})();
