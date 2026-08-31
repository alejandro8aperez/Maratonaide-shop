// MARATONaide Shop — checkout hand-off
// The payment itself is processed exclusively by Wompi.

const PAYMENT_LINKS = {
    es: 'https://checkout.wompi.co/l/VPOS_axGQjW',
    en: 'PENDIENTE: Crear link Wompi para edición EN',
    fr: 'PENDIENTE: Crear link Wompi para edición FR'
};

// Formspree records a *payment request*, never a completed order. Payment must
// be confirmed in Wompi before the physical book is delivered.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meeyznvp';

    const MESSAGES = {
    es: {
        sending: 'Registrando tus datos de entrega…',
        error: 'No pudimos registrar el pedido. Revisa tu conexión e inténtalo de nuevo antes de pagar.',
        invalidPayment: 'El enlace de pago no está disponible. Por favor, inténtalo más tarde.',
        pending: 'Solicitud de pago MARATONaide'
    },
    en: {
        sending: 'Saving your delivery details…',
        error: 'We could not save your order. Check your connection and try again before paying.',
        invalidPayment: 'The payment link is not available. Please try again later.',
        pending: 'MARATONaide payment request'
    },
    fr: {
        sending: 'Enregistrement de vos coordonnées de livraison…',
        error: 'Nous n\'avons pas pu enregistrer votre commande. Vérifiez votre connexion et réessayez avant de payer.',
        invalidPayment: 'Le lien de paiement n\'est pas disponible. Veuillez réessayer plus tard.',
        pending: 'Demande de paiement MARATONaide'
    }
};

let lastFocusedElement = null;

function checkout(lang) {
    lastFocusedElement = document.activeElement;
    document.getElementById('order-lang').value = lang;
    document.getElementById('order-product').value = `maratonaide-${lang}`;
    document.getElementById('form-status').textContent = '';
    document.getElementById('order-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('order-name').focus(), 200);
}

function closeModal() {
    document.getElementById('order-modal').style.display = 'none';
    document.body.style.overflow = '';
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.getElementById('order-modal').style.display !== 'none') {
        closeModal();
    }
});

function isValidPaymentUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:' && parsed.hostname === 'checkout.wompi.co';
    } catch {
        return false;
    }
}

async function submitOrder(event) {
    event.preventDefault();

    const form = document.getElementById('order-form');
    if (!form.reportValidity()) return;

    const lang = document.getElementById('order-lang').value;
    const copy = MESSAGES[lang] || MESSAGES.es;
    const paymentUrl = PAYMENT_LINKS[lang];
    const status = document.getElementById('form-status');
    const button = document.querySelector('.modal-submit');
    const originalMarkup = button.innerHTML;

    if (!isValidPaymentUrl(paymentUrl)) {
        status.textContent = copy.invalidPayment;
        return;
    }

    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    status.textContent = copy.sending;

    const name = document.getElementById('order-name').value.trim();
    const email = document.getElementById('order-email').value.trim();
    const phone = document.getElementById('order-phone').value.trim();
    const reference = `MARA-${lang.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _subject: `${copy.pending} [${reference}]`,
                reference,
                estado: 'Pendiente de pago en Wompi',
                nombre: name,
                email,
                telefono: phone || 'No informado',
                idioma: lang.toUpperCase(),
                producto: 'MARATONaide — Libro físico',
                precio: '$45.000 COP',
                origen: window.location.href,
                submitted_at: new Date().toISOString()
            })
        });

        if (!response.ok) throw new Error(`Form capture failed: ${response.status}`);

        sessionStorage.setItem('maratonaide-payment-reference', reference);
        window.location.assign(paymentUrl);
    } catch (error) {
        console.error('Unable to register payment request:', error);
        status.textContent = copy.error;
        button.disabled = false;
        button.removeAttribute('aria-busy');
        button.innerHTML = originalMarkup;
    }
}
