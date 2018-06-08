<template>
    <div>
        <mu-list textline="three-line" >
            <div v-for="v in article" :key="v.id">
                <mu-list-item avatar :ripple="true" button>
                    <mu-list-item-action class="articleimg">
                        <img class="articleimg"  :src="v.articleimg">
                    </mu-list-item-action>&nbsp;&nbsp;
                    <mu-list-item-content>
                        <mu-list-item-title>{{v.articleTitle}}</mu-list-item-title>
                        <mu-list-item-sub-title>
                            {{v.subTitle}}
                        </mu-list-item-sub-title>
                        <mu-list-item-after-text>{{v.date}}</mu-list-item-after-text>
                    </mu-list-item-content>
                </mu-list-item>
                <mu-divider></mu-divider>
            </div>
        </mu-list>
    </div>
</template>
<script>
    export default {
        name: 'Hot',
        data () {
            return {
                article:[
                    {id:1,articleimg:'static/images/avatar.jpg',articleTitle:'韩国大战日本1',subTitle:'最近韩国对日时间灭了半个日本',date:'2018年12月1日'},
                    {id:2,articleimg:'static/images/avatar.jpg',articleTitle:'韩国大战日本2',subTitle:'最近韩国对日时间灭了半个日本最近韩国对日时间灭了半个日本最近韩国对日时间灭了半个日本',date:'2018年12月1日'},
                    {id:3,articleimg:'static/images/avatar.jpg',articleTitle:'韩国大战日本3',subTitle:'最近韩国对日时间灭了半个日本',date:'2018年12月1日'},
                    {id:4,articleimg:'static/images/avatar.jpg',articleTitle:'韩国大战日本4',subTitle:'最近韩国对日时间灭了半个日本',date:'2018年12月1日'},
                    {id:5,articleimg:'static/images/avatar.jpg',articleTitle:'韩国大战日本5',subTitle:'最近韩国对日时间灭了半个日本',date:'2018年12月1日'}
                ],
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .articleimg {
        width: 100px;
        max-width: 100px;
        min-width: 100px;
        height: 80px;
    }
</style>
