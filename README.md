# blog
###应用技术
>   client: vue, vue-router, element-ui, axios等

>   server: koa, sequelize, token验证

## 项目运行流程
>   git clone https://github.com/caiheping/blog.git
### server端
前提条件： 装有MySQL数据库并且开启MySQL服务,修改config文件夹中的config.json的数据库配置（用户名，密码等）
>   npm i

>   cd ./server

>   ../node_modules/.bin/sequelize db:create(如果不行,  ..\node_modules\.bin\sequelize db:create)

>   ../node_modules/.bin/sequelize db:migrate(如果不行,  ..\node_modules\.bin\sequelize db:migrat)

>   ../node_modules/.bin/sequelize db:seed:all(如果不行,  ..\node_modules\.bin\sequelize db:seed:all)

>   node app.js
### client端
>   cd ./client

>   npm i

>   npm run serve

### 还有很多功能待完成，暂时只做了发表评论,查看评论, 登录注册功能
