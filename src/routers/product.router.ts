import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import Validation from '../middlewares/validation.middleware';

const router = Router();

const productController = new ProductController();
const validate = new Validation();

router.route('/')
  .get(productController.getAll)
  .post(validate.product, productController.create);

export default router;
