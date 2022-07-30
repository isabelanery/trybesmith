import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const router = Router();

const orderController = new OrderController();

router.route('/')
  .get(orderController.getAll);

export default router;