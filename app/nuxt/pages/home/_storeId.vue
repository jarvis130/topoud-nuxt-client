<template lang="pug">
div
</template>
<script>
export default {
    asyncData({ params, redirect, query }) {
        redirect(
            '/h-' + params.storeId + '?topoudToken=' + (query.topoudToken || '')
        )
    }
}
</script>
