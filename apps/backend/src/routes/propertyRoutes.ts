import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as propertyController from '../controllers/property.controller';

const router = Router();
router.use(authenticate);

router.post('/', propertyController.createProperty);
router.get('/', propertyController.getProperties);
router.put('/:id', propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);
router.post('/match/:leadId', propertyController.matchProperty);

export default router;
