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
        <div class="navbottom">
            <mu-row  >
                <mu-col span="8">
                    <mu-text-field  v-model="comments.commentscontent" @click="inputcomments"  full-width icon="comment"  color="success"placeholder="不允许超过500个字符" multi-line :rows="1" :max-length="500"></mu-text-field>
                </mu-col>
                <mu-col span="4" style="margin-top: 3px;" >
                        <mu-col v-show="comments.commentssuccess" span="12">
                            <mu-flex   justify-content="center" >
                                <mu-button small flat full-width color="success"  @click="submit()">发表评论</mu-button>
                            </mu-flex>
                        </mu-col>
                        <mu-col span="12">
                            <mu-flex style="margin-top: 3px;" justify-content="center" >
                                <mu-badge :content="onearticle.commentsnumber+'个评论'" @click="commentsall()"  color="secondary"></mu-badge>
                            </mu-flex>
                        </mu-col>
                </mu-col>
            </mu-row>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'; //mapState数据计算简化模式mapMutations方法的简化模式写法如下
    import pHeader from '../../common/PageHeader.vue';  //分页顶部导航组件
    export default {
        name: 'RegularBus',
        mounted(){ //这个挂在第一次进入页面后运行一次
            this.getArticles(this.$route.query.id,this.$route.query.title)
        },
        data () {
            return {
                //获取传入的参数
                onearticle: {
                    id:'',
                    get_user: {},
                    title:'',
                    category_id:'',
                    content:'',
                    tag:'',
                    user_id:'',
                    updated_at:'',
                    view:'',
                    commentsnumber:0,//评论个数
                },
                comments:{
                    commentscontent:'',  //评论内容
                    commentssuccess:false,
                    to_uid:''
                }
            }
        },
        computed:{
            ...mapState(['userToken','userdata']),
        },
        methods: {
            //获取文章内容
            getArticles(id,title) {
                this.axios.get('api/getArticlesContent/' + id).then((response) => {
                    if (response.data.code === '200') {
                        this.onearticle = response.data.data;
                        this.onearticle.title = title; //标题
                        this.onearticle.id = id; //文章id
                        console.log(this.onearticle);
                    }
                }).catch((error) => {
                    alert(error);
                });
            },
            //评论输入
            inputcomments(){
                this.comments.commentssuccess=true; //显示发送评论按钮
            },
            //提交评论
            submit(){
                //判断是否登录
                if(this.userToken!=""){
                    if(this.comments.commentscontent!=''){
                        this.axios.defaults.headers.common ['Authorization'] = 'Bearer ' + this.userToken; //token认证响应头
                        let usertoken =  {
                            headers:{
                                'Accept':'application/json',
                            },
                            data:{
                                'topic_id':this.onearticle.id,
                                'content':this.comments.commentscontent,
                                'to_uid':this.comments.to_uid,
                            }
                        }
                        this.axios.post('api/inputComments',usertoken).then((response) => {
                            if(response.data.code == '200'){
                                this.onearticle.commentsnumber += 1; //评论个数加1
                                this.comments.commentscontent = ''; //清空输入框
                                this.comments.commentssuccess=false; //隐藏按钮
                                this.$toast.message(response.data.msg);
                            }else{
                                this.$toast.message(response.data.msg);
                            }
                            console.log(response.data);
                        }).catch((error) =>{
                            alert(error);
                        });
                    }else {
                        this.$toast.message("评论失败!不能发送空评论");
                        this.$alert('不能发送空评论！', '评论失败', {
                            okLabel: '知道了'
                        });
                    }
                }else{
                    this.$confirm('未登录，不能参与评论，请登录！', '提示').then(({ result }) => {
                        if (result) {
                            this.$router.push('/Login'); //跳到登录页面
                        } else {
                            this.$toast.message('点击了取消');
                        }
                    });
                }
            },
            //查看全部评论
            commentsall(){
                if(this.onearticle.commentsnumber != 0){
                    this.$router.push({path:'/Comments',query:{id:this.onearticle.id}})
                }

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


    .navbottom {
        background-color: #f6f7f6;
        /*设置底部导航的位置和长宽*/
        width: 100%;
        height: 60px;
        position: fixed;
        max-width: 100%;
        bottom: 0px;
        left: 0px;
        margin: 0;
        padding: 0;
    }

</style>
