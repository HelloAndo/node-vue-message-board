var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/login', matchUser)

router.post('/signup', hasThisUser, (req, res, next) => {
    new User({ user: req.body.user, password: req.body.password }).save(function(err, docs) {
        if (err) { console.log(err); } else {
            res.json({ code: 0, success: true, message: '注册成功' });
        }
    })
})

router.get('/logout', function(req, res) {
    // req.session.destroy();
    req.session.isLogin = false;
    req.session.user = null;
    res.json({ code: 0, success: true, message: '登出成功' });
})

router.get('/testLogin', function(req, res) {
    if (req.session.isLogin) {
        res.json({ code: 0, success: true, message: '获取成功', data: { isLogin: req.session.isLogin, user: req.session.user } });
    } else {
        res.json({ code: 0, success: true, message: '获取成功', data: { isLogin: req.session.isLogin, user: req.session.user } });
    }
})

function matchUser(req, res, next) {
    User.matchUser(req, res, next);
}

/*查询数据库是否已存在注册用户*/
function hasThisUser(req, res, next) {
    User.checkUser(req.body.user, res, next);
}

module.exports = router;