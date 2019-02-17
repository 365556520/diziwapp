<template>
    <div>
        <!--页面头-->
        <p-header></p-header>
        <!--页面头end-->
        <div class="content">
            <mu-row  style="padding:8px;">
                <mu-col span="6" >
                        <mu-ripple class="mu-ripple-demo" @click.prevent="cbusshow">线路查询</mu-ripple>
                </mu-col>
                <mu-col span="6" >
                    <mu-ripple class="mu-ripple-demo" @click.prevent="cbustransitshow">乘公交</mu-ripple>
                </mu-col>
                <mu-divider></mu-divider>
                <mu-col span="12"  v-show="busshow">
                    <mu-select label="公交线路" v-model="baidumap.keyword" full-width>
                        <mu-option v-for="option,index in baidumap.keywords" :key="option" :label="option" :value="option"></mu-option>
                    </mu-select>
                </mu-col>
                <mu-col span="12" v-show="bustransitshow">
                    <mu-row>
                        <mu-col span="5">
                                <mu-text-field  label="起点"  label-float  v-model="baidumap.ipnutbmtransit.start"  full-width action-icon="person_pin_circle"></mu-text-field>
                        </mu-col>
                        <mu-col span="2"></mu-col>
                        <mu-col span="5"> <mu-text-field label="终点"  label-float v-model="baidumap.ipnutbmtransit.end" full-width action-icon="pin_drop"></mu-text-field></mu-col>
                        <mu-col span="12">
                            <mu-flex class="flex-wrapper" justify-content="center">
                                <mu-flex class="flex-demo" justify-content="center">
                                    <mu-button large color="blue500" @click.prevent="busSearch">
                                        <mu-icon value="search"></mu-icon>查询
                                    </mu-button>
                                </mu-flex>
                            </mu-flex>
                        </mu-col>
                    </mu-row>
                </mu-col>
            </mu-row>
            <mu-row style="padding:2px;">
                <mu-col span="12" >
                    <!--地图-->
                    <baidu-map   ak="LQjsPOAqD3uooTTVrIUePWUm" :center="baidumap.center" :zoom="baidumap.zoom" :scroll-wheel-zoom="true">
                        <!--比例尺-->
                        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
                        <!--缩放-->
                        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

                        <bm-view class="bm-view" v-show="mapshow"> </bm-view>
                        <!--地图中的内容-->
                        <bm-control style="padding: 3px">
                        </bm-control>
                        <!--线路检索-->
                        <bm-bus :keyword="baidumap.keyword" :auto-viewport="true" :selectFirstResult="true"  location="西峡县"></bm-bus>
                        <!--乘线路规划-->
                        <bm-transit :start="baidumap.bmtransit.start" :end="baidumap.bmtransit.end"  :auto-viewport="true" location="西峡县"></bm-transit>
                        <!--定位-->
                        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" @locationSuccess="locationSuccess" @locationError="locationError" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
                    </baidu-map>
                </mu-col>
            </mu-row>
        </div>
    </div>
</template>
<script>
    import pHeader from '../../common/PageHeader.vue';  //分页顶部导航组件
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'; //百度地图
    import {BmScale,BmNavigation,BmTransit,BmControl,BmView,BmBus,BmAutoComplete,BmGeolocation} from 'vue-baidu-map';
    import MuRow from "muse-ui/es5/Grid/Row"; //百度地图组件
    export default {
        name: 'RegularBus',
        mounted(){ //这个挂在第一次进入页面后运行一次

        },
        data () {
            return {
                //百度地图
                baidumap:{
                    mapshow:false,//开始不显示地图
                    center: '河南省南阳市西峡县',
                    zoom: 15,
                    keyword: '',//公交线路结果值
                    keywords: [
                        '西峡1路',
                        '西峡2路',
                        '西峡3路',
                    ], //公交线路数据
                    //地图绑定的起始点和结束点
                    bmtransit:{
                        start:'',
                        end:'',
                    },
                    //输入框绑定起始点和结束点
                    ipnutbmtransit:{
                        start:'',
                        end:'',
                    },
                },

                busshow:false, //公交线路显示
                bustransitshow:false, //规划乘公交线路显示
            }
        },
        computed: {
        },
        methods: {
            //提交起始点和结束点
            busSearch(){
                this.baidumap.bmtransit.start = this.baidumap.ipnutbmtransit.start;
                this.baidumap.bmtransit.end = this.baidumap.ipnutbmtransit.end;
            },
            /*定位成功*/
            locationError(e){
                console.log(e);
            },
            /*定位失败*/
            locationSuccess(e){
                console.log(e);
            },
            /*显示线路*/
            cbusshow(){
                this.busshow = true;
                this.bustransitshow=false;
                //清除乘公交线路
                this.baidumap.bmtransit.start='';
                this.baidumap.bmtransit.end='';
            },
            /*乘公交线路*/
            cbustransitshow(){
                this.busshow = false;
                this.bustransitshow=true;
                //清除公交线路值
                this.baidumap.keyword='';
            }

        },
        components: {
            pHeader,MuRow,BaiduMap,BmScale,BmControl,BmNavigation,BmTransit,BmView,BmBus,BmAutoComplete,BmGeolocation
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content {
        margin: 49px 2px 50px 2px;
    }
    .bm-view {
        width: 100%;
        height: 400px;
    }
    .mu-ripple-demo {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;
        background-color: #fff;
        border-radius: 4px;
        color: #2196f3;
    }
</style>
