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
        .sharer(v-if='article.articleCardDTO')
            .weui-cell
                img.headimg(v-if='article.articleCardDTO.logo' :src='article.articleCardDTO.logo')
                .headimg(v-else)
                .weui-cell__bd
                    span.name {{article.articleCardDTO.name || ''}}
                    span.position {{article.articleCardDTO.position || ''}}
                    .company {{article.articleCardDTO.company || ''}}
                .weui-cell__ft(style='color:#3A4D7A;font-size:14px;weight: 500; cursor:pointer;' @click='showAcode = true') 认识Ta >
        .content(v-html='article.content')
        //- .end - END -
        .visitors
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
                    p {{article.articleCardDTO.name}}邀请您微信
                    p 扫描左侧二维码查看名片
                    img.scan(src='data:image/png;base64,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')
    .comments.weui-cells(v-if='comments && comments.length >= 15')
        .article-panel-title 评论区
        .list
            .weui-cell(v-for='item in comments').top
                img(:src='item.userCover')
                .weui-cell__bd
                    .name {{item.nickname}}
                    .content {{item.content}}
                    .date {{item.dateTime}}
    .recommends.weui-cells
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
    template(v-if='article.articleCardDTO')                            
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
    video {
        width: 100%;
    }
}
</style>

<style lang="less" scoped>
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
