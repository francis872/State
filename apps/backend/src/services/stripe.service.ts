import Stripe from 'stripe';

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY is not configured');
    _stripe = new Stripe(key, { apiVersion: '2025-02-24.acacia' });
  }
  return _stripe;
}

const PRICE_IDS: Record<string, string> = {
  BASIC:      process.env.STRIPE_BASIC_PRICE_ID ?? '',
  PRO:        process.env.STRIPE_PRO_PRICE_ID ?? '',
  ENTERPRISE: process.env.STRIPE_ENTERPRISE_PRICE_ID ?? '',
};

/**
 * Create or retrieve a Stripe Customer for the given organization.
 */
export async function getOrCreateCustomer(orgId: string, email: string, name: string) {
  const existing = await getStripe().customers.search({
    query: `metadata['orgId']:'${orgId}'`,
    limit: 1,
  });
  if (existing.data.length > 0) return existing.data[0];

  return getStripe().customers.create({
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

  return getStripe().checkout.sessions.create({
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
  return getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

/**
 * Construct and verify a Stripe webhook event.
 */
export function constructWebhookEvent(payload: Buffer, signature: string) {
  return getStripe().webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!,
  );
}

export { getStripe as stripe };
