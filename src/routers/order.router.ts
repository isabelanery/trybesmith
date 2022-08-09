import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import Validation from '../middlewares/validation.middleware';

const router = Router();

const orderController = new OrderController();
const validate = new Validation();

router.route('/')
  .post(
    validate.token,
    validate.order,
    orderController.create,
  )
  .get(orderController.getAll);

export default router;