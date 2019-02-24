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

            <div v-for="v in weatherForecast">
                <h3 v-text="v.currentCity"></h3>
                <h3 v-text="v.pm25"></h3>
                <div v-for="vi in v.index">
                    <h5 v-text="vi.des"></h5>
                    <h5 v-text="vi.tipt"></h5>
                    <h5 v-text="vi.title"></h5>
                    <h5 v-text="vi.zs"></h5>
                </div>
                <div v-for="wd in v.weather_data">
                    <h5 v-text="wd.date"></h5>
                    <h5 v-text="wd.temperature"></h5>
                    <h5 v-text="wd.weather"></h5>
                    <h5 v-text="wd.wind"></h5>
                    <img :src="wd.dayPictureUrl">
                    <img :src="wd.nightPictureUrl">
                </div>
            </div>
            <mu-divider></mu-divider>
            <!--导航区域-->
            <mu-row>
                <mu-col span="3" class="demo-paper" v-for="v in btns" :key="v.id">
                    <div class="btsize" :z-depth="1">
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
                    </div>
                </mu-col>
            </mu-row>
            <!--导航区域end-->
            <mu-divider></mu-divider>
            <!--用百度地图定位获取位置-->
            <baidu-map   :ak="userbaidumap.ak" :center="baidumap.center" :zoom="baidumap.zoom" @ready="handler" :scroll-wheel-zoom="true"></baidu-map>
            <!--用百度地图定位获取位置end-->
        </div>
    </div>
</template>
<script>
    import vHeader from '../common/Header.vue';  //顶部导航组件
    import Sticky from 'vue-sticky-position'; //vue-sticky-position粘性定位和固定顶部导航
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'; //百度地图
    import {mapState,mapMutations} from 'vuex'; //mapState数据计算简化模式mapMutations方法的简化模式写法如下
    export default {
        name: 'Home',
        mounted(){ //这个挂在第一次进入页面后运行一次
        },
        data () {
            return {
                //百度地图
                baidumap:{
                    center: '河南省南阳市西峡县',
                    zoom: 11,
                },
                //按钮组
                btns:[
                    {id: 1,icon:'search', name:'班线查询',router:"/RegularBus"},
                    {id: 2,icon:'directions_bus', name:'公交线路',router:"/BusRoute"},
                    {id: 3,icon:'directions_run', name:'开发中',router:"/*"},
                    {id: 4,icon:'directions_run', name:'开发中',router:"/*"},
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
                weatherForecast:'',
            }
        },
        computed:{//数据计算
            ...mapState(['userbaidumap']),
        },
        methods: {
            ...mapMutations([
                'setMapCenter','setMapCenterName' //加载vuex中的方法
            ]),
            //弹出框关闭按钮
            closeFullscreenDialog () {
                this.openFullscreen = false;
            },
            handler ({BMap, map}) {
                let _this = this;   // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (data) {
                    //注意:调用mutaions中回调函数, 只能使用store.commit(type, payload)
                    _this.$store.commit('setMapCenter', {lng: data.longitude, lat: data.latitude});//设置经纬
                    //地方
                    var province = data.address.province?data.address.province:'';
                    var city = data.address.city?data.address.city:'';
                    var district = data.address.district?data.address.district:'';
                    var street = data.address.street?data.address.street:'';
                    var streetNumber = data.address.streetNumber?data.address.streetNumber:'';
                    var name = province+city+district+street+streetNumber;
                    _this.$store.commit('setMapCenterName',name);//设置定位后的名字
                    _this.baidumap.center=_this.userbaidumap.centername;
                    console.log(_this.baidumap.center);
                    //获天气预报
/*                    _this.axios.get('http://api.map.baidu.com/telematics/v3/weather',{
                        params: {
                            location: _this.baidumap.center,
                            output:'json',
                            ak:_this.userbaidumap.ak,
                        }
                    }).then((response) => {
                        if(response.status===200){
                            _this.weatherForecast = response.data.results;
                        }
                        console.log(response.data.results);
                        console.log(_this.baidumap.center);
                    }).catch((error) =>{
                        alert(error);
                    });*/
                    var isurl = "http://api.map.baidu.com/telematics/v3/weather?location=" + _this.baidumap.center + "&output:json&ak="+_this.userbaidumap.ak;
                    $.getJSON(isurl,
                        function (data) {
                            console.log(data)
                     });

                 /*   $.ajax({
                        type:"get",
                        url :isurl,
                        dataType:"jsonp",
                        jsonp:"callback",//传递给请求服务器处理程序或页面的，用以获得JSONP回调函数名
                        success:function(data){
                            alert(data);
                        },
                        error:function(data){
                            alert(data);
                        }
                    });*/

                }, {enableHighAccuracy: true})
            },
        },
        components: {
            vHeader,Sticky,BaiduMap
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
