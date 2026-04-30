
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

async function main() {
  console.log('🌱 Iniciando seed STATE OS...');

  const password = await bcrypt.hash('demo1234', 12);

  // ─── Organización demo ──────────────────────────────────────────────────
  const org = await prisma.organization.upsert({
    where: { slug: 'inmobiliaria-poblado-demo' },
    update: {},
    create: {
      name: 'Inmobiliaria El Poblado',
      slug: 'inmobiliaria-poblado-demo',
      plan: 'PRO',
    },
  });
  console.log(`✅ Org: ${org.name}`);

  // ─── Usuario admin ───────────────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: 'admin@stateos.co' },
    update: {},
    create: {
      email: 'admin@stateos.co',
      password,
      name: 'Juliana Ospina',
      role: 'ADMIN',
      organizationId: org.id,
    },
  });

  const asesor = await prisma.user.upsert({
    where: { email: 'asesor@stateos.co' },
    update: {},
    create: {
      email: 'asesor@stateos.co',
      password,
      name: 'Camilo Restrepo',
      role: 'ASESOR',
      organizationId: org.id,
    },
  });
  console.log(`✅ Usuarios: ${admin.name}, ${asesor.name}`);

  // ─── Contactos / Leads ───────────────────────────────────────────────────
  const contactsData = [
    { name: 'Carlos Mejía',   email: 'carlos.mejia@gmail.com',   phone: '+573001112233', channel: 'WHATSAPP' as const, score: 88 },
    { name: 'María Torres',   email: 'maria.torres@hotmail.com', phone: '+573112223344', channel: 'INSTAGRAM' as const, score: 72 },
    { name: 'Andrés Villa',   email: 'andres.villa@gmail.com',   phone: '+573223334455', channel: 'WHATSAPP' as const, score: 55 },
    { name: 'Laura Salazar',  email: 'laura.salazar@empresa.co', phone: '+573334445566', channel: 'EMAIL' as const,     score: 91 },
    { name: 'Juan Restrepo',  email: 'juan.restrepo@gmail.com',  phone: '+573445556677', channel: 'WHATSAPP' as const, score: 44 },
    { name: 'Sofia Morales',  email: 'sofia.morales@gmail.com',  phone: '+573556667788', channel: 'INSTAGRAM' as const, score: 67 },
    { name: 'Diego Herrera',  email: 'diego.herrera@yahoo.com',  phone: '+573667778899', channel: 'WHATSAPP' as const, score: 80 },
    { name: 'Valentina Cruz', email: 'valentina.cruz@gmail.com', phone: '+573778889900', channel: 'EMAIL' as const,     score: 35 },
  ];

  const leadStatuses = ['NEW','CONTACTED','QUALIFIED','PROPOSAL','NEGOTIATION','CLOSED_WON','CLOSED_LOST','NEW'] as const;
  const projects = [
    'Torres El Poblado', 'Sabaneta Premium', 'Envigado Res.', 'Laureles Park',
    'Bello Centro', 'Itagüí Vistas', 'Castilla Res.', 'La Estrella',
  ];
  const budgets = [480_000_000, 320_000_000, 650_000_000, 220_000_000, 180_000_000, 410_000_000, 290_000_000, 150_000_000];

  for (let i = 0; i < contactsData.length; i++) {
    const c = contactsData[i];
    const contact = await prisma.contact.upsert({
      where: { id: `seed-contact-${i}` },
      update: {},
      create: {
        id: `seed-contact-${i}`,
        name: c.name,
        email: c.email,
        phone: c.phone,
        channel: c.channel,
        organizationId: org.id,
        userId: asesor.id,
      },
    });

    await prisma.lead.upsert({
      where: { id: `seed-lead-${i}` },
      update: {},
      create: {
        id: `seed-lead-${i}`,
        score: c.score,
        status: leadStatuses[i],
        project: projects[i],
        budget: budgets[i],
        contactId: contact.id,
        organizationId: org.id,
      },
    });

    // Seed 2 messages per contact
    await prisma.message.createMany({
      skipDuplicates: true,
      data: [
        {
          id: `seed-msg-${i}-in`,
          body: `Hola, vi el proyecto ${projects[i]} y me interesa más info.`,
          direction: 'INBOUND',
          channel: c.channel,
          contactId: contact.id,
          organizationId: org.id,
        },
        {
          id: `seed-msg-${i}-out`,
          body: `¡Hola ${c.name.split(' ')[0]}! Con gusto te cuento sobre ${projects[i]}. ¿Cuándo podemos hablar?`,
          direction: 'OUTBOUND',
          channel: c.channel,
          contactId: contact.id,
          userId: asesor.id,
          organizationId: org.id,
        },
      ],
    });
  }
  console.log(`✅ ${contactsData.length} contactos + leads + mensajes creados`);

  // ─── Deals ───────────────────────────────────────────────────────────────
  const dealsData = [
    { title: 'Cierre Torres El Poblado - Mejía',  value: 480_000_000, stage: 'cierre',      probability: 90, idx: 0 },
    { title: 'Propuesta Sabaneta - Torres',        value: 320_000_000, stage: 'propuesta',   probability: 60, idx: 1 },
    { title: 'Negociación Envigado Res. - Salazar',value: 650_000_000, stage: 'negociacion', probability: 75, idx: 3 },
    { title: 'Interés Laureles Park - Villa',      value: 220_000_000, stage: 'interes',     probability: 30, idx: 2 },
    { title: 'Cierre Itagüí Vistas - Herrera',    value: 410_000_000, stage: 'cierre',      probability: 85, idx: 6 },
  ];

  for (const d of dealsData) {
    await prisma.deal.upsert({
      where: { id: `seed-deal-${d.idx}` },
      update: {},
      create: {
        id: `seed-deal-${d.idx}`,
        title: d.title,
        value: d.value,
        stage: d.stage,
        probability: d.probability,
        contactId: `seed-contact-${d.idx}`,
        userId: asesor.id,
        organizationId: org.id,
      },
    });
  }
  console.log(`✅ ${dealsData.length} deals creados`);
  console.log('\n🚀 Seed completado!');
  console.log('   admin@stateos.co  / demo1234');
  console.log('   asesor@stateos.co / demo1234');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());


const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  try {
    // 1. Usuario demo
    const password = await bcrypt.hash('demo1234', 10);
    const user = await prisma.user.upsert({
      where: { email: 'demo@state.com' },
      update: {},
      create: {
        email: 'demo@state.com',
        password,
        // Si tu modelo tiene un campo name, descomenta la siguiente línea:
        // name: 'Demo User',
      },
    });
    console.log('Usuario creado o existente:', user.email);

    // 2. Contactos demo (findFirst + create, sin duplicados)
    const contactsData = [
      { name: 'María López', email: 'maria@empresa.com', phone: '555-111-222', userId: user.id },
      { name: 'Carlos Pérez', email: 'carlos@empresa.com', phone: '555-333-444', userId: user.id },
      { name: 'Ana Torres', email: 'ana@empresa.com', phone: '555-555-666', userId: user.id },
    ];
    const contacts = [];
    for (const c of contactsData) {
      let contact = await prisma.contact.findFirst({ where: { email: c.email } });
      if (!contact) {
        contact = await prisma.contact.create({ data: c });
        console.log('Contacto creado:', c.name);
      } else {
        console.log('Contacto existente:', c.name);
      }
      contacts.push(contact);
    }
    console.log('Contactos listos.');

    // 3. Deals demo (findFirst + create, sin duplicados, 5 deals en diferentes stages)
    const dealsData = [
      {
        title: 'Negociación con María',
        value: 15000,
        stage: 'negociacion',
        probability: 80,
        contactId: contacts[0].id,
        userId: user.id,
      },
      {
        title: 'Lead Carlos',
        value: 5000,
        stage: 'lead',
        probability: 20,
        contactId: contacts[1].id,
        userId: user.id,
      },
      {
        title: 'Oportunidad Ana',
        value: 12000,
        stage: 'oportunidad',
        probability: 60,
        contactId: contacts[2].id,
        userId: user.id,
      },
      {
        title: 'Contacto inicial María',
        value: 3000,
        stage: 'contacto',
        probability: 10,
        contactId: contacts[0].id,
        userId: user.id,
      },
      {
        title: 'Cierre Ana',
        value: 20000,
        stage: 'cerrado',
        probability: 100,
        contactId: contacts[2].id,
        userId: user.id,
      },
    ];
    for (const d of dealsData) {
      const existingDeal = await prisma.deal.findFirst({ where: { title: d.title, userId: user.id } });
      if (!existingDeal) {
        await prisma.deal.create({ data: d });
        console.log('Deal creado:', d.title);
      } else {
        console.log('Deal existente:', d.title);
      }
    }
    console.log('Deals listos.');

    console.log('Seed completado. Usuario demo: demo@state.com / demo1234');
  } catch (error) {
    console.error('Error en el seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
