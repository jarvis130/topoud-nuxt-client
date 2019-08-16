<template lang="pug">
.article 
    //- .test {{article}}
    .weui-panel
        h1.title {{article.title}}
        .author
            span.source {{article.source}}
            div
                span.date {{article.formatDate}}
                span.visit 阅读量：{{article.clickRateFormat}}
        .sharer(v-if='article.articleCardDTO && article.articleCardDTO.name')
            .weui-cell
                img.headimg(v-if='article.articleCardDTO.logo' :src='article.articleCardDTO.logo')
                .headimg(v-else)
                .weui-cell__bd
                    span.name {{article.articleCardDTO.name || ''}}
                    span.position {{article.articleCardDTO.position || ''}}
                    .company {{article.articleCardDTO.company || ''}}
                .weui-cell__ft(style='color:#3A4D7A;font-size:14px;weight: 500; cursor:pointer;' @click='showAcode = true') 认识Ta >
        .content(v-html='article.content')
        .end - END -
        .visitors(v-if='visitors && visitors.length >= 15')
            img(v-for='visitor in visitors' :src='visitor.logo')
            img(src='data:image/png;base64,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')
            .read-count 阅读量：{{article.clickRateFormat}}
        .weui-flex.data
            .weui-flex__item
                span.forward 转发：{{article.forwardRateFormat}}
            .weui-flex__item
                span.praise 点赞：{{article.praiseRateFormat}}
    .weui-panel(v-if='article.qrcode')
        .qrcode
            .weui-flex
                .weui-flex__item
                    img.code(:src='`https://`+article.qrcode')
                .weui-flex__item(style='padding-top: 15px;')
                    p 扫码认识一下
                    p 和你有共同阅读爱好的TA吧
                    img.scan(src='~/assets/img/article/finger.png')
    .comments.weui-cells(v-if='comments && comments.length')
        .article-panel-title 评论区
        .list
            .weui-cell(v-for='item in comments').top
                img(:src='item.userCover')
                .weui-cell__bd
                    .name {{item.nickname}}
                    .content {{item.content}}
                    .date {{item.dateTime}}
    .recommends.weui-cells(v-if='recommends && recommends.length')
        .article-panel-title 相关推荐
        .list
            nuxt-link.weui-cell(v-for='item in recommends' :key='item.id' :to='`/c-${item.id}`')
                img(v-lazy='item.logo')
                .weui-cell__bd
                    .title {{item.title}}
                    .weui-flex
                        .weui-flex__item
                            .subtitle {{item.source}}
                        .read {{item.clickRateFormat}}
    template(v-if='article.articleCardDTO && article.articleCardDTO.name')                            
        transition
            .weui-mask(v-show='showAcode' @click='showAcode = false')
        transition
            //- .weui-skin_android.track-selector
            .weui-actionsheet.weui-actionsheet_toggle(v-show='showAcode')
                .acode-actionsheet
                    .close(@click='showAcode = false') +
                    .acode-title {{article.articleCardDTO.name || ''}}邀请您扫码查看他的名片
                    .acode-image
                        img(:src='`https://`+article.qrcode')
                    .acode-tips 长按或扫描二维码，登陆小程序继续操作
    .ground-float-container
        .ground-float(@click='showAcode2 = true') 内容广场                       
    transition
        .weui-mask(v-show='showAcode2' @click='showAcode2 = false')
    transition
        //- .weui-skin_android.track-selector
        .weui-actionsheet.weui-actionsheet_toggle(v-show='showAcode2')
            .acode-actionsheet
                .close(@click='showAcode2 = false') +
                .acode-title 登陆后就可以查看更多文章了哦
                .acode-image
                    img(:src='`https://`+qrcode')
                .acode-tips 长按或扫描二维码，登陆小程序继续操作
    
</template>
<style lang="less">
.article .content {
    margin-top: 12px;
    font-size: 15px;
    font-weight: 400;
    font-family: Source Han Sans CN;
    line-height: 23px;
    color: rgba(11, 14, 21, 1);
    & > * + * {
        margin-top: 16px;
    }
    img {
        width: 100%;
        border-radius: 4px;
    }
    video,
    .ql-video,
    iframe {
        width: 100%;
        height: 300px;
    }
}
</style>

<style lang="less" scoped>
.ground-float-container {
    position: absolute;
    right: 54px;
}
.ground-float {
    z-index: 20;
    position: fixed;
    border-radius: 50%;
    bottom: 14px;
    // right: 14px;

    width: 44px;
    height: 44px;
    color: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px rgba(209, 209, 209, 1);
    padding: 10px;
    font-size: 11px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    text-align: center;
    line-height: 12px;
    background: rgba(212, 163, 86, 1);
}
.article-panel-title {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 800;
    line-height: 28px;
    color: rgba(11, 14, 21, 1);
    margin: 30px 0 12px 15px;
}
.visitors {
    padding-top: 30px;
    border-top: 1px solid #ccc;
    line-height: 1;
    padding-bottom: 15px;
    margin-top: 30px;
    img {
        width: 30px;
        height: 30px;
        margin-right: -4px;
        border-radius: 50%;
        border: 1px solid white;
        margin-bottom: 6px;
        line-height: 1;
    }
    .read-count {
        font-size: 12px;
        float: right;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 23px;
        color: rgba(151, 157, 165, 1);
        padding-top: 4px;
        // display: inline-block;
    }
}
.acode-title {
    font-size: 18px;
    font-family: Source Han Sans CN;
    text-align: center;
    font-weight: bold;
    line-height: 24px;
    padding-top: 37px;
    color: #0b0e15;
}
.acode-image {
    width: 161px;
    height: 161px;
    margin: 15px auto;
    img {
        border-radius: 50%;
        width: 100%;
        padding: 10px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.17);
    }
}
.acode-tips {
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 21px;
    color: rgba(151, 157, 165, 1);
    padding-bottom: 50px;
    text-align: center;
}
.acode-actionsheet {
    position: relative;
    background: white;
    .close {
        position: absolute;
        right: 15px;
        color: #aaa;
        top: 15px;
        transform: rotate(45deg);
        font-size: 22px;
        line-height: 1;
        font-weight: 300;
    }
}

.comments {
    margin-top: 10px;
    img {
        height: 32px;
        width: 32px;
        border-radius: 5px;
        margin-right: 10px;
    }
    .name {
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        color: rgba(58, 77, 122, 1);
    }
    .content {
        font-size: 14px;
        font-weight: 500;
        line-height: 18px;
        color: rgba(11, 14, 21, 1);
        margin: 5px 0;
        word-break: break-all;
        // max-width: 280px;
        // overflow: hidden;
    }
    .date {
        font-size: 12px;
        font-weight: 400;
        line-height: 23px;
        color: rgba(151, 157, 165, 1);
    }
}
.recommends {
    img {
        width: 76px;
        height: 76px;
        border-radius: 4px;
        margin-right: 10px;
    }
    .title {
        height: 47px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 22px;
        color: rgba(11, 14, 21, 1);
        overflow: hidden;
    }
    .subtitle {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 17px;
        color: rgba(151, 157, 165, 1);
    }
    .read {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 17px;
        color: rgba(151, 157, 165, 1);
        padding-left: 24px;
        background-repeat: no-repeat;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAXCAYAAACMLIalAAAErUlEQVRIS5VXXWhcRRQ+32yy3WxjKKUJJrpJ7s69scX4R9ZaWkFTH4qgVPogmCCmQWgFKQUfilQlgoUiSgs+WEWxIlQNonlotf7gihZsRVohm5p67927BhJoDau0TZYmuXNklt2wTfbu3Z7X7ztnvjlzzpkZ0C2a53n3+77/oBBiGzObRHQHEXWXwhSYeRpAjojGmfmcEOJsMpn8+1aWQT1kz/O6l5aWBoQQLxJRez0+lRxmPi+EOBqJRE52dXX9G+ZfU1Qul9vk+/4rRDRQJVAewA++73/R0NAwvrCwMCuE6ATQD+ApInq4is88Mx+Jx+NHOzo6ZoPEVRWVyWSa4/H4AWbWglYZgM+VUvtM07wSFNhxnO1CiA+Y2ajCmQMwZBjGlwDUSnyVKNd1LWb+GoCul5WmAxyUUh4OOwKNT0xMrI/FYt8Q0eYA/omWlpa9ra2t1yrxm0Q5jvM4EY0BiAYEOSylfLmMjYyMiKGhobuUUluZuVkIMRmLxc63t7f/U+borDc1NU0QUWe1mMzsrF27dmulz7Ioz/N2KKVO18hARkp5Txn3PG+dUuokEW1blX7gOcMwPgHAGtNHCeB7IhIBwmaYeZNlWVc1XhQ1NTXVu7i4OF7rSHzfH+jp6flUc9LpdCyRSGQAyCAfXY+maR4q447jnAawI7C4gQv5fP6hVCq1iEwmE43FYi6AO2uIui6lvK2Mu677LhHtDasrABuTyeQlzbNte1gI8WGIz5tSygNwHOclAG+FkL+SUu7SHGYW2WzWDxNU4r5jmua+0hG2Abgc5rdmzZoNcF33TyLaGEI+JqV8obTjR4UQ6bDgJfwPKeUDFRku1liI7deidJuHTfYRKeXrJVE7hRBjYZFLeE5KuTynHMfJAegK8T2iRZ2rMUfK/h9JKYdLorYIIX6tU9TPUspHKjJVTwIGdU3tAXAsZJFTUsonNGd0dDTS19eXJ6KWMGHMfMg0zeKtYNu2FEI4IT5XC4VCK9LpdENnZ6feeaqGw2KhUGju7e1d0JxsNnuQmd8IWeBGNBrtSCQSegPkuq7uVt21gcbMe0zTfL9YS57n3a6U+ouIltt+pSeA55PJZLGl9UYSicS3ALYHraCU2mFZ1ndl3HGccQC9QXwAHxuGsVsP3OUCz2azm5n5FyIKumKuFAqFRDlbnufFlFIHiGhkxUJTQoinDcPQtVo027ZrNgeA0fn5+WfLsW/qOtu27xZC/EhEbdV2xMyfmab5TCXmOE4bM+t6iQOYzefzF/VULnMmJyeNaDT6OzOvD8jSCaXUsGVZN8r4qlGgFyk9OZ4MCHJcSrk7rMg1rgU1Njb+FHAZ6/rcn0wm31v5fKk6n3SHpVKpQaXU2wA2VBHwWyQS2dvd3X0hSJzruvuJ6FUiqpahM0qpPZZlXazmX3No2rbdGolE9jGzvipuGgHMvATgLBGdAuD4vn9NCKHf6/cS0c6Kd3vlupNKqddM09SPu8CrKmySFwPOzMzE5+bmdgEYBPAYETXWc3wlzmVmHmPm45Zl6U2EWl2iKqPod5Tv+1sA3KfvTADFnwwzrwPwHzNf178ZpdQlpdSZ6enpTH9//1KokgrC/4VA54SAey67AAAAAElFTkSuQmCC);
        background-size: 18px 11px;
        background-position-y: 1px;
    }
}
.qrcode {
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    line-height: 17px;
    color: rgba(178, 106, 0, 1);
    .code {
        width: 120px;
        height: 120px;
    }
    .scan {
        width: 75px;
        height: 71px;
    }
}
.sharer {
    background: #f7f7f7;
    border-radius: 100px 4px 4px 100px;
    margin-right: -15px;
    margin-bottom: 10px;
    .headimg {
        border-radius: 50%;
        background: #aaa;
        height: 50px;
        width: 50px;
        margin: 6px 10px 6px 0;
    }
    .name {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 23px;
        color: rgba(11, 14, 21, 1);
    }
    .position {
        margin-left: 10px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 23px;
        color: rgba(151, 157, 165, 1);
    }
    .company {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 23px;
        color: rgba(151, 157, 165, 1);
    }
}
.data {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 23px;
    color: rgba(151, 157, 165, 1);
    .forward {
        padding-left: 24px;
        background-repeat: no-repeat;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAADBUlEQVRYR73XTWjTYBgH8Od5U4NtpUOHUgqVNTTgoIKoMHTTWfU0RASniA6cIF6G4FUQj54EQS/KDqKH4lAPCgNBRRiCoFFE8DNv0q11MIYiODUl1PeRlHb0u6lrk2uf959f/vlqELqwcc5vEdFZVVV/thOP7Qy7neWcv0bE1UKIHe2AuonZCgAfbNve3d/f/93NgXQb4xi+2La90w3IC0wBZFnWcCKRWGjWkFcYICIjl8sNNQN5hnEacUBEtEdV1a/1GuoIRtO0VaFQKC5JUq8QopcxdhUANjY4JbOyLA9Fo9H56t//C0NEaJrmCAAcIKIBRNwCAO1kzQohdlU31E4AZLNZv23bFwFgHADCbm7XJjOzkiTt7evrS5dmXGGKTYwj4mUiWrdCRPnyrCRJwyVQS4ymaYGenp5JxtjxDiKWo4hoXpKk/bFY7FNTjK7r6xljTwFgczcgZZkLjLFkQ0w6nQ4LIWYAQO0ypBBPRFN1MYuLi2uWlpZeAcAmLyAAMBMMBkdqMMWLNQUAxzyCPPb7/YcikcifGoxpmqNEdNcjyBNZlg9Go1HL2V8FhnO+ARF1AAh5gJmWZflICVKD0XX9CmPsnBcQxthoLBbLle9ruRnOeRQRTQDwucCkEfElEb1ljH3M5/MZn8/3o7ROCPGw0eOAiKYlSaqBVDRjGMYlADjfAEIA8IyIHjhhqqoazcCGYTh34vY6M/czmcxYMpmsaKTidTA3N7c2n887r/VAVYANACkhxDVVVd+4aKwwwjnXEHFb1fw9y7JOJBIJJ7PuVjhNpmmeJqLJqok7QogLrVqol2oYhgYA5ZiUZVmnmkGWT5NhGM8BYLD4JPzFGJtQFOW22yaq56owKUVRTiJivlUeFm9n57+p09J7RDysKMrnVgtbXDOlZm4qinLGDaTQjK7rRxljUwCgCSH2tfOd0whUvIDfFSF/3R6Y08wNRBwIBoOD4XD4t9uFzeZ0XZ+Ix+PXEdE1pNAM5/xRIBAYi0Qi3zoBWUmGc5qcT9AXKwnp1Np/ODJE8VnhimkAAAAASUVORK5CYII=);
        background-size: 18px 11px;
        background-position-y: 1px;
    }
    .praise {
        padding-left: 20px;
        background-repeat: no-repeat;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAACtUlEQVRIS72WTWgTQRiG32/bRNtDzMFiQdLD7qw1SrGHHjyotAdPxdoKelIUCr0IehDUm3oRBVFBEP9AUIqgBxV7UqRoEQVz8BAUzf7QRr3VooI1aTKfTEhKummyyZp2b7vzPe+zMzuzMwTPNTk52drV1bUfwCiAbQDWM3NO07SXUsrHQoibXsZ13U4p5TEAewBsBfALwBdmfgHggRAi6WWo/IHruv1SylsATG9h2f3HbDa7Kx6Pz6pnjuMcZOY7ANZUY4joWigUOhWLxeZLNYtiy7JGiOghgNYa0lLTn3A4HMtms4cAXAag+THM/IqZh0zTVKOBgth13V4p5btab+0NZuZZIooCaPGTlrVP6Lo+TET5gthxnLfMvL2BgMClzDwmhLhNjuPsZObXgZMaB1OGYWwi27avAjjeOB+cYOYeJf4EYHPwmEDkUSX+CSASCA8OXSTLshaIqJ4lFFxTSd5QPf4KYGMzU/2ymPm86vETItrrV9zMdiI6oMRHiOhuM4N9sjIANqihXgfgO4D21ZAz8z0hxOHCn8u27TMAzq6CWE3kHl3XPxfEiUSiPRqNJogovsLyc4ZhFDq4uDulUqktRPSBiEIrJH8zMzPTPzAwkFsiLm4Wo8W9tdnuH8zcK4RIl4KXHASK8kvMfKJZZmbOEtEOwzDel2dWiJm5xXGcRwBGmiEnoiFd1595syrEqsB13bX5fH6ciPb9j1xKOWya5tPlMpYVq8JkMhlua2u7Xjz0NeqfL0qfVwOrihXAzOqgcBLAhXrNRDTNzLsNw0jVYmqKS6Bt24MAJuqQT0UikcGOjo7ffrV1iVVIOp0WmUxmiog6q4RemZubO9XX17fgJ61Yx36AmnRSynEA5ZPuLxGN6bp+34+vuZz8YPXdLcs6rWma+vbTuVxusLu7+5sf523/B/OJBucoVcnhAAAAAElFTkSuQmCC);
        background-size: 14px 14px;
    }
}
.end {
    font-weight: bolder;
    color: #ccc;
    text-align: center;
    font-size: 12px;
    margin: 31px 0 20px 0;
}
.author {
    margin: 20px 0;
    .source {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 28px;
        // color: rgba(58, 77, 122, 1);
        color: rgba(151, 157, 165, 1);
    }
    .date {
        font-size: 14px;
        font-weight: 400;
        line-height: 28px;
        color: rgba(151, 157, 165, 1);
    }
    .visit {
        float: right;
        font-size: 14px;
        margin-left: 10px;
        font-weight: 400;
        line-height: 28px;
        color: rgba(151, 157, 165, 1);
    }
}
.article {
    position: relative;
    margin: 0 auto;
    max-width: 600px;
    .weui-panel {
        padding: 20px 15px;
        .title {
            font-size: 22px;
            font-weight: bold;
            line-height: 28px;
            color: rgba(11, 14, 21, 1);
        }
    }
}
</style>

<script>
export default {
    mounted() {
        this.extraInfo()
    },
    watch: {
        '$route.params.articleId'() {
            this.extraInfo()
        }
    },
    methods: {
        extraInfo() {
            let {
                query: { sharerId },
                params: { articleId }
            } = this.$route
            let {
                article: { typeId }
            } = this
            this.$axios
                .post(
                    this.$axios.icardURL +
                        '/javaapi/card/comment/listCommentInfoListForH5',
                    {
                        data: { sharerId, articleId }
                    }
                )
                .then(({ data: { result: comments } }) => {
                    this.comments = comments
                })
            this.$axios
                .post(
                    this.$axios.icardURL + '/javaapi/card/article/getQrcode',
                    {
                        data: { sharerId, articleId, type: 1 }
                    }
                )
                .then(({ data: { result: qrcode } }) => {
                    this.qrcode = qrcode
                })
            this.$axios
                .post(
                    this.$axios.icardURL +
                        '/javaapi/card/article/getArticleReaderH5',
                    { data: { articleId, showNum: 15 } }
                )
                .then(({ data: { result: visitors } }) => {
                    this.visitors = visitors
                })
            this.$axios
                .post(
                    this.$axios.icardURL +
                        '/javaapi/card/article/getRecommendListH5',
                    { data: { articleId, typeId } }
                )
                .then(({ data: { result: recommends } }) => {
                    this.recommends = recommends
                })
            window.__wechatShareImgUrl = this.article.logo
            // let imgUrl, title, desc
            // debugger
            // this.$wechatShareUpdate({ imgUrl, title, desc })
        }
    },
    data() {
        return {
            showAcode: false,
            showAcode2: false,
            comments: [],
            qrcode: '',
            visitors: [],
            recommends: []
        }
    },
    head() {
        let { intro: content, title } = this.article
        return {
            title,
            meta: [
                {
                    name: 'description',
                    content
                }
            ]
        }
    },
    asyncData({
        error,
        params: { articleId },
        query: { sharerId },
        app: { $axios }
    }) {
        // console.log({ sharerId, articleId })
        return $axios
            .post(
                $axios.icardURL + '/javaapi/card/article/getArticleDetailByH5',
                {
                    data: { sharerId, articleId }
                }
            )
            .then(({ data, data: { success, msg, result: article } }) => {
                if (!success) throw Error(msg)
                // console.log(data)
                return { article }
            })
            .catch(({ message }) => {
                return error({ message })
            })
    }
}
</script>
