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
            <!--班车时刻查询  -->
            <mu-row>
                <mu-tabs :value.sync="active"  style="z-index: 0"  full-width>
                    <mu-tab>班线查询</mu-tab>
                    <mu-tab>公交查询</mu-tab>
                </mu-tabs>
                <div class="tabscon" v-if="active === 0">
                    <mu-divider></mu-divider>
                    <br/>
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
                <div class="tabscon" v-if="active === 1">

                        <mu-row style="padding:2px;">
                            <mu-col span="12" >
                                <!--地图-->
                                <baidu-map   ak="LQjsPOAqD3uooTTVrIUePWUm" :center="baidumap.center" :zoom="baidumap.zoom" :scroll-wheel-zoom="true">
                                    <!--比例尺-->
                                    <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
                                    <!--缩放-->
                                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                                    <bm-view class="bm-view" > </bm-view>
                                    <!--地图中的内容-->
                                    <bm-control style="padding: 3px">
                                        <mu-row>
                                            <mu-col span="4" >
                                                <mu-select label="公交线路" v-model="baidumap.keyword" full-width>
                                                    <mu-option v-for="option,index in baidumap.keywords" :key="option" :label="option" :value="option"></mu-option>
                                                </mu-select>
                                            </mu-col>
                                        </mu-row>
                                        <mu-row >
                                            <mu-col span="4">
                                                <mu-text-field v-model="baidumap.bmtransit.start" placeholder="起点"   full-width action-icon="person_pin_circle"></mu-text-field>
                                                <mu-text-field v-model="baidumap.bmtransit.end" placeholder="终点"  full-width action-icon="pin_drop"></mu-text-field>
                                            </mu-col>
                                        </mu-row>
                                    </bm-control>
                                    <!--线路检索-->
                                    <bm-bus :keyword="baidumap.keyword" :auto-viewport="true" :selectFirstResult="true"  location="西峡县"></bm-bus>
                                    <!--乘线路规划-->
                                    <bm-transit :start="baidumap.bmtransit.start" :end="baidumap.bmtransit.end" :auto-viewport="true" location="西峡县"></bm-transit>

                                </baidu-map>
                            </mu-col>
                        </mu-row>
                </div>
            </mu-row>

        </div>
    </div>
</template>

<script>
    import vHeader from '../common/Header.vue';  //顶部导航组件
    import Sticky from 'vue-sticky-position'; //vue-sticky-position粘性定位和固定顶部导航
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'; //百度地图
    import {BmScale,BmNavigation,BmTransit,BmControl,BmView,BmBus} from 'vue-baidu-map';
    import MuRow from "muse-ui/es5/Grid/Row"; //百度地图组件
    export default {
        name: 'Home',
        mounted(){ //这个挂在第一次进入页面后运行一次
        },
        data () {
            return {
                //按钮组
                btns:[
                    {id: 1,icon:'search', name:'班线查询',router:"/RegularBus"},
                    {id: 2,icon:'directions_bus', name:'公交线路',router:"/Hot"},
                    {id: 3,icon:'swap_calls', name:'乘公交路线',router:"/*"},
                    {id: 4,icon:'directions_run', name:'开发中',router:"/*"},
                    {id: 5,icon:'directions_run', name:'开发中',router:"/Hot"},
                    {id: 6,icon:'directions_run', name:'开发中',router:"/Hot"},
                    {id: 7,icon:'directions_run', name:'开发中',router:"/Hot"},
                    {id: 8,icon:'directions_run', name:'开发中',router:"/Hot"},
                ],
                //百度地图
                baidumap:{
                    center: '河南省南阳市西峡县',
                    zoom: 15,
                    keyword: '',//公交线路结果值
                    keywords: [
                        '西峡1路',
                        '西峡2路',
                        '西峡3路',
                    ], //公交线路数据
                    bmtransit:{
                        start:'',
                        end:'',
                    }
                },
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

            //点击查询
            search(){
                if(this.filterable.start != ''){
                    this.openFullscreen = true;
                    this.axios.get('api/getBusesRouteId/', {
                        params: {
                            buses_start: this.filterable.start,
                            buses_end: this.filterable.end,
                        }
                    })
                        .then((response) => {
                            if (response.data.code == 200) {
                                this.searchbuses = response.data.data;
                                console.log(response.data.data);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }else{
                    this.$toast.message("出发地不能为空");
                }
            },
            //弹出框关闭按钮
            closeFullscreenDialog () {
                this.openFullscreen = false;
            },
        },
        components: {
            MuRow,
            vHeader,Sticky,BaiduMap,BmScale,BmControl,BmNavigation,BmTransit,BmView,BmBus
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
        height: 160px;
    }
    .content {
        margin: 49px 0px 50px 0px;
    }
    .bm-view {
        width: 100%;
        height: 400px;
    }
</style>
