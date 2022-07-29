import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';

export default class UserService {
  constructor(private model = new UserModel(connection)) {}

  public create = async (user: User): Promise<User> => this.model.create(user);
}