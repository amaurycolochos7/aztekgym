/* =====================================================
   AZTEK GYM - Interactions
   ===================================================== */

(function () {
    'use strict';

    /* ----- Sticky nav on scroll ----- */
    const nav = document.getElementById('nav');
    const onScroll = () => {
        if (window.scrollY > 20) nav.classList.add('is-scrolled');
        else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ----- Mobile menu toggle ----- */
    const toggle = document.getElementById('navToggle');
    const menu = document.querySelector('.nav__menu');
    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('is-open');
        toggle.classList.toggle('is-open', open);
        toggle.setAttribute('aria-label', open ? 'Cerrar menu' : 'Abrir menu');
        document.body.style.overflow = open ? 'hidden' : '';
    });

    /* Close menu when clicking a link */
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            menu.classList.remove('is-open');
            toggle.classList.remove('is-open');
            document.body.style.overflow = '';
        });
    });

    /* ----- Reveal on scroll ----- */
    const revealTargets = document.querySelectorAll(
        '.hero__content > *, .pillar, .service, .branch, .muaythai__text > *, .muaythai__card, .schedule__intro > *, .schedule__table, .contact__info > *, .contact__form, .section-head > *'
    );
    revealTargets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(i * 40, 240) + 'ms';
    });
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => io.observe(el));

    /* ----- Year ----- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ----- Form submit: open WhatsApp / Messenger with pre-filled message ----- */
function handleSubmit(e) {
    e.preventDefault();
    const f = e.target;
    const data = new FormData(f);
    const nombre = (data.get('nombre') || '').toString().trim();
    const tel = (data.get('tel') || '').toString().trim();
    const sucursal = (data.get('sucursal') || '').toString().trim();
    const interes = (data.get('interes') || '').toString().trim();

    const msg = `Hola AZTEK GYM! Soy ${nombre}. Me interesa informacion sobre ${interes} en la sucursal ${sucursal}. Mi telefono es ${tel}.`;
    const waUrl = `https://wa.me/528441071407?text=${encodeURIComponent(msg)}`;

    window.open(waUrl, '_blank', 'noopener');

    const note = f.querySelector('.contact__form-note');
    if (note) {
        note.textContent = 'Abrimos WhatsApp para que envies tu solicitud. Te contactaremos pronto!';
        note.style.color = '#e8b730';
    }
    f.reset();
}
