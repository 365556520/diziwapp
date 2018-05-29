<template>
  <div id="app">
    <mu-appbar class="navtop" color="deepPurple400" >
      <!--左侧导航-->
      <mu-button icon slot="left" @click="open = !open">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <mu-drawer  :open.sync="open" :docked="docked"  :right="position === 'right'">
        <mu-list >
          <mu-list-item button>
            <mu-list-item-title>Menu Item 1</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Menu Item 2</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title @click="open = false">Close</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-drawer>
      <!--左侧导航 ned-->
      Title
      <!--右侧导航-->
      <mu-menu  placement="top-start"  slot="right">
        <mu-button flat>MENU</mu-button>
        <mu-list   slot="content">
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title>Menu Item 1</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title>Menu Item 2</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
      <!--右侧导航 end-->
    </mu-appbar>
    <div class="container">
    <!--内容区域-->
    <router-view></router-view>
    <!--内容区域 end-->
    </div>
    <mu-container class="navbottom">
      <mu-bottom-nav :value.sync="shift" shift>
        <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="music" title="Music" icon="music_note"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="books" title="Books" icon="books"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>
<script>
export default {
    name: 'App',
    data () {
        return {
            docked: false, //左侧导航显示遮盖层 会触发close 事件
            open: false,   //左侧导航是否打开
            position: 'left', //左侧导航出来的方向
            shift: 'movies'
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .navtop{
   width: 100%;

 }
 .navbottom{
   min-height: 100%;
   width:100%;
   max-width: 100%;
   bottom:0px;
   left:0px;
   margin:0;
   padding:0;
 }
</style>
