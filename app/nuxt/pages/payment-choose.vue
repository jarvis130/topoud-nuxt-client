/*
 * 支付选择页面
 */
<template>
  <div class="payment-choose">
    <div class="choose-box">
      <div
        v-for="(choose, index) in chooseList"
        v-bind:key="index"
        v-bind:class="['choose', { 'active' : actives === index }]"
        @click="chooseF(index)"
      >
        {{choose}}
      </div>
    </div>
    <el-button @click="buyF">购买</el-button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      chooseList: [
        '选择1',
        '选择2'
      ],
      actives: 0
    }
  },
  methods: {
    chooseF: function(index) {
      this.actives = index
    },
    buyF: function() {
      console.log(this.actives)
    }
  }
}
</script>

<style>
.payment-choose {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px;
}
.choose-box {
  width: 100%;
  height: 200px;
  display: flex;
}
.choose {
  width: 40%;
  height: 80%;
  margin-right: 10px;
  border: 1px solid #000;
}
.active {
  background-color: #ccc;
}
</style>
