<template>
    <div>
        <!--页面头-->
        <p-header></p-header>
        <!--页面头end-->
        <div class="content">
            <mu-row  style="padding:8px;">
                <mu-col span="12" >
                    <mu-select label="公交线路" v-model="baidumap.keyword" full-width>
                        <mu-option v-for="option,index in baidumap.keywords" :key="option" :label="option" :value="option"></mu-option>
                    </mu-select>
                </mu-col>
                <mu-col span="12">
                    <mu-row>
                        <mu-col span="5">
                                <mu-text-field  placeholder="起点"  v-model="baidumap.ipnutbmtransit.start"  full-width action-icon="person_pin_circle"></mu-text-field>
                        </mu-col>
                        <mu-col span="2"></mu-col>
                        <mu-col span="5"> <mu-text-field  placeholder="终点" v-model="baidumap.ipnutbmtransit.end" full-width action-icon="pin_drop"></mu-text-field></mu-col>
                        <mu-col span="12">
                            <mu-flex class="flex-wrapper" justify-content="center">
                                <mu-flex class="flex-demo" justify-content="center">
                                    <mu-button large color="blue500" @click.prevent="busSearch">
                                        <mu-icon value="search"></mu-icon>乘坐公交车线路规划
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
                        <bm-view class="bm-view" > </bm-view>
                        <!--地图中的内容-->
                        <bm-control style="padding: 3px">
                            <bm-auto-complete v-model="baidumap.ipnutbmtransit.keyword" :sugStyle="{zIndex: 1}">
                                <mu-text-field  placeholder="起点"  v-model="baidumap.ipnutbmtransit.start"  full-width action-icon="person_pin_circle"></mu-text-field>
                            </bm-auto-complete>
                        </bm-control>
                        <!--区域查找-->
                        <bm-local-search :keyword="baidumap.ipnutbmtransit.keyword" :auto-viewport="true" ></bm-local-search>
                        <!--线路检索-->
                        <bm-bus :keyword="baidumap.keyword" :auto-viewport="true" :selectFirstResult="true"  location="西峡县"></bm-bus>
                        <!--乘线路规划-->
                        <bm-transit :start="baidumap.bmtransit.start" :end="baidumap.bmtransit.end" :auto-viewport="true" location="西峡县"></bm-transit>
                    </baidu-map>
                </mu-col>
            </mu-row>
        </div>
    </div>
</template>
<script>
    import pHeader from '../../common/PageHeader.vue';  //分页顶部导航组件
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'; //百度地图
    import {BmScale,BmNavigation,BmTransit,BmControl,BmView,BmBus,BmAutoComplete,BmLocalSearch} from 'vue-baidu-map';
    import MuRow from "muse-ui/es5/Grid/Row"; //百度地图组件
    export default {
        name: 'RegularBus',
        mounted(){ //这个挂在第一次进入页面后运行一次

        },
        data () {
            return {
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
                    //地图绑定的起始点和结束点
                    bmtransit:{
                        start:'',
                        end:'',
                    },
                    //输入框绑定起始点和结束点
                    ipnutbmtransit:{
                        start:'',
                        end:'',
                        keyword:'',
                    },
                },
            }
        },
        computed: {
        },
        methods: {
            //提交起始点和结束点
            busSearch(){
                this.baidumap.bmtransit.start = this.baidumap.ipnutbmtransit.start;
                this.baidumap.bmtransit.end = this.baidumap.ipnutbmtransit.end;
            }
        },
        components: {
            pHeader,MuRow,BaiduMap,BmScale,BmControl,BmNavigation,BmTransit,BmView,BmBus,BmAutoComplete,BmLocalSearch
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
</style>
