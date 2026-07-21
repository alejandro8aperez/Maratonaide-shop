// ============================================
// MARATONaide Shop — Checkout
// ============================================

// ============================================
// CONFIGURATION
// Replace with your Wompi payment links
// ============================================
const PAYMENT_LINKS = {
    'es': 'https://checkout.wompi.co/l/TU_LINK_ES',
    'en': 'https://checkout.wompi.co/l/TU_LINK_EN',
    'fr': 'https://checkout.wompi.co/l/TU_LINK_FR'
};

// Formspree endpoint for order capture
// Create free form at https://formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

// ============================================
// MODAL
// ============================================
function checkout(lang) {
    document.getElementById('order-lang').value = lang;
    document.getElementById('order-product').value = 'maratonaide-' + lang;
    document.getElementById('order-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => document.getElementById('order-name').focus(), 200);
}

function closeModal() {
    document.getElementById('order-modal').style.display = 'none';
    document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ============================================
// FORM SUBMISSION
// ============================================
async function submitOrder(e) {
    e.preventDefault();

    const lang = document.getElementById('order-lang').value;
    const name = document.getElementById('order-name').value.trim();
    const email = document.getElementById('order-email').value.trim();
    const phone = document.getElementById('order-phone').value.trim();
    const address = document.getElementById('order-address').value.trim();
    const city = document.getElementById('order-city').value.trim();
    const dept = document.getElementById('order-dept').value.trim();

    if (!name || !email || !phone || !address || !city) {
        alert(lang === 'es' ? 'Por favor completa todos los campos obligatorios.'
            : lang === 'en' ? 'Please fill in all required fields.'
            : 'Veuillez remplir tous les champs obligatoires.');
        return;
    }

    const btn = document.querySelector('.modal-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '...';
    btn.disabled = true;

    try {
        // Send order to Formspree (saves to your email/dashboard)
        await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _subject: `Nuevo pedido MARATONaide [${lang.toUpperCase()}]`,
                nombre: name,
                email: email,
                telefono: phone,
                direccion: address,
                ciudad: city,
                departamento: dept,
                idioma: lang.toUpperCase(),
                producto: 'MARATONaide — PDF + EPUB',
                precio: '$9.99 USD'
            })
        });

        // Redirect to Wompi payment
        window.open(PAYMENT_LINKS[lang], '_blank');

        // Reset form and close modal
        document.getElementById('order-form').reset();
        closeModal();

    } catch (error) {
        console.error('Order error:', error);
        // Still redirect to payment even if form capture fails
        window.open(PAYMENT_LINKS[lang], '_blank');
        closeModal();
    }

    btn.innerHTML = originalText;
    btn.disabled = false;
}
