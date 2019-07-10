<template>
    <div>
        <!--这里作用外面用到这个页面-->
        <!--获取个车辆信息-->

            <mu-card style="width: 100%; margin: 0 auto;">
                <mu-card-header :title="buses.buses_name" :sub-title="buses.buses_type+'班车 核载'+buses.buses_sit+'人'">
                </mu-card-header>
                <mu-card-text>
                    <mu-tabs :value.sync="active1" inverse color="secondary" text-color="rgba(0, 0, 0, .54)"   full-width>
                        <mu-tab>车辆信息</mu-tab>
                        <mu-tab>驾驶员</mu-tab>
                        <mu-tab>班线</mu-tab>
                    </mu-tabs>
                    <div class="demo-text" v-if="active1 === 0">
                        <p>车主:<span style="color: red">{{buses.buses_boss}}</span></p>
                        <p>联系电话:<span style="color: red">{{buses.buses_phone}}</span></p>
                        <p>发车时间:<span style="color: red">{{buses.buses_start_date}}</span></p>
                        <p>返回时间:<span style="color: red">{{buses.buses_end_date}}</span></p>
                        <p>车辆审验时间:<span style="color: red">{{buses.buses_approve_date}}</span></p>
                        <p>保险有效时间:<span style="color: red">{{buses.buses_insurance_date}}</span></p>
                    </div>
                    <div class="demo-text" v-if="active1 === 1">
                        <p>驾驶员:<span style="color: red">{{buses.get_driver.driver_name}}</span></p>
                        <p>
                            年龄:<span style="color: red">{{buses.get_driver.driver_age}}</span>
                             性别：<span style="color: red">{{buses.get_driver.driver_sex}}</span>
                        </p>
                        <p>联系电话:<span style="color: red">{{buses.get_driver.driver_phone}}</span></p>
                        <p>驾驶证号:<span style="color: red">{{buses.get_driver.driver_card}}</span></p>
                        <p>准驾车型:<span style="color: red">{{buses.get_driver.driver_permit}}</span></p>
                        <p>初次领证时间:<span style="color: red">{{buses.get_driver.driver_card_firstdata}}</span></p>
                        <p>有效时间:<span style="color: red">{{buses.get_driver.driver_card_date}}</span></p>
                        <p>驾驶证档案号:<span style="color: red">{{buses.get_driver.driver_archive_number}}</span></p>
                        <p>从业资格证号:<span style="color: red">{{buses.get_driver.driver_qualification}}</span></p>
                        <p>从业资格证有效时间:<span style="color: red">{{buses.get_driver.driver_qualification_date}}</span></p>
                        <p>驾驶信息:<span style="color: red">{{buses.get_driver.driver_info}}</span></p>

                    </div>
                    <div class="demo-text" v-if="active1 === 2">
                        <p>起始点:<span style="color: red">{{buses.get_buses_route.buses_start}}</span></p>
                        <p style="color: grey">途径:{{buses.get_buses_route.buses_midway}}</p>
                        <p >终点:<span style="color: red">{{buses.get_buses_route.buses_end}}</span></p>
                    </div>
                </mu-card-text>
            </mu-card>

    </div>
</template>
<script>

    export default {
        name: 'BusesInfo',
        mounted(){ //这个挂在第一次进入页面后运行一次
            this.getBuses(this.$route.params.busesname);
        },
        data () {
            return {
                active1: 0,
                buses:{
                    buses_approve_date: "",
                    buses_boss: "",
                    buses_driver_id: 0,
                    buses_end_date: "",
                    buses_insurance_date: "",
                    buses_name: "",
                    buses_phone: "",
                    buses_sit: "",
                    buses_start_date: "",
                    buses_type: "",
                    busesroute_id: 0,
                    created_at: "",
                    get_buses_route: {},
                    get_driver: {},
                    id: 0,
                    updated_at: ""
                }
            }
        },
        methods: {
            //获取车辆信息
            getBuses(busesname) {
                this.axios.get('api/busesInfo/' + busesname).then((response) => {

                    if (response.data.code == 200) {
                        this.buses = response.data.data[0];
                    }
                    console.log(response.data);
                }).catch((error) => {
                    alert(error);
                });
            },
        },
        components: {

        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content {

    }
    .bm-view {
        width: 100%;
        height: 350px;
    }
    .mu-ripple-demo {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;
        background-color: #fff;
        border-radius: 4px;
        color: #2196f3;
    }
</style>
