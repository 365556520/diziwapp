<template>
    <div>
        <br>
        <mu-list textline="three-line">
            <mu-list-item button avatar :ripple="false">
                <mu-list-item-content>
                    <mu-row justify-content="center">
                        <mu-avatar :size="size">
                            <img src="static/images/avatar.jpg">
                        </mu-avatar>
                    </mu-row>
                    <mu-flex class="flex-wrapper" justify-content="center">
                        <mu-flex class="flex-demo" justify-content="center">请登录</mu-flex>
                    </mu-flex>
                </mu-list-item-content>
            </mu-list-item>
        </mu-list>
        <br>
        <mu-divider></mu-divider>

        <mu-list>
            <mu-list-item button :ripple="true">
                <mu-list-item-action>
                    <mu-icon value="inbox"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>我的消息</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button :ripple="true">
                <mu-list-item-action>
                    <mu-icon value="grade"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>我的关注</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button :ripple="true">
                <mu-list-item-action>
                    <mu-icon value="send"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>我的邮箱</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button :ripple="true">
                <mu-list-item-action>
                    <mu-icon value="power_settings_new"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>退出登录</mu-list-item-title>
            </mu-list-item>
        </mu-list>

    </div>
</template>

<script>
    export default {
        name: 'MyProfile',
        data () {
            return {
                size: 80,
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
