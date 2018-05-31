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
<br><mu-flex class="flex-wrapper" justify-content="center"><h3>班车查询</h3></mu-flex>
<mu-divider></mu-divider>
 <mu-row class="mymargin chaxun">
   <mu-col span="12" >
       <mu-text-field label="起始" label-float ></mu-text-field><br/>
       <mu-text-field label="终点" label-float ></mu-text-field>
        &nbsp; &nbsp; &nbsp;<mu-button color="purple" large>查询</mu-button>
   </mu-col>
 </mu-row>
    <mu-divider></mu-divider><br/>
     <mu-row >
             <mu-col span="4" class="demo-paper" >
                 <mu-button color="purple"   class="btsize">ssss </mu-button>
             </mu-col>
             <mu-col span="4"  class="demo-paper">
                     <mu-button color="purple"  class="btsize">Success</mu-button>
             </mu-col>
             <mu-col span="4"  class="demo-paper">
                     <mu-button color="purple"  class="btsize">Success</mu-button>
             </mu-col>
             <mu-col span="4" class="demo-paper" >
                 <mu-button color="purple"  class="btsize">Success</mu-button>
             </mu-col>
             <mu-col span="4"  class="demo-paper">
                 <mu-button color="purple"  class="btsize">Success</mu-button>
             </mu-col>
             <mu-col span="4"  class="demo-paper">
                 <mu-button color="purple"  class="btsize">Success</mu-button>
             </mu-col>
     </mu-row>
</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
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
