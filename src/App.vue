<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import {mapState,mapMutations,mapGetters} from 'vuex'; //mapState数据计算简化模式mapMutations方法的简化模式写法如下
    export default {
        name: 'App',
        computed:{//数据计算
            ...mapState(['count','userToken']),//配置vuex状态的值
        },
        methods: {
            //用vuex存登录token和用户名字
            ...mapMutations([
                'setToken','setName'
            ]),
            //获取用户信息方法
            getUser(userToken){ //获取用户信息
                this.axios.defaults.headers.common ['Authorization'] = 'Bearer ' + userToken; //token认证响应头
                let usertoken =  {
                    headers:{
                        'Accept':'application/json',
                    }
                }
                this.axios.post('api/passport',usertoken).then((response) => {
                    this.setName(response.data.user.name);
                    console.log(response)
                }).catch((error) =>{
                    alert(error);
                });
            },
        },
        watch:{
            //监听token
            userToken:function(token){
               if (token!=""){ //如果token存在就获取用户信息
                    this.getUser(token) //获取用户信息
               }else{
                   console.log('空主页面');
               }
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
