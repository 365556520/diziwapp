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
                <mu-select color="red500" label="起点" filterable full-width v-model="filterable.value1" icon="person_pin_circle" chips >
                    <mu-option v-for="city,index in citys" :key="city" :label="city" :value="city"></mu-option>
                </mu-select>
                <br/>
                <mu-select color="red500" label="终点" filterable full-width v-model="filterable.value12" icon="pin_drop" chips >
                    <mu-option v-for="city,index in citys" :key="city" :label="city" :value="city"></mu-option>
                </mu-select>
            </mu-col>
            <mu-col span="5"><br><br><br>
                <mu-flex class="flex-wrapper" justify-content="center">
                    <mu-flex class="flex-demo" justify-content="center">
                        <mu-button fab large color="red500">
                            <mu-icon value="search"></mu-icon>
                        </mu-button>
                    </mu-flex>
                </mu-flex>
            </mu-col>
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
        data () {
            return {
                //轮播图
                slides: [
                    {id: 1, preview: "static/images/1.jpg"},
                    {id: 2, preview: "static/images/2.jpg"},
                    {id: 3, preview: "static/images/3.jpg"},
                    {id: 4, preview: "static/images/4.jpg"},
                ],
                citys: [
                    '西峡', '南阳', '中国', 'Arizona', 'Arizona2', 'Arizona3', 'Arizona4',
                ],
                filterable: {
                    value1: '',
                    value2: '',
                },
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
                }
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
