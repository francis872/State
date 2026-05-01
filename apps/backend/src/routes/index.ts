import { Router } from 'express';
import authRoutes     from './authRoutes';
import contactRoutes  from './contactRoutes';
import dealRoutes     from './dealRoutes';
import billingRoutes  from './billingRoutes';
import webhookRoutes  from './webhookRoutes';
import messageRoutes  from './messageRoutes';
import statsRoutes    from './statsRoutes';
import leadRoutes     from './leadRoutes';
import propertyRoutes from './propertyRoutes';
import activityRoutes from './activityRoutes';

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok', app: 'STATE OS' }));

router.use('/auth',       authRoutes);
router.use('/contacts',   contactRoutes);
router.use('/deals',      dealRoutes);
router.use('/billing',    billingRoutes);
router.use('/webhook',    webhookRoutes);
router.use('/messages',   messageRoutes);
router.use('/stats',      statsRoutes);
router.use('/leads',      leadRoutes);
router.use('/properties', propertyRoutes);
router.use('/activity',   activityRoutes);

export default router;
