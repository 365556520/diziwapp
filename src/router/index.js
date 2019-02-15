import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/Home'
import Hot from '@/components/page/Hot'
import MyProfile from '@/components/page/MyProfile'
import Game from '@/components/page/Game'
import Nav from '@/components/common/Nav'
import Error404 from '@/components/Error404'
import RegularBus from '@/components/page/pageCommon/RegularBus'
import BusRoute from '@/components/page/pageCommon/BusRoute'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Nav',
            component: Nav,
            children: [
                {
                    /*首页*/
                    path: '/Home',
                    name: 'Home',
                    component: Home,
                    meta: { title: '首页' },
                },
                {
                    /*热门咨询*/
                    path: '/Hot',
                    name: 'Hot',
                    meta: { title: '热门咨询' },
                    component: Hot
                },
                {
                    /*游戏资料*/
                    path: '/Game',
                    name: 'Game',
                    meta: { title: '游戏资料' },
                    component: Game
                },
                {
                    /*个人资料*/
                    path: '/MyProfile',
                    name: 'MyProfile',
                    meta: { title: '我的' },
                    component: MyProfile
                },
            ]
        },
        {
            /*班线查询*/
            path: '/RegularBus',
            name: 'RegularBus',
            component: RegularBus,
            meta: { title: '班线查询' },
        },
        {
            /*公交线路查询*/
            path: '/BusRoute',
            name: 'BusRoute',
            component: BusRoute,
            meta: { title: '公交线路' },
        },
        {
            path: '*',
            component: Error404,
            meta: { title: 'Error404' },
        },
    ]
})
