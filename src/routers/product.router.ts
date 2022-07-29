import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const router = Router();

const productController = new ProductController();

router.route('/')
  .get(productController.getAll)
  .post(productController.create);

export default router;
