import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interface';

export default class OrderService {
  constructor(private model = new OrderModel(connection)) {}

  public getAll = async (): Promise<Order[]> => this.model.getAll();

  public create = async (order: Order) => this.model.create(order);
}