import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
// import User from '../interfaces/user.interface';

export default class Validation {
  // constructor(private )

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const schema = Joi.object({
      username: Joi.string().required()
        .messages({ 'string.required': '"username" is required' }),
      password: Joi.string().required()
        .messages({ 'string.required': '"password" is required' }),
    });

    const { error } = schema.validate(user);

    if (error) throw error;

    next();
  };

  public product = async (req: Request, res: Response, next: NextFunction) => {
    const product = req.body;

    const schema = Joi.object({
      name: Joi.string().min(3).required()
        .messages({ string: '"name" must be a string',
          min: '"name" must be at least 3 characters long',
          required: '"name" is required',
        }),
      amount: Joi.string().min(2).required()
        .messages({
          string: '"amount" must be a string',
          min: '"amount" must be at least 3 characters long',
          required: '"amount" is required',
        }),
    });

    const { error } = schema.validate(product);

    if (error) throw error;

    next();
  };
}