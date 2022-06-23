import express from 'express';
import controller from '../controllers/restaurant.controller';
import { Schemas, validateSchema } from '../middleware/validateSchema';

const router = express.Router();

router.post('/create', controller.createRestaurant);
router.get('/get/:restaurantId', controller.readRestaurant);
router.get('/get', controller.readAll);
router.patch('/update/:restaurantId', controller.updateRestaurant);
router.delete('/delete/:restaurantId', controller.deleteRestaurant);

export = router;
