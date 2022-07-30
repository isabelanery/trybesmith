import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/error.middleware';

import productRouter from './routers/product.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import loginRouter from './routers/login.router';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/orders', orderRouter);

app.use(errorMiddleware);

export default app;
