<template>
    <div id="app" class="bgimg">

        <!--内容区域-->
        <mu-row class="diziw-content">
            <transition name="fade">
                <mu-col span="12">
                    <router-view></router-view>
                </mu-col>
            </transition>
        </mu-row>
        <!--内容区域 end-->
        <!--底部导航-->
        <v-bottom></v-bottom>
        <!--底部导航end-->
    </div>
</template>
<script>
    import vHeader from './Header.vue';  //顶部导航组件
    import vBottom from './Bottom.vue';  //底部导航
    import bus from './bus';
    export default {
        name: 'App',

        data () {
            return {
                shift: ''
            }
        },
        computed: {
            sortStudent: function () {
                return sortByKey(this.students, 'age');
            }
        },
        components:{
            vHeader, vBottom
        },
        methods: {

        },
        beforeRouteEnter: (to, from, next) => {
            console.log("准备进入路由模板");
            next();
        },
        beforeRouteLeave: (to, from, next) => {
            console.log("准备离开路由模板");
            next();
        }
    }
</script>

<!-- Add "scoped" attribute to  fffde7 limit CSS to this component only -->
<style scoped>
    .bgimg {
        background: rgba(255, 253, 231, 0);
        background-attachment: fixed;
    }
    .diziw-content {
        margin: 0px 0px 50px 0px;
    }

    a {
        /*去掉标签下划线 把点后颜色设置成白色*/
        text-decoration: none;
        color: #ffffff;
    }
</style>
