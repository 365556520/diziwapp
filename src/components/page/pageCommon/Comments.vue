<template>
    <div>
        <!--页面头-->
        <p-header :inputtitle="title"></p-header>
        <!--页面头end-->
        <div class="content">
            <div style="padding: 3px 15px 3px 15px;">
                <div v-for="v in getcomments" :key="v.id" >
                    <mu-row>
                        <mu-col span="12">
                            <div>
                                <mu-flex justify-content="start" fill>
                                    <div><a @click="huifu(v.get_from_uid.id,v.get_from_uid.name)">{{v.get_from_uid.name}}</a>&nbsp</div>
                                    <div v-if="v.get_to_uid != null" >@&nbsp<a  @click="huifu(v.get_to_uid.id,v.get_to_uid.name)">{{v.get_to_uid.name}}</a></div>
                                    <div v-html="':&nbsp'+v.content">
                                    </div>
                                </mu-flex>
                                <mu-flex justify-content="end" fill> <div><span style="font-size: 6px" v-html="v.created_at"></span>&nbsp&nbsp</div></mu-flex>
                            </div>
                        </mu-col>
                        <mu-divider></mu-divider>
                    </mu-row>
                </div>
            </div>
        </div>
        <div class="navbottom">
            <mu-row  >
                <mu-col span="11">
                    <mu-text-field  v-model="inputcomments.commentscontent" :prefix="'@'+inputcomments.to_name+':'"  full-width icon="comment"  color="success"placeholder="不允许超过500个字符" multi-line :rows="1" :max-length="500"></mu-text-field>
                </mu-col>
                <mu-col span="11"  >
                        <mu-flex   justify-content="end" >
                            <mu-button small   color="success"  @click="submit()">发表评论</mu-button>
                        </mu-flex>
                </mu-col>
            </mu-row>
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
                input:false,
                comments:{},
                inputcomments:{
                    commentscontent:'',//回复内容
                    to_name:'',
                    to_uid:'',
                },
            }
        },
        computed:{
            ...mapState(['userToken','userdata']),
            //整理评论数据
            getcomments: function () {
                return this.comments;
            }
        },
        methods: {
            //递归
            sortcommentsarry(data, pid = 0){
                var result = [], temp;
                for (var i in data) {
                    if (data[i].pid == pid) {
                        result.push(data[i]);
                        temp = this.sortcommentsarry(data, data[i].id);
                        if (temp.length > 0) {
                            data[i]['children'] = temp;
                        }
                    }
                }
                return result;
            },
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
            //回复
            huifu(id,to_name){
                this.inputcomments.to_uid=id;
                this.inputcomments.to_name=to_name;
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
        margin: 49px 0px 100px 0px;
    }
    .navbottom {
        background-color: #f6f7f6;
        /*设置底部导航的位置和长宽*/
        width: 100%;
        height: 100px;
        position: fixed;
        max-width: 100%;
        bottom: 0px;
        left: 0px;
        margin: 0;
        padding: 0;
    }
</style>
