import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import prisma from '../config/prisma';
import { Request, Response } from 'express';

const router = Router();
router.use(authenticate);

// GET /activity — last 30 platform activities for this org
router.get('/', async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;
    const activities = await prisma.activity.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      take: 30,
      include: { user: { select: { name: true, email: true } } },
    });
    return res.json({ activities });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
