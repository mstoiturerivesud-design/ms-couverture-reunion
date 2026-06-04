// ================================================================
// AMÉLIORATIONS SEO + DESIGN — MS Couverture Réunion
// ================================================================
// INSTALLATION (une seule ligne à ajouter dans index.html) :
//   Ajoutez  <script src="ameliorations.js"></script>  juste avant </body>
//
// CONFIGURATION :
//   Modifiez la section CONFIG ci-dessous avant de pousser le fichier.
// ================================================================

(function () {
  'use strict';

  // ======= CONFIG — à personnaliser =======
  var WA_NUMBER = '262XXXXXXXXX';   // ← Votre numéro WhatsApp sans le + (ex: 262693123456)
  var WA_MSG    = encodeURIComponent('Bonjour, je souhaite un devis pour ma toiture à La Réunion.');
  var SITE_URL  = 'https://couvreur974.fr';
  var OG_IMAGE  = SITE_URL + '/og-image.jpg'; // ← URL de votre photo pour les réseaux sociaux
  // =========================================


  // ─────────────────────────────────────────
  // 0. SEO META TAGS (title, description, géo, OG, canonical)
  // ─────────────────────────────────────────
  function setMeta(name, content, prop) {
    var attr = prop ? 'property' : 'name';
    var el = document.querySelector('meta[' + attr + '="' + name + '"]');
    if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
    el.setAttribute(attr, name);
    el.setAttribute('content', content);
  }

  // Title
  if (!document.title || document.title.trim() === '') {
    document.title = 'Couvreur La Réunion 974 — MS Couverture | Devis Gratuit';
  }

  // Meta description (clé pour le taux de clic dans Google)
  setMeta('description', 'MS Couverture, artisan couvreur à La Réunion (974). Réparation, rénovation et étanchéité de toiture tôle à Saint-Paul, Saint-Gilles et toute l\'île. Devis gratuit.');

  // Robots
  setMeta('robots', 'index, follow');

  // Géolocalisation générale, sans coordonnées tant qu'elles ne sont pas vérifiées.
  setMeta('geo.region',    'FR-RE');
  setMeta('geo.placename', 'Saint-Gilles-les-Bains, La Réunion');

  // Open Graph (partage réseaux sociaux)
  setMeta('og:type',        'website',                                              true);
  setMeta('og:url',         SITE_URL + '/',                                         true);
  setMeta('og:title',       'Couvreur La Réunion 974 — MS Couverture',              true);
  setMeta('og:description', 'Artisan couvreur à La Réunion. Réparation, rénovation, étanchéité tôle. Devis gratuit.', true);
  setMeta('og:image',       OG_IMAGE,                                               true);
  setMeta('og:locale',      'fr_FR',                                                true);
  setMeta('og:site_name',   'MS Couverture Réunion',                                true);

  // Twitter Card
  setMeta('twitter:card',        'summary_large_image');
  setMeta('twitter:title',       'Couvreur La Réunion 974 — MS Couverture');
  setMeta('twitter:description', 'Artisan couvreur à La Réunion. Réparation, rénovation, étanchéité. Devis gratuit sous 24h.');
  setMeta('twitter:image',       OG_IMAGE);

  // Canonical (évite le duplicate content)
  var canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = SITE_URL + '/';

  // Schema LocalBusiness (couvreur = RoofingContractor)
  var bizSchema = {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    'name': 'MS Couverture Réunion',
    'url': SITE_URL,
    'image': OG_IMAGE,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '48 Rue des Sables',
      'addressLocality': 'Saint-Gilles-les-Bains',
      'addressRegion': 'La Réunion',
      'postalCode': '97434',
      'addressCountry': 'FR'
    },
    'areaServed': { '@type': 'State', 'name': 'La Réunion' },
    'priceRange': '€€',
    'description': 'Artisan couvreur à La Réunion spécialisé en toiture tôle, peinture, étanchéité et rénovation.'
  };
  var bizEl = document.createElement('script');
  bizEl.type = 'application/ld+json';
  bizEl.textContent = JSON.stringify(bizSchema);
  document.head.appendChild(bizEl);


  // ─────────────────────────────────────────
  // 1. BOUTON WHATSAPP FLOTTANT
  // ─────────────────────────────────────────
  var waCSS = document.createElement('style');
  waCSS.textContent = [
    '.wa-float{position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;align-items:center;gap:10px;text-decoration:none;}',
    '.wa-float-btn{width:56px;height:56px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,.45);transition:transform .2s,box-shadow .2s;}',
    '.wa-float:hover .wa-float-btn{transform:scale(1.08);box-shadow:0 6px 28px rgba(37,211,102,.55);}',
    '.wa-float-label{background:#fff;color:#1a1a1a;font-family:Outfit,system-ui,sans-serif;font-size:14px;font-weight:600;padding:8px 14px;border-radius:24px;box-shadow:0 2px 12px rgba(0,0,0,.12);white-space:nowrap;opacity:0;transform:translateX(8px);transition:opacity .2s,transform .2s;pointer-events:none;}',
    '.wa-float:hover .wa-float-label{opacity:1;transform:translateX(0);}',
    '@media(max-width:600px){.wa-float-label{display:none;}}'
  ].join('');
  document.head.appendChild(waCSS);

  var waEl = document.createElement('a');
  waEl.className = 'wa-float';
  waEl.href = 'https://wa.me/' + WA_NUMBER + '?text=' + WA_MSG;
  waEl.target = '_blank';
  waEl.rel = 'noopener noreferrer';
  waEl.setAttribute('aria-label', 'Contacter par WhatsApp');
  waEl.innerHTML =
    '<span class="wa-float-label">Devis sur WhatsApp</span>' +
    '<span class="wa-float-btn">' +
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
      '</svg>' +
    '</span>';
  document.body.appendChild(waEl);


  // ─────────────────────────────────────────
  // 2. SECTION AVIS CLIENTS
  // (remplacez les textes par vos vrais avis)
  // ─────────────────────────────────────────
  var avisCSS = document.createElement('style');
  avisCSS.textContent = [
    '.avis-section{padding:72px 0;}',
    '.avis-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-top:40px;}',
    '.avis-card{background:#fff;border-radius:16px;padding:28px;box-shadow:0 2px 16px rgba(0,0,0,.07);transition:transform .2s,box-shadow .2s;}',
    '.avis-card:hover{transform:translateY(-4px);box-shadow:0 8px 28px rgba(0,0,0,.11);}',
    '.avis-stars{color:#f59e0b;font-size:20px;margin-bottom:14px;letter-spacing:2px;}',
    '.avis-text{font-family:Outfit,system-ui,sans-serif;color:#555;line-height:1.7;font-size:15px;margin-bottom:20px;font-style:italic;}',
    '.avis-name{font-family:Outfit,system-ui,sans-serif;font-weight:700;color:#1a1a1a;font-size:15px;}',
    '.avis-ville{font-family:Outfit,system-ui,sans-serif;font-size:13px;color:#999;margin-top:3px;}'
  ].join('');
  document.head.appendChild(avisCSS);

  var avis = [
    { nom: 'Marie-Hélène P.', ville: 'Saint-Gilles-les-Bains', texte: 'Toiture refaite impeccablement. Équipe sérieuse, ponctuelle, résultat vraiment au top !' },
    { nom: 'Rémy D.',         ville: 'Saint-Paul',              texte: 'Devis rapide, intervention soignée. Peinture tôle excellente — la toiture est magnifique.' },
    { nom: 'Joëlle M.',       ville: 'Saint-Leu',               texte: 'Très satisfaite. Professionnel, propre, et les finitions sont irréprochables. Merci !' }
  ];

  var grid = avis.map(function (a) {
    return '<article class="avis-card">' +
      '<div class="avis-stars">★★★★★</div>' +
      '<p class="avis-text">« ' + a.texte + ' »</p>' +
      '<div class="avis-name">' + a.nom + '</div>' +
      '<div class="avis-ville">' + a.ville + '</div>' +
      '</article>';
  }).join('');

  var avisSection = document.createElement('section');
  avisSection.className = 'section avis-section';
  avisSection.innerHTML =
    '<div class="container">' +
      '<div class="section-kicker">Avis clients</div>' +
      '<h2 class="section-title">Ce que disent nos clients.</h2>' +
      '<div class="avis-grid">' + grid + '</div>' +
    '</div>';

  var zoneBand = document.querySelector('.zone-band');
  if (zoneBand) zoneBand.parentNode.insertBefore(avisSection, zoneBand);


  // ─────────────────────────────────────────
  // 3. FAQ SCHEMA — SEO (lu par Google)
  // ─────────────────────────────────────────
  var faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Combien coûte une peinture de toiture à La Réunion ?',
        acceptedAnswer: { '@type': 'Answer', text: "Le coût dépend de la superficie et de l'état du support. Contactez-nous pour un devis gratuit et sans engagement." }
      },
      {
        '@type': 'Question',
        name: 'Intervenez-vous à Saint-Gilles-les-Bains et Saint-Paul ?',
        acceptedAnswer: { '@type': 'Answer', text: "Oui, nous couvrons tout l'Ouest réunionnais : Saint-Gilles-les-Bains, Saint-Paul, La Saline-les-Bains, Saint-Leu, Le Port et La Possession." }
      },
      {
        '@type': 'Question',
        name: 'Quels types de toitures prenez-vous en charge ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Nous sommes spécialisés en toiture tôle (bac acier) : peinture, étanchéité, nettoyage, démoussage et resserrage des fixations.' }
      },
      {
        '@type': 'Question',
        name: 'Comment obtenir un devis pour ma toiture ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Envoyez votre commune et quelques photos via le formulaire de contact ou sur WhatsApp. Nous planifions une visite rapidement pour confirmer le traitement adapté.' }
      }
    ]
  };

  var faqEl = document.createElement('script');
  faqEl.type = 'application/ld+json';
  faqEl.textContent = JSON.stringify(faq);
  document.head.appendChild(faqEl);


  // ─────────────────────────────────────────
  // 4. OG:IMAGE (réseaux sociaux)
  // ─────────────────────────────────────────
  if (!document.querySelector('meta[property="og:image"]')) {
    var og = document.createElement('meta');
    og.setAttribute('property', 'og:image');
    og.setAttribute('content', OG_IMAGE);
    document.head.appendChild(og);
  }


  // ─────────────────────────────────────────
  // 5. EFFET SCROLL SUR LA NAVIGATION
  // ─────────────────────────────────────────
  var nav = document.querySelector('nav');
  if (nav) {
    var navCSS = document.createElement('style');
    navCSS.textContent =
      'nav{transition:background .3s,box-shadow .3s;}' +
      'nav.nav--scrolled{background:rgba(255,248,236,.95)!important;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 2px 16px rgba(0,0,0,.08);}';
    document.head.appendChild(navCSS);
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav--scrolled', window.scrollY > 60);
    }, { passive: true });
  }

})();
