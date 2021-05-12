import { Context } from 'koa';

type CommonObj =
  | {
      [x?: string]: any;
    }
  | any[];

interface CommonCtx extends Context {
  request: {
    body: CommonObj;
  };
}
