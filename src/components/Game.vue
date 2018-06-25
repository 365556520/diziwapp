<template>
    <div >
        <mu-ripple class="mu-ripple-demo demo-3" color="red" :opacity="0.5">
          <p>Click Me</p>
        </mu-ripple>
    </div>
</template>
<script>
    export default {
        name: 'Game',
        data () {
            return {
                color:'red',
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
