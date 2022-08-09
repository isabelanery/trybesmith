import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import JwtService from '../services/jwt.service';
// import User from '../interfaces/user.interface';

const schemaProduct = Joi.object({
  name: Joi.string().min(3).required().messages({ 
    string: '"name" must be a string',
    min: '"name" must be at least 3 characters long',
    required: '"name" is required',
  }),
  amount: Joi.string().min(3).required().messages({
    string: '"amount" must be a string',
    min: '"amount" must be at least 3 characters long',
    required: '"amount" is required',
  }),
});

const schemaUser = Joi.object({
  username: Joi.string().min(3).required().messages({ 
    string: '"username" must be a string',
    min: '"username" must be at least 3 characters long',
    required: '"username" is required',
  }),
  classe: Joi.string().min(3).required().messages({
    string: '"classe" must be a string',
    min: '"classe" must be at least 3 characters long',
    required: '"classe" is required',
  }),
  password: Joi.string().min(8).required().messages({
    string: '"password" must be a string',
    min: '"password" must be at least 8 characters long',
    required: '"password" is required',
  }),
  level: Joi.number().min(1).required().messages({ 
    number: '"level" must be a number',
    min: '"level" must be greater than 0',
    required: '"level" is required',
  }),
});

export default class Validation {
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

    const { error } = schemaProduct.validate(product);

    if (error && error.details[0].type.includes('string')) {
      const e = new Error(error.details[0].message);
      e.name = 'UnprocessableEntity';
      throw e;
    }
    
    if (error) {
      throw error; 
    }

    next();
  };
  
  public user = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    
    const { error } = schemaUser.validate(user);
    
    if (error 
      && (error.details[0].type.includes('string') || error.details[0].type.includes('number'))) {
      const e = new Error(error.details[0].message);
      e.name = 'UnprocessableEntity';
      throw e;
    }
    
    if (error) throw error; 
  
    next();
  };

  public order = async (req: Request, res: Response, next: NextFunction) => {
    const order = req.body;

    const schemaOrder = Joi.object({
      productsIds: Joi.array().items(Joi.number()).min(1).required()
        .messages({
          'array.min': '"productsIds" must include only numbers',
        }),
    });

    const { error } = schemaOrder.validate(order);
    
    if (error 
      && (error.details[0].type.includes('array') || error.details[0].type.includes('number'))) {
      const e = new Error(error.details[0].message);
      e.name = 'UnprocessableEntity';
      throw e;
    }
    
    if (error) throw error;

    next();
  };

  public token = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
      const e = new Error('Token not found');
      e.name = 'Unauthorized';
      throw e;
    }
    
    const jwtService = new JwtService();
    const { id } = await jwtService.validateToken(authorization); 
    
    req.headers = { ...req.headers, userId: id };

    next();
  };
}