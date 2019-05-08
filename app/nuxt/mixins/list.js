/*
 * @Author: 刘盾 Liudun (liudun@beclon.com)(bach109109@qq.com)(liudun@zbj.com)
 * @Date: 2019-05-08 15:03:24
 * @Last Modified by: 刘盾 Liudun (liudun@beclon.com)(bach109109@qq.com)(liudun@zbj.com)
 * @Last Modified time: 2019-05-08 15:03:44
 *
 * 标准列表方案 需要后端配合统一方案
 */

export default {
    data() {
        return {
            list: {
                loading: true,
                inited: false,
                more: undefined,
                rows: [],
                page: 1,
                size: 12,
                offset: 0,
                removed: 0,
                count: undefined,
                reloading: false
            }
        }
    },
    methods: {
        $listClean() {
            this.list.page = 1
            this.list.removed = 0
            this.list.more = undefined
            this.list.count = undefined
            // if (!this.list.rows.length) return
            this.$set(this.list, 'rows', [])
            // this.list.rows.splice(0, this.list.rows.length)
        },
        $listGet(dataGet, config) {
            let { reload } = config || {}
            this.list.reloading = reload
            if (!dataGet) throw Error('need methods')
            if (this.list.loading && this.list.inited) return Promise.resolve()
            if (!this.list.reloading) {
                if (this.list.more === false) return Promise.resolve()
            } else {
                this.list.page = 1
            }
            let { size, page } = config || {}
            if (!size) size = this.list.size
            if (!page) page = this.list.page
            let { removed, offset } = this.list
            this.list.loading = true
            this.list.more = undefined
            return dataGet({ page, size, removed, offset })
                .then(({ data: { more, count, rows, message } }) => {
                    this.list.inited = true
                    if (!rows) throw Error(message)
                    if (this.list.reloading) {
                        this.$listClean()
                    }
                    for (let i in rows) {
                        this.list.rows.push(rows[i])
                    }
                    this.list.page++
                    if (more === undefined) {
                        more = count / size < page
                    }
                    this.list.count = count
                    this.list.more = more
                    this.list.reloading = false
                    this.list.loading = false
                })
                .catch(_ => {
                    this.list.inited = true
                    this.list.loading = false
                    this.list.reloading = false
                    throw _
                })
        },
        $listSelectAll() {
            let { rows } = this.list
            for (let i in rows) {
                this.$set(rows[i], '_checked', true)
            }
        },
        $listSelectReverse() {
            let { rows } = this.list
            for (let i in rows) {
                this.$set(rows[i], '_checked', !rows[i]._checked || undefined)
            }
        }
    }
}
