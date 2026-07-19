// Language switcher
document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');
    const html = document.documentElement;

    // Check saved language
    const savedLang = localStorage.getItem('maratonaide-lang') || 'es';
    setLanguage(savedLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            localStorage.setItem('maratonaide-lang', lang);
        });
    });

    function setLanguage(lang) {
        html.lang = lang;

        // Update active button
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update all translatable elements
        document.querySelectorAll('[data-es]').forEach(el => {
            const text = el.dataset[lang];
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.innerHTML = text;
                }
            }
        });
    }
});
