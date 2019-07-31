<template lang="pug">
.article 
    h1.title {{article.title}}
    .author
        span.source {{article.source}}
        span.date {{article.formatDate}}
    .sharer(v-if='article.articleCardDTO')
        .weui-cell
            img.headimg(v-if='article.articleCardDTO.logo' :src='article.articleCardDTO.logo')
            .headimg(v-else)
            .weui-cell__bd
                span.name {{article.articleCardDTO.name || ''}}
                span.position {{article.articleCardDTO.position || ''}}
                .company {{article.articleCardDTO.company || ''}}
            //- .weui-cell__ft 认识他 >
    .content(v-html='article.content')
    .end - END -
    .weui-flex.data
        .weui-flex__item
            span.read {{article.clickRateFormat}}
        .weui-flex__item
            span.praise {{article.praiseRateFormat}}
    .test {{article}}
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
}
</style>

<style lang="less" scoped>
.sharer {
    background: rgba(247, 247, 247, 1);
    border-radius: 100px 4px 4px 100px;
    margin-right: -15px;
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
    .read {
        padding-left: 24px;
        background-repeat: no-repeat;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAXCAYAAACMLIalAAAErUlEQVRIS5VXXWhcRRQ+32yy3WxjKKUJJrpJ7s69scX4R9ZaWkFTH4qgVPogmCCmQWgFKQUfilQlgoUiSgs+WEWxIlQNonlotf7gihZsRVohm5p67927BhJoDau0TZYmuXNklt2wTfbu3Z7X7ztnvjlzzpkZ0C2a53n3+77/oBBiGzObRHQHEXWXwhSYeRpAjojGmfmcEOJsMpn8+1aWQT1kz/O6l5aWBoQQLxJRez0+lRxmPi+EOBqJRE52dXX9G+ZfU1Qul9vk+/4rRDRQJVAewA++73/R0NAwvrCwMCuE6ATQD+ApInq4is88Mx+Jx+NHOzo6ZoPEVRWVyWSa4/H4AWbWglYZgM+VUvtM07wSFNhxnO1CiA+Y2ajCmQMwZBjGlwDUSnyVKNd1LWb+GoCul5WmAxyUUh4OOwKNT0xMrI/FYt8Q0eYA/omWlpa9ra2t1yrxm0Q5jvM4EY0BiAYEOSylfLmMjYyMiKGhobuUUluZuVkIMRmLxc63t7f/U+borDc1NU0QUWe1mMzsrF27dmulz7Ioz/N2KKVO18hARkp5Txn3PG+dUuokEW1blX7gOcMwPgHAGtNHCeB7IhIBwmaYeZNlWVc1XhQ1NTXVu7i4OF7rSHzfH+jp6flUc9LpdCyRSGQAyCAfXY+maR4q447jnAawI7C4gQv5fP6hVCq1iEwmE43FYi6AO2uIui6lvK2Mu677LhHtDasrABuTyeQlzbNte1gI8WGIz5tSygNwHOclAG+FkL+SUu7SHGYW2WzWDxNU4r5jmua+0hG2Abgc5rdmzZoNcF33TyLaGEI+JqV8obTjR4UQ6bDgJfwPKeUDFRku1liI7deidJuHTfYRKeXrJVE7hRBjYZFLeE5KuTynHMfJAegK8T2iRZ2rMUfK/h9JKYdLorYIIX6tU9TPUspHKjJVTwIGdU3tAXAsZJFTUsonNGd0dDTS19eXJ6KWMGHMfMg0zeKtYNu2FEI4IT5XC4VCK9LpdENnZ6feeaqGw2KhUGju7e1d0JxsNnuQmd8IWeBGNBrtSCQSegPkuq7uVt21gcbMe0zTfL9YS57n3a6U+ouIltt+pSeA55PJZLGl9UYSicS3ALYHraCU2mFZ1ndl3HGccQC9QXwAHxuGsVsP3OUCz2azm5n5FyIKumKuFAqFRDlbnufFlFIHiGhkxUJTQoinDcPQtVo027ZrNgeA0fn5+WfLsW/qOtu27xZC/EhEbdV2xMyfmab5TCXmOE4bM+t6iQOYzefzF/VULnMmJyeNaDT6OzOvD8jSCaXUsGVZN8r4qlGgFyk9OZ4MCHJcSrk7rMg1rgU1Njb+FHAZ6/rcn0wm31v5fKk6n3SHpVKpQaXU2wA2VBHwWyQS2dvd3X0hSJzruvuJ6FUiqpahM0qpPZZlXazmX3No2rbdGolE9jGzvipuGgHMvATgLBGdAuD4vn9NCKHf6/cS0c6Kd3vlupNKqddM09SPu8CrKmySFwPOzMzE5+bmdgEYBPAYETXWc3wlzmVmHmPm45Zl6U2EWl2iKqPod5Tv+1sA3KfvTADFnwwzrwPwHzNf178ZpdQlpdSZ6enpTH9//1KokgrC/4VA54SAey67AAAAAElFTkSuQmCC);
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
        color: rgba(58, 77, 122, 1);
    }
    .date {
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
    background: white;
    padding: 20px 15px;
    .title {
        font-size: 22px;
        font-weight: bold;
        line-height: 28px;
        color: rgba(11, 14, 21, 1);
    }
}
</style>

<script>
export default {
    mounted() {
        let {
            query: { articleId },
            params: { sharerId }
        } = this.$route
        this.$axios
            .post(
                this.$axios.icardURL + '/card/comment/listCommentInfoListForH5',
                {
                    data: { sharerId, articleId }
                }
            )
            .then(({ data: { result } }) => {
                debugger
            })
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
