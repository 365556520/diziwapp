<template>
    <div>
        <!--导航条-->
        <Sticky top="0px" z-ndex="1">
            <swiper class="swipenavbg swipernav" :options="swiperOption">
                <swiper-slide v-for="v in tags" :key="v.id">
                    <span style="font-size:17px;color:#fafafa;" v-text="v.cate_name"></span>
                </swiper-slide>
            </swiper>
        </Sticky>
        <!--导航条结束 -->
        <mu-paper class="demo-list-wrap">
            <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" loading-text="正在加载呢稍等后">
                <div ref="container"   v-for="v in sortarticle" :key="v.id" >
                <mu-list v-if="v.articleimg.length === 1" textline="two-line">
                    <mu-list-item  avatar :ripple="true" button>
                        <mu-list-item-content >
                            <mu-row>
                                <mu-col span="3" sm="3" md="2" lg="2" xl="2">
                                    <img class="oneimg" :src="v.articleimg">
                                </mu-col>
                                <mu-col span="9" sm="9" md="10" lg="10" xl="9">
                                    <mu-list-item-title >{{v.articleTitle}}+{{num}}</mu-list-item-title>
                                    <mu-list-item-sub-title v-text="v.subTitle"></mu-list-item-sub-title>
                                    <mu-list-item-after-text v-text="v.date"></mu-list-item-after-text>
                                </mu-col>
                            </mu-row>
                        </mu-list-item-content>
                    </mu-list-item>
                </mu-list>
                <mu-list v-else-if="v.articleimg.length >1"  textline="three-line">
                    <mu-list-item    avatar :ripple="true" button>
                        <mu-list-item-content>
                            <mu-row>
                                <mu-col span="12" sm="12" md="12" lg="12" xl="12">
                                    <mu-list-item-title v-text="v.articleTitle"></mu-list-item-title>
                                </mu-col>
                            </mu-row>
                            <mu-row>
                                <mu-col span="12" sm="12" md="12" lg="12" xl="12">
                                    <mu-list-item-after-text >
                                        <img class="threeimg" v-for="value in v.articleimg"  :src="value">
                                    </mu-list-item-after-text>
                                </mu-col>
                            </mu-row>
                        </mu-list-item-content>
                    </mu-list-item>
                </mu-list>
                <mu-list v-else >
                    <mu-list-item    avatar :ripple="true" button>
                        <mu-list-item-content>
                            <mu-list-item-title v-text="v.articleTitle"></mu-list-item-title>
                            <mu-list-item-sub-title v-text="v.subTitle"></mu-list-item-sub-title>
                            <mu-list-item-after-text v-text="v.date"></mu-list-item-after-text>
                        </mu-list-item-content>
                    </mu-list-item>
                </mu-list>
            </div>
            </mu-load-more>
        </mu-paper>
    </div>
</template>
<script>
    import Sticky from 'vue-sticky-position' //vue-sticky-position粘性定位和固定顶部导航
    export default {
        name: 'Hot',
        mounted(){ //这个挂在第一次进入页面后运行一次
            this.axios.get('api/getCategorys').then((response) => {
                if(response.data.code == '200'){
                    this.tags = response.data.data;
                }
            })
        },
        data () {
            return {
                article: [
                    {
                        id: 1,
                        articleimg: [],
                        articleTitle: '韩国大战日本1',
                        subTitle: '最近韩国对日时间灭了半个日本asdasdssssssssssssssssssssss',
                        date: '2018年12月1日'
                    },
                    {
                        id: 2,
                        articleimg:['static/images/avatar.jpg','static/images/avatar.jpg','static/images/avatar.jpg'],
                        articleTitle: '韩国大战日本2',
                        subTitle: '最近韩国对日时间灭了半个日本最近韩国对日时间灭了半个日本最近韩国对日时间灭了半个日本',
                        date: '2018年12月2日'
                    },
                    {
                        id: 3,
                        articleimg:['static/images/avatar.jpg','static/images/avatar.jpg','static/images/avatar.jpg'],
                        articleTitle: '韩国大战日本3',
                        subTitle: '最近韩国对日时间灭了半个日本',
                        date: '2018年11月2日'
                    },
                    {
                        id: 4,
                        articleimg:['static/images/avatar.jpg','static/images/avatar.jpg','static/images/avatar.jpg'],
                        articleTitle: '韩国大战日本4',
                        subTitle: '最近韩国对日时间灭了半个日本',
                        date: '11月1日'
                    },
                    {
                        id: 5,
                        articleimg: ['static/images/avatar.jpg'],
                        articleTitle: '韩国大战日本5sssssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas',
                        subTitle: '最近韩国对日时间灭了半个日本',
                        date: '2018年12月4日'
                    },
                    {
                        id: 6,
                        articleimg: ['static/images/avatar.jpg','static/images/avatar.jpg','static/images/avatar.jpg'],
                        articleTitle: '韩国大战日本4',
                        subTitle: '最近韩国对日时间灭了半个日本',
                        date: '2018年11月1日'
                    },
                    {
                        id: 7,
                        articleimg: ['static/images/avatar.jpg'],
                        articleTitle: '韩国大战日本4',
                        subTitle: '最近韩国对日时间灭了半个日本',
                        date: '2018年11月1日'
                    },
                    {
                        id: 8,
                        articleimg: [],
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
                tags: [],
                refreshing: false,
                loading: false,
                num: 1,
                params:{
                    limit:10, //每页10个数据
                    page:1, //当前页数默认第一页
                    reload:'null', //搜索内容
                    ifs:'title', //搜索的列名
                    category_id:"null",//分类id
                    articles_ids:"null", //分类id数组
                }


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
            },
            refresh () {
                this.refreshing = true;
                this.$refs.container.scrollTop = 0;
                setTimeout(() => {
                    this.refreshing = false;
                    this.num = 10;
                }, 2000)
            },
            load () {
                this.loading = true;
                console.log(this.params);
                setTimeout(() => {
                    this.axios.get('api/getArticles',{
                        params: {
                            limit:this.params.limit, //每页10个数据
                            page:this.params.page, //当前页数默认第一页
                            reload:this.params.reload, //搜索内容
                            ifs:this.params.ifs, //搜索的列名
                            category_id:this.params.category_id,//分类id
                            articles_ids:this.params.articles_ids, //分类id数组
                        }
                    }).then((response) => {
                        console.log(response.data);
                        this.$toast.message(response.data.message);
                    }).catch((error) =>{
                        alert(error);
                    });
                    this.loading = false;
                    this.num += 10;
                }, 2000)
            }
        },
        components: {
            Sticky
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .threeimg {
        width: 32%;
        max-width: 32%;
        min-width: 30%;
        height: 68px;
        margin-right: 2px;
    }
    .oneimg {
        width: 97%;
        height: 66px;
        margin-right: 2px;
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
