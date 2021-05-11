import Koa from "koa";
import { registerRoute } from "./common/util";
import "reflect-metadata";

// router

const app = new Koa();

registerRoute(app, { dir: __dirname });

app.listen(3000);
