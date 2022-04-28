
<script>
  export default {
    props: {
      content: String,
    },
    methods: {
      onClick() {
        this.$emit('onClickEvent')
      } 
    } 
  }
</script>

<template>
  <button @click="onClick" class="mor_base_btn">
    {{ content }}
  </button>
</template>

<style scoped>
  .mor_base_btn {
    background: none;
    cursor: pointer;
    padding: 10px 16px;
    height: 43px;
    color: #FFF;
    border: 2px solid black;
    font-size: 14px;
    background-color: black;
    border-radius: 5px;
  }
</style>