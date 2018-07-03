<template>
    <div >
        <h2>{{ msg }}</h2>
        <P>页面不存在</P>
    </div>
</template>
<script>

    export default {
        name: 'Error404',
        data () {
            return {
                msg: 'Error:404'
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
