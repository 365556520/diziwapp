<template>
    <div >

          <p>Click Me</p>
            <component v-bind:is="who"></component>
            <button @click="changeComponent">changeComponent</button>
        <p v-for="v in newPrice" >
        {{v.title}}-----{{v.date}}
        </p>

        <p>今日温度：{{temperature}}°C</p>
        <p>穿衣建议:{{this.suggestion}}</p>
        <p>
            <button @click="add">添加温度</button>
            <button @click="reduce">减少温度</button>

        </p>
    </div>
</template>
<script>
    var componentA={
        template:`<div style="color:red;">I'm componentA</div>`
    }
    var componentB={
        template:`<div style="color:green;">I'm componentB</div>`
    }
    var componentC={
        template:`<div style="color:pink;">I'm componentC</div>`
    }
    var suggestion=['T恤短袖','夹克长裙','棉衣羽绒服'];
    export default {
        name: 'Game',
        data () {
            return {
                who:'componentA',
                price:[
                    {title:'香港或就“装甲车被扣”事件追责 起诉涉事运输公司',date:'2017/3/10'},
                    {title:'日本第二大准航母服役 外媒：针对中国潜艇',date:'2017/3/12'},
                    {title:'中国北方将有明显雨雪降温天气 南方阴雨持续',date:'2017/3/31'},
                    {title:'起底“最短命副市长”：不到40天落马，全家被查',date:'2017/3/21'},
                ],
                temperature:14,
                suggestion:'夹克长裙',
            }
        },
        computed:{
            newPrice:function(){
                return this.price.reverse('date');
            }
        },
        components:{
            "componentA":componentA,
            "componentB":componentB,
            "componentC":componentC,
        },
        methods:{
            changeComponent:function(){
                if(this.who=='componentA'){
                    this.who='componentB';
                }else if(this.who=='componentB'){
                    this.who='componentC';
                }else{
                    this.who='componentA';
                }
            },
            add:function(){
                this.temperature+=5;
            },
            reduce:function(){
                this.temperature-=5;
            }
        },
        watch:{
            temperature:function(newVal,oldVal){
                //newVal这个是新数值，oldVal是旧的数值（没改变之前的值）
                if(newVal>=26){
                    this.suggestion=suggestion[0];
                }else if(newVal<26 && newVal >=0)
                {
                    this.suggestion=suggestion[1];
                }else{
                    this.suggestion=suggestion[2];
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
