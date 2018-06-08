<template>
    <div>
            <mu-list textline="three-line">
                <mu-sub-header>今天</mu-sub-header>
                <mu-list-item avatar :ripple="true" button>
                    <mu-list-item-action>
                            <img  class="demo-paper" src="static/images/avatar.jpg">
                    </mu-list-item-action>&nbsp;&nbsp;
                    <mu-list-item-content>
                        <mu-list-item-title>这个周末一起吃饭么?</mu-list-item-title><br>
                        <mu-list-item-sub-title>
                            <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> <br>
                            周末要来你这里出差，要不要一
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                </mu-list-item>
                <mu-divider></mu-divider>
                <mu-list-item avatar :ripple="true" button>
                    <mu-list-item-action>
                        <mu-avatar>
                            <img src="static/images/avatar.jpg">
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>Alex Qin</mu-list-item-title>
                        <mu-list-item-sub-title>
                            <span style="color: rgba(0, 0, 0, .87)">看电影啊</span><br/>
                            我们去看电影，最近有部烂片上映，又有吐槽的了
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                </mu-list-item>
                <mu-divider></mu-divider>
                <mu-list-item avatar :ripple="true" button>
                    <mu-list-item-action>
                        <mu-avatar>
                            <img src="static/images/avatar.jpg">
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>LOL</mu-list-item-title>
                        <mu-list-item-sub-title>
                            <span style="color: rgba(0, 0, 0, .87)">去打游戏啊</span><br/>
                            周末一起 LOL
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                </mu-list-item>
                <mu-divider></mu-divider>
                <mu-list-item avatar :ripple="true" button>
                    <mu-list-item-action>
                        <mu-avatar>
                            <img src="static/images/avatar.jpg">
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>LOL</mu-list-item-title>
                        <mu-list-item-sub-title>
                            <span style="color: rgba(0, 0, 0, .87)">哇去</span><br/>
                            实在编不下去，这就是个demo
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                </mu-list-item>
            </mu-list>
    </div>
</template>

<script>
    export default {
        name: 'Hot',
        data () {
            return {
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .demo-list-wrap {
        width: 100%;
        max-width: 360px;
        overflow: hidden;
    }
    .demo-paper{
        width: 100px;
        max-width: 100px;
        height: 80px;
    }
</style>
