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
   <mu-col span="12">
       <mu-select label="Filerable Select" filterable v-model="filterable.value1" full-width>
           <mu-option v-for="city,index in citys" :key="city" :label="city" :value="city"></mu-option>
       </mu-select>
   </mu-col>
 </mu-row>
    <mu-divider></mu-divider>
 <mu-row>
     <mu-col span="6"><mu-paper class="demo-paper" :z-depth="5">1</mu-paper></mu-col>
     <mu-col span="6"><mu-paper class="demo-paper" :z-depth="5">2</mu-paper></mu-col>
     <mu-col span="6"><mu-paper class="demo-paper" :z-depth="5">3</mu-paper></mu-col>
     <mu-col span="6"><mu-paper class="demo-paper" :z-depth="5">4</mu-paper></mu-col>
 </mu-row>

</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
        citys: [
            'Alabama', 'Alaska', 'American Samoa', 'Arizona',
            'Arkansas', 'California', 'Colorado', 'Connecticut',
            'Delaware', 'District of Columbia', 'Federated States of Micronesia',
            'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
            'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
            'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
            'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
            'Missouri', 'Montana', 'Nebraska', 'Nevada',
            'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
            'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
            'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
            'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
            'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
            'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ],
        filterable: {
            value1: '',
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
    .swiper-slide {
    width: 100%;
    height: 200px;
    }
    .demo-paper{
        margin :3px;
    }
</style>
