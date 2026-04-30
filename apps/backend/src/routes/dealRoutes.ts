import { Router } from 'express';
import * as dealController from '../controllers/deal.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', dealController.createDeal);
router.get('/', dealController.getDeals);
router.put('/:id', dealController.updateDeal);
router.delete('/:id', dealController.deleteDeal);
router.patch('/:id/stage', dealController.changeStage);

export default router;
