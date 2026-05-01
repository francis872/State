import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireTenant } from '../middleware/tenant.middleware';
import * as whatsappService from '../services/whatsapp.service';
import prisma from '../config/prisma';

const router = Router();

/**
 * GET /messages/:contactId
 * List all messages for a contact (scoped to organization).
 */
router.get('/:contactId', authenticate, requireTenant, async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const organizationId = (req as any).organizationId;

  const messages = await prisma.message.findMany({
    where: { contactId: contactId as string, organizationId: organizationId as string },
    orderBy: { createdAt: 'asc' },
  });
  return res.json(messages);
});

/**
 * POST /messages/send
 * Send a WhatsApp message to a contact and persist it.
 */
router.post('/send', authenticate, requireTenant, async (req: Request, res: Response) => {
  try {
    const { contactId, body } = req.body as { contactId: string; body: string };
    const { userId, organizationId } = (req as any).user;

    if (!contactId || !body?.trim()) {
      return res.status(400).json({ message: 'contactId y body son requeridos' });
    }

    const contact = await prisma.contact.findFirst({
      where: { id: contactId, organizationId },
    });
    if (!contact) return res.status(404).json({ message: 'Contacto no encontrado' });

    let waMessageId: string | undefined;
    if (contact.channel === 'WHATSAPP' && contact.phone) {
      const to = contact.phone.replace(/\D/g, ''); // strip non-digits for Meta API
      waMessageId = await whatsappService.sendMessage(to, body);
    }

    const message = await prisma.message.create({
      data: {
        body,
        direction:     'OUTBOUND',
        channel:       contact.channel,
        waMessageId:   waMessageId ?? null,
        contactId,
        userId,
        organizationId,
      },
    });

    return res.status(201).json(message);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
