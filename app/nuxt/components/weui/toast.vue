<template lang="pug">
.weui-toast-container
    .weui-mask_transparent(v-if='show')
    transition
        .weui-toast(v-if='show')
            .weui-icon_toast.weui-icon-success-no-circle(v-if='success')
            .weui-icon_toast.el-icon-close(v-else-if='error' style='color:white; height: 55px; font-size: 45px; line-height: 55px; ')
            .weui-icon_toast.weui-loading(v-else)
            .weui-toast__content {{message || (success ? messageSuccess : error ? messageError : messageLoading)}}
</template>
<script>
export default {
    data() {
        return {
            success: 0,
            error: true,
            messageLoading: '加载中',
            messageSuccess: '操作成功',
            messageError: '出现异常',
            message: '..',
            show: false,
            index: 0
        }
    },
    methods: {
        start(options) {
            this.show = true
            let index = this.index++
            let { success, error, duration, message } = options
            if ((success || error) && !duration) duration = 1.5
            this.success = success
            this.error = error
            this.message = message
            if (!duration) return
            setTimeout(_ => {
                if (index === this.index) return
                this.show = false
            }, duration * 1000)
        },
        close() {
            this.index++
            this.show = false
        }
    }
}
</script>
