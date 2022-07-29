import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';
import JwtService from '../services/jwt.service';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    const userCreated = await this.userService.create(user);

    const jwtService = new JwtService();
    const { password, ...userWithoutPassword } = userCreated;

    const token = await jwtService.createToken({ ...userWithoutPassword });

    res.status(StatusCodes.CREATED).json({ token });
  };
}