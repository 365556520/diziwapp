<template>
<div>
    <mu-container>
        <mu-flex justify-content="between" align-items="end" wrap="wrap">
            <mu-paper :z-depth="1" class="demo-date-picker">
                <mu-date-picker :date.sync="date"></mu-date-picker>
            </mu-paper>
            <mu-paper :z-depth="1" class="demo-date-picker">
                <mu-date-picker landscape :date.sync="date"></mu-date-picker>
            </mu-paper>
        </mu-flex>
    </mu-container>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
