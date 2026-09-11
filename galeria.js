 (() => {
  const gallery = document.querySelector('.gallery');

  const box = document.getElementById('lightbox');
  const image = document.getElementById('lightbox-image');
  const title = document.getElementById('lightbox-title');
  const count = document.getElementById('lightbox-count');

  const prev = document.querySelector('.lightbox-prev');
  const next = document.querySelector('.lightbox-next');
  const closeButton = document.querySelector('.lightbox-close');

  if (!gallery || !box || !image) return;

  /*
   * ============================================================
   * NOVAS FOTOS DO PROJETO
   * ============================================================
   */

  const novasFotos = [
    ['01', 'Formação e presença'],
    ['02', 'Juventude e disciplina'],
    ['03', 'Formação e disciplina'],
    ['04', 'Identidade do ESPMI-ES'],
    ['06', 'Condicionamento físico'],
    ['07', 'União e trabalho em equipe'],
    ['08', 'Disciplina e cidadania'],
    ['09', 'Marcha e formação'],
    ['10', 'Bandeira Nacional'],
    ['11', 'Instrução e aprendizado'],
    ['13', 'Juventude e liderança'],
    ['15', 'Juventude e determinação'],
    ['16', 'Companheirismo'],
    ['17', 'Preparação e disciplina'],
    ['18', 'Sede do Projeto'],
    ['19', 'Formação educacional'],
    ['20', 'Encerramento e confraternização']
  ];

  /*
   * ============================================================
   * CHARGES
   * ============================================================
   */

  const charges = [
    ['1', 'Charge 01'],
    ['2', 'Charge 02'],
    ['3', 'Charge 03'],
    ['4', 'Charge 04'],
    ['5', 'Charge 05'],
    ['6', 'Charge 06'],
    ['7', 'Charge 07'],
    ['8', 'Charge 08'],
    ['9', 'Charge 09']
  ];

  /*
   * Adiciona as 17 novas fotos ao final da galeria.
   * Os arquivos já existentes no GitHub não são alterados.
   */

  novasFotos.forEach(([numero, legenda]) => {
    const figure = document.createElement('figure');

    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.dataset.gallery = 'novas-fotos-pjm';
    figure.setAttribute(
      'aria-label',
      `Abrir galeria: ${legenda}`
    );

    figure.innerHTML = `
      <img
        src="assets/gallery/PJM_foto_${numero}_corrigida.png"
        alt="${legenda}">
      <figcaption>${legenda}</figcaption>
    `;

    gallery.appendChild(figure);
  });

  /*
   * Adiciona as 9 charges ao final da galeria.
   */

  charges.forEach(([numero, legenda]) => {
    const figure = document.createElement('figure');

    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.dataset.gallery = 'charges';
    figure.setAttribute(
      'aria-label',
      `Abrir galeria: ${legenda}`
    );

    figure.innerHTML = `
      <img
        src="assets/charges/Charger ${numero}.png"
        alt="${legenda}">
      <figcaption>${legenda}</figcaption>
    `;

    gallery.appendChild(figure);
  });

  /*
   * Captura todas as figuras, incluindo as que acabamos
   * de adicionar automaticamente.
   */

  const items = [...gallery.querySelectorAll('figure')];

  /*
   * ============================================================
   * CONSTRUÇÃO DAS GALERIAS
   * ============================================================
   */

  const galleries = {};

  items.forEach((item) => {
    const category = item.dataset.gallery;

    if (!category) return;

    const img = item.querySelector('img');

    if (!img) return;

    const caption = item.querySelector('figcaption');

    /*
     * IMPORTANTE:
     * Se a categoria já existir, adicionamos a foto
     * em vez de substituir a anterior.
     */

    if (!galleries[category]) {
      galleries[category] = [];
    }

    galleries[category].push({
      src: img.currentSrc || img.src,
      alt: img.alt || '',
      title: caption
        ? caption.textContent.trim()
        : ''
    });
  });

  /*
   * ============================================================
   * CONTROLE DO LIGHTBOX
   * ============================================================
   */

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
      count.textContent =
        `${current + 1} / ${currentGallery.length}`;
    }

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

    if (
      lastFocus &&
      typeof lastFocus.focus === 'function'
    ) {
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

  /*
   * ============================================================
   * CLIQUE E TECLADO
   * ============================================================
   */

  items.forEach((item) => {
    item.addEventListener('click', () => {
      open(item);
    });

    item.addEventListener('keydown', (event) => {
      if (
        event.key === 'Enter' ||
        event.key === ' '
      ) {
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
    if (box.getAttribute('aria-hidden') === 'true') {
      return;
    }

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
