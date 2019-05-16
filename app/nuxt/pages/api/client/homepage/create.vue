<template lang="pug">
.container
    nuxt-child(v-if='userChecked')
    .loading-fullscreen(v-else)
        .weui-loading(style='margin-top: -3px;')
        |  加载中
        br
        br
        small USER ASYNC
</template>
<script>
export default {
    data() {
        return {
            userChecked: false
        }
    },
    mounted() {
        this.userChecked = true
        // let { token, userId } = this.$route.query
        // this.$userAsync({ token, userId }).then(_ => {
        //     // if (!_) return
        //     // this.userChecked = true
        // })
    }
}
</script>
