<style scoped>

.main{
    margin-top: 70px;
}

.main .table .topic{
    cursor: pointer;
}

.pagination {
    margin-top: 0;
}

.addTopicBox-transition{transition: all .5s cubic-bezier(.55,0,.1,1); opacity: 1;  transform: translate3d(0,0,0); }
.addTopicBox-enter, .addTopicBox-leave{opacity: .5; transform:translate3d(20px, 20px, 0);}

.routeviewBox-transition{transition: all .8s cubic-bezier(.55,0,.1,1); transition-delay: .2s; opacity: 1;  transform: scale(1);}
.routeviewBox-enter, .routeviewBox-leave{opacity: 0; transform:scale(.4);}

.topicsBox-transition{transition: all .5s ease; opacity: 1;  transform: translate3d(0px,0,0);}
.topicsBox-enter, .topicsBox-leave{opacity: 0; transform:translate3d(-200px, 0px, 0);}

</style>

<template>

<div class="main">
    <div class="container" v-show=" $route.path === '/home' " transition="topicsBox">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4>话题列表</h4></div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th width="60%">标题</th>
                        <th>作者ddd</th>
                        <th>修改时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="topic in topticList" v-cloak>
                        <td class="topic" v-link=" '/home/content/' + topic._id "  >{{topic.title}}</td>
                        <td v-link=" '/home/author/' + topic.author ">{{topic.author}}</td>
                        <td >{{topic.date | bjtime}}</td>
                        <td><template v-if="usr == topic.author">
                            <a v-link=" '/home/modify/' + topic._id " >修改</a> <a href="javascript:;" data-toggle="modal" data-target=".delModal" @click.stop="showConfirm(topic._id)">删除</a></template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ul class="pagination">
            <li :class="{'disabled': nowPage==1}" @click="reducePage"><a href="#">&laquo;</a></li>
       <!--      <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li> -->
            <li v-for="n in page" :class="{'active': n == nowPage}" @click="getToPage(n)"><a href="javascript:;">{{n}}</a></li>
            <li :class="{'disabled': nowPage==totalPagesNum}" @click="addPage"><a href="#">&raquo;</a></li>
        </ul>
        <div class="panel panel-default" v-if="isLogin" transition="addTopicBox">
            <div class="panel-heading">
                <h4>添加话题</h4>
            </div>
            <div class="panel-body">
                <form role="form">
                    <div class="form-group">
                        <label for="title">标题</label>
                        <input type="text" class="form-control"  placeholder="请输入标题" v-model="newTopic.title">
                    </div>
                    <div class="form-group">
                        <label for="content">内容</label>
                        <textarea class="form-control"  placeholder="请输入评论内容" v-model="newTopic.ctx"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary pull-right"
                    @click="addTopic">添加</button>
                </form>
            </div>
        </div>

    </div>
    
    <router-view :tips.sync="tips" :usr="usr" :show-confirm="showConfirm" :del-from.sync="delFrom" transition="routeviewBox"></router-view>

</div>

<!-- 删除确认信息模态框 -->
<div class="modal fade delModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div class="modal-dialog modal-sm">
    <div class="alert alert-danger alert-dismissible fade in" role="alert">
        <p>是否继续删除操作？<p>
            <button type="button" class="btn btn-danger" @click="delTopic(nowTopicId)">确定</button>
            <button type="button" class="btn btn-default" @click="cancelDelTopic">取消</button>
        </p>
    </div>
  </div>
</div>

</template>

<script>

import common from './common.js'
import dept from './dept'

var treeData = [
  {
    name: '第一部',
    children: [
      {
        name: '第一季',
        children: [
          {
            name: '第一话'
          }
        ] 
      }
    ]
  },
  {
    name: '第二部',
    children: [
      {
        name: '第一季',
        children: [
          {
            name: '第一话'
          }
        ] 
      },
      {
        name: '第二季',
        children: [
          {
            name: '第一话'
          },
          {
            name: '第二话'
          },
        ] 
      },
    ]
  },
];

export default {

    // route: {
    //     data (transition) {
    //         this.getTopics(0, 10);
    //         transition.next({
    //             delFrom: transition.to.path,
    //         });
    //     }
    // },

    props: ['isLogin', 'usr', 'tips'],

    data () {
        return {
            topticList: [],
            newTopic: {
							title: '',
							ctx: ''
						},
            // topicDetails: {},
            page: [1,2,3,4,5],              /*初始页码*/
            totalPagesNum: undefined,       /*总页码数也即最大页码*/
            nowPage: 1,                     /*当前页码*/
            nowTopicId: '',
            delFrom: '',
            treeData: treeData,
        }
    },

    computed: {

    },

    methods: {

        getTopics (offset, count) {
            this.$http.post('gettopics', {offset: offset, count: count}).then((response) => {
                this.topticList = response.data.data.list ;
                if(this.topticList.length < 10){
                    this.totalPagesNum = this.nowPage ;
                }
            }, (response) => {
                alert( "获取话题列表出错！" ) ;
            });
        },

        getToPage (num) {
            this.nowPage = num ;
            this.getTopics( (num-1)*10, 10);
        },

        addPage () {
            if(this.nowPage == this.totalPagesNum){return;}
            this.nowPage++ ;
            if( this.nowPage > this.page[this.page.length-1] ){
                this.page = this.page.map((value) => {
                    return ++value ;
                });        
            }
            this.getTopics( (this.nowPage-1)*10, 10);

        },

        reducePage () {
            if(this.nowPage == 1){return;}
            this.nowPage-- ;
            if( this.nowPage < this.page[0] ){
                this.page = this.page.map((value) => {
                    return --value ;
                });
            }
            this.getTopics( (this.nowPage-1)*10, 10);
            
        },

        addTopic () {
            this.$http.post('topic/add', {
              "author": this.usr,
              "topic": JSON.stringify(this.newTopic)
            }).then((response) => {
                // 获取最新话题列表
                this.topticList = this.getTopics(0, 10) ;
                this.newTopic = {};
                // 发表反馈信息设置
                this.tips = {
                    msg: '发表成功！',
                    type: 'success',
                }
                common.feedback($('.feedback'));
            }, (response) => {
                alert("添加文章出错！")
            });
        },

        delTopic (id) {
            var that = this ;
            this.$http.post('deletetopic', {_id: id}).then((response) => {
                // this.topticList = this.getTopics(0, 10) ;
                this.tips.msg = '删除成功！';
                this.tips.type = 'danger';
                $('.delModal').modal('hide');
                common.feedback( $('.feedback'), function(){

                    if( that.$route.path ==  '/home/content/' + id  ){
                        that.$route.router.go({path: '/home'});
                    }else if( that.$route.path ==  '/home' ){
                        that.getTopics(0, 10);
                        // that.$route.router.go({path: that.delFrom});
                    }else{
                        that.$broadcast('refreshTopics');
                    }
                });
            }, (response) => {
                alert("删除文章出错！")
            });
        },

        showConfirm (id) {
            $('.delModal').modal('show');
            this.nowTopicId = id ;
        },

        cancelDelTopic () {
            $('.delModal').modal('hide');
        },

    },


    components: {
        dept
    }
}
</script>