import User from '../../dto/user/User';
import { CommonObj } from '../../typings';
import UserServiceImpl from './UserServiceImpl';

export default class UserService implements UserServiceImpl {
  public async insertUser(user: CommonObj): Promise<CommonObj> {
    const res = await new User(user).save();
    return res;
  }

  public async queryByUserId(userId: string): Promise<any> {
    return User.findById(userId);
  }

  public async queryUserByName(name: string): Promise<any> {
    const res = await User.findOne({ name });
    return res;
  }
}
