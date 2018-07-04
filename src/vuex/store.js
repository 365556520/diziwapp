import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//状态数据
const state={
    count:3
}
//状态数据修改
const mutations={
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


