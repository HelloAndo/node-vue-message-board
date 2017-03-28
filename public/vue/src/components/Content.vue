<script>

export default {

    props: ['usr', 'showConfirm', 'delFrom'],

    data () {
        return {
            topic:{}
        }
    },
    route:{
        data () {
            this.$http.post('gettopic', {_id: this.$route.params.id}).then((response) => {
                this.topic = response.data.data ;
            }, (response) => {

            });
        }
    }
}

</script>

<template>
	<div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <span class="btn btn-sm btn-primary pull-right" v-link="'/home'">返回首页</span>
                <h4>{{topic.title}}</h4></div>
            <div class="panel-body">
                <div class="panel">
                    <span v-link=" '/home/author/' + topic.author ">作者：<a href="#">{{topic.author}}</a></span> <span>修改时间：{{topic.date | bjtime}}</span>
                    <template v-if="usr == topic.author">
                        <a v-link=" '/home/modify/' + topic._id ">修改</a><a href="javascript:;" @click="showConfirm(topic._id)">删除</a>
                    </template>
                </div>
                <div class="panel">{{topic.content}}</div>
            </div>
        </div>
    </div>
</template>

