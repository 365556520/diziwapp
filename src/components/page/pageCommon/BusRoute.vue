<template>
    <div>
        <!--页面头-->
        <p-header></p-header>
        <!--页面头end-->
        <div class="content">
            <mu-row  style="padding:8px;">
                <mu-col span="6" >
                        <mu-ripple class="mu-ripple-demo" @click.prevent="cbusshow">公交路线</mu-ripple>
                </mu-col>
                <mu-col span="6" >
                    <mu-ripple class="mu-ripple-demo" @click.prevent="cbustransitshow">乘公交路线规划</mu-ripple>
                </mu-col>
                <mu-divider></mu-divider>
                <mu-row>
                    <mu-col span="9"  v-show="busshow">
                        <mu-select label="公交线路" v-model="baidumap.keyword" full-width>
                            <mu-option v-for="option,index in baidumap.keywords" :key="option" :label="option" :value="option"></mu-option>
                        </mu-select>
                    </mu-col>
                    <mu-col  span="3"  v-show="busshow" style="padding:30px 2px 1px 3px;">
                        <mu-checkbox v-model="baidumap.mapshowbt" uncheck-icon="visibility_off" checked-icon="visibility" label="地图"></mu-checkbox>
                    </mu-col>
                </mu-row>
            </mu-row>
            <mu-row style="padding:8px;">
                <mu-col span="12" >
                    <!--地图-->
                    <baidu-map   ak="LQjsPOAqD3uooTTVrIUePWUm" :center="baidumap.center" :zoom="baidumap.zoom" :scroll-wheel-zoom="true">
                        <div span="12" v-show="bustransitshow">
                            <mu-row>
                                <mu-col span="8">
                                    <bm-auto-complete v-model="baidumap.ipnutbmtransit.start" :sugStyle="{zIndex: 1}">
                                        <mu-text-field  placeholder="起点"   v-model="baidumap.ipnutbmtransit.start"  full-width action-icon="person_pin_circle"></mu-text-field>
                                    </bm-auto-complete><br>
                                    <bm-auto-complete v-model="baidumap.ipnutbmtransit.end" :sugStyle="{zIndex: 1}">
                                        <mu-text-field placeholder="终点"  v-model="baidumap.ipnutbmtransit.end" full-width action-icon="pin_drop"></mu-text-field>
                                    </bm-auto-complete>
                                </mu-col>
                                <mu-col span="4">
                                   <br><br>
                                    <mu-flex class="flex-wrapper" justify-content="center">
                                        <mu-flex class="flex-demo" justify-content="center">
                                            &nbsp;<mu-button style="width: 10px;" color="blue500"   @click.prevent="busSearch"><mu-icon value="search"></mu-icon>查询</mu-button>
                                        </mu-flex>
                                    </mu-flex>
                                </mu-col>
                            </mu-row>
                            <mu-checkbox  v-model="baidumap.mapshow" uncheck-icon="visibility_off" checked-icon="visibility" label="地图" label-left></mu-checkbox>
                        </div>
                        <!--比例尺-->
                        <bm-scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-scale>
                        <!--缩放-->
                        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                        <!--地图视图-->
                        <bm-view class="bm-view" v-show="baidumap.mapshow"> </bm-view>
                        <!--地图中的内容-->
                        <bm-control style="padding: 3px">
                        </bm-control>
                        <!--线路检索-->
                        <bm-bus :keyword="baidumap.keyword" @getbuslistcomplete="bmbusdata" :auto-viewport="true"  :selectFirstResult="true"  location="西峡县"></bm-bus>
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
    import {BmScale,BmNavigation,BmTransit,BmControl,BmView,BmBus,BmAutoComplete,BmGeolocation,BmLocalSearch} from 'vue-baidu-map';
    import MuRow from "muse-ui/es5/Grid/Row"; //百度地图组件
    export default {
        name: 'RegularBus',
        mounted(){ //这个挂在第一次进入页面后运行一次

        },
        data () {
            return {
                //百度地图
                baidumap:{
                    mapshowbt:false,//显示地图开关
                    mapshow:false,//开始不显示地图
                    center: '河南省南阳市西峡县',
                    zoom: 15,
                    keyword: '',//公交线路结果值
                    keywords: [
                        '西峡1路',
                        '西峡2路',
                        '西峡3路',
                        '西峡4路',
                        '西峡5路',
                        '西峡6路',
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

                busshow:true, //公交线路显示
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
            /*定位失败*/
            locationError(data){
                this.$toast.message("定位失败！");
                console.log(data);
            },
            /*定位成功*/
            locationSuccess(data){
                this.$toast.message("定位成功！");
                //把地名添加到输入框里
                this.baidumap.ipnutbmtransit.start =data.addressComponent.province+data.addressComponent.city+data.addressComponent.district+data.addressComponent.street+data.addressComponent.streetNumber;
                console.log(data.addressComponent);
            },
            /*显示线路*/
            cbusshow(){
                //显示线路
                this.busshow = true;
                //查询线路规划
                this.bustransitshow=false;
                //清除乘公交线路
                this.baidumap.bmtransit.start='';
                this.baidumap.bmtransit.end='';
                //关闭地图显示
                this.baidumap.mapshow=false;
            },
            /*乘公交线路*/
            cbustransitshow(){
                //显示线路
                this.busshow = false;
                //查询线路规划
                this.bustransitshow=true;
                //清除公交线路值
                this.baidumap.keyword='';
                //关闭地图显示
                this.baidumap.mapshow=true;
            },
            //公交线路列表查询后回调函数
            bmbusdata(data){
                if(data.keyword){
                    this.baidumap.mapshow=this.baidumap.mapshowbt;
                }
                console.log(data);
            },
        },
        components: {
            pHeader,MuRow,BaiduMap,BmScale,BmControl,BmNavigation,BmTransit,BmView,BmBus,BmAutoComplete,BmGeolocation,BmLocalSearch
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content {
        margin: 49px 2px 50px 2px;
    }
    .bm-view {
        width: 100%;
        height: 350px;
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
