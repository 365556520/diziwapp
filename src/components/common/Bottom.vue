<template>
    <div class="bgimg">
        <!--底部导航-->
        <mu-row>
            <mu-col span="12">
                <mu-container class="navbottom">
                    <mu-bottom-nav :value.sync="newshift" color="red500" shift>
                        <mu-bottom-nav-item value="Home" title="首页" icon="home" to="/Home"></mu-bottom-nav-item>
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
    import bus from '../common/bus';
    export default {
        data () {
            return {
                //当前路由的
                shift: ''
            }
        },
        computed: {
            //当前路由属性计算
            newshift:function(){
                if (this.$route.name == "Nav") {
                    this.$router.push({path: '/Home'});
                    this.shift = 'Home';
                } else {
                    this.shift = this.$route.name;
                }
                return  this.shift;
            },
            sortStudent: function () {
                return sortByKey(this.students, 'age');
            }
        },
    }
</script>

<!-- Add "scoped" attribute to  fffde7 limit CSS to this component only -->
<style scoped>
    .bgimg {
        background: rgba(255, 253, 231, 0);
        background-attachment: fixed;
    }

    .navbottom {
        /*设置底部导航的位置和长宽*/
        width: 100%;
        height: 55px;
        position: fixed;
        max-width: 100%;
        bottom: 0px;
        left: 0px;
        margin: 0;
        padding: 0;
    }


    a {
        /*去掉标签下划线 把点后颜色设置成白色*/
        text-decoration: none;
        color: #ffffff;
    }
</style>
