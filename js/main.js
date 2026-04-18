(function () {
  const STORAGE_KEY = 'weber-theme';
  const VALID = ['white', 'cool'];
  const root = document.documentElement;

  const read = () => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return VALID.includes(v) ? v : null;
    } catch (_) {
      return null;
    }
  };

  const save = (t) => {
    try { localStorage.setItem(STORAGE_KEY, t); } catch (_) {}
  };

  const apply = (t) => {
    root.setAttribute('data-theme', t);
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      const next = t === 'white' ? 'cool' : 'white';
      btn.textContent = '[' + next + ']';
      btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    }
  };

  apply(read() || root.getAttribute('data-theme') || 'white');

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    apply(root.getAttribute('data-theme') || 'white');
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'white';
      const next = current === 'white' ? 'cool' : 'white';
      apply(next);
      save(next);
    });
  });
})();
