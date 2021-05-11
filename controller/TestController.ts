import { Autowired, Controller } from "../common";
import { TestService } from "../service/test/testService";

export default class TestController {
  @Autowired()
  private testService: TestService;

  @Controller({ method: "GET", url: "/test" })
  async test() {
    const res = this.testService.hello("nameeeee");
    return res;
  }
}
