// AMÉLIORATIONS SEO + DESIGN — MS Couverture Réunion (v2, nettoyé)
// Chargé via <script src="ameliorations.js" defer>
// v2 : WhatsApp retiré (numéro non configuré), avis fictifs retirés,
// doublons SEO retirés, FAQ schema limité à l'accueil.
(function () {
  'use strict';
  var SITE_URL = 'https://couvreur974.fr';
  var OG_IMAGE = SITE_URL + '/og-image.jpg';
  function init() {
    function setMeta(name, content, prop) {
      var attr = prop ? 'property' : 'name';
      var el = document.querySelector('meta[' + attr + '="' + name + '"]');
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    }
    if (!document.querySelector('link[rel="icon"]')) {
      var fav = document.createElement('link');
      fav.rel = 'icon'; fav.type = 'image/svg+xml'; fav.href = '/favicon.svg';
      document.head.appendChild(fav);
    }
    setMeta('geo.region', 'FR-RE');
    setMeta('geo.placename', 'Saint-Gilles-les-Bains, La Réunion');
    if (!document.querySelector('meta[property="og:image"]')) setMeta('og:image', OG_IMAGE, true);
    if (!document.querySelector('meta[property="og:url"]')) {
      var canon = document.querySelector('link[rel="canonical"]');
      if (canon) setMeta('og:url', canon.href, true);
    }
    var desc = document.querySelector('meta[name="description"]');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', document.title);
    if (desc) setMeta('twitter:description', desc.getAttribute('content'));
    setMeta('twitter:image', OG_IMAGE);
    var path = location.pathname;
    if (path === '/' || path === '/index.html') {
      var faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'Combien coûte une peinture de toiture à La Réunion ?', acceptedAnswer: { '@type': 'Answer', text: "Le coût dépend de la superficie et de l'état du support. Contactez-nous pour un devis gratuit et sans engagement." } },
        { '@type': 'Question', name: 'Intervenez-vous à Saint-Gilles-les-Bains et Saint-Paul ?', acceptedAnswer: { '@type': 'Answer', text: "Oui, nous couvrons tout l'Ouest réunionnais : Saint-Gilles-les-Bains, Saint-Paul, La Saline-les-Bains, Saint-Leu, Le Port et La Possession." } },
        { '@type': 'Question', name: 'Quels types de toitures prenez-vous en charge ?', acceptedAnswer: { '@type': 'Answer', text: 'Nous sommes spécialisés en toiture tôle (bac acier) : peinture, étanchéité, nettoyage, démoussage et resserrage des fixations.' } },
        { '@type': 'Question', name: 'Comment obtenir un devis pour ma toiture ?', acceptedAnswer: { '@type': 'Answer', text: 'Envoyez votre commune et quelques photos via le formulaire de contact. Nous planifions une visite rapidement pour confirmer le traitement adapté.' } }
      ]};
      var faqEl = document.createElement('script');
      faqEl.type = 'application/ld+json';
      faqEl.textContent = JSON.stringify(faq);
      document.head.appendChild(faqEl);
    }

    // 7. FIL D'ARIANE (BreadcrumbList) pour Google
    var pf = location.pathname.split('/').pop();
    if (pf && pf !== 'index.html' && pf !== 'merci.html' && pf !== '404.html') {
      var crumbs = [{n:'Accueil', u: SITE_URL + '/'}];
      if (/^couvreur-/.test(pf)) crumbs.push({n:'Zones', u: SITE_URL + '/zones.html'});
      else if (!/^(contact|zones|services|realisations)\.html$/.test(pf)) crumbs.push({n:'Services', u: SITE_URL + '/services.html'});
      var h1el = document.querySelector('h1');
      crumbs.push({n: h1el ? h1el.textContent.trim() : document.title, u: SITE_URL + '/' + pf});
      var bcEl = document.createElement('script');
      bcEl.type = 'application/ld+json';
      bcEl.textContent = JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':crumbs.map(function(c,i){return {'@type':'ListItem','position':i+1,'name':c.n,'item':c.u};})});
      document.head.appendChild(bcEl);
    }
    var nav = document.querySelector('nav');
    if (nav) {
      var navCSS = document.createElement('style');
      navCSS.textContent = 'nav{transition:background .3s,box-shadow .3s;}nav.nav--scrolled{background:rgba(255,248,236,.97)!important;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 2px 16px rgba(0,0,0,.08);}';
      document.head.appendChild(navCSS);
      window.addEventListener('scroll', function () { nav.classList.toggle('nav--scrolled', window.scrollY > 60); }, { passive: true });
    }
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init, { once: true }); } else { init(); }
})();
