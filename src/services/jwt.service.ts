import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../interfaces/user.interface';

dotenv.config();

export default class JwtService {
  public createToken = (payload: User): string => {
    const { password, ...data } = payload;

    const token = jwt.sign(data, 'dev', {
      algorithm: 'HS256',
      expiresIn: '3d',
    });

    return token;
  };

  public validateToken = (token: string): JwtPayload => {
    try {
      const data = jwt.verify(token, 'dev');

      return data as JwtPayload;
    } catch (_err) {
      const e = new Error('Invalid token');
      e.name = 'Unauthorized';
      throw e;
    }
  };
}