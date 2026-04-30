import { Router, Request, Response } from 'express';
import * as whatsappService from '../services/whatsapp.service';
import * as stripeService from '../services/stripe.service';
import prisma from '../config/prisma';

const router = Router();

// ─── WhatsApp webhook ────────────────────────────────────────────────────────

/**
 * GET /webhook/whatsapp
 * Meta webhook verification challenge.
 */
router.get('/whatsapp', (req: Request, res: Response) => {
  const mode      = req.query['hub.mode'];
  const token     = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

/**
 * POST /webhook/whatsapp
 * Receive inbound WhatsApp messages from Meta.
 */
router.post('/whatsapp', async (req: Request, res: Response) => {
  // Always ack quickly
  res.sendStatus(200);

  const messages = whatsappService.parseWebhookPayload(req.body);
  for (const msg of messages) {
    try {
      // Find contact by phone (whatsappId = E.164 number from Meta)
      const contact = await prisma.contact.findFirst({
        where: { phone: `+${msg.from}` },
      });
      if (!contact) continue; // Unknown sender — ignore for now

      // Deduplicate by waMessageId
      const exists = await prisma.message.findUnique({ where: { waMessageId: msg.waMessageId } });
      if (exists) continue;

      await prisma.message.create({
        data: {
          body:          msg.body,
          direction:     'INBOUND',
          channel:       'WHATSAPP',
          waMessageId:   msg.waMessageId,
          contactId:     contact.id,
          organizationId: contact.organizationId,
        },
      });
    } catch (err) {
      console.error('WhatsApp webhook processing error:', err);
    }
  }
});

// ─── Stripe webhook ──────────────────────────────────────────────────────────

/**
 * POST /webhook/stripe
 * Receive Stripe subscription events (raw body required).
 */
router.post('/stripe', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event;
  try {
    event = stripeService.constructWebhookEvent(req.body as Buffer, sig);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const customerId = session.customer;
        const subId      = session.subscription;
        const plan       = (session.metadata?.plan ?? 'BASIC') as 'BASIC' | 'PRO' | 'ENTERPRISE';
        await prisma.organization.updateMany({
          where: { stripeCustomerId: customerId },
          data:  { stripeSubId: subId, plan },
        });
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as any;
        await prisma.organization.updateMany({
          where: { stripeSubId: sub.id },
          data:  { plan: 'BASIC', stripeSubId: null },
        });
        break;
      }
    }
  } catch (err) {
    console.error('Stripe webhook handler error:', err);
  }

  res.json({ received: true });
});

export default router;
