<template lang="pug">
div
    .weui-mask_transparent(v-if="loading")
    transition
        .weui-toast(v-if="loading")
            i.weui-loading.weui-icon_toast
            .weui-toast__content {{text || '加载中'}}
</template>

<script>
export default {
    data: () => ({
        loading: false,
        text: false
    }),
    methods: {
        start(text) {
            this.text = text
            this.loading = true
        },
        finish() {
            this.text = false
            this.loading = false
        }
    }
}
</script>