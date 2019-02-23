<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import {mapState,mapMutations,mapGetters} from 'vuex'; //mapState数据计算简化模式mapMutations方法的简化模式写法如下
    export default {
        name: 'App',
        data () {
            return {
                toast:{ //弹出toast配置
                    position: 'top',               // 弹出的位置
                    time: 1000,                       // 显示的时长
                    closeIcon: 'close',               // 关闭的图标
                    close: true,                      // 是否显示关闭按钮
                }
            }
        },
        computed:{//数据计算
            ...mapState(['count','userToken']),//配置vuex状态的值
        },
        mounted(){//创建完毕后执行
            this.$toast.config(this.toast);//加载提示toast的配置
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
            //监听vuex中token值的变化
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
