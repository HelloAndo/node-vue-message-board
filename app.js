// todo: pm2 promise 支持社交账号登陆 
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var controller = require('controller');
var _ = require('underscore');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var users = require('./users');
var User = require('./models/user');

var routes = require('./routes/index');
var topic = require('./routes/topic');

var app = express();

mongoose.connect('mongodb://localhost/topic');
// var db = mongoose.createConnection('mongodb://localhost/topic');
// db.once('open', cb => console.log('数据库连接成功'))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "test"
}));

// 前端静态目录,目前是前后端分离开发
// app.use(express.static(path.join(__dirname, 'public/vue/dist')));


/*服务器跨域设置*/
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

app.use('/', routes)
app.use('/topic', topic)

/*hasThisUser路由中间件 —— 自备req/res/next三参数。也可以分解成app.post('/signup', hasThisUser)、app.post('/signup', function(req, res, next){})*/


// app.post('/login', function(req, res, next){
//   if(!req.body.user || !req.body.password){
//     res.end('请完整输入用户名和密码！')
//   }
//   for(user in users){
//     if(req.body.user === user && req.body.password == users[user].password){
//       console.log( 'demo' )
//       console.log( typeof req.body.password )
//       // console.log(typeof users[user].password)
//       req.session.isLogin = true;
//       req.session.name = req.body.name;
//       res.json({
//         success: true
//       });
//     }
//   }
//   res.json({
//     success: false
//   });
// });

// app.get('/testlogin', function(req, res, next){
//   console.log(req)
//   if(req.session.isLogin){
//     res.json({
//       isLogin: ture,
//       user: req.session.name
//     });
//   }else{
//     res.send('木有登陆！');
//   }
// });

// // app.get('/', function(req, res){

// // })


// /*controller路由设置*/
// // ctrl.define('getTopics', function() {
// //   topic.fetch(function(err, topics) {
// //     if(err) console.log(err);
// //     res.json({topics: topics});
// //   })
// // })
// // ctrl.get('/getTopics', 'getTopics');

// // app.use('/', routes);
// // app.use('/users', users);

// // catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// // error handlers

// // development error handler
// // will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// // production error handler
// // no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
