import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Home from './components/Home'
import Content from './components/Content'
import Modify from './components/Modify'
import Author from './components/Author'
import Introduce from './components/Introduce'

Vue.use(VueResource).use(VueRouter)

Vue.http.options.root = 'http://localhost:3000';
Vue.http.options.emulateJSON = true;
// Vue.http.options.credentials = true ;


const router = new VueRouter()

// 路由map
router.map({
  '/home': {
    component: Home,

    subRoutes: {

    	'/content/:id': {
    		component: Content,
    	},

    	'/modify/:id': {
    		component: Modify,
    	},

      '/author/:user': {
        component: Author,
      },

    },

  },

  '/introduce': {
    component: Introduce,
  },

})

router.redirect({
  '*': '/home'
})

router.start(App, '#app')

Vue.filter('bjtime', function(date){
  return new Date(date).toLocaleString("zh-CN", {hour12: false});
});