import prisma from '../config/prisma';

// AI Lead Score: 0-100 based on profile completeness + engagement + urgency + budget
export const calculateLeadScore = (lead: {
  budget?: number | null;
  urgency?: string | null;
  propertyType?: string | null;
  status: string;
  messages?: { id: string }[];
  contact?: { phone?: string | null; email?: string | null; channel: string };
}): number => {
  let score = 0;

  // Profile completeness (25 pts)
  if (lead.budget && lead.budget > 0) score += 10;
  if (lead.propertyType) score += 8;
  if (lead.contact?.phone) score += 4;
  if (lead.contact?.email) score += 3;

  // Urgency (25 pts)
  const urgencyMap: Record<string, number> = {
    'Inmediata': 25, 'Alta': 20, '1-3 meses': 15, '3-6 meses': 10, '6+ meses': 5,
    'ALTA': 20, 'MEDIA': 12, 'BAJA': 5,
  };
  score += urgencyMap[lead.urgency || ''] || 0;

  // Lead status progression (25 pts)
  const statusMap: Record<string, number> = {
    NEW: 0, CONTACTED: 8, QUALIFIED: 15, PROPOSAL: 20, NEGOTIATION: 25,
    CLOSED_WON: 25, CLOSED_LOST: 0,
  };
  score += statusMap[lead.status] || 0;

  // Channel quality (15 pts) — WhatsApp > Email > Manual
  const channelMap: Record<string, number> = {
    WHATSAPP: 15, INSTAGRAM: 12, EMAIL: 8, MANUAL: 5,
  };
  score += channelMap[lead.contact?.channel || 'MANUAL'] || 5;

  // Message engagement (10 pts)
  const msgCount = lead.messages?.length || 0;
  score += Math.min(msgCount * 2, 10);

  return Math.min(Math.round(score), 100);
};

export const getLeadsByOrg = async (organizationId: string) => {
  return prisma.lead.findMany({
    where: { organizationId },
    include: {
      contact: { include: { messages: { select: { id: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const recalculateScores = async (organizationId: string) => {
  const leads = await getLeadsByOrg(organizationId);
  const updates = leads.map(lead => {
    const score = calculateLeadScore({
      ...lead,
      messages: lead.contact.messages,
      contact: lead.contact,
    });
    return prisma.lead.update({ where: { id: lead.id }, data: { score } });
  });
  return Promise.all(updates);
};

export const updateLeadStatus = async (organizationId: string, leadId: string, status: string) => {
  const lead = await prisma.lead.findFirst({ where: { id: leadId, organizationId } });
  if (!lead) throw new Error('Lead no encontrado');
  const updated = await prisma.lead.update({ where: { id: leadId }, data: { status: status as any } });

  // Log activity
  await prisma.activity.create({
    data: {
      type: status === 'CLOSED_WON' ? 'DEAL_CLOSED' : 'LEAD_QUALIFIED',
      description: `Lead movido a estado ${status}`,
      entityId: leadId,
      entityType: 'Lead',
      organizationId,
    } as any,
  });

  return updated;
};
