// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
/*MuseUI*/
import 'muse-ui/lib/styles/base.less';
import {
    AppBar,
    Avatar,
    BottomNav,
    Button,
    Checkbox,
    Divider,
    Grid,
    Icon,
    List,
    Menu,
    Paper,
    Popover,
    Radio,
    Select,
    Switch,
    TextField,
    SubHeader,
    Helpers,
    Drawer
} from 'muse-ui';
import theme from 'muse-ui/lib/theme';
import 'muse-ui/lib/styles/theme.less';
Vue.use(AppBar);
Vue.use(Avatar);
Vue.use(BottomNav);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Divider);
Vue.use(Grid);
Vue.use(Icon);
Vue.use(List);
Vue.use(Menu);
Vue.use(Paper);
Vue.use(Popover);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Switch)
Vue.use(TextField);
Vue.use(SubHeader);
Vue.use(Helpers);
Vue.use(Drawer);
/*MuseUI end*/

/*vue-awesome-swiper轮播插件*/
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
/*vue-awesome-swiper轮播插件 end*/

/*vue-axios 接收服务器传过来数据的插件*/
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
/*vue-axios end*/

/*自定义全局变量*/
import global from './components/config/Global'//引用文件
Vue.prototype.GLOBAL = global//挂载到Vue实例上面
/*自定义全局变量end*/

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
