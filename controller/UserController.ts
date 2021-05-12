import { Autowired, CommonResponse, param, GetMapping, request, PostMapping } from '../common';
import UserService from '../service/User/UserService';
import { CommonObj } from '../typings';

export default class UserController {
  @Autowired()
  private userService: UserService;

  @GetMapping('/user/:userId')
  public async queryUser(@param('userId') userId: string): Promise<any> {
    const user = await this.userService.queryUserByName(userId);
    return CommonResponse.success(user);
  }

  @PostMapping('/add-user')
  public async insertUser(@request() body: CommonObj): Promise<CommonObj> {
    const res = await this.userService.insertUser(body);
    return CommonResponse.success(res);
  }
}
