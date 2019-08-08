export default ({ app, route, error, req }) => {
    if (process.server) return
    app.$terminal.isWechat && setTimeout(_ => window.$wechatShareUpdate(), 300)
}
