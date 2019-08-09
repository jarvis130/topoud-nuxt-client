<template lang="pug">
.industries(v-if='industries')
    template(v-for='list in industries')
        .weui-cells__title {{list.industryName}}
        .weui-cells
            .weui-cell
                .weui-cell__bd
                    .industry-label(@click='select(item.industryId)' v-for='item in list.children') {{item.industryName}}
</template>
<style>
.industry-label {
    display: inline-block;
    border: 1px solid rgba(232, 232, 232, 1);
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 1;
    margin: 4px 8px 4px 0;
}
</style>
<script>
export default {
    data() {
        return { industries: false }
    },
    mounted() {
        let { _myHomepageIndustryTree } = window
        if (!_myHomepageIndustryTree) {
            return this.$router.replace('/client/my/homepage/create')
        }
        this.industries = _myHomepageIndustryTree
    },
    methods: {
        select(industryId) {
            window._myHomepageIndustryTreeSelectedIndustryId = industryId
            this.$router.go(-1)
        }
    }
}
</script>

