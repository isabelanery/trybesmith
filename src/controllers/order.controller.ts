import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import OrderService from '../services/order.service';
import JwtService from '../services/jwt.service';

export default class OrderController {
  constructor(private orderService = new OrderService(), private jwtService = new JwtService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();

    res.status(StatusCodes.OK).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const order = req.body; 
    const { userId } = req.headers;

    await this.orderService.create({ ...order, userId });

    res.status(StatusCodes.CREATED).json({ userId, ...order });
  };
}