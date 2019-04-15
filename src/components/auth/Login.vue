<template>
    <div>
        <!--顶部--><p-header :inputtitle="logintitle"></p-header><!--顶部end-->
        <div class="content">
            <br>
            <mu-container>
                <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                    <mu-form-item label="用户名" help-text="请输入用户名" prop="username" :rules="usernameRules">
                        <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item label="密码" prop="password" :rules="passwordRules">
                        <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item prop="isAgree" >
                        <mu-checkbox label="记住我" v-model="validateForm.isAgree"></mu-checkbox>
                    </mu-form-item>
                    <mu-flex justify-content="center" >
                        <mu-form-item>
                            <mu-button color="primary" @click="submit()">提交</mu-button>
                            <mu-button @click="clear">重置</mu-button>
                        </mu-form-item>
                    </mu-flex>
                </mu-form>
            </mu-container>
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters} from 'vuex'; //mapState数据计算简化模式mapMutations方法的简化模式写法如下
    import pHeader from '../common/PageHeader.vue';  //分页顶部导航组件
    export default {
        name: 'Login',
        mounted(){ //这个挂在第一次进入页面后运行一次
        },
        data () {
            return {
                logintitle:"用户登录",
                usernameRules: [
                    { validate: (val) => !!val, message: '必须填写用户名'},
                    { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
                ],
                passwordRules: [
                    { validate: (val) => !!val, message: '必须填写密码'},
                    { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
                ],
                validateForm: {
                    username: '',
                    password: '',
                    isAgree: false,
                },
            }
        },
        computed:{//数据计算
            ...mapState(['userToken','userdata']),
        },
        methods: {
            //用vuex里面的方法
            ...mapMutations([
                'setToken',
                'deleteUser'
            ]),
            submit () { //登录提交按钮
                if(this.userToken==""){
                    this.$refs.form.validate().then((result) => {
                        if(result){//验证成功
                            let data = {
                                username:this.validateForm.username,
                                password:this.validateForm.password,
                            }
                            this.axios.post('api/login',data).then((response) => {
                                if(response.status==200){
                                    this.setToken(response.data.token);//把token保存到vuex里面
                                    this.$toast.message(response.data.message);//toast消息
                                    this.$router.go(-1);//返回之前页面
                                    console.log(response);
                                }
                            }).catch((error) =>{
                                alert(error);
                            });
                        }else {
                        }
                    });
                }else{
                    this.$toast.message("请用户退出后再从新登录！");
                }
            },
            clear () {//重置
                this.$refs.form.clear();
                this.validateForm = {
                    username: '',
                    password: '',
                    isAgree: false
                };
            },
        },
        components: {
            pHeader
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content {
        margin: 49px 0px 50px 0px;
    }
</style>
