import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<Order[]> => {
    const [rows] = await this.connection.execute(
      `SELECT p.orderId AS id, o.userId, p.id AS producsIds 
      FROM Trybesmith.Products AS p
      INNER JOIN Trybesmith.Orders AS o
      ON o.id = p.orderId
      GROUP BY p.id
      ORDER BY o.id;`,
    );
    
    // const toSerialize = [...rows];

    // const serialized = toSerialize.reduce((acc, curr) => ({
    //   id: acc.orderId,
    //   userId: acc.userId,
    //   productsIds: acc.orderId === curr.orderId ? [...acc, curr.id] : [...acc],
    // }), []);

    // return serialized as Order[];
    return rows as Order[];
  };
}