<template>
<div>
    <!--轮播图-->
    <mu-row>
     <mu-col span="12">
      <div class="grid-cell">
        <!-- swiper 轮播-->
        <swiper :options="swiperOption">
         <swiper-slide>Slide 1</swiper-slide>
         <swiper-slide>Slide 2</swiper-slide>
         <swiper-slide>Slide 3</swiper-slide>
         <swiper-slide>Slide 4</swiper-slide>
         <div class="swiper-scrollbar" slot="scrollbar">
         </div>
        </swiper>
        <!-- swiper end-->
      </div>
     </mu-col>
    </mu-row>
    <!--轮播图end-->
    <!--班车查询-->
<br><mu-flex class="flex-wrapper" justify-content="center"><h3>班车查询</h3></mu-flex>
<mu-divider></mu-divider>
 <mu-row class="mymargin chaxun">
   <mu-col span="7" >
       <mu-select label="起点" filterable full-width v-model="filterable.value1" icon="person_pin_circle" >
           <mu-option v-for="city,index in citys" :key="city" :label="city" :value="city"></mu-option>
       </mu-select>
       <br/>
       <mu-select label="终点" filterable full-width v-model="filterable.value12" icon="pin_drop" >
           <mu-option v-for="city,index in citys" :key="city" :label="city" :value="city"></mu-option>
       </mu-select>
   </mu-col>
     <mu-col span="5"><br><br><br>
         <mu-flex class="flex-wrapper" justify-content="center">
             <mu-flex class="flex-demo" justify-content="center" >
                 <mu-button fab large color="blue500">
                     <mu-icon value="search"></mu-icon>
                 </mu-button>
             </mu-flex>
         </mu-flex>
     </mu-col>
 </mu-row>
    <!--班车查询-->
    <mu-divider></mu-divider><br/>
     <mu-row >
             <mu-col span="4" class="demo-paper" >
                 <mu-button color="blue500"   class="btsize">按钮1</mu-button>
             </mu-col>
             <mu-col span="4"  class="demo-paper">
                     <mu-button color="blue500"  class="btsize">按钮1</mu-button>
             </mu-col>
             <mu-col span="4"  class="demo-paper">
                     <mu-button color="blue500"  class="btsize">按钮1</mu-button>
             </mu-col>
             <mu-col span="4" class="demo-paper" >
                 <mu-button color="blue500"  class="btsize">按钮1</mu-button>
             </mu-col>
             <mu-col span="4"  class="demo-paper">
                 <mu-button color="blue500"  class="btsize">按钮1</mu-button>
             </mu-col>
             <mu-col span="4"  class="demo-paper">
                 <mu-button color="blue500"  class="btsize">按钮1</mu-button>
             </mu-col>
     </mu-row>
</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
        citys: [
            '西峡', '南阳', '中国', 'Arizona',
        ],
        filterable: {
            value1: '',
            value2: '',
        },
        swiperOption: {
            spaceBetween: 30,
            effect: 'fade', //渐变效果
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: true
            },
            autoplay: {//自动轮播
                delay: 2500,
                disableOnInteraction: false
            },
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btsize{
        width: 100%;
        height: 120px;
    }
    .swiper-slide {
        width: 100%;
        height: 220px;
    }
    .demo-paper{
        padding :2px;
        width: 100%;
    }
    .chaxun{
        padding :5px;
    }
    .mymargin{
        margin:2px 2px 0px 0px;
    }
</style>
