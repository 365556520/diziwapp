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
                    <mu-tab>班车时刻表查询</mu-tab>
                    <mu-tab>公交查询</mu-tab>
                </mu-tabs>
                <div class="demo-text" v-if="active === 0">
                    <mu-row class="mymargin chaxun">
                        <mu-col span="10">
                            <mu-auto-complete :data="buses_route_name" label="起点"  v-model="filterable.start" icon="person_pin_circle"></mu-auto-complete>
                        </mu-col>
                        <mu-col span="10">
                            <mu-auto-complete :data="buses_route_name" label="终点" v-model="filterable.end" icon="pin_drop"></mu-auto-complete>
                        </mu-col>
                        <!--查询按钮-->
                        <mu-col span="12">
                            <mu-flex class="flex-wrapper" justify-content="center">
                                <mu-flex class="flex-demo" justify-content="center">
                                    <mu-button large color="blue500" @click.prevent="search()">
                                        <mu-icon value="search"></mu-icon>班车时刻查询
                                    </mu-button>
                                </mu-flex>
                            </mu-flex>
                        </mu-col>
                        <!--查询按钮end-->
                        <!--弹出框-->
                        <mu-dialog width="100%" :padding='dialogpidding' transition="scale" scrollable fullscreen :open.sync="openFullscreen">
                            <Sticky top="0px" z-ndex="0"><!--//固定顶部-->
                                <mu-appbar color="blue500" :title="filterable.start + '→' + filterable.end">
                                    <mu-button slot="left" icon @click="closeFullscreenDialog">
                                        <mu-icon size="39" value="keyboard_arrow_left"></mu-icon>
                                    </mu-button>
                                </mu-appbar>
                            </Sticky>
                            <div style="padding: 24px;">
                                <mu-expansion-panel v-for="v in searchbuses" :key="v.id" :expand="true">
                                    <div slot="header"><h3>班线 : {{v.buses_start}}—{{v.buses_midway}}—{{v.buses_end}}</h3></div>
                                    <div slot="default" v-for="value in v.get_buses" :key="value.id">
                                        <mu-divider></mu-divider>
                                        <H4>车号:{{value.buses_name}}</H4>
                                        <span>
                                    发车时间:{{value.buses_start_date}}<br>
                                    返回时间:{{value.buses_end_date}}<br>
                                    联系电话:{{value.buses_phone}}
                                </span>
                                    </div>
                                    <br>
                                    <mu-divider color="blue500"></mu-divider>
                                </mu-expansion-panel>
                            </div>
                        </mu-dialog>
                        <!--弹出框end-->
                    </mu-row>
                </div>
                <div class="demo-text" v-if="active === 1">
                    <p>公交线路</p>
                </div>
                <mu-divider></mu-divider>
                <br/>
            </mu-row>
            <mu-row>
                <mu-col span="4" class="demo-paper">
                    <mu-button color="blue500" class="btsize">按钮1</mu-button>
                </mu-col>
                <mu-col span="4" class="demo-paper">
                    <mu-button color="blue500" class="btsize">按钮1</mu-button>
                </mu-col>
                <mu-col span="4" class="demo-paper">
                    <mu-button color="blue500" class="btsize">按钮1</mu-button>
                </mu-col>
                <mu-col span="4" class="demo-paper">
                    <mu-button color="blue500" class="btsize">按钮1</mu-button>
                </mu-col>
                <mu-col span="4" class="demo-paper">
                    <mu-button color="blue500" class="btsize">按钮1</mu-button>
                </mu-col>
                <mu-col span="4" class="demo-paper">
                    <mu-button color="blue500" class="btsize">按钮1</mu-button>
                </mu-col>
            </mu-row>
        </div>
    </div>
</template>

<script>
    import vHeader from '../common/Header.vue';  //顶部导航组件
    import Sticky from 'vue-sticky-position' //vue-sticky-position粘性定位和固定顶部导航
    export default {
        name: 'Home',
        mounted(){ //这个挂在第一次进入页面后运行一次
            this.axios.get('api/getBusesRouteall').then((response) => {
                this.buses_start = response.data.data.buses_start;
                this.buses_midway = response.data.data.buses_midway;
                this.buses_end = response.data.data.buses_end;
                var name = response.data.data.buses_route_name;
                //转换为数组
                for (let i in name) {
                    this.buses_route_name.push(name[i]); //属性
                }
                console.log(this.buses_route_name);
            })
        },
        data () {
            return {
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
                //始点
                buses_start: [],
                //途经
                buses_midway: [],
                //终点
                buses_end: [],
                //地名名字
                buses_route_name: [],
                //绑定输入框值
                filterable: {
                    start: '',
                    end: '',
                },
                searchbuses: ['asdas'],
                //查询按钮弹出页面开关
                openFullscreen: false,
                //弹出框pidding
                dialogpidding:5,
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
            }
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
        height: 120px;
    }
    .demo-paper {
        padding: 2px;
        width: 100%;
    }
    .chaxun {
        padding: 5px;
    }

    .mymargin {
        margin: 2px 2px 0px 0px;
    }

    .swiper-zoom-container {
        max-width: 100%;
        width: 100%;
        height: 200px;
    }
    .content {
        margin: 49px 0px 50px 0px;
    }
</style>
