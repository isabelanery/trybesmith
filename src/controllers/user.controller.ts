import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';
import JwtService from '../services/jwt.service';

export default class UserController {
  constructor(private userService = new UserService(), private jwtService = new JwtService()) {}

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    const userCreated = await this.userService.create(user);

    const token = await this.jwtService.createToken({ ...userCreated });

    res.status(StatusCodes.CREATED).json({ token });
  };

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await this.userService.validateLogin({ username, password });

    const token = await this.jwtService.createToken(user);

    res.status(StatusCodes.OK).json({ token });
  };
}