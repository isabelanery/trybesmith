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
}