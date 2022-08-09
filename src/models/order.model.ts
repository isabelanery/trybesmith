import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<Order[]> => {
    const [rows] = await this.connection.execute(
      `SELECT p.orderId AS id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds 
      FROM Trybesmith.Products AS p
      INNER JOIN Trybesmith.Orders AS o
      ON o.id = p.orderId
      GROUP BY o.id
      ORDER BY o.userId`,
    );
    
    return rows as Order[];
  };

  public create = async (order: Order) => {
    const [dataInserted] = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.Orders (userId)
      VALUES (?)`,
      [order.userId],
    );

    const { insertId: orderId } = dataInserted;
    // console.log(rows);

    Promise.all(order.productsIds
      .map(async (product) => this.connection
        .execute<ResultSetHeader>(
        `UPDATE Trybesmith.Products 
        SET orderId = ?
        WHERE id = ? 
        `,
        [orderId, product],
      )));
  };
}