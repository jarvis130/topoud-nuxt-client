/*
 * @Author: 刘盾 Liudun (liudun@beclon.com)(bach109109@qq.com)(liudun@zbj.com)
 * @Date: 2019-02-26 09:25:47
 * @Last Modified by: 刘盾 Liudun (liudun@beclon.com)(bach109109@qq.com)(liudun@zbj.com)
 * @Last Modified time: 2019-05-23 14:59:01
 * 入口文件
 */

var express = require('express')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var development = process.env.NODE_ENV === 'development'
var app = express()
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 接口服务
if (!development) {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
        )
        res.header(
            'Access-Control-Allow-Methods',
            'PUT,POST,GET,DELETE,OPTIONS'
        )
        res.header('Access-Control-Allow-Credentials', true)
        res.header('Access-Control-Allow-Origin', req.headers.origin)
        if (req.method === 'OPTIONS') {
            res.sendStatus(200)
            return res.end()
        }
        next()
    })
}
// app.use(require('./api/routes/location-hash'))
// app.use(require('./api/routes/location-api'))

// nuxt
var { Nuxt, Builder } = require('nuxt')
var config = require('../nuxt.config.js')
config.dev = development

if (!process.env.NODE_APITEST) {
    var nuxt = new Nuxt(config)
    if (config.dev) {
        let ip = require('ip')
        let fs = require('fs')
        let path = require('path')
        let p = path.join(__dirname, '../.localip.js')
        fs.writeFileSync(p, "export default '" + ip.address() + "'\n")
        //
        var builder = new Builder(nuxt)
        builder.build().then(_ => {
            let devRoutes = require('../dev-routes')
            console.log(
                `点击打开局域网链接：http://${ip.address()}:4001/client`
            )
        })
        //
    }
    app.use(nuxt.render)
}

module.exports = app
