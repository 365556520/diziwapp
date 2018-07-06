<template>
    <div>
        <!--轮播图-->
        <mu-row>
            <mu-col span="12">
                <div class="grid-cell">
                    <!-- swiper 轮播-->
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="v in slides" :key="v.id">
                            <!--图片放在div中这样能自适应-->
                            <div :style="{'background':'url('+v.preview+')','background-repeat':'no-repeat','background-size':'cover' }"
                                 class="swiper-zoom-container">
                            </div>
                        </swiper-slide>
                        <div class="swiper-scrollbar" slot="scrollbar">
                        </div>
                    </swiper>
                    <!-- swiper end-->
                </div>
            </mu-col>
        </mu-row>
        <!--轮播图end-->
        <!--班车查询-->
        <mu-flex class="flex-wrapper" justify-content="center"><h2>班车查询</h2></mu-flex>
        <mu-divider></mu-divider>
        <mu-row class="mymargin chaxun">
            <mu-col span="7">
                <mu-select color="red500" label="起点" filterable full-width v-model="filterable.start"
                           icon="person_pin_circle" chips>
                    <mu-option v-for="city,index in buses_start" :key="city" :label="city" :value="city"></mu-option>
                </mu-select>
                <br/>
                <mu-select color="red500" label="终点" filterable full-width v-model="filterable.end" icon="pin_drop"
                           chips>
                    <mu-option v-for="city,index in buses_end" :key="city" :label="city" :value="city"></mu-option>
                </mu-select>
            </mu-col>
            <!--查询按钮-->
            <mu-col span="5"><br><br><br>
                <mu-flex class="flex-wrapper" justify-content="center">
                    <mu-flex class="flex-demo" justify-content="center">
                        <mu-button fab large color="red500" @click.prevent="search()">
                            <mu-icon value="search"></mu-icon>
                        </mu-button>
                    </mu-flex>
                </mu-flex>
            </mu-col>
            <!--查询按钮end-->
            <!--弹出框-->
            <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
                <mu-appbar color="red500" :title="filterable.start + '→' + filterable.end">
                    <mu-button slot="left" icon @click="closeFullscreenDialog">
                        <mu-icon value="close"></mu-icon>
                    </mu-button>
                </mu-appbar>
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
                        <mu-divider color="red500"></mu-divider>
                    </mu-expansion-panel>
                </div>
            </mu-dialog>
            <!--弹出框end-->
        </mu-row>
        <!--班车查询-->
        <mu-divider></mu-divider>
        <br/>
        <mu-row>
            <mu-col span="4" class="demo-paper">
                <mu-button color="red500" class="btsize">按钮1</mu-button>
            </mu-col>
            <mu-col span="4" class="demo-paper">
                <mu-button color="red500" class="btsize">按钮1</mu-button>
            </mu-col>
            <mu-col span="4" class="demo-paper">
                <mu-button color="red500" class="btsize">按钮1</mu-button>
            </mu-col>
            <mu-col span="4" class="demo-paper">
                <mu-button color="red500" class="btsize">按钮1</mu-button>
            </mu-col>
            <mu-col span="4" class="demo-paper">
                <mu-button color="red500" class="btsize">按钮1</mu-button>
            </mu-col>
            <mu-col span="4" class="demo-paper">
                <mu-button color="red500" class="btsize">按钮1</mu-button>
            </mu-col>
        </mu-row>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        mounted(){ //这个挂在第一次进入页面后运行一次
            this.axios.get('api/getBusesRouteall').then((response) => {
                this.buses_start = response.data.data.buses_start;
                this.buses_midway = response.data.data.buses_midway;
                this.buses_end = response.data.data.buses_end;
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
                //始点
                buses_start: [],
                //途经
                buses_midway: [],
                //终点
                buses_end: [],
                //绑定输入框值
                filterable: {
                    start: '西峡',
                    end: '',
                },
                searchbuses: ['asdas'],
                //查询按钮弹出页面开关
                openFullscreen: false,
            }
        },
        methods: {
            //点击查询
            search(){
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
            },
            //弹出框关闭按钮
            closeFullscreenDialog () {
                this.openFullscreen = false;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btsize {
        width: 100%;
        height: 120px;
    }
    .swiper-slide {
        background-position: center;
        background-size: cover;
        height: 220px;
        width: 60%;
    }
    .swiper-slide:nth-child(2n) {
        width: 40%;
    }
    .swiper-slide:nth-child(3n) {
        width: 20%;
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
</style>
