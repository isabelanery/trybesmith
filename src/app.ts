import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/error.middleware';

import productRouter from './routers/product.router';
import userRouter from './routers/user.router';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/users', userRouter);

app.use(errorMiddleware);

export default app;
