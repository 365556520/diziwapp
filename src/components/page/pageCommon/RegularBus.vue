<template>
    <div>
        <!--顶部-->
        <Sticky top="0px" z-ndex="0">
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
        </Sticky>
        <!--班线查询-->
        <mu-row class="mymargin chaxun">
            <mu-col span="12">
                <mu-auto-complete :data="buses_route_name" label="起点"  v-model="filterable.start" icon="person_pin_circle" full-width></mu-auto-complete>
            </mu-col>
            <mu-col span="12">
                <mu-auto-complete :data="buses_route_name" label="终点" v-model="filterable.end" icon="pin_drop" full-width></mu-auto-complete>
            </mu-col>
            <!--查询按钮-->
            <mu-col span="12">
                <mu-flex class="flex-wrapper" justify-content="center">
                    <mu-flex class="flex-demo" justify-content="center">
                        <mu-button large color="blue500" @click.prevent="search">
                            <mu-icon value="search"></mu-icon>班车线路
                        </mu-button>
                    </mu-flex>
                </mu-flex>
            </mu-col>
            <!--查询按钮end-->
        </mu-row>
        <mu-divider></mu-divider>
        <div v-show="busesshow" style="padding: 2px;" v-for="v in searchbuses" :key="v.id" >
            <mu-expansion-panel :expand="true">
                <div slot="header">班车线路 :{{v.buses_start}}&nbsp;&nbsp;&nbsp;&nbsp;{{v.buses_midway}}&nbsp;&nbsp;&nbsp;&nbsp;{{v.buses_end}}</div>
                <div slot="default" v-for="value in v.get_buses" :key="value.id">
                    <mu-divider></mu-divider>
                    <span>
                         车号:{{value.buses_name}}&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;  联系电话:{{value.buses_phone}}<br>
                        发车时间:{{value.buses_start_date}}<br>
                        返回时间:{{value.buses_end_date}}<br>

                     </span><br>
                </div>
            </mu-expansion-panel>
        </div>

    </div>
</template>
<script>
    import Sticky from 'vue-sticky-position' //vue-sticky-position粘性定位和固定顶部导航
    export default {
        name: 'RegularBus',
        mounted(){ //这个挂在第一次进入页面后运行一次
            this.axios.get('api/getBusesRouteall').then((response) => {
                this.buses_start = response.data.data.buses_start;
                this.buses_midway = response.data.data.buses_midway;
                this.buses_end = response.data.data.buses_end;
                var name = response.data.data.buses_route_name;
                //转换为数组
                for (let i in name) {
                    this.buses_route_name.push(name[i]); //属性
                }
                console.log(this.buses_route_name);
            })
        },
        data () {
            return {
                //结果是否显示默认不显示
                busesshow:false,
                //始点
                buses_start: [],
                //途经
                buses_midway: [],
                //终点
                buses_end: [],
                //地名名字
                buses_route_name: [],
                //绑定输入框值
                filterable: {
                    start: '',
                    end: '',
                },
                //班车线路数据含班车
                searchbuses: [''],
            }
        },
        computed: {
            title:function () {
                return this.$route.meta.title;
            },
        },
        methods: {
            //点击查询
            search(){
                if(this.filterable.start != ''){
                    this.axios.get('api/getBusesRouteId/', {
                        params: {
                            buses_start: this.filterable.start,
                            buses_end: this.filterable.end,
                        }
                    })
                        .then((response) => {
                            if (response.data.code == 200) {
                                if(response.data.data.length>0){
                                    //显示
                                    this.busesshow=true;
                                }
                                this.searchbuses = response.data.data;
                                console.log(response.data.data);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }else{
                    this.$toast.message("出发地不能为空");
                }
            },

            //返回
            Btback(){
                this.$router.go(-1);
            }
        },
        components: {
            Sticky,
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .chaxun {
        padding: 5px;
    }
    .mymargin {
        margin: 2px 25px 2px 5px;
    }
</style>
