import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Hot from '@/components/Hot'
import MyProfile from '@/components/MyProfile'
import Game from '@/components/Game'
import Nav from '@/components/Nav'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/',
        name: 'Nav',
        component: Nav,
        children:[
            {  /*首页*/
                path: '/Home',
                name: 'Home',
                component: Home
            },
            {   /*热门咨询*/
                path:'/Hot',
                name:'Hot',
                component: Hot
            },
            {   /*游戏资料*/
                path:'/Game',
                name:'Game',
                component: Game
            },
            {   /*个人资料*/
                path:'/MyProfile',
                name:'MyProfile',
                component: MyProfile
            },
        ]
      },
  ]
})
