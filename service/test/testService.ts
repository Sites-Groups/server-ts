import { TestServiceImpl } from "./testServiceImpl";

export class TestService implements TestServiceImpl {
  public hello(name: string) {
    return `hello ${name}`;
  }
}
