(() => {
  const items = [...document.querySelectorAll('.gallery figure')];
  const box = document.getElementById('lightbox');
  const image = document.getElementById('lightbox-image');
  const title = document.getElementById('lightbox-title');
  const count = document.getElementById('lightbox-count');
  if (!items.length || !box) return;
  let current = 0;
  let lastFocus = null;

  const open = (index) => {
    current = (index + items.length) % items.length;
    const img = items[current].querySelector('img');
    const caption = items[current].querySelector('figcaption');
    image.src = img.currentSrc || img.src;
    image.alt = img.alt || '';
    title.textContent = caption ? caption.textContent.trim() : '';
    count.textContent = `${current + 1} / ${items.length}`;
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lastFocus = document.activeElement;
    document.querySelector('.lightbox-close').focus();
  };
  const close = () => {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    image.src = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };
  const next = () => open(current + 1);
  const prev = () => open(current - 1);

  items.forEach((item, index) => {
    item.addEventListener('click', () => open(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(index); }
    });
  });
  box.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
  box.querySelector('.lightbox-next').addEventListener('click', next);
  box.querySelector('.lightbox-prev').addEventListener('click', prev);
  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
})();
