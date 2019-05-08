<template>
  <div class="__nuxt-error-page">
    <div class="error">
      <div style="width: 200px; margin: 0 auto; position: relative">
        <img style="width: 120px;">
      </div>
      <div class="title">{{error.message || '无法访问了'}}</div>
      <p class="description">{{error.description || "矮哟? 出了点问题的样子"}}</p>
      <div class="logo" v-if="!isApplet">
        <nuxt-link to="/" rel="noopener">xxx.com</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: ['error'],
    data() {
        return { isApplet: false }
    },
    mounted() {
        if (this.$route.query.isApplet) {
            window.__isApplet = true
        }
        this.isApplet = window.__isApplet
    }
}
</script>

<style lang="less" scoped>
.__nuxt-error-page {
    padding: 16px;
    padding: 1rem;
    background: #f7f8fb;
    color: #47494e;
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    font-family: sans-serif;
    font-weight: 300 !important;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .error {
        max-width: 450px;
        margin-bottom: 200px;
    }
    .title {
        font-size: 24px;
        font-size: 1.5rem;
        margin: 15px 35px;
        color: #47494e;
        margin-bottom: 8px;
        max-height: 76px;
        overflow: hidden;
    }
    .description {
        // color: #7f828b;
        line-height: 21px;
        margin-bottom: 10px;
    }
    .logo {
        position: fixed;
        left: 12px;
        bottom: 12px;
    }
    a {
        color: #7f828b !important;
        text-decoration: none;
    }
}
</style>
