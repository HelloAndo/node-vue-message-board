# 项目说明

# 文件说明
	#AppHeader.vue 			头部组件
	#AddTopic.vue 			主页添加话题区
	#Home.vue 				主页主内容区
	#Content.vue 			文章详情页面
	#Modify.vue 			修改文章页面
	#Author.vue 			单用户话题列表页面
	#common.js 				复用函数文件

# 路由及页面结构和props数据
	#首页				'/home'：AppHeader + AddTopic
	#文章详情页			'/home/content/:id'：AppHeader + Content			['usr', 'showConfirm']
	#文章修改页			'/home/modify/:id'：AppHeader + Modify				['tips']
	#用户话题页			'/home/author/:user'：AppHeader + Author			['usr', 'showConfirm']

# 功能及实现说明

	## 首页

		#注册		
		提交前校验两次输入密码是否一致，成功注册和用户名已被注册三者均有反馈信息

		#登陆		
		登陆状态在localStorage中保存两个键值对："login"为boolean值，对应登陆和退出状态；"user"为string值，为当前登陆用户，无登陆则为''。

		#话题列表	
		默认页码为"1"，点击相应页码ajax请求对应顺序的文章，点击“下一页”获取更多文章，当返回文章数目少于默认的10条时，“下一页”按钮无法点击。

		#动画		
		"添加话题"组件的显示和消失，从/home跳转到其他页面时有动画效果

	## 效果实现

		#操作信息反馈				
		"添加话题"、"修改话题"使用同一个模态框展示反馈内容，调用时通过"tips"变量可定制反馈文字和模态框的样式；"删除话题"多一步确认模态框，删除成功提示也使用前者的模态框

		#修改/删除后路由切换
			#入口：
				主页(/home)/单用户话题列表页面(/home/author)/文章详情页(/home/content)
			#返回路由：
				修改操作：主页(更新/home/modify~/home)/用户话题列表(更新/home/modify~/home/author)/文章详情页(更新/home/modify~/home/content)
				删除操作：主页(更新)/用户话题列表(更新)/主页(更新/home/content~/home)




# Vue留言板

> 一个基于Vue的留言板练习作业

## 安装 & 启动

``` bash
# 下载项目
git clone http://10.32.5.29:8080/Neil/vue-guestbook.git

# 进入项目
cd vue-guestbook

# 安装依赖
npm install

# 启动应用 localhost:8080
npm run dev
```
## 项目结构

``` bash
.
├── config.js                   # 项目配置文件
├── build/                      # webpack 配置文件
│   └── ...
├── src/
│   ├── main.js                 # app 入口文件
│   ├── App.vue                 # app 主组件
│   ├── components/             # ui 组件
│   │   └── ...
│   └── assets/                 # 模块静态资源，会被 webpack 打包
│       └── ...
├── static/                     # 纯静态资源，打包是直接被复制
├── .babelrc                    # babel 配置
├── .eslintrc.js                # eslint 配置
├── index.html                  # index.html 模版
└── package.json                # 命令和依赖列表
```
