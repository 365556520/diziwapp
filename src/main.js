// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false


/*vuex全局应用*/
import store from './vuex/store'
//状态数据
/*vuex全局应用end*/

/*自定义全局变量*/
import global from './components/config/Global'//引用文件
Vue.prototype.GLOBAL = global//挂载到Vue实例上面
/*自定义全局变量end*/
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
    Drawer,
    Dialog,
    ExpansionPanel,
    Form,
    Tabs,
    Snackbar
} from 'muse-ui';
import theme from 'muse-ui/lib/theme';
import 'muse-ui/lib/styles/theme.less';
import 'typeface-roboto'
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
Vue.use(Switch);
Vue.use(TextField);
Vue.use(SubHeader);
Vue.use(Helpers);
Vue.use(Drawer);
Vue.use(Dialog);
Vue.use(ExpansionPanel);
Vue.use(Form);
Vue.use(Tabs);
Vue.use(Snackbar);
//MuseUI插件
import Toast from 'muse-ui-toast';  //这个Toast有依赖Snackbar所以必须先导入Snackbar
Vue.use(Toast);
import Message from 'muse-ui-message'; //Message 依赖 dialog所以必须倒入dialog
Vue.use(Message);
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
//响应头
axios.defaults.baseURL = 'http://diziw.cn/'; //跨域访问的url
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  //问题这个请求头可能重复
/*vue-axios end*/
/*qs封装数据(跨域登录用到)*/
import qs from 'qs'
Vue.use(qs)
/*qs封装数据end*/


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
