<template>
    <div class="bgimg">
        <!--顶部-->
        <Sticky top="0px" z-ndex="0">
            <mu-row>
                <mu-col span="12">
                    <mu-appbar class="navtop" color="blue500" z-depth="0" >
                        <!--导航左侧-->
                        <mu-button icon slot="left" @click="open = !open">
                            <mu-icon size="36" value="account_circle"></mu-icon>
                        </mu-button>
                        <!--导航左侧 end-->
                        {{title}}
                    </mu-appbar>
                </mu-col>
            </mu-row>
        </Sticky>
        <!--抽屉导航-->
        <mu-drawer :open.sync="open" width="50%" :docked="docked" :right="position === 'right'">
            <mu-list>
                <mu-list-item button>
                    <mu-list-item-title>Menu Item 1</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button>
                    <mu-list-item-title>Menu Item 2</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button @click="open = false">
                    <mu-list-item-title >Close</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-drawer>
        <!--抽屉导航 end-->
        <!--顶部end-->
    </div>
</template>
<script>
    import Sticky from 'vue-sticky-position' //vue-sticky-position粘性定位和固定顶部导航
    import {mapState} from 'vuex'; //mapState数据计算简化模式mapMutations方法的简化模式写法如下
    export default {
        created: function () {
            console.log(this.$route.meta.title);
            this.isroute();
        },
        mounted(){ //这个挂在第一次进入页面后运行一次提后不会执行
            this.isroute();
        },
        data () {
            return {
                docked: false,
                open: false,
                position: 'left'
            }
        },
        computed: {
            ...mapState(['userbaidumap']),
            title:function () {
                return this.$route.meta.title!='首页'?this.$route.meta.title:this.userbaidumap.centername;
            },
            sortStudent: function () {
                return sortByKey(this.students, 'age');
            }
        },
        methods: {
            isroute(){
                if (this.$route.name == "Nav") {
                    this.$router.push({path: '/Home'});
                    this.shift = 'Home';
                } else {
                    this.shift = this.$route.name;
                }
                console.log(this.shift);
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
