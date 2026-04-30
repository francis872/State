import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireTenant } from '../middleware/tenant.middleware';
import * as stripeService from '../services/stripe.service';
import prisma from '../config/prisma';

const router = Router();

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

/**
 * POST /billing/checkout
 * Creates a Stripe Checkout session for a plan upgrade.
 */
router.post('/checkout', authenticate, requireTenant, async (req: Request, res: Response) => {
  try {
    const { plan } = req.body as { plan: 'BASIC' | 'PRO' | 'ENTERPRISE' };
    const { userId, organizationId } = (req as any).user;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const org  = await prisma.organization.findUnique({ where: { id: organizationId } });
    if (!user || !org) return res.status(404).json({ message: 'Recurso no encontrado' });

    const customer = await stripeService.getOrCreateCustomer(org.id, user.email, org.name);

    // Persist customer id
    await prisma.organization.update({
      where: { id: org.id },
      data: { stripeCustomerId: customer.id },
    });

    const session = await stripeService.createCheckoutSession(
      customer.id,
      plan,
      `${APP_URL}/billing?success=true`,
      `${APP_URL}/billing?canceled=true`,
    );

    return res.json({ url: session.url });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

/**
 * GET /billing/portal
 * Creates a Stripe Customer Portal session.
 */
router.get('/portal', authenticate, requireTenant, async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;
    const org = await prisma.organization.findUnique({ where: { id: organizationId } });
    if (!org?.stripeCustomerId) {
      return res.status(400).json({ message: 'No hay suscripción activa' });
    }
    const session = await stripeService.createPortalSession(org.stripeCustomerId, `${APP_URL}/billing`);
    return res.json({ url: session.url });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
