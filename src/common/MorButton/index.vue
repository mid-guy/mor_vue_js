
<script>
  export default {
    props: {
      content: String
    },
    methods: {
      onClick() {
        this.$emit('onClick')
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
    width: 100%;
    padding: 8px 16px;
    color: #FFF;
    border: 2px solid black;
    font-size: 14px;
    background-color: black;
    border-radius: 5px;
  }
</style>