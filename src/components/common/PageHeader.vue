<template>
    <div class="bgimg">
        <!--顶部-->
        <Sticky top="0px" z-ndex="0">
            <mu-row>
                <mu-col span="12">
                    <mu-appbar class="navtop" color="blue500" z-depth="0" >
                        <!--导航左侧-->
                        <mu-button icon slot="left"  @click.prevent="Btback">
                            <mu-icon size="36" value="keyboard_arrow_left"></mu-icon>
                        </mu-button>
                        <!--导航左侧 end-->
                        {{inputtitle}}
                    </mu-appbar>
                </mu-col>
            </mu-row>
        </Sticky>
        <!--顶部end-->
    </div>
</template>
<script>
    import Sticky from 'vue-sticky-position' //vue-sticky-position粘性定位和固定顶部导航
    export default {
        created: function () {
        },
        mounted(){ //这个挂在第一次进入页面后运行一次提后不会执行
        },
        data () {
            return {
            }
        },
        props:{//引用父类变量
            inputtitle: '',
        },
        computed: {

        },
        methods: {
            //返回
            Btback(){
                this.$router.go(-1);
            }
        },
        components:{
            Sticky
        },
    }
</script>

<!-- Add "scoped" attribute to  fffde7 limit CSS to this component only -->
<style scoped>
    .bgimg {
        background: rgba(255, 253, 231, 0);
        background-attachment: fixed;
    }

    .navtop {
        /*设置顶部导航的位置和长宽*/
        width: 100%;
        height: 50px;
        min-height: 50px;
        position: fixed;
        left: 0px;
    }


    a {
        /*去掉标签下划线 把点后颜色设置成白色*/
        text-decoration: none;
        color: #ffffff;
    }
</style>
