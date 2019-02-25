<template>
    <div>
        <!--顶部-->
        <v-header></v-header><!--顶部end-->
        <div class="content">
            <div class="weatherbody" v-for="v in weatherForecast.results">
                <h2 v-text="v.currentCity"></h2>
                <mu-row>
                    <mu-col span="6">
                        <h5 v-text="v.weather_data[0].date"></h5>
                        <img v-show="weatherForecast.isday" :src="v.weather_data[0].dayPictureUrl">
                        <img v-show="weatherForecast.isevenimg" :src="v.weather_data[0].nightPictureUrl">
                        <h5 v-text="v.weather_data[0].temperature"></h5>
                        <h5 v-text="v.weather_data[0].weather"></h5>
                        <h5 v-text="v.weather_data[0].wind"></h5>
                        空气:<span v-text="v.pm25"></span>
                    </mu-col>
                    <mu-col span="2" v-for="(wd,key) in v.weather_data" :key="key" v-show="key!==0">
                        <mu-ripple class="weather">
                            <h5 v-text="wd.date"></h5>
                            <img :src="wd.dayPictureUrl">
                            <h5 v-text="wd.temperature"></h5>
                            <h5 v-text="wd.weather"></h5>
                            <span style="font-size:70%;" v-text="wd.wind"></span>
                        </mu-ripple>
                    </mu-col>
                </mu-row>
            </div><br>
            <!--导航区域-->
            <mu-row>
                <mu-col span="3"  v-for="v in btns" :key="v.id">
                    <div  :z-depth="1">
                        <router-link :to="v.router">
                            <mu-ripple>
                                <mu-flex justify-content="center" align-items="center">
                                    <mu-icon size="36" :value="v.icon" color="blue500"></mu-icon>
                                    <br>
                                </mu-flex>
                                <mu-flex justify-content="center" align-items="center">
                                    <Caption>{{v.name}}</Caption>
                                </mu-flex>
                            </mu-ripple>
                        </router-link>
                    </div>
                </mu-col>
            </mu-row> <br>
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
            this.getWeatherForecast();
            this.getMycount();
        },
        data () {
            return {
                //按钮组
                btns: [
                    {id: 1, icon: 'search', name: '班线查询', router: "/RegularBus"},
                    {id: 2, icon: 'directions_bus', name: '公交线路', router: "/BusRoute"},
                    {id: 3, icon: 'directions_run', name: '开发中', router: "/*"},
                    {id: 4, icon: 'directions_run', name: '开发中', router: "/*"},
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
                    location: '',//位置
                    date: '', //时间
                    results: '', //获得的信息
                    isday:false, //白天
                    isevenimg:false, //晚上
                },
            }
        },
        computed: {//数据计算
            ...mapState(['userbaidumap']),
        },
        methods: {
            //弹出框关闭按钮
            closeFullscreenDialog () {
                this.openFullscreen = false;
            },
            //获天气预报
            getWeatherForecast(){
                this.weatherForecast.location = this.userbaidumap.centername; //把从vuex的值赋给本地
                var isurl = "http://api.map.baidu.com/telematics/v3/weather?location=" + this.weatherForecast.location + "&output=json&ak=" + this.userbaidumap.ak;
                var _this = this;
                /*设置一个临时变量指向vue实例，因为在回调里使用this，指向的不是vue实例*/
                $.ajax({
                    type: "get",
                    url: isurl,
                    dataType: "jsonp",
                    jsonp: "callback",//传递给请求服务器处理程序或页面的，用以获得JSONP回调函数名
                    success: function (response) {
                        if (response.status === "success") {
                            _this.weatherForecast.date = response.date;//获取时间
                            _this.weatherForecast.results = response.results;//获取信息
                        }
                        console.log(response.results);
                    },
                    error: function (data) {
                        console.log('接收失败' + data);
                    }
                });
            },
            // 白天和晚上
            getMycount:function() {
                let self = this;
                let date = new Date();
                if (date.getHours() < 18) {
                    self.weatherForecast.isday=true; //开启白天图片
                    console.log('白天');
                } else {
                    self.weatherForecast.isevenimg =true;//开启晚上图片
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
        height: 200px;
    }

    .content {
        margin: 47px 0px 50px 0px;
    }
    .weather {
        width: 100%;
        height: 100%;
        margin-right: 16px;
        border-radius: 4px;
        border-left-style: solid;
        border-width: 1px;
        border-color: #ffffff;
    }
    .weatherbody{
        background-color: #2196f3;
        background: -webkit-linear-gradient(#2196f3, #ffffff); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#2196f3, #ffffff); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#2196f3, #ffffff); /* Firefox 3.6 - 15 */
        background: linear-gradient(#2196f3, #ffffff); /* 标准的语法 */
    }
</style>
