import express from 'express';
import controller from '../controllers/dish.controller';
import { Schemas, validateSchema } from '../middleware/validateSchema';

const router = express.Router();

router.post('/create', controller.createDish);
router.get('/get/:dishId', controller.readDish);
router.get('/get', controller.readAll);
router.patch('/update/:dishId', controller.updateDish);
router.delete('/delete/:dishId', controller.deleteDish);

export = router;
