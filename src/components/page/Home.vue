<template>
    <div>
        <!--顶部-->
        <Sticky><v-header></v-header></Sticky><!--顶部end-->
        <div class="content">
            <div class="weatherbody" v-for="v in userbaidumap.results">
                <div class="weathercontent">
                    <div></div>
                    <mu-row>
                        <mu-col span="5">
                            <div class="minfont thick" v-text="v.weather_data[0].date"></div>
                            <mu-row>
                                <mu-col span="7">
                                    <div class="minfont">今天</div>
                                    <div class="minfont" v-text="v.weather_data[0].temperature"></div>
                                </mu-col>
                                <mu-col span="5">
                                    <div class="minfont">
                                        <img v-show="weatherForecast.isday" :src="v.weather_data[0].dayPictureUrl">
                                        <img v-show="weatherForecast.isevenimg"
                                             :src="v.weather_data[0].nightPictureUrl">
                                        <div class="minfont" v-text="v.weather_data[0].weather"></div>
                                    </div>
                                </mu-col>
                            </mu-row>
                            <div class="minfont" v-text="v.weather_data[0].wind"></div>
                            <div class="minfont" v-text="'空气质量指数:'+v.pm25"></div>
                        </mu-col>
                        <mu-col span="7">
                            <mu-row>
                                <mu-col span="4" v-for="(wd,key) in v.weather_data" :key="key" v-show="key!==0">
                                    <mu-ripple class="weather">
                                        <div class="minfont thick" v-text="wd.date"></div>
                                        <div class="minfont"><img :src="wd.dayPictureUrl"></div>
                                        <div class="minfont" v-text="wd.weather"></div>
                                        <div class="minfont" v-text="wd.temperature"></div>
                                        <div class="minfont" v-text="wd.wind"></div>
                                    </mu-ripple>
                                </mu-col>
                            </mu-row>
                        </mu-col>
                    </mu-row>
                </div>
            </div>
            <br>
            <!--导航区域-->
            <mu-row>
                <mu-col span="6" v-for="v in btns" :key="v.id">
                    <mu-button :color="v.btcolor" class="block" :to="v.router">
                        <mu-icon size="40" :value="v.icon"></mu-icon>
                        {{v.name}}
                    </mu-button>
                </mu-col>
            </mu-row>
            <br>
            <!--导航区域end-->
            <mu-divider></mu-divider>
            <!--轮播图-->
            <mu-row>
                <mu-col span="12">
                    <div class="grid-cell">
                        <!-- swiper 轮播-->
                        <swiper :options="swiperOption">
                            <swiper-slide v-for="v in slides" :key="v.id"
                                          :style="{'background':'url('+v.preview+')','background-repeat':'no-repeat','background-size':'cover' }"
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
            <!--热门文章-->
            <!--热门文章end-->
        </div>
    </div>
</template>
<script>
    import vHeader from '../common/Header.vue';  //顶部导航组件
    import Sticky from 'vue-sticky-position'; //vue-sticky-position粘性定位和固定顶部导航
    import {mapState} from 'vuex'; //mapState数据计算简化模式mapMutations方法的简化模式写法如下
    export default {
        name: 'Home',
        mounted(){ //这个挂在第一次进入页面后运行一次
            this.getMycount();
        },
        data () {
            return {
                //按钮组
                btns: [
                    {id: 1, icon: 'search', btcolor: 'primary', name: '班线查询', router: "/RegularBus"},
                    {id: 2, icon: 'directions_bus', btcolor: 'secondary', name: '公交线路', router: "/BusRoute"},
                    {id: 3, icon: 'directions_run', btcolor: 'success', name: '开发中', router: "/*"},
                    {id: 4, icon: 'directions_run', btcolor: 'warning', name: '开发中', router: "/*"},
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
                //天气预报信息
                weatherForecast: {
                    isday: false, //白天
                    isevenimg: false, //晚上
                },
            }
        },
        computed: {//数据计算
            ...mapState(['userbaidumap']),
        },
        methods: {
            // 白天和晚上
            getMycount: function () {
                let date = new Date();
                var year = date.getFullYear(); //年
                var month = date.getMonth()+1; //月
                var isdate = date.getDate(); //日
                if (date.getHours() < 18) {
                    this.weatherForecast.isday = true; //开启白天图片
                    console.log('白天');
                } else {
                    this.weatherForecast.isevenimg = true;//开启晚上图片
                    console.log('晚上好');
                }
            }
        },
        components: {
            vHeader, Sticky
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .swiper-zoom-container {
        max-width: 100%;
        width: 100%;
        height: 150px;
    }

    .content {
        margin: 47px 0px 50px 0px;
    }

    .weather {
        width: 100%;
        height: 100%;
        margin-right: 16px;
        border-left-style: solid;
        border-width: 1px;
        border-color: #ffffff;
    }

    .weatherbody {
        background-color: #2196f3;
        background: -webkit-linear-gradient(#2196f3, #ffffff); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#2196f3, #ffffff); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#2196f3, #ffffff); /* Firefox 3.6 - 15 */
        background: linear-gradient(#2196f3, #ffffff); /* 标准的语法 */
    }

    .weathercontent {
        padding: 8px 2px 2px 2px;
    }

    .minfont {
        font-size: 70%;
        text-align: center;
        margin: 0 auto;
        padding-top: 4px;
    }

    .thick {
        font-weight: bold
    }

    .block {
        width: 90%;
        height: 100px;
        margin: 8px;
    }
</style>
