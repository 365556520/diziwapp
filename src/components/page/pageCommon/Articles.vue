<template>
    <div>
        <!--页面头-->
        <p-header :inputtitle="onearticle.title"></p-header>
        <!--页面头end-->
        <div class="content">
            <div style="padding: 3px 15px 3px 15px;">
                <h3><span v-text="onearticle.title"></span></h3>
                <span class="OVERLINE" v-text="'作者:'+onearticle.get_user.name"></span><br>
                <span class="OVERLINE" v-text="'更新时间:'+onearticle.updated_at"></span><br>
                <span class="body1" v-html="onearticle.content"></span>
            </div>
        </div>
        <Sticky >
            <div>
                <mu-row>
                    <mu-col span="12">
                        <mu-text-field placeholder="不允许超过300个字符" multi-line :rows="1" :max-length="300"></mu-text-field>
                        <mu-button slot="actions" flat color="primary" @click="">评论</mu-button>
                    </mu-col>
                </mu-row>
            </div>
        </Sticky>
    </div>
</template>
<script>
    import pHeader from '../../common/PageHeader.vue';  //分页顶部导航组件
    import Sticky from 'vue-sticky-position' //vue-sticky-position粘性定位和固定顶部导航
    export default {
        name: 'RegularBus',
        mounted(){ //这个挂在第一次进入页面后运行一次
            this.getArticles(this.$route.query.id,this.$route.query.title)
        },
        data () {
            return {
                //获取传入的参数
                onearticle: {
                    get_user: {},
                    getComments: {},
                    title:'',
                    category_id:'',
                    content:'',
                    tag:'',
                    user_id:'',
                    updated_at:'',
                    view:'',
                },
            }
        },
        computed:{},
        methods: {
            //获取文章内容
            getArticles(id,title) {
                this.axios.get('api/getArticlesContent/' + id).then((response) => {
                    if (response.data.code === '200') {
                        this.onearticle = response.data.data[0];
                        this.onearticle.title = title; //标题
                        console.log(this.onearticle);
                    }
                }).catch((error) => {
                    alert(error);
                });
            }
        },
        components: {
            pHeader
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content {
        margin: 49px 0px 50px 0px;
    }

    .chaxun {
        padding: 5px;
    }

    .mymargin {
        margin: 2px 25px 2px 5px;
    }
</style>
