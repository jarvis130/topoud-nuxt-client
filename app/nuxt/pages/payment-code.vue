/*
 * 公众号点击按钮生成二维码展示页面
 * first 冉龙航 2019-8-8
 */
<template>
  <div class="payment-page">
    <div v-if="show">{{text}}</div>
    <div id="qrcode" ref="qrcode" class="code-img" v-show="!show"></div>
    <div @click="refreshF" v-if="refresh" class="refresh">重 试</div>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            text: '',
            show: true,
            refresh: false,
            // 支付链接
            payUrl: '',
            // 传参
            params: {}
        }
    },
    methods: {
        // 生成二维码
        qrCode: function(url) {
            const QRcode = require('qrcodejs2')
            let qrcode = new QRcode(this.$refs.qrcode, {
                width: 300, // 图像宽度
                height: 300, // 图像高度
                colorDark: '#000000', // 前景色
                colorLight: '#ffffff', // 背景色
                typeNumber: 4,
                correctLevel: QRcode.CorrectLevel.H // 容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
            })
            qrcode.clear() // 清除二维码
            qrcode.makeCode(url) // 生成另一个新的二维码
        },
        // 获取链接
        getUrl: function(params) {
            this.text = '生成中...'
            this.refresh = false
            this.$axios
                .post('/wechat/nativePay', params)
                .then(res => {
                    if (res.data.success) {
                        this.show = false
                        this.payUrl = res.data.result.codeUrl
                        this.qrCode(this.payUrl)
                    } else {
                        this.show = true
                        this.payUrl = ''
                        this.text = res.data.message
                    }
                })
                .catch(message => {
                    this.show = true
                    this.payUrl = ''
                    this.text = '生成失败，请点击重试'
                    this.refresh = true
                })
        },
        refreshF: function() {
            this.getUrl(this.params)
        }
    },
    mounted() {
        // productId 点击后通过地址传参获取 10477  10478
        this.params = {
            wechatId: 5,
            productId: this.$route.query.productId
        }
        this.getUrl(this.params)
    }
}
</script>

<style>
.payment-page {
    width: 100%;
    height: 400px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.refresh {
    width: 60px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    margin-top: 10px;
    border-radius: 15px;
    font-size: 16px;
    border: 1px solid #FFCD42;
    background-color: #FFCD42;
}

.code-img {
    background-color: #fff;
    padding: 6px;
}
</style>
