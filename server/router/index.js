const Router = require('koa-router');
const Models = require('../models/index');
const md5 = require('md5');
const jwt = require('jsonwebtoken')

const router = new Router();

const secret = 'cai'

// 测试接口
router.get('/test', async (ctx, next) => {
  let data = await Models.User.findAll({
    include: {
      model: Models.Comment
    }
  });
  let res = {
    code: 0,
    data
  }
  ctx.body = res;
});

// 注册接口
router.post('/register', async (ctx, next) => {
  let username = ctx.request.body.username.trim();
  let password = ctx.request.body.password.trim();
  let repassword = ctx.request.body.repassword.trim();
  if (username == '' || password == '' || repassword == '') {
    return ctx.body = {
      code: 1,
      data: '用户名或密码不能为空'
    }
  }
  if (password != repassword) {
    return ctx.body = {
      code: 2,
      data: '两次输入的密码不一致'
    }
  }

  let user = await Models.User.findOne({
    where: {
      username
    }
  });

  if (user !== null) {
    return ctx.body = {
      code: 3,
      data: '当前用户已经被注册了'
    }
  }
  let newUser = await Models.User.build({
    username,
    avator: ctx.request.header['x-forwarded-proto'] + '://' + ctx.request.host + '/static/img/avater.jpg',
    password: md5(password)
  }).save();

  ctx.body = {
    code: 0,
    data: {
      id: newUser.get('id'),
      username: newUser.get('username')
    }
  }
});

// 登陆接口
router.post('/login', async (ctx, next) => {
  console.log(JSON.stringify(ctx.request))
  let username = ctx.request.body.username.trim();
  let password = ctx.request.body.password.trim();
  if (username == '' || password == '') {
    return ctx.body = {
      code: 1,
      data: '用户名或密码不能为空'
    }
  }

  let user = await Models.User.findOne({
    where: {
      username
    }
  });

  if (user === null) {
    return ctx.body = {
      code: 1,
      data: '不存在该用户'
    }
  }
  user = await Models.User.findOne({
    where: {
      username,
      password: md5(password)
    }
  });
  if (user === null) {
    return ctx.body = {
      code: 1,
      data: '密码错误'
    }
  }

  ctx.cookies.set('uid', user.get('id'), {
    httpOnly: false
  });

  const token = jwt.sign(
    {
      id: user.get('id'),
      username: user.get('username')
    },
    secret,
    {expiresIn: '1h'}
  )
  ctx.body = {
    code: 0,
    data: {
      username: user.get('username'),
      id: user.get('id'),
      avator: user.get('avator')
    },
    token
  }
});

// 获取全部说说接口
router.get('/allSays', async (ctx, next) => {
  let currentPage = Number(ctx.query.currentPage) || 1;
  let pageSize = Number(ctx.query.pageSize) || 10; // 每页的条数
  let offset = (currentPage - 1) * pageSize; // 偏移量

  let data = await Models.Say.findAndCountAll({
    limit: pageSize,
    offset,
    include: [{
      model: Models.User
    }, {
      model: Models.Comment
    }],
    'order': [
      ['createdAt', 'DESC']
    ]
  });
  let res = {
    code: 0,
    currentPage,
    data
  }
  ctx.body = res;
});


// 发表说说接口
router.post('/addSay', async (ctx, next) => {
  let obj = {}
  obj.u_id = ctx.request.body.userId;
  obj.content = ctx.request.body.content;
  let newSay = await Models.Say.build(obj).save();
  if (newSay) {
    ctx.body = {
      code: 0,
      data: newSay
    }
  } else {
    ctx.body = {
      code: 1,
      data: '发表说说失败'
    }
  }
})
// 获取我的说说接口
router.get('/mySays', async (ctx, next) => {
  let currentPage = Number(ctx.query.currentPage) || 1;
  let pageSize = Number(ctx.query.pageSize) || 10; // 每页的条数
  let offset = (currentPage - 1) * pageSize; // 偏移量

  let userId = ctx.query.userId

  let data = await Models.Say.findAndCountAll({
    limit: pageSize,
    offset,
    include: [{
      model: Models.User
    }, {
      model: Models.Comment
    }],
    'order': [
      ['createdAt', 'DESC']
    ],
    where: {
      u_id: userId
    }
  });
  let res = {
    code: 0,
    currentPage,
    data
  }
  ctx.body = res;
});

// 删除说说
router.post('/delSay', async (ctx, next) => {
  let result = await Models.Say.destroy({
    where:{
      id: ctx.request.body.id
    }
  });
  if (result) {
    ctx.body = {
      code: 0,
      data: result
    }
  } else {
    ctx.body = {
      code: 1,
      data: '删除失败'
    }
  }
});

// 获取说说详情
router.get('/sayDetail', async (ctx, next) => {
  let sayId = ctx.query.sayId
  let data = await Models.Say.find({
    include: [{
      model: Models.User
    }, {
      model: Models.Comment,
      include: [{
        model: Models.User
      }]
    }],
    where: {
      id: sayId
    },
    order:[[Models.Comment, 'createdAt', 'DESC']]
  });
  let res = {
    code: 0,
    data
  }

  return ctx.body = res;
});
// 添加评论
router.post('/addComment', async (ctx, next) => {
  let obj = {}
  obj.u_id = ctx.request.body.userId;
  obj.s_id = ctx.request.body.sayId;
  obj.content = ctx.request.body.content;
  let {count} = await Models.Comment.findAndCount({
    where: {
      s_id: obj.s_id
    },
  })
  if (count) {
    return ctx.body = {
      code: 1,
      data: '不能重复评论'
    }
  }
  let newComment = await Models.Comment.build(obj).save();
  if (newComment) {
    return ctx.body = {
      code: 0,
      data: newComment
    }
  } else {
    return ctx.body = {
      code: 2,
      data: '评论失败'
    }
  }
});

module.exports = router;
