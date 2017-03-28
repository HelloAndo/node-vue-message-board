<script>
export default {

	props: ['usr', 'showConfirm', 'delFrom'],

	data () {
		return {
			topics: [],
		}
	},

	route: {
		data (transition) {
			let num = 60 ;
			let that = this ;
			this.$http.post('gettopics', {author: this.$route.params.user}).then((response) => {
				transition.next({
					topics: response.data.data.list,
					delFrom: transition.to.path,
				// console.log(this.delFrom)
				})
				console.log(this.delFrom)
			}, (response) => {

			});
		}
	},

	events: {
		refreshTopics () {
			this.$http.post('gettopics', {author: this.$route.params.user}).then((response) => {
				this.topics = response.data.data.list ;
			}, (response) => {

			});
		},
	},
}
</script>

<template>
	<div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <span class="btn btn-sm btn-primary pull-right" v-link="'/home'">返回首页</span>
                <h4>{{topics[0].author}}的话题列表</h4></div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th width="60%">标题</th>
                        <th>作者</th>
                        <th>修改时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="topic in topics" v-cloak>
                        <td class="topic" v-link=" '/home/content/' + topic._id "  >{{topic.title}}</td>
                        <td >{{topic.author}}</td>
                        <td >{{topic.date | bjtime}}</td>
                        <td><template v-if="usr == topic.author">
                            <a v-link=" '/home/modify/' + topic._id " >修改</a> <a href="javascript:;" @click="showConfirm(topic._id)">删除</a></template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>