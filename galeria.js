(() => {
  const items = [...document.querySelectorAll('.gallery figure')];

  const box = document.getElementById('lightbox');
  const image = document.getElementById('lightbox-image');
  const title = document.getElementById('lightbox-title');
  const count = document.getElementById('lightbox-count');

  const prev = document.querySelector('.lightbox-prev');
  const next = document.querySelector('.lightbox-next');
  const closeButton = document.querySelector('.lightbox-close');

  if (!items.length || !box || !image) return;

  /*
   * Cada categoria possui sua própria galeria.
   * Novas fotos poderão ser acrescentadas aqui futuramente.
   */
  const galleries = {};

  items.forEach((item) => {
    const category = item.dataset.gallery;

    if (!category) return;

    const img = item.querySelector('img');
    const caption = item.querySelector('figcaption');

    galleries[category] = [
      {
        src: img.currentSrc || img.src,
        alt: img.alt || '',
        title: caption ? caption.textContent.trim() : ''
      }
    ];
  });

  let currentGallery = [];
  let current = 0;
  let lastFocus = null;

  const render = () => {
    if (!currentGallery.length) return;

    const photo = currentGallery[current];

    image.src = photo.src;
    image.alt = photo.alt;

    if (title) {
      title.textContent = photo.title;
    }

    if (count) {
      count.textContent = `${current + 1} / ${currentGallery.length}`;
    }

    /*
     * Se a categoria tiver somente uma foto,
     * as setas ficam ocultas.
     */
    const multiple = currentGallery.length > 1;

    if (prev) {
      prev.hidden = !multiple;
    }

    if (next) {
      next.hidden = !multiple;
    }
  };

  const open = (item) => {
    const category = item.dataset.gallery;

    if (!category || !galleries[category]) return;

    currentGallery = galleries[category];
    current = 0;

    render();

    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');

    lastFocus = document.activeElement;

    if (closeButton) {
      closeButton.focus();
    }
  };

  const close = () => {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');

    image.src = '';

    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  };

  const previous = () => {
    if (currentGallery.length < 2) return;

    current =
      (current - 1 + currentGallery.length) %
      currentGallery.length;

    render();
  };

  const following = () => {
    if (currentGallery.length < 2) return;

    current =
      (current + 1) %
      currentGallery.length;

    render();
  };

  items.forEach((item) => {
    item.addEventListener('click', () => open(item));

    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(item);
      }
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', close);
  }

  document
    .querySelectorAll('[data-close]')
    .forEach((element) => {
      element.addEventListener('click', close);
    });

  if (prev) {
    prev.addEventListener('click', previous);
  }

  if (next) {
    next.addEventListener('click', following);
  }

  document.addEventListener('keydown', (event) => {
    if (box.getAttribute('aria-hidden') === 'true') return;

    if (event.key === 'Escape') {
      close();
    }

    if (event.key === 'ArrowLeft') {
      previous();
    }

    if (event.key === 'ArrowRight') {
      following();
    }
  });
})();
