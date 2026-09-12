// Les métadonnées et fils d'Ariane sont présents dans le HTML.
(() => {
  'use strict';
  const nav = document.querySelector('nav.nav');
  if (nav) {
    const update = () => nav.classList.toggle('nav--scrolled', window.scrollY > 60);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }
  const menu = document.querySelector('.mobile-nav');
  if (menu) {
    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        menu.querySelector('summary').focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
  }
})();
