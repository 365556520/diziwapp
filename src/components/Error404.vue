<template>
    <div >
        <!--顶部-->
            <mu-row>
                <mu-col span="12">
                    <mu-appbar class="navtop" color="blue500" z-depth="0" >
                        <!--导航左侧-->
                        <mu-button icon slot="left"  @click.prevent="Btback">
                            <mu-icon size="36" value="keyboard_arrow_left"></mu-icon>
                        </mu-button>
                        <!--导航左侧 end-->
                        {{title}}
                    </mu-appbar>
                </mu-col>
            </mu-row>
        <h2>{{ msg }}</h2>
        <P>页面不存在</P>
    </div>
</template>
<script>

    export default {
        name: 'Error404',
        data () {
            return {
                msg: 'Error:404'
            }
        },
        computed: {
            title:function () {
                return this.$route.meta.title;
            },
        },
        methods: {
            //返回
            Btback(){
                this.$router.go(-1);
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
