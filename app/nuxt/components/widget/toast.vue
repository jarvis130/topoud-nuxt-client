<template lang="pug">
.widget-toast
    transition
        .weui-mask(v-if='visible')
    transition
        .weui-toast(v-if='visible')
            i.weui-loading.weui-icon_toast(v-if='type===`loading`')
            i.weui-icon-success-no-circle.weui-icon_toast(v-else-if='type=`success`')
            //- i.weui-icon-success-no-circle.weui-icon_toast(v-else-if='type=`failed`')
            //- i.weui-icon-success-no-circle.weui-icon_toast
            .weui-toast__content {{text}}
</template>
<script>
export default {
    props: ['text', 'type', 'visible']
}
</script>

