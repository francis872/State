import prisma from '../config/prisma';

interface DealData {
  title?: string;
  value?: number;
  stage?: string;
  probability?: number;
  contactId?: string;
  closeDate?: string;
}

export const createDeal = async (userId: string, organizationId: string, data: DealData) => {
  const contact = await prisma.contact.findFirst({ where: { id: data.contactId, organizationId } });
  if (!contact) throw new Error('Contacto no válido');
  return prisma.deal.create({
    data: { ...data, userId, organizationId } as any,
    include: { contact: { select: { name: true } } },
  });
};

export const getDeals = async (organizationId: string) => {
  return prisma.deal.findMany({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
    include: { contact: { select: { id: true, name: true, channel: true } } },
  });
};

export const updateDeal = async (organizationId: string, id: string, data: DealData) => {
  const deal = await prisma.deal.findFirst({ where: { id, organizationId } });
  if (!deal) throw new Error('No autorizado o deal no existe');
  if (data.contactId) {
    const contact = await prisma.contact.findFirst({ where: { id: data.contactId, organizationId } });
    if (!contact) throw new Error('Contacto no válido');
  }
  return prisma.deal.update({ where: { id }, data });
};

export const deleteDeal = async (organizationId: string, id: string) => {
  const deal = await prisma.deal.findFirst({ where: { id, organizationId } });
  if (!deal) throw new Error('No autorizado o deal no existe');
  await prisma.deal.delete({ where: { id } });
};

export const changeStage = async (organizationId: string, id: string, stage: string) => {
  const deal = await prisma.deal.findFirst({ where: { id, organizationId } });
  if (!deal) throw new Error('No autorizado o deal no existe');
  return prisma.deal.update({ where: { id }, data: { stage } });
};
