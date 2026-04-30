import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { getDashboardStats, getForecast, getVelocity } from '../controllers/stats.controller';

const router = Router();
router.use(authenticate);

router.get('/', getDashboardStats);
router.get('/forecast', getForecast);
router.get('/velocity', getVelocity);

export default router;
