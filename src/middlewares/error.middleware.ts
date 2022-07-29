import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;

  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    default:
      res.sendStatus(500).json({ message: err });
  }

  next();
};

export default errorMiddleware;