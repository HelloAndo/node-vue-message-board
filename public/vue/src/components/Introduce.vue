<template>
<div class="container">
<div class="jumbotron">
  <h2>项目说明</h2>
  <p>
<h3>文件说明</h3>
<p>
	AppHeader.vue 			头部组件<br>
	AddTopic.vue 			主页添加话题区<br>
	Home.vue 				主页主内容区<br>
	Content.vue 			文章详情页面<br>
	Modify.vue 			修改文章页面<br>
	Author.vue 			单用户话题列表页面<br>
	common.js 				复用函数文件<br>	
</p>
<h3>路由及页面结构和props数据</h3>
<p>
	首页：				'/home'：AppHeader + AddTopic <br>
	文章详情页：			'/home/content/:id'：AppHeader + Content			['usr', 'showConfirm'] <br>
	文章修改页	：		'/home/modify/:id'：AppHeader + Modify				['tips'] <br>
	用户话题页	：		'/home/author/:user'：AppHeader + Author			['usr', 'showConfirm'] <br>	
</p>
<h3>功能及实现说明</h3>

<h4>首页</h4>

		<h5>注册：</h5>		
		<p>提交前校验两次输入密码是否一致，成功注册和用户名已被注册三者均有反馈信息</p>

		<h5>登陆：</h5>		
		<p>登陆状态在localStorage中保存两个键值对："login"为boolean值，对应登陆和退出状态；"user"为string值，为当前登陆用户，无登陆则为''。</p>

		<h5>话题列表：</h5>	
		<p>默认页码为"1"，点击相应页码ajax请求对应顺序的文章，点击“下一页”获取更多文章，当返回文章数目少于默认的10条时，“下一页”按钮无法点击。</p>

		<h5>动画：</h5>		
		<p>"添加话题"组件的显示和消失，从/home跳转到其他页面时有动画效果</p>
<h4>效果实现</h4>

		<h5>操作信息反馈：</h5>				
		<p>"添加话题"、"修改话题"使用同一个模态框展示反馈内容，调用时通过"tips"变量可定制反馈文字和模态框的样式；"删除话题"多一步确认模态框，删除成功提示也使用前者的模态框</p>

		<h5>修改/删除后路由切换：</h5>
		<p>入口：主页(/home)/单用户话题列表页面(/home/author)/文章详情页(/home/content)</p>
		<p>返回路由：<br>修改操作：主页(更新/home/modify~/home)/用户话题列表(更新/home/modify~/home/author)/文章详情页(更新/home/modify~/home/content) <br>删除操作：主页(更新)/用户话题列表(更新)/主页(更新/home/content~/home)</p>		
				
  </p>
</div>
</div>
</template>

<style scoped>

.container{
	margin-top: 70px;
}
.jumbotron{padding-top: 10px;}
p{font-size: 14px;}
h5{background-color: #f4e4bc;}
</style>