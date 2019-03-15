<template>
    <div>
        <!--页面头-->
        <p-header></p-header>
        <!--页面头end-->
        <div class="content">
            <br><br>
{{param.title}}
        </div>
    </div>
</template>
<script>
    import pHeader from '../../common/PageHeader.vue';  //分页顶部导航组件
    export default {
        name: 'RegularBus',
        mounted(){ //这个挂在第一次进入页面后运行一次
           this.param = this.$route.query;
        },
        data () {
            return {
                //获取传入的参数
                param:''
            }
        },
        computed: {

        },
        methods: {

        },
        components: {
            pHeader
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content {
        margin: 49px 0px 50px 0px;
    }
    .chaxun {
        padding: 5px;
    }
    .mymargin {
        margin: 2px 25px 2px 5px;
    }
</style>
