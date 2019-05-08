<template lang="pug">
.layout.ios
    .layout-body
        .layout-body-content
            .header-env-test(v-if='isTest' title='测试环境')
            .header-env-dev(v-if='isDev' title='开发环境')
            headerModule(v-if='header!==false' :class='{wild: header===`wild`}')
            nuxt
    .footer
        //- footerModule(v-if='!isDev')
        footerModule
</template>
<style>
.header-env-dev,
.header-env-test {
    height: 3px;
    cursor: help;
}
.header-env-dev {
    background: orange;
}
.header-env-test {
    background: maroon;
}
</style>

<script>
import headerModule from '~/components/header'
import footerModule from '~/components/footer'
export default {
    data() {
        return {
            isDev: false,
            isTest: false
        }
    },
    props: ['header'],
    components: {
        headerModule,
        footerModule
    },
    mounted() {
        if (this.$route.query.isApplet) {
            window.__isApplet = true
        }
        switch (process.env.NODE_ENV) {
            case 'development':
                this.isDev = true
                break
            case 'test':
                this.isTest = true
                break
        }
        if (!global.__userChecked) {
            global.__userChecked = true
            this.$userCheck(_ => 'stop')
        }
        let { seajs } = require('seajs/dist/sea')
        try {
            seajs.use(
                'https://s19.cnzz.com/z_stat.php?id=1273192544&web_id=1273192544'
            )
        } catch (e) {}
    },
    head: {
        link: [
            {
                rel: 'stylesheet',
                href: 'https://at.alicdn.com/t/font_761749_ec8y6d2an4b.css'
            }
        ]
    }
}
</script>
<style lang="less">
body,
html,
#__nuxt,
#__layout,
.layout {
    height: 100%;
}
</style>

<style lang="less" scoped>
@import '~assets/css/config';
/* PC端 */
@media (min-width: @screen-sm-min) {
    @footer-height-pc: 50px;
    @footer-margin-top-pc: 20px;
    .layout {
        &-body {
            min-height: 100%;
            margin-bottom: -@footer-height-pc;
            &-content {
                padding-bottom: @footer-height-pc + @footer-margin-top-pc;
            }
        }
    }
    // .header {
    //     margin-bottom: @header-margin-bottom-pc;
    // }
    .footer {
        min-height: @footer-height-pc;
    }
}
/* 移动端 */
@footer-height-sm: 50px;
@footer-margin-top-sm: 20px;
@media (max-width: @screen-sm-max) {
    .layout {
        &-body {
            min-height: 100%;
            margin-bottom: -@footer-height-sm;
            &-content {
                padding-bottom: @footer-height-sm + @footer-margin-top-sm;
            }
        }
    }
    .footer {
        min-height: @footer-height-sm;
    }
}
</style>
