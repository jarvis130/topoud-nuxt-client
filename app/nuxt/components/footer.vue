<template lang="pug">
.print-hidden
    template(v-if='!isApplet')
        footerBlock(v-show='!$terminal.isMobile || !routesFirst')
        footerNavigator(v-if='$terminal.isMobile' v-show='routesFirst').visible-sm
    .isApplet(@click='backToTop' v-else) 到底啦 点我回顶部
        // img(src='~assets/img/logo-fade.png')
</template>
<script>
import footerBlock from './footer-block'
import footerNavigator from './footer-navigator'
import routesFirst from './routes-first'
export default {
    mounted() {
        if (!this.isApplet) this.isApplet = window.__isApplet
    },
    methods: {
        backToTop() {
            this.$scrollTo(document.body, 300)
        }
    },
    data() {
        return {
            isApplet: this.$route.query.isApplet
        }
    },
    components: {
        footerBlock,
        footerNavigator
    },
    computed: {
        routesFirst() {
            return routesFirst[this.$route.path || '/']
        }
    }
}
</script>
<style lang="less" scoped>
.isApplet {
    // position: relative;
    text-align: center;
    color: #aaa;
    // img {
    //     top: -100px;
    //     left: calc(~'50% - 50px');
    //     width: 100px;
    //     position: absolute;
    // }
}
</style>
