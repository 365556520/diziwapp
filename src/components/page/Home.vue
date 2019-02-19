<template>
    <div>
        <!--顶部--><v-header></v-header><!--顶部end-->
        <div class="content">
            <!--轮播图-->
            <mu-row>
                <mu-col span="12">
                    <div class="grid-cell">
                        <!-- swiper 轮播-->
                        <swiper :options="swiperOption">
                            <swiper-slide v-for="v in slides" :key="v.id" :style="{'background':'url('+v.preview+')','background-repeat':'no-repeat','background-size':'cover' }"
                                          class="swiper-zoom-container">
                                <!--图片放在div中这样能自适应-->
                            </swiper-slide>
                            <div class="swiper-scrollbar" slot="scrollbar">
                            </div>
                        </swiper>
                        <!-- swiper end-->
                    </div>
                </mu-col>
            </mu-row>
            <!--轮播图end-->
            <br>
            <mu-divider></mu-divider>
            <br>
            <mu-row>
                <mu-col span="3" class="demo-paper" v-for="v in btns" :key="v.id">
                    <mu-paper class="btsize" :z-depth="1">
                        <router-link :to="v.router">
                            <mu-ripple>
                                <mu-flex  justify-content="center" align-items="center" >
                                    <mu-icon size="36" :value="v.icon" color="blue500"></mu-icon><br>
                                </mu-flex>
                                <mu-flex  justify-content="center"  align-items="center">
                                    <Caption>{{v.name}}</Caption>
                                </mu-flex>
                            </mu-ripple>
                        </router-link>
                    </mu-paper>
                </mu-col>
            </mu-row>
        </div>
    </div>
</template>

<script>
    import vHeader from '../common/Header.vue';  //顶部导航组件
    import Sticky from 'vue-sticky-position'; //vue-sticky-position粘性定位和固定顶部导航
    export default {
        name: 'Home',
        mounted(){ //这个挂在第一次进入页面后运行一次
        },
        data () {
            return {
                //按钮组
                btns:[
                    {id: 1,icon:'search', name:'班线查询',router:"/RegularBus"},
                    {id: 2,icon:'directions_bus', name:'公交线路',router:"/BusRoute"},
                    {id: 3,icon:'swap_calls', name:'乘公交路线',router:"/*"},
                    {id: 4,icon:'directions_run', name:'开发中',router:"/*"},
                    {id: 5,icon:'directions_run', name:'开发中',router:"/Hot"},
                    {id: 6,icon:'directions_run', name:'开发中',router:"/Hot"},
                    {id: 7,icon:'directions_run', name:'开发中',router:"/Hot"},
                    {id: 8,icon:'directions_run', name:'开发中',router:"/Hot"},
                ],

                //轮播图
                slides: [
                    {id: 1, preview: "static/images/1.jpg"},
                    {id: 2, preview: "static/images/2.jpg"},
                    {id: 3, preview: "static/images/3.jpg"},
                    {id: 4, preview: "static/images/4.jpg"},
                ],
                /*轮播*/
                swiperOption: {
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 30,
                    effect: 'fade', //渐变效果
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        hide: true
                    },
                    autoplay: {//自动轮播
                        delay: 2000,
                        disableOnInteraction: false
                    },
                },
                active: 0,
            }
        },
        methods: {
            //弹出框关闭按钮
            closeFullscreenDialog () {
                this.openFullscreen = false;
            },
        },
        components: {
            vHeader,Sticky
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btsize {
        width: 100%;
        height: 85px;
        padding: 12px 2px 12px 2px;
    }
    .demo-paper {
        padding: 2px;
        width: 98%;
    }
    .tabscon{
        width: 100%;
        height:100%;
    }
    .swiper-zoom-container {
        max-width: 100%;
        width: 100%;
        height: 200px;
    }
    .content {
        margin: 49px 0px 50px 0px;
    }
    .bm-view {
        width: 100%;
        height: 400px;
    }
</style>
