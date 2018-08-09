<template>
    <div>
        <!--导航条-->
        <Sticky top="0px" z-ndex="1">
            <swiper class="swipenavbg swipernav" :options="swiperOption">
                <swiper-slide v-for="v in tags" :key="v.id">
                    <span style="font-size:17px;color:#fafafa;" v-text="v.name"></span>
                </swiper-slide>
            </swiper>
        </Sticky>
        <!--导航条结束-->
        <mu-paper class="demo-list-wrap">
            <mu-list textline="two-line">
                    <mu-list-item  v-for="v in sortarticle" :key="v.id" avatar :ripple="true" button>
                        <mu-list-item-action class="articleimg">
                            <img class="articleimg" :src="v.articleimg">
                        </mu-list-item-action>&nbsp;&nbsp;
                        <mu-list-item-content>
                            <mu-list-item-title v-text="v.articleTitle"></mu-list-item-title>
                            <mu-list-item-sub-title v-text="v.subTitle"></mu-list-item-sub-title>
                            <mu-list-item-after-text v-text="v.date"></mu-list-item-after-text>
                        </mu-list-item-content>
                    </mu-list-item>
            </mu-list>
        </mu-paper>

    </div>
</template>
<script>
    import Sticky from 'vue-sticky-position' //vue-sticky-position粘性定位和固定顶部导航
    export default {
        name: 'Hot',
        data () {
            return {
                article: [
                    {
                        id: 1,
                        articleimg: 'static/images/avatar.jpg',
                        articleTitle: '韩国大战日本1',
                        subTitle: '最近韩国对日时间灭了半个日本',
                        date: '2018年12月1日'
                    },
                    {
                        id: 2,
                        articleimg: 'static/images/avatar.jpg',
                        articleTitle: '韩国大战日本2',
                        subTitle: '最近韩国对日时间灭了半个日本最近韩国对日时间灭了半个日本最近韩国对日时间灭了半个日本',
                        date: '2018年12月2日'
                    },
                    {
                        id: 3,
                        articleimg: 'static/images/avatar.jpg',
                        articleTitle: '韩国大战日本3',
                        subTitle: '最近韩国对日时间灭了半个日本',
                        date: '2018年11月2日'
                    },
                    {
                        id: 4,
                        articleimg: 'static/images/avatar.jpg',
                        articleTitle: '韩国大战日本4',
                        subTitle: '最近韩国对日时间灭了半个日本',
                        date: '2018年11月1日'
                    },
                    {
                        id: 5,
                        articleimg: 'static/images/avatar.jpg',
                        articleTitle: '韩国大战日本5',
                        subTitle: '最近韩国对日时间灭了半个日本',
                        date: '2018年12月4日'
                    },
                    {
                        id: 6,
                        articleimg: 'static/images/avatar.jpg',
                        articleTitle: '韩国大战日本4',
                        subTitle: '最近韩国对日时间灭了半个日本',
                        date: '2018年11月1日'
                    },
                    {
                        id: 7,
                        articleimg: 'static/images/avatar.jpg',
                        articleTitle: '韩国大战日本4',
                        subTitle: '最近韩国对日时间灭了半个日本',
                        date: '2018年11月1日'
                    },
                    {
                        id: 8,
                        articleimg: 'static/images/avatar.jpg',
                        articleTitle: '韩国大战日本4',
                        subTitle: '最近韩国对日时间灭了半个日本',
                        date: '2018年11月1日'
                    },
                ],
                swiperOption: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                    freeMode: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                },
                tags: [
                    {id: 1, name: '新闻'},
                    {id: 2, name: '二手车'},
                    {id: 3, name: '房介'},
                    {id: 4, name: '八卦'},
                    {id: 5, name: '姻缘'},
                    {id: 6, name: '基金交易'},
                ],
            }
        },
        computed: {
            //根据日期进行排序
            sortarticle: function () {
                return this.sortByKey(this.article,'date');
            }
        },
        methods: {
            //数组对象方法排序现在是降序
            sortByKey(array, key){
                return array.sort(function (a, b) {
                    var x = b[key]; //如果要换升序只需要换成var x = a[key];var y= b[key];
                    var y = a[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }
        },
        components: {
            Sticky
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .articleimg {
        width: 90px;
        max-width: 90px;
        min-width: 90px;
        height: 67px;
    }

    .swipernav {
        width: 100%;
        min-width: 100%;
        height: 50px;
        min-height: 50px;
        background-color: #f44336;
        text-align: center;
        font-size:30px;

    }
    .demo-list-wrap {
        width: 100%;
        max-width: 100%;
        overflow: hidden;
    }
</style>
