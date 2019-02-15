<template>
    <div >
        <!--顶部-->
        <p-header></p-header>
        <h2>{{ msg }}</h2>
        <P>页面不存在</P>
    </div>
</template>
<script>
    import pHeader from './common/PageHeader.vue';  //分页顶部导航组件
    export default {
        name: 'Error404',
        data () {
            return {
                msg: 'Error:404'
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

</style>
