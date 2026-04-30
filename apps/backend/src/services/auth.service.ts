import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_change_in_production';

export const register = async (email: string, password: string, orgName?: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('El usuario ya existe');

  const slug = (orgName || email.split('@')[0])
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 40);

  // Create org + admin user atomically
  const hashed = await bcrypt.hash(password, 12);
  const org = await prisma.organization.create({
    data: {
      name: orgName || `Org de ${email.split('@')[0]}`,
      slug: `${slug}-${Date.now()}`,
      plan: 'BASIC',
      users: {
        create: {
          email,
          password: hashed,
          name: orgName,
          role: 'ADMIN',
        },
      },
    },
    include: { users: true },
  });

  const user = org.users[0];
  return { id: user.id, email: user.email, name: user.name, organizationId: org.id };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { organization: { select: { id: true, name: true, plan: true } } },
  });
  if (!user) throw new Error('Credenciales inválidas');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Credenciales inválidas');

  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    organizationId: user.organizationId,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  return { token, user: { ...payload, org: user.organization } };
};
