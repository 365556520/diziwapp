import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//状态数据
const state={
    count:3,//测试数据
    userToken:'',//用户token身份
    userName:'',//用户名字
    hasEnter:'',//用户登录状态
}
//状态数据修改
const mutations={
    //设置token
    setToken(state,token){
        state.userToken = token;
    },
    //设置名字
    setName(state,name){
        state.userName = name;
    },
    //设置用户登录状态
    setHasEntere(state,hasEnter){
        state.hasEnter = hasEnter;
    },
    //下面是测试
    add(state,n){
        state.count+=n;
    },
    reduce(state){
        state.count--;
    }
}
//状态过滤器
const getters = {
    count:function(state){
        return state.count +=100;
    }
}
/*用export default 封装代码，让外部可以引用*/
export default new Vuex.Store({
    state,
    mutations,
    getters
})


