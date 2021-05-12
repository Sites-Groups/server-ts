import Koa from 'koa';
import {
  registerRoute,
  registerBasicPlugin as usePlugin,
  connectDb as startServer,
} from './common';
import 'reflect-metadata';

const app = new Koa();

registerRoute(app, { dir: __dirname });
usePlugin(app, { dir: __dirname });

startServer(app);
