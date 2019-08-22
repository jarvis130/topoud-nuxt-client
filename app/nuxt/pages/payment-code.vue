/*
 * 公众号点击按钮生成二维码展示页面
 * first 冉龙航 2019-8-8
 * change rlh 2019-8-22
 */
<template>
    <div class="payment">
        <div class="payment-conten">
            <div class="car-img">
                <img src="../static/payment/card.svg" v-if="showCard" />
                <img src="../static/payment/store.svg" v-else />
            </div>
            <div class="pay-btn" @click="paymentF">微信支付 （￥{{howMuch}}）</div>
            <div class="payment-page" v-if="payment">
                <div class="payment-code">
                    <div class="code" v-if="showCode">
                        <div v-if="show">{{text}}</div>
                        <div id="qrcode" ref="qrcode" class="code-img" v-if="!show"></div>
                        <div v-if="!show">长按或扫描二维码进行支付</div>
                        <div @click="refreshF" v-if="refresh" class="refresh">重 试</div>
                    </div>
                    <div class="close" @click="close">X</div>
                </div>
            </div>
        </div>
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
            params: {},
            // 显示img
            showCard: true,
            // 价格
            howMuch: 0,
            // 付款弹窗
            payment: false,
            showCode: true
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
                        this.refresh = true
                    }
                })
                .catch(message => {
                    this.show = true
                    this.payUrl = ''
                    this.text = '生成失败，请点击重试'
                    this.refresh = true
                })
        },
        // 重新生成
        refreshF: function() {
            this.getUrl(this.params)
        },
        // 点击付款
        paymentF: function() {
            this.payment = true
            this.getUrl(this.params)
        },
        // 关闭
        close: function() {
            this.payment = false
        }
    },
    mounted() {
        // productId 点击后通过地址传参获取 10477(名片)  10478（商城）
        this.params = {
            wechatId: 5,
            productId: this.$route.query.productId
        }
        if (this.$route.query.productId === '10477') {
            this.showCard = true
            this.howMuch = 270
        } else {
            this.showCard = false
            this.howMuch = 1791
        }
    }
}
</script>

<style scoped>
.payment {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
}
.payment-conten {
    width: 100%;
    height: 100%;
    position: relative;
}
.car-img {
    width: 100%;
    height: 90%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #47485A;
    text-align: center;
}
img {
    width: 100%;
    height: 100%;
}
.pay-btn {
    width: 100%;
    height: 60px;
    background-color: #05C160;
    color: #fff;
    line-height: 60px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
}
.payment-page {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    overflow: hidden;
}
.payment-code {
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;
}
.close {
    position: absolute;
    top: 0px;
    right: 10px;
    font-size: 36px;
}
.code-img {
    background-color: #fff;
    padding: 6px;
}
.code {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
}


</style>
