import { Router } from 'express';
import UserController from '../controllers/user.controller';
import Validation from '../middlewares/validation.middleware';

const router = Router();

const userController = new UserController();
const validate = new Validation();

router.route('/')
  .post(validate.login, userController.login);

export default router;
