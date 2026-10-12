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

// Préremplissage des champs visibles, sans envoyer la demande.
(() => {
  const form = document.getElementById('demande-devis');
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const commune = params.get('commune');
  const communeInput = form.elements.namedItem('commune');
  if (commune && commune.length <= 150 && communeInput) communeInput.value = commune;
  const besoin = params.get('besoin');
  const select = form.elements.namedItem('besoin');
  if (select && [...select.options].some(option => option.value === besoin)) select.value = besoin;
})();
