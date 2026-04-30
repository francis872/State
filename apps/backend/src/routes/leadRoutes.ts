import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { getLeads, recalculateScores, updateStatus } from '../controllers/lead.controller';

const router = Router();
router.use(authenticate);

router.get('/', getLeads);
router.post('/recalculate-scores', recalculateScores);
router.patch('/:id/status', updateStatus);

export default router;
