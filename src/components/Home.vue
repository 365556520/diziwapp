<template>
<div>
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

 <mu-row>
   <mu-col span="6"><div class="grid-cell">1</div></mu-col>
   <mu-col span="6"><div class="grid-cell">2</div></mu-col>
 </mu-row>
 <mu-row>
  <mu-col span="6"><div class="grid-cell">3</div></mu-col>
  <mu-col span="6"><div class="grid-cell">4</div></mu-col>
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
 .swiper-slide {
  width: 100%;
  height: 200px;
 }
</style>
