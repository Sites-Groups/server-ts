import TestServiceImpl from './testServiceImpl';

/**
 * 测试service
 */
export class TestService implements TestServiceImpl {
  public hello(name: string): string {
    return `hello ${name}`;
  }
}
