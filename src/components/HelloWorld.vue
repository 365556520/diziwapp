<template>
<div>
    <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-tabbar v-model="selected">
        <mt-tab-item id="外卖">
            <img slot="icon" src="../assets/logo.png">
            外卖
        </mt-tab-item>
        <mt-tab-item id="订单">
            <img slot="icon" src="../assets/logo.png">
            订单
        </mt-tab-item>
        <mt-tab-item id="发现">
            <img slot="icon" src="../assets/logo.png">
            发现
        </mt-tab-item>
        <mt-tab-item id="我的">
            <img slot="icon" src="../assets/logo.png">
            我的
        </mt-tab-item>
    </mt-tabbar>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected:1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
