<script>
import common from './common.js'   
export default {

    props: ['tips'],

    data () {
        return {
            topic: {},
            modifyTopic: {},
            routeFrom: '',              /*从哪个路由地址过来*/
        }
    },
    route:{
        data (transition) {
            this.$http.post('gettopic', {_id: this.$route.params.id}).then((response) => {
                transition.next({
                    topic: response.data.data,
                    routeFrom: transition.from.path
                });
            }, (response) => {

            });
        }
    },

    methods: {
        modify () {
            var that = this ;
            this.$http.post('modifytopic', {
                _id: this.topic._id, 
                title: this.modifyTopic.title, 
                content: this.modifyTopic.content
            }).then((response) => {
                this.tips.msg = '修改成功！';
                this.tips.type = 'warning';
                common.feedback( $('.feedback'), function(){
                    console.log(that.routeFrom)
                    that.$route.router.go({path: that.routeFrom});
                });
            }, (response) => {

            });
        },

        cancel () {
            this.$route.router.go({path: this.routeFrom});
        },
    },
}

</script>

<template>
	<div class="container">
		<div class="panel panel-default">
            <div class="panel-heading">
                <span class="btn btn-sm btn-primary pull-right" v-link="'/home'">返回首页</span>
                <h4>修改话题</h4></div>
            <div class="panel-body">
                <form role="form">
                    <div class="form-group">
                        <label for="title">标题</label>
                        <input type="text" class="form-control" :placeholder="topic.title" v-model="modifyTopic.title">
                        </textarea>
                    </div>
                    <div class="form-group">
                        <label for="content">内容</label>
                        <textarea class="form-control"  :placeholder="topic.content" v-model="modifyTopic.content"></textarea>
                    </div>
                    <div class="form-group pull-right">
                        <button type="submit" class="btn btn-primary" @click="modify">修改</button>
                        <button class="btn btn-default" @click="cancel">取消</button>
                    </div>
                </form>
            </div>
        </div>
	</div>
</template>