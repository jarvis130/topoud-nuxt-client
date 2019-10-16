# topoud-nuxt-client

-   一套 vue nuxt 的 web 规范且快速解决方案 官方文档https://zh.nuxtjs.org/

-   内置框架主要有 elementui / weui 样式
-   https://element.eleme.cn/ https://weui.io/

-   已封装解决方案工具列表
-   -   网络请求/全局接口配置/拦截器 ./app/nuxt/plugins/axios.js
-   -   翻页/滑块/走马灯 https://www.npmjs.com/package/vue-awesome-swiper https://www.swiper.com.cn/
-   -   自动吸顶 https://www.npmjs.com/package/sticky-sidebar (需配合 ResizeSensor)
-   -   图片懒加载 https://www.npmjs.com/package/vue-lazyload
-   -   抓取排序(v-sortable) https://www.npmjs.com/package/sortablejs
-   -   网页移动 https://www.npmjs.com/package/vue-scrollto
-   -   时间日期处理 https://www.npmjs.com/package/vue-moment
-   -   中央事件总线 https://www.npmjs.com/package/vue-bus
-   -   财务数字 https://www.npmjs.com/package/vue-currency-filter

### 环境要求

-   node -v 8.9.4
-   npm -v 5.6.0

### 启动步骤

-   npm install 启动依赖

-   npm start 启动测试环境 (会在终端面板中显示当前环境的 ip 链接，点击即可访问)

-   npm run build 生产环境打包

-   npm run buildtest 测试环境打包

###  启动失败504 502
杀进程
ps -ef|grep node
kill -9 id

ps -ef|grep nuxt
kill -9 id

ps -ef|grep pm2
kill -9 id
启动
sh server/start.prod.sh
检查端口
netstat -tunlp|grep 3200
业务验证
