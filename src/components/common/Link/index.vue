<template>
  <a 
    :href="route" 
    class="link-route"
    :class="{'f-12': fontSizeSmall}"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    route: String,
    fontSizeSmall: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/variables.scss';
  .link-route {
    @include font-apple;
    text-decoration: none;
    color: $--color-href-text;
    &:hover {
      text-decoration: underline;
    }
  }
  .f-12 {
    font-size: 12px;
  }
</style>