import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Hot from '@/components/Hot'
import MyProfile from '@/components/MyProfile'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {   /*热门咨询*/
          path:'/Hot',
          name:'Hot',
          component: Hot
      },
      {   /*游戏资料*/
          path:'/Home',
          name:'Home',
          component: Home
      },
      {   /*个人资料*/
          path:'/MyProfile',
          name:'MyProfile',
          component: MyProfile
      },
  ]
})
