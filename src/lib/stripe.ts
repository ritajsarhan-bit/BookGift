import Stripe from 'stripe';

// Server-side Stripe client (uses secret key — never exposed to browser)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});
