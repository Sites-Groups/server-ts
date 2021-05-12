import {
  Autowired,
  GetMapping,
  param,
  queryObj,
  queryItem,
  PostMapping,
  request,
  CommonResponse,
} from '../common';
import { TestService } from '../service/test/testService';
import { CommonObj } from '../typings';

export default class TestController {
  @Autowired()
  private testService: TestService;

  @GetMapping('/test/:userId')
  async test(
    @param('userId') userId: string,
    @queryObj() query: CommonObj,
    @queryItem('hello') hello: string,
  ): Promise<CommonResponse<unknown>> {
    const res = this.testService.hello(`${userId},${JSON.stringify(query)}${hello}`);
    return CommonResponse.success({
      name: res,
      request: query,
    });
  }

  @PostMapping('/post/:a')
  async postTest(@request() body: CommonObj): Promise<CommonResponse<CommonObj>> {
    return CommonResponse.success(body);
  }
}
