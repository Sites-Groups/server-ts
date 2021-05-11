import * as fs from "fs";
import Application from "koa";
import Router from "koa-router";
const router = new Router();

export async function registerRoute(
  app: Application,
  config?: { [x: string]: any }
): Promise<Application> {
  const { dir } = config || {};
  const list = await fs.readdirSync(`${dir}/controller`);
  list.forEach(async (item) => {
    const obj = await import(`${dir}/controller/${item}`);
    const instance = new obj.default();
    const property = Object.getPrototypeOf(instance);
    const fnNames = Object.getOwnPropertyNames(property).filter(
      (item) => item !== "constructor"
    );
    fnNames.forEach((fn) => {
      if (typeof property[fn] !== "function") return;
      const { method, url } = Reflect.getMetadata(fn, property);
      router.get("/test1", async (ctx) => {
        ctx.body = "111111";
      });
      router[method.toLowerCase()](url, async (ctx) => {
        try {
          const result = await property[fn](ctx);
          ctx.body = JSON.stringify(result);
        } catch (error) {
          ctx.body = "111";
        }
      });
    });
  });
  app.use(router.routes());
  app.use(router.allowedMethods());
  return app;
}
