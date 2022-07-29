import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/product.service';

export default class ProductController {
  constructor(private productService = new ProductService()) {}

  public create = async (req: Request, res: Response) => {
    const product = req.body; 
    const productCreated = await this.productService.create(product);

    res.status(StatusCodes.CREATED).json(productCreated);
  };

  public getAll = async (req: Request, res: Response) => {
    const products = await this.productService.getAll();

    res.status(StatusCodes.OK).json(products);
  };
}