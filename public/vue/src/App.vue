

<template>

<div>
    <app-header :is-login.sync="isLogin" :user.sync="user" ></app-header>
    <router-view :is-login="isLogin" :usr="user" :tips.sync="tips" ></router-view>
</div>

<!-- 操作反馈信息模态框 -->
<div class="modal fade feedback" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
		<div class="alert alert-dismissible fade in" :class=" 'alert-' + tips.type " role="alert">
	      <strong>{{tips.msg}}</strong>
    	</div>
    </div>
  </div>
</div>

</template>

<script>

import AppHeader from './components/AppHeader'

export default {
	data () {
		return {
			isLogin: false,
			user: '',
			tips: {
				msg: '',
				type: '',
			},
		}
	},

	events: {
		refreshLoginState: function(isLogin, user){
			this.isLogin = isLogin ;
			this.user = user;
		},
	},

    components: {
        AppHeader
    }
}

</script>

<style scoped>
.modal .alert{
	margin-bottom: 0;
}
</style>