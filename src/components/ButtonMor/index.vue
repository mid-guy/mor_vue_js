
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
    padding: 8px 16px;
    border: 2px solid black;
    font-size: 16px;
    border-radius: 5px;
  }

</style>