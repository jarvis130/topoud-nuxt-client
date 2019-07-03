const path = require('path')
// const webpack = require('webpack')
module.exports = {
    srcDir: path.join('./app/nuxt'),
    head: {
        title: '云柬名片',
        meta: [
            {
                name: 'viewport',
                content:
                    'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
            },
            {
                name: 'description',
                content: 'description'
            },
            {
                name: 'renderer',
                content: 'webkit'
            }
        ]
    },
    css: [
        { src: 'element-ui/lib/theme-chalk/index.css' },
        { src: '~assets/css/global.less', lang: 'less' }
    ],
    router: {
        // middleware: 'router',
        scrollBehavior: function(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            }
            return { x: 0, y: 0 }
        },
        extendRoutes(routes) {
            if (process.env.NODE_ENV !== 'development') return
            // console.log(JSON.stringify(routes))
            let routesLocal = require('./dev-routes.js')
            if (routesLocal.length === 0) return
            let matched = path => {
                for (let i in routesLocal) {
                    if (path.indexOf(routesLocal[i]) === 0) return true
                }
                return false
            }
            // 全部清空
            console.log('--- 全部路由列表 ---')
            let removingArray = []
            for (let i in routes) {
                let route = routes[i]
                let path = route.path
                console.log(path)
                // console.log(path, path.indexOf('/shop/works/detail-wid-'))
                if (!matched(path)) {
                    removingArray.push(i)
                }
            }
            let r = removingArray.reverse()
            // console.log(JSON.stringify(r))
            for (let i in r) {
                routes.splice(r[i], 1)
            }
            console.log('--- 开发环境只提供以下路由 ---')
            for (let i in routes) {
                console.log(routes[i].path)
            }
        }
    },
    loading: {
        color: '#ddd'
    },
    // loading: '~/components/loading.vue',
    plugins: [
        { src: '~/plugins/wechat-jssdk', ssr: false },
        // '~/plugins/axios',
        '~/plugins/utils',
        '~/plugins/ui',
        '~/plugins/component',
        // { src: '~/plugins/component', ssr: false },
        { src: '~/plugins/compatible', ssr: false },
        { src: '~/plugins/directive', ssr: false },
        { src: '~/plugins/user', ssr: false },
        { src: '~/plugins/weui-toast', ssr: false }
    ],
    build: {
        publicPath: '/client/_nuxt/',
        extractCSS: { allChunks: true },
        // extractCSS: true,
        vendor: [
            'axios',
            // 'element-ui',
            // 'vue2-filters',
            // 'vue-currency-filter',
            'vue-lazyload',
            'sticky-sidebar/dist/sticky-sidebar.min.js',
            'resize-sensor'
        ],
        extend(config, ctx) {
            /**
             * 安卓兼容处理
             */
            config.entry['polyfill'] = ['babel-polyfill']
            /**
             * i18n-loader
             */
            // config.module.rules[0].options.loaders.i18n =
            //     '@kazupon/vue-i18n-loader'
            /*
             ** Run ESLINT on save
             */
            if (ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
            config.module.rules.push({
                test: require.resolve('zepto'),
                loader: 'exports-loader?window.Zepto!script-loader'
            })
        }
        // plugins: [
        //     new webpack.ProvidePlugin({
        //         $: 'zepto',
        //         Zepto: 'zepto'
        //     })
        // ]
    },
    render: {
        resourceHints: false
    },
    modules: [
        // 'vue-currency-filter/nuxt',

        // Or if you have custom options...
        // [
        //     'vue-currency-filter/nuxt',
        //     {
        //         symbol: '¥',
        //         thousandsSeparator: ',',
        //         fractionCount: 2,
        //         fractionSeparator: '.',
        //         symbolPosition: 'front',
        //         symbolSpacing: true
        //     }
        // ]
    ]
}
