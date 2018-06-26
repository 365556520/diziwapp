<template>
    <div >

          <p>Click Me</p>
            <component v-bind:is="who"></component>
            <button @click="changeComponent">changeComponent</button>
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

    export default {
        name: 'Game',
        data () {
            return {
                who:'componentA'
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
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
