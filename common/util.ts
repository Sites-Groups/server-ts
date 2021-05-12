import * as fs from 'fs';
import Application, { Context } from 'koa';
import Router from 'koa-router';
import Database from './db';
import Host from '../config/port';
import { PARAM_META_KEY, QUERY_META_KEY, QUERY_ITEM_META_KEY, BODY_META_KEY } from '.';
import { CommonCtx } from '../typings';
import { CommonResponse } from './CommonResponse';
const router = new Router();

// 注册路由
export async function registerRoute(
  app: Application,
  config?: { [x: string]: unknown },
): Promise<Application> {
  const { dir } = config || {};
  const list = await fs.readdirSync(`${dir}/controller`);
  list.forEach(async item => {
    const Controller = await import(`${dir}/controller/${item}`);
    const instance = new Controller.default();
    const property = Object.getPrototypeOf(instance);
    const fnNames = Object.getOwnPropertyNames(property).filter(
      item => item !== 'constructor' && typeof property[item] === 'function',
    );
    fnNames.forEach(fn => {
      const { method, url } = Reflect.getMetadata(fn, property);
      router[method.toLowerCase()](url, async (ctx: Context | CommonCtx) => {
        try {
          const {
            params,
            query,
            request: { body },
          } = ctx as CommonCtx;
          const target = property[fn];
          // 获取param参数信息 - restful
          const paramData = Reflect.getMetadata(PARAM_META_KEY, target);
          const args = [];
          // 获取param - restful
          if (paramData) {
            const { paramName, index } = paramData;
            args[index] = params[paramName];
          }
          // 获取query参数obj
          const queryObjectIndex = Reflect.getMetadata(QUERY_META_KEY, target);
          if (queryObjectIndex) {
            args[queryObjectIndex] = query;
          }
          // 获取query参数
          const queryItem = Reflect.getMetadata(QUERY_ITEM_META_KEY, target);
          if (queryItem) {
            const { index, queryItemName } = queryItem;
            args[index] = query[queryItemName];
          }
          // 获取request
          const requestIndex = Reflect.getMetadata(BODY_META_KEY, target);
          if (requestIndex) {
            args[requestIndex] = body;
          }
          const result = await property[fn](...args);
          ctx.body = result;
        } catch (error) {
          ctx.body = CommonResponse.error(error);
        }
      });
    });
  });
  app.use(router.routes());
  app.use(router.allowedMethods());
  return app;
}

export function connectDb(app: Application): void {
  const { env } = app;
  const { host, port } = Host[env];
  const db = new Database(host);
  db.connect();
  app.listen(port);
  console.log('server on ', port);
}
