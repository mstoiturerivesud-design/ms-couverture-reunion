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

// Libellé compact de contact, sans modifier le numéro ni le lien.
document.querySelectorAll('.mobile-action-bar a[href^="tel:"]').forEach(link => { if (!link.hasAttribute('aria-label')) link.setAttribute('aria-label', link.textContent.trim()); link.textContent = 'Appeler'; });

// Masquer uniquement les compteurs décoratifs, sans toucher aux données chiffrées.
(() => {
 const clean = () => {
  document.querySelectorAll('main span, main small, main b, main strong, main h2, main h3, main h4, main p, main .need-number').forEach(el => {
   if (el.children.length === 0 && /^0[1-9](?:[.·])?$/.test(el.textContent.trim()) && !el.closest('a, button, label, time, [data-roof-label]')) { el.style.display = 'none'; el.setAttribute('aria-hidden','true'); }
   else if (el.matches('h2,h3,h4') && el.firstChild?.nodeType === 3) el.firstChild.textContent = el.firstChild.textContent.replace(/^\s*0[1-9][.·]\s+/, '');
  });
 };
 if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',clean,{once:true}); else clean();
})();
