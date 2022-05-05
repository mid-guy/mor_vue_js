<template>
  <p 
    class="text"
    :class="{
      'f-12': fontSizeSmall,
      'f-16': fontSizelarge,
      'bolder': bolder
    }"

  >
    <slot></slot>
  </p>
</template>

<script>
export default {
  props: {
    fontSizeSmall: {
      type: Boolean,
      default: false
    },
    fontSizelarge: {
      type: Boolean,
      default: false
    },
    bolder: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/variables.scss';
  .text{
    margin-top: 0; 
    @include font-apple;
  }
  .f-12 {
    font-size: 12px;
  }
  .bolder {
    font-weight: 600;
  }
</style>