import prisma from '../config/prisma';

interface PropertyData {
  title: string;
  price: number;
  location: string;
  type: string;
  status?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  description?: string;
}

export const createProperty = async (organizationId: string, data: PropertyData) => {
  const property = await prisma.property.create({
    data: { ...data, organizationId } as any,
  });

  // Log activity
  await prisma.activity.create({
    data: {
      type: 'PROPERTY_ADDED',
      description: `Nueva propiedad agregada: ${data.title} en ${data.location}`,
      entityId: property.id,
      entityType: 'Property',
      organizationId,
    } as any,
  });

  return property;
};

export const getProperties = async (organizationId: string) => {
  return prisma.property.findMany({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
  });
};

export const updateProperty = async (organizationId: string, id: string, data: Partial<PropertyData>) => {
  const prop = await prisma.property.findFirst({ where: { id, organizationId } });
  if (!prop) throw new Error('Propiedad no encontrada');
  return prisma.property.update({ where: { id }, data: data as any });
};

export const deleteProperty = async (organizationId: string, id: string) => {
  const prop = await prisma.property.findFirst({ where: { id, organizationId } });
  if (!prop) throw new Error('Propiedad no encontrada');
  await prisma.property.delete({ where: { id } });
};

// ── Property Matcher — THE UNICORN FEATURE ───────────────────────────────────
// Auto-matches available properties to leads based on budget tolerance ±20%,
// property type preference, and status (AVAILABLE only).
export const matchLeadToProperties = async (organizationId: string, leadId: string) => {
  const lead = await prisma.lead.findFirst({
    where: { id: leadId, organizationId },
    include: { contact: true },
  });
  if (!lead) throw new Error('Lead no encontrado');

  const properties = await prisma.property.findMany({
    where: { organizationId, status: 'AVAILABLE' as any },
  });

  const matches = [];
  for (const prop of properties) {
    let score = 0;

    // Budget match (50 pts) — within ±20% of lead budget
    if (lead.budget && lead.budget > 0) {
      const ratio = prop.price / lead.budget;
      if (ratio >= 0.8 && ratio <= 1.2) score += 50;
      else if (ratio >= 0.6 && ratio <= 1.4) score += 25;
    } else {
      score += 20; // no budget set, partial match
    }

    // Property type match (35 pts)
    if (lead.propertyType) {
      const leadType = lead.propertyType.toUpperCase().trim();
      const propType = prop.type.toUpperCase().trim();
      if (leadType === propType || propType.includes(leadType) || leadType.includes(propType)) {
        score += 35;
      }
    } else {
      score += 10; // no preference set
    }

    // Location bonus (15 pts) — simple substring match
    if (lead.project && prop.location.toLowerCase().includes(lead.project.toLowerCase())) {
      score += 15;
    }

    if (score >= 30) {
      matches.push({ property: prop, score });
    }
  }

  matches.sort((a, b) => b.score - a.score);

  // Persist top 3 matches
  for (const match of matches.slice(0, 3)) {
    await prisma.leadMatch.upsert({
      where: { leadId_propertyId: { leadId, propertyId: match.property.id } },
      create: { leadId, propertyId: match.property.id, score: match.score },
      update: { score: match.score },
    });
  }

  if (matches.length > 0) {
    await prisma.activity.create({
      data: {
        type: 'MATCH_FOUND',
        description: `${matches.length} propiedades compatibles con ${lead.contact.name}`,
        entityId: leadId,
        entityType: 'Lead',
        organizationId,
      } as any,
    });
  }

  return matches.slice(0, 5);
};
