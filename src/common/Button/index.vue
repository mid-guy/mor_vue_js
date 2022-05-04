<template>
  <button 
    class="btn" 
    :class="{
      'btn-icon': singleIcon,
      'btn--fullWidth': fullWidth,
      'btn--filled--primary': primary,
    }"
    @click="onClick" 
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    fullWidth: Boolean,
    singleIcon: Boolean,
    primary: Boolean
  },
  methods: {
    onClick() {
      this.$emit('onClickEvent')
    } 
  } 
}
</script>

<style lang="scss" scoped>
  @import '../../assets/variables.scss';
  .btn {
    height: 32px;
    padding: 5px 16px;
    font-size: $--font-size;
    font-weight: 600;
    line-height: 20px;
    border-radius: 5px;
    white-space: nowrap;
    vertical-align: middle;
    display: flex;
    align-items: center;
    transition: 0.15s ease-in;
    background: none;
    border: none;
    cursor: pointer;
    @include font-apple;
  }
  .btn--default {
    &:hover {
      background-color: $--color-btn-default-hover;
    }
  }
  .btn-icon {
    padding: 5px 8px;
    border-radius: 16px;
    &:hover {
      background: none;
    }
  }
  .btn--fullWidth {
    width: 100%;
  }
  .btn--filled--primary {
    &:hover {
      background-color: $--color-btn-primary-hover;
    }
    background-color: $--color-btn-primary;
    color: $--color-btn-text;
  }
</style>