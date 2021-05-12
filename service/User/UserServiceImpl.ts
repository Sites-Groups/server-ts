// import { UserDTO } from '../../dto/user/User';
import { CommonObj } from '../../typings';

export default interface UserServiceImpl {
  queryByUserId: (userId: string) => unknown;
  queryUserByName: (name: string) => unknown;
  insertUser: (user: CommonObj) => unknown;
}
