// Stripe Checkout Integration
// ============================================
// CONFIGURATION: Replace with your Stripe keys
// ============================================

const STRIPE_CONFIG = {
    // Get these from https://dashboard.stripe.com/apikeys
    publishableKey: 'pk_test_YOUR_KEY_HERE',

    // Price IDs from Stripe Dashboard > Products
    prices: {
        'es': 'price_REPLACE_WITH_STRIPE_PRICE_ID_ES',
        'en': 'price_REPLACE_WITH_STRIPE_PRICE_ID_EN',
        'fr': 'price_REPLACE_WITH_STRIPE_PRICE_ID_FR'
    },

    // Your backend endpoint that creates Stripe Checkout sessions
    checkoutEndpoint: '/api/checkout'
};

// Initialize Stripe (uncomment when you have your key)
// const stripe = Stripe(STRIPE_CONFIG.publishableKey);

async function checkout(lang) {
    // ============================================
    // OPTION A: Client-side redirect (simple, no backend needed)
    // Use this if you set up Stripe Payment Links
    // ============================================

    const paymentLinks = {
        'es': 'https://buy.stripe.com/YOUR_PAYMENT_LINK_ES',
        'en': 'https://buy.stripe.com/YOUR_PAYMENT_LINK_EN',
        'fr': 'https://buy.stripe.com/YOUR_PAYMENT_LINK_FR'
    };

    // Redirect to Stripe Payment Link
    window.open(paymentLinks[lang], '_blank');

    // ============================================
    // OPTION B: Server-side checkout (recommended)
    // Uncomment this if you have a backend endpoint
    // ============================================

    /*
    try {
        const response = await fetch(STRIPE_CONFIG.checkoutEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                priceId: STRIPE_CONFIG.prices[lang],
                lang: lang
            })
        });

        const session = await response.json();

        const stripe = Stripe(STRIPE_CONFIG.publishableKey);
        await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Error al procesar el pago. Por favor, intenta de nuevo.');
    }
    */
}

// ============================================
// SETUP INSTRUCTIONS:
//
// 1. Create a Stripe account at https://stripe.com
// 2. Create 3 products (one per language) in Stripe Dashboard > Products
// 3. Note the Price IDs for each product
// 4. Create Payment Links or set up a backend checkout endpoint
// 5. Replace the placeholder values above
//
// EASIEST SETUP (no backend):
//   - Go to Stripe Dashboard > Payment Links
//   - Create a link for each language ($9.99 USD)
//   - Paste the links in the paymentLinks object above
//
// RECOMMENDED SETUP (with backend):
//   - Create a simple Node.js/Express or serverless function
//   - Use stripe.checkout.sessions.create()
//   - Pass the session ID back to the client
//   - See: https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=checkout
// ============================================
