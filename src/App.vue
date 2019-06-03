<template>
    <div id="app">
        <router-view></router-view>
        <!--用百度地图定位获取位置-->
        <baidu-map v-if="baidumap.mapshow"  :ak="userbaidumap.ak" :center="baidumap.center" :zoom="baidumap.zoom" @ready="handler" :scroll-wheel-zoom="true"></baidu-map>
        <!--用百度地图定位获取位置end-->
    </div>
</template>
<script>
    import {mapState,mapMutations,mapGetters} from 'vuex'; //mapState数据计算简化模式mapMutations方法的简化模式写法如下
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'; //百度地图
    export default {
        name: 'App',
        data () {
            return {
                toast:{ //弹出toast配置
                    position: 'top',               // 弹出的位置
                    time: 1000,                       // 显示的时长
                    closeIcon: 'close',               // 关闭的图标
                    close: true,                      // 是否显示关闭按钮
                },
                //百度地图定位
                baidumap:{
                    mapshow:false,
                    center: '河南省南阳市西峡县',
                    zoom: 11,
                },
            }
        },
        computed:{//数据计算
            ...mapState(['count','userToken','userbaidumap']),//配置vuex状态的值
        },
        mounted(){//创建完毕后执行
            this.$toast.config(this.toast);//加载提示toast的配置
            this.baidumap.mapshow=true; //开启地图定位渲染
        },
        methods: {
            //用vuex存登录token和用户名字
            ...mapMutations([
                'setToken','setName',
                'setMapCenter','setMapCenterName' //加载vuex中的方法
            ]),
            //获取用户信息方法
            getUser(userToken){ //获取用户信息
                this.axios.defaults.headers.common ['Authorization'] = 'Bearer ' + userToken; //token认证响应头
                let usertoken =  {
                    headers:{
                        'Accept':'application/json',
                    }
                }
                this.axios.post('api/passport',usertoken).then((response) => {
                    this.setName(response.data.user.name);
                    console.log(response)
                }).catch((error) =>{
                    alert(error);
                });
            },
            //获取位置和所在地名字
            handler ({BMap, map}) {
                let _this = this;   // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (data) {
                    //注意:调用mutaions中回调函数, 只能使用store.commit(type, payload)
                    _this.$store.commit('setMapCenter', {lng: data.longitude, lat: data.latitude});//设置经纬
                    //获取地方全名
                    var province = data.address.province?data.address.province:''; //省
                    var city = data.address.city?data.address.city:'';     //市区
                    var district = data.address.district?data.address.district:'';//县
                    var street = data.address.street?data.address.street:'';  //区村
                    var streetNumber = data.address.streetNumber?data.address.streetNumber:''; //街道和门牌号
                    var name = province+city+district+street+streetNumber; //所在地名
                    _this.getWeatherForecast(name==''?'河南省南阳市西峡县':province+city+district);//获取天气
                    _this.$store.commit('setMapCenterName',name);//设置定位后的名字
                    _this.baidumap.mapshow=false; //关闭地图定位渲染
                }, {enableHighAccuracy: true})
            },
            //获天气预报
            getWeatherForecast(centername){
                var isurl = "http://api.map.baidu.com/telematics/v3/weather?location=" + centername + "&output=json&ak=" + this.userbaidumap.ak;
                this.axios.get('api/getWeatherForecast', {
                    params: {
                        url: isurl,
                    }
                }).then((response) => {
                    if (response.data.code == 200) {
                        var data = JSON.parse(response.data.data);
                        this.$store.commit('setMapdate',data.date);//设置时间
                        this.$store.commit('setMapresults',data.results);//设置信息
                        console.log('天气预报更新成功');
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
        },
        watch:{
            //监听vuex中token值的变化
            userToken:function(token){
               if (token!=""){ //如果token存在就获取用户信息
                    this.getUser(token) //获取用户信息
               }else{
                   console.log('空主页面');
               }
            }
        },
        components: {
           BaiduMap
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
