<template lang="pug">
div
    .weui-cell.weui-cell_access(v-for='item in list.rows' :key='item.id')
        .weui-cell__bd
        .weui-cell__ft {{item.create_time | moment('calendar')}}
    .weui-cell(v-if='list.loading')
        .weui-loading
        |  加载中
    .weui-cell.weui-cell_link.weui-cell_access(v-else-if='list.more' @click='listGet()') 加载更多
    .weui-cell(v-else)
        small 没有更多了
</template>

<script>
export default {
    mounted() {
        this.listGet()
    },
    data: () => ({
        list: {
            rows: [],
            page: undefined,
            loading: false,
            more: false,
            size: undefined
        }
    }),
    methods: {
        listGet(reload) {
            if (this.list.loading) return
            if (reload) {
                this.list.rows = []
                this.list.page = undefined
                this.list.more = false
            }
            this.list.loading = true
            let { page, size } = this.list
            return this.$axios(___URL___, {
                params: {
                    page,
                    size
                }
            })
                .then(({ data }) => {
                    this.list.loading = false
                    if (!data.success) throw new Error(data.message)
                    let { rows, size, page, count } = data
                    this.list.page = parseInt(page) + 1
                    for (let i in rows) {
                        this.list.rows.push(rows[i])
                    }
                    this.list.more = count > page * size
                })
                .catch(({ message }) => {
                    this.list.loading = false
                    this.$nuxt.error(message)
                })
        }
    }
}
</script>
