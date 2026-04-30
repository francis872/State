import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

const PRICE_IDS: Record<string, string> = {
  BASIC:      process.env.STRIPE_BASIC_PRICE_ID!,
  PRO:        process.env.STRIPE_PRO_PRICE_ID!,
  ENTERPRISE: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
};

/**
 * Create or retrieve a Stripe Customer for the given organization.
 */
export async function getOrCreateCustomer(orgId: string, email: string, name: string) {
  const existing = await stripe.customers.search({
    query: `metadata['orgId']:'${orgId}'`,
    limit: 1,
  });
  if (existing.data.length > 0) return existing.data[0];

  return stripe.customers.create({
    email,
    name,
    metadata: { orgId },
  });
}

/**
 * Create a Stripe Checkout Session for a subscription plan.
 */
export async function createCheckoutSession(
  customerId: string,
  plan: 'BASIC' | 'PRO' | 'ENTERPRISE',
  successUrl: string,
  cancelUrl: string,
) {
  const priceId = PRICE_IDS[plan];
  if (!priceId) throw new Error(`Price ID not configured for plan: ${plan}`);

  return stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { plan },
  });
}

/**
 * Create a Stripe Billing Portal session (manage subscription).
 */
export async function createPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

/**
 * Construct and verify a Stripe webhook event.
 */
export function constructWebhookEvent(payload: Buffer, signature: string) {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!,
  );
}

export { stripe };
