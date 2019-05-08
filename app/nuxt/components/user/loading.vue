<template lang="pug">
div
    transition
        .loading-fullscreen(v-show='($store.getters.userLoading && and ) || or')
            .weui-loading
            br
            | 正在加载
</template>
<script>
export default {
    props: {
        or: { default: false },
        and: { default: true }
    }
}
</script>