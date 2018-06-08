<template>
    <div id="app" class="bgimg">
        <!--顶部-->
        <mu-row>
            <mu-col span="12">
                <mu-appbar class="navtop" color="blue500">
                    <!--导航左侧-->
                    <mu-button icon slot="left" @click.prevent="back()">
                        <mu-icon size="36" value="navigate_before"></mu-icon>
                    </mu-button>
                    <!--导航左侧 end-->
                    <!--导航中间标题-->
                    <mu-flex justify-content="center">
                        Title
                    </mu-flex>
                    <!--导航中间标题end-->
                    <!--导航右侧-->
                    <mu-menu placement="top-start" slot="right">
                        <mu-button flat> </mu-button>
                    </mu-menu>
                    <!--导航右侧 end-->
                </mu-appbar>
            </mu-col>
        </mu-row>
        <!--顶部end-->
        <!--内容区域-->
        <mu-row class="diziw-content">
            <mu-col span="12">
                <router-view></router-view>
            </mu-col>
        </mu-row>
        <!--内容区域 end-->
        <!--底部导航-->
        <mu-row>
            <mu-col span="12">
                <mu-container class="navbottom">
                    <mu-bottom-nav :value.sync="shift" color="blue500" shift>
                        <mu-bottom-nav-item value="Home" title="首页" icon="home" to="/"></mu-bottom-nav-item>
                        <mu-bottom-nav-item value="Hot" title="热门咨询" icon="comment" to="/Hot"></mu-bottom-nav-item>
                        <mu-bottom-nav-item value="Game" title="游戏" icon="videogame_asset"
                                            to="/Game"></mu-bottom-nav-item>
                        <mu-bottom-nav-item value="MyProfile" title="我的" icon="person"
                                            to="/MyProfile"></mu-bottom-nav-item>
                    </mu-bottom-nav>
                </mu-container>
            </mu-col>
        </mu-row>
        <!--底部导航end-->
    </div>
</template>
<script>
    export default {
        name: 'App',
        created: function () {
            this.isroute();
        },
        mounted(){ //这个挂在第一次进入页面后运行一次提后不会执行
            this.isroute();
        },
        data () {
            return {
                shift: ''
            }
        },
        methods: {
            back(){
                this.$router.back();
            },
            isroute(){
                this.shift = this.$route.name;
                console.log(this.shift);
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bgimg {
        background: #fffde7;
        background-attachment: fixed;
    }

    .navtop {
        /*设置顶部导航的位置和长宽*/
        width: 100%;
        height: 60px;
        position: fixed;
        left: 0px;
    }

    .navbottom {
        /*设置底部导航的位置和长宽*/
        width: 100%;
        height: 56px;
        position: fixed;
        max-width: 100%;
        bottom: 0px;
        left: 0px;
        margin: 0;
        padding: 0;
    }
    .diziw-content {
        margin: 61px 1px 61px 1px;
    }
    a {
        /*去掉标签下划线 把点后颜色设置成白色*/
        text-decoration: none;
        color: #ffffff;
    }
</style>
