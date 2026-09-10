
(() => {
  const filters = [...document.querySelectorAll('.filter')];
  const cards = [...document.querySelectorAll('.news-card')];
  const search = document.getElementById('newsSearch');
  const empty = document.getElementById('emptyState');
  const modal = document.getElementById('newsModal');
  const title = document.getElementById('modalTitle');
  const text = document.getElementById('modalText');

  let category = 'todos';

  function render() {
    const term = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const okCategory = category === 'todos' || card.dataset.category === category;
      const hay = (card.dataset.title + ' ' + card.textContent).toLowerCase();
      const okSearch = !term || hay.includes(term);
      const show = okCategory && okSearch;
      card.hidden = !show;
      if (show) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  }

  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    category = btn.dataset.filter;
    render();
  }));
  search?.addEventListener('input', render);

  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', () => {
      title.textContent = btn.dataset.title || '';
      text.textContent = btn.dataset.text || '';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    });
  });

  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  modal?.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) close();
  });

  render();
})();
