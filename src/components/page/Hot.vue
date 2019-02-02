<template>
    <div>
        <!--导航左侧-->
        <mu-appbar class="navtop" color="blue500" z-depth="0" >
            <mu-button icon slot="left" @click="open = !open">
                <mu-icon size="36" value="account_circle"></mu-icon>
            </mu-button>
            <mu-menu slot="right">
                <mu-container>
                    <mu-row class="diziwtop">
                        <mu-col span="12" sm="12" md="12" lg="12" xl="12">
                            <mu-flex justify-content="end">
                                <mu-flex  justify-content="center">
                                    <mu-text-field class="inputs" v-model="params.reload" full-width underline-color="red50" color="red50"  action-icon="search"  :action-click="reloadclick">
                                    </mu-text-field>
                                </mu-flex>
                            </mu-flex>
                        </mu-col>
                    </mu-row>
                </mu-container>
            </mu-menu>
        </mu-appbar>
        <!--导航左侧 end-->
        <!--抽屉导航-->
        <mu-drawer :open.sync="open" width="50%" :docked="docked" s :right="position === 'right'">
            <mu-list>
                <mu-list-item button>
                    <mu-list-item-title>Menu Item 1</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button>
                    <mu-list-item-title>Menu Item 2</mu-list-item-title>
                </mu-list-item>
                <mu-list-item @click="open = false" button>
                    <mu-list-item-title @click="open = false">Close</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-drawer>
        <!--滚动导航条-->
        <Sticky top="0px" z-ndex="0">
            <swiper class="swipenavbg swipernav" :options="swiperOption">
                <swiper-slide v-for="v in tags" :key="v.id">
                    <mu-ripple class="mu-ripple-demo" v-on:click="getcategory(v.id)" color="yellow" :opacity="0.3">
                        <span style="font-size:17px;color:#fafafa;" v-text="v.cate_name" ></span>
                    </mu-ripple>
                </swiper-slide>
            </swiper>
        </Sticky>
        <!--导航条结束 -->
        <!--内容-->
       <mu-paper class="demo-list-wrap">
                <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" :loading-text="loadingtext">
                    <div ref="container"   v-for="v in article.data.data" :key="v.id" >
                        <mu-list v-if="v.thumb.length === 2" textline="two-line">
                            <mu-list-item @click="openFullscreenDialog(v)" avatar :ripple="true" button>
                                <mu-list-item-content >
                                    <mu-row>
                                        <mu-col span="3" sm="3" md="2" lg="2" xl="2">
                                            <img class="oneimg" v-for="value in v.thumb" v-if="value != ''" :src="imgurl+value">
                                        </mu-col>
                                        <mu-col span="9" sm="9" md="10" lg="10" xl="9">
                                            <h3><span v-text="onearticle.title"></span></h3>
                                            <span class="OVERLINE" v-text="'更新时间:'+onearticle.created_at"></span><br>
                                            <span class="OVERLINE" v-text="'作者:'+onearticle.get_user.name"></span><br>
                                            <span class="body1" v-html="onearticle.content"></span>
                                        </mu-col>
                                    </mu-row>
                                </mu-list-item-content>
                            </mu-list-item>
                        </mu-list>
                        <mu-list v-else-if="v.thumb.length >2"  textline="three-line">
                            <mu-list-item @click="openFullscreenDialog(v)" avatar :ripple="true" button>
                                <mu-list-item-content>
                                    <mu-row>
                                        <mu-col span="12" sm="12" md="12" lg="12" xl="12">
                                            <mu-list-item-title v-text="v.title"></mu-list-item-title>
                                        </mu-col>
                                    </mu-row>
                                    <mu-row>
                                        <mu-col span="12" sm="12" md="12" lg="12" xl="12">
                                            <mu-list-item-after-text >
                                                <img class="threeimg"  v-for="value in v.thumb" v-if="value != ''" :src="imgurl+value">
                                            </mu-list-item-after-text>
                                        </mu-col>
                                    </mu-row>
                                </mu-list-item-content>
                            </mu-list-item>
                        </mu-list>
                        <mu-list v-else >
                            <mu-list-item @click="openFullscreenDialog(v)" avatar :ripple="true" button>
                                <mu-list-item-content>
                                    <mu-list-item-title v-text="v.title"></mu-list-item-title>
                                    <mu-list-item-sub-title v-text="v.description"></mu-list-item-sub-title>
                                    <mu-list-item-after-text v-text="v.created_at"></mu-list-item-after-text>
                                </mu-list-item-content>
                            </mu-list-item>
                        </mu-list>
                    </div>
                </mu-load-more>
       </mu-paper>
        <!--弹出窗口-->
        <mu-dialog  width="100%"  transition="slide-left" scrollable  fullscreen   :open.sync="openFullscreen" :padding='dialogpidding'>
                <Sticky top="0px" z-ndex="0">
                    <mu-appbar color="primary" :title="onearticle.title">
                        <mu-button slot="left" icon @click="closeFullscreenDialog">
                            <mu-icon size="39" value="keyboard_arrow_left"></mu-icon>
                        </mu-button>
                    </mu-appbar>
                </Sticky>
                <div style="padding: 3px 15px 3px 15px;" >
                    <h3><span v-text="onearticle.title"></span></h3>
                    <span class="OVERLINE" v-text="'作者:'+onearticle.user_id"></span><br>
                    <span class="OVERLINE" v-text="'更新时间:'+onearticle.created_at"></span><br>
                    <span class="body1" v-html="onearticle.content"></span>
                </div>
            <mu-button slot="actions" flat color="primary" @click="">评论</mu-button><br>
        </mu-dialog>
        <!--弹出窗口end-->
    </div>
</template>
<script>
    import Sticky from 'vue-sticky-position' //vue-sticky-position粘性定位和固定顶部导航
    import vHeader from '../common/Header.vue';
    import MuRow from "muse-ui/es5/Grid/Row";  //顶部导航组件
    export default {
        name: 'Hot',
        mounted(){ //这个挂在第一次进入页面后运行一次
            //获取文章分类
            this.axios.get('api/getCategorys').then((response) => {
                if(response.data.code == '200'){
                    //获取分类
                    this.tags = response.data.data;
                    //获取文章
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
                        if(response.data.code == '200'){
                            this.article = response.data;
                            //总页数
                            this.params.pagecounts =  Math.ceil(response.data.data.count/this.params.limit);
                            //图片地址
                            this.imgurl = this.GLOBAL.serverSrc+this.article.msg;
                        }
                        console.log(this.article);
                    }).catch((error) =>{
                        alert(error);
                    });
                }
            }).catch((error) =>{
                alert(error);
            });
        },
        data () {
            return {
                //左边抽屉导航
                docked: false,
                open: false,
                position: 'left',  //左边抽屉导航end
                openFullscreen: false, //弹出对话框
                dialogpidding:5,
                onearticle:{
                    thumb:{},
                    get_user:{}
                },
                article: {
                    code:'',
                    data:{
                        get_user:{}
                    },
                    msg:''
                },//文章数据
                imgurl:'',
                swiperOption: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                    freeMode: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                },
                tags: {},//导航
                refreshing: false,
                loading: false,
                loadingtext:'稍等后加载中...',
                params:{
                    limit:10, //每页10个数据说
                    page:1, //当前页数默认第一页
                    reload:'', //搜索内容
                    ifs:'title', //搜索的列名
                    category_id:"",//分类id
                    articles_ids:"", //分类id数组
                    pagecounts:0,//文章总页数
                },
            }
        },
        computed: {
            //根据日期进行排序
            sortarticle: function () {

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
            //向上滑动
            refresh () {
                if(!this.refreshing){
                    this.refreshing = true;
                    this.$refs.container.scrollTop = 0;
                    setTimeout(() => {
                        if(this.params.page > 1 ){
                            this.params.page = this.params.page - 1;
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
                                if(response.data.code == '200'){
                                    this.refreshing = false;
                                    this.article = response.data;
                                    console.log('上滑加载'+this.article);
                                }
                            }).catch((error) =>{
                                alert(error);
                            });
                        }else{
                            this.refreshing = false;
                        }
                    }, 1000)
                }else{

                }
            },
            //向下滑动
            load () {
                if(!this.loading){
                    this.loading = true;
                    setTimeout(() => {
                        if(this.params.pagecounts>this.params.page){
                            this.params.page += 1;
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
                                if(response.data.code == '200'){
                                    this.loading = false;
                                    this.article = response.data;
                                }
                                console.log(response.data);
                            }).catch((error) =>{
                                alert(error);
                            });
                        }else{
                            this.loading = false;
                            this.loadingtext = '加载到底了';
                        }
                    }, 1000)
                }else{
                    this.$toast.message("正在加载中稍等后");
                }
            },
            //点击搜索
            reloadclick(){
                //获取文章
                this.axios.get('api/getArticles',{
                    params: {
                        limit:this.params.limit, //每页10个数据
                        page:1, //当前页数默认第一页
                        reload:this.params.reload, //搜索内容
                        ifs:this.params.ifs, //搜索的列名
                        category_id:'',//分类id
                        articles_ids:'', //分类id数组
                    }
                }).then((response) => {
                    if(response.data.code == '200'){
                        this.article = response.data;
                        //总页数
                        this.params.pagecounts =  Math.ceil(response.data.data.count/this.params.limit);
                    }
                    console.log(this.article);
                }).catch((error) =>{
                    alert(error);
                });
            },
            //点击分类获取分类文章
            getcategory(id){
                this.params.category_id = id;
                //获取文章
                this.axios.get('api/getArticles',{
                    params: {
                        limit:this.params.limit, //每页10个数据
                        page:1, //当前页数默认第一页
                        reload:this.params.reload, //搜索内容
                        ifs:this.params.ifs, //搜索的列名
                        category_id:this.params.category_id,//分类id
                        articles_ids:'', //分类id数组
                    }
                }).then((response) => {
                    if(response.data.code == '200'){
                        this.article = response.data;
                        //总页数
                        this.params.pagecounts =  Math.ceil(response.data.data.count/this.params.limit);
                    }
                    console.log(this.article);
                }).catch((error) =>{
                    alert(error);
                });
            },
            //开启弹出窗口
            openFullscreenDialog (onearticle) {
                this.onearticle = onearticle;
                this.openFullscreen = true;
            },
            //关闭弹出窗口
            closeFullscreenDialog () {
                //清空数据
                this.onearticle = {
                    thumb:{},
                    get_user:{}
                };
                this.openFullscreen = false;
            }
        },
        components: {
            MuRow,
            Sticky,vHeader
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
        background-color: #2196f3;
        text-align: center;
        font-size:30px;

    }
    .demo-list-wrap {
        width: 100%;
        max-width: 100%;
        overflow: hidden;
    }
    .diziwtop {
        margin-top: 8px;
    }
    .inputs {
        color: rgba(247, 242, 242, 0.87);
    }
    .OVERLINE{
        font-size: 10px; font-weight: 400;
    }
    .body1{
        font-size: 18px; font-weight: 400;
    }
</style>
