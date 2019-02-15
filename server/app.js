(async function () {
  const Koa = require('koa');
  const KoaBodyParser = require('koa-bodyparser');
  const router = require('./router/index');
  const jwtKoa = require('koa-jwt')
  const StaticCache = require('koa-static-cache');

  const errorHandle = require('./middlewares/errorHandle.js')
  const sendHandle = require('./middlewares/sendHandle.js')

  const app = new Koa();

  const secret = 'cai'

  app.use(sendHandle());
  app.use(errorHandle);

  app.use(jwtKoa({secret}).unless({
    path: [/\/login/, /\/register/, /\/static\/*/] //数组中的路径不需要通过jwt验证
  }))

  // 静态资源
  app.use(StaticCache('./static/', {
    prefix: '/static/',
    gzip: true
  }));

  app.use(KoaBodyParser());

  app.use(router.routes());

  app.listen(8888);
})()
