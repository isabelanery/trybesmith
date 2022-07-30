import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';
import Login from '../interfaces/login.interface';

export default class UserService {
  constructor(private model = new UserModel(connection)) {}

  public create = async (user: User): Promise<User> => this.model.create(user);

  public validateLogin = async ({ username, password }: Login): Promise<User> => {
    const user = await this.model.findUser(username);

    console.log(user);
    
    if (!user || user.password !== password) {
      const e = new Error('Username or password invalid');
      e.name = 'Unauthorized';
      throw e;
    }
  
    return user;
  };
}