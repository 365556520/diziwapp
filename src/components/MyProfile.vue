<template>
    <div>
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
                        <mu-flex class="flex-demo"  justify-content="center">请登录</mu-flex>
                    </mu-flex>
                </mu-list-item-content>
            </mu-list-item>
        </mu-list>
        <!--弹出框-->
        <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
            <mu-appbar color="red500" title="用户登录">
                <mu-button slot="left" icon @click="closeFullscreenDialog">
                    <mu-icon value="close"></mu-icon>
                </mu-button>
            </mu-appbar>
            <div style="padding: 24px;">
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
                        <mu-form-item>
                            <mu-button color="primary" @click="submit()">提交</mu-button>
                            <mu-button @click="clear">重置</mu-button>
                        </mu-form-item>
                    </mu-form>
                </mu-container>
            </div>
        </mu-dialog>
        <!--弹出框end-->
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
            <mu-list-item button :ripple="true">
                <mu-list-item-action>
                    <mu-icon value="power_settings_new"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>退出登录</mu-list-item-title>
            </mu-list-item>
        </mu-list>

    </div>
</template>

<script>
    export default {
        name: 'MyProfile',
        data () {
            return {
                size: 80,
                //查询按钮弹出页面开关
                openFullscreen: false,
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
                }
            }
        },
        methods: {
            login(){
                this.openFullscreen = true;
            },
            submit () {
                let data = {
                    username:this.validateForm.username,
                    password:this.validateForm.password,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }
                this.axios.post(this.GLOBAL.serverSrc +'api/login',data).then(function (response) {
                    if(response.status==200){
                        console.log(response);
                    }
                }).catch(function (error) {
                    alert(error);
                });
   /*             this.$refs.form.validate(this.GLOBAL.serverSrc +'/login',data).then((result) => {
                    console.log('form valid: ', result)
                });*/
            },
            clear () {
                this.$refs.form.clear();
                this.validateForm = {
                    username: '',
                    password: '',
                    isAgree: false
                };
            },
            //弹出框关闭按钮
            closeFullscreenDialog () {
                this.openFullscreen = false;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
