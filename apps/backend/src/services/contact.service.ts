import prisma from '../config/prisma';

interface ContactData {
  name?: string;
  email?: string;
  phone?: string;
  channel?: string;
}

export const createContact = async (userId: string, organizationId: string, data: ContactData) => {
  return prisma.contact.create({
    data: { ...data, userId, organizationId } as any,
  });
};

export const getContacts = async (organizationId: string) => {
  return prisma.contact.findMany({
    where: { organizationId },
    include: { leads: { select: { score: true, status: true } } },
    orderBy: { createdAt: 'desc' },
  });
};

export const getContactById = async (organizationId: string, id: string) => {
  return prisma.contact.findFirst({
    where: { id, organizationId },
    include: { leads: true, messages: { orderBy: { createdAt: 'desc' }, take: 20 } },
  });
};

export const updateContact = async (organizationId: string, id: string, data: ContactData) => {
  const contact = await prisma.contact.findFirst({ where: { id, organizationId } });
  if (!contact) throw new Error('No autorizado o contacto no existe');
  return prisma.contact.update({ where: { id }, data: data as any });
};

export const deleteContact = async (organizationId: string, id: string) => {
  const contact = await prisma.contact.findFirst({ where: { id, organizationId } });
  if (!contact) throw new Error('No autorizado o contacto no existe');
  await prisma.contact.delete({ where: { id } });
};
