<template>
    <div>
        <!--顶部--><v-header></v-header><!--顶部end-->
        <div class="content">
            <br>
            <mu-list textline="three-line">
                <mu-list-item button avatar :ripple="false" @click.prevent="login()">
                    <mu-list-item-content>
                        <mu-row justify-content="center">
                            <mu-avatar :size="size">
                                <img src="static/images/avatar.jpg">
                            </mu-avatar>
                        </mu-row>
                        <mu-flex class="flex-wrapper" justify-content="center">
                            <mu-flex class="flex-demo"  justify-content="center">{{userdata.userName}}</mu-flex>
                        </mu-flex>
                    </mu-list-item-content>
                </mu-list-item>
            </mu-list>
            <br>
            <mu-divider></mu-divider>

            <mu-list>
                <mu-list-item button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon value="inbox"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>我的消息</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon value="grade"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>我的关注</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="true">
                    <mu-list-item-action>
                        <mu-icon value="send"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>我的邮箱</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="true"  @click.prevent="quitUser()">
                    <mu-list-item-action>
                        <mu-icon value="power_settings_new"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>退出登录</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters} from 'vuex'; //mapState数据计算简化模式mapMutations方法的简化模式写法如下
    import vHeader from '../common/Header.vue';  //顶部导航组件
    export default {
        name: 'MyProfile',
        data () {
            return {
                size: 80,
            }
        },
        computed:{//数据计算
            ...mapState(['userToken','userdata']),
        },
        methods: {
            //用vuex里面的方法
            ...mapMutations([
                'deleteUser'
            ]),
            login(){
                if(this.userToken==''){
                    this.$router.push('/Login');
                }
            },
            //退出用户
            quitUser(){
                if(this.userToken!=""){
                    this.$confirm('退出当前用户', '提示'
                    ).then(({ result }) => {
                        if (result) {//点击了确定
                            this.axios.defaults.headers.common ['Authorization'] = 'Bearer ' + this.userToken; //token认证响应头
                            let usertoken =  {
                                headers:{
                                    'Accept':'application/json',
                                }
                            }
                            this.axios.post('api/logout',usertoken).then((response) => {
                                console.log(response.data.message);
                                this.deleteUser();//vuex删除用户数据
                                this.$toast.message(response.data.message);
                            }).catch((error) =>{
                                alert(error);
                            });
                        } else {//点击了取消
                        }
                    });
                }else{
                    this.$toast.message("请用户登录，后再退出");
                }
            }
        },
        components: {
            vHeader
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content {
        margin: 49px 0px 50px 0px;
    }
</style>
