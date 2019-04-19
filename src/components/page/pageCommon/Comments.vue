<template>
    <div>
        <!--页面头-->
        <p-header :inputtitle="title"></p-header>
        <!--页面头end-->
        <div class="content">
            <div style="padding: 3px 15px 3px 15px;">
                <div v-for="v in comments" :key="v.id" >
                    内容：{{v.content}}--评论id{{v.from_uid}}--目标id{{v.to_uid}}--评论名字{{v.get_from_uid.name}}
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {mapState} from 'vuex'; //mapState数据计算简化模式mapMutations方法的简化模式写法如下
    import pHeader from '../../common/PageHeader.vue';  //分页顶部导航组件
    export default {
        name: 'Comments',
        mounted(){ //这个挂在第一次进入页面后运行一次
            this.getcommentsall(this.$route.query.id)
        },
        data () {
            return {
                title:'评论',
                //获取传入的参数
                comments:{},
                input:false,
            }
        },
        computed:{
            ...mapState(['userToken','userdata']),
        },
        methods: {
            //获取该文章所有评论
            getcommentsall(id){
                this.axios.get('api/getComments/' + id).then((response) => {
                    if (response.data.code === '200') {
                        this.comments = response.data.data;
                        console.log(this.comments);
                    }
                }).catch((error) => {
                    alert(error);
                });
            },
            //评论输入
            inputcomments(){
                this.input=true; //显示发送评论按钮
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

</style>
