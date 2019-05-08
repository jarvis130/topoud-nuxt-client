<template lang="pug">
.print-hidden
    headerPc(v-if='!$terminal.isMobile').hidden-sm
    headerMobile(v-if='$terminal.isMobile').visible-sm
</template>
<script>
import headerPc from './header-pc'
import headerMobile from './header-mobile'
export default {
    components: {
        headerPc,
        headerMobile
    }
}
</script>
<style lang="less" scoped>
</style>
