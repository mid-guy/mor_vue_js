<template>
  <p class="text" :class="styles"><slot></slot></p>
</template>

<script>
export default {
  props: {
    styles: ""
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/variables.scss';
  .text{
    margin-top: 0; 
    @include font-apple;
  }
</style>