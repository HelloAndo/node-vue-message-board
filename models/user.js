var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	user: String,
	password: String,

});

UserSchema.statics = {
	checkUser: function (user, res, next) {
		this.findOne({user: user}, function (err, docs) {
			if (err) {return next(err);}
			if (!docs) {
				return next();
			} else {
				res.json({code: 3, success: false, message: '账号已存在'})
			}
		});
	},
	matchUser: function (req, res, next) {
		// console.log(req.session);
		var self = this;
		var user = req.body.user;
		var password = req.body.password;
		
		this.findOne({user: user}, function (err, docs) {

			if (err) {return next(err);}
			if (!docs) {res.json({code: 3, success: false, message: '账号不存在'});}

			self.findOne({password: password}, function(err, docs) {
				if (err) {return next(err);}
				if (!docs) {res.json({code: 4, success: false, message: '密码错误'});}
				req.session.isLogin = true;
				req.session.user = user;
				res.json({code: 0, success: true, message: '登录成功'});
			})
		})
	}
};

var User = mongoose.model('User', UserSchema);

module.exports = User;