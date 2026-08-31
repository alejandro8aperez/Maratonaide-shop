// Language switcher
window.applyLanguage = null; // set below for external use

document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');
    const html = document.documentElement;

    function setLanguage(lang) {
        html.lang = lang;

        // Update active button
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update visible copy and document metadata.
        document.querySelectorAll('[data-es]').forEach(el => {
            const text = el.dataset[lang];
            if (!text) return;

            if (el.tagName === 'META') {
                el.content = text;
            } else {
                el.innerHTML = text;
            }
        });

        document.querySelectorAll('[data-placeholder-es]').forEach(el => {
            el.placeholder = el.dataset[`placeholder${lang[0].toUpperCase()}${lang.slice(1)}`] || '';
        });

        document.querySelectorAll('[data-aria-label-es]').forEach(el => {
            el.setAttribute('aria-label', el.dataset[`ariaLabel${lang[0].toUpperCase()}${lang.slice(1)}`] || '');
        });
    }

    // Expose so checkout.js can re-apply the language when opening the modal.
    window.applyLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('maratonaide-lang', lang);
    };

    // Check saved language. Ignore stale or malformed saved values.
    const storedLang = localStorage.getItem('maratonaide-lang');
    const savedLang = ['es', 'en', 'fr'].includes(storedLang) ? storedLang : 'es';
    setLanguage(savedLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            localStorage.setItem('maratonaide-lang', lang);
        });
    });
});
