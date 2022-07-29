import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../interfaces/user.interface';

dotenv.config();

export default class JwtService {
  public createToken = (data: User): string => {
    const token = jwt.sign({ data }, 'dev', {
      algorithm: 'HS256',
      expiresIn: '3d',
    });

    return token;
  };

  public validateToken = (token: string) => {
    try {
      const data = jwt.verify(token, 'dev');

      return data;
    } catch (_err) {
      const e = new Error('Expired or invalid token');
      e.name = 'UnauthorizedError';
      throw e;
    }
  };
}