<template>
    <div >
        <mu-ripple class="mu-ripple-demo demo-3" color="red" :opacity="0.5">
          <p v-qiang="color" >Click Me</p>
        </mu-ripple>
    </div>
</template>
<script>
    import Vue from 'vue'
    Vue.directive('qiang',{
        bind:function(){//被绑定
            console.log('1 - bind');
        },
        inserted:function(){//绑定到节点
            console.log('2 - inserted');
        },
        update:function(){//组件更新
            console.log('3 - update');
        },
        componentUpdated:function(){//组件更新完成
            console.log('4 - componentUpdated');
        },
        unbind:function(){//解绑
            console.log('1 - bind');
        }
    });
    export default {
        name: 'Game',
        data () {
            return {
                color:'red',
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
