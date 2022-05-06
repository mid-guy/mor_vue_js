<template>
  <button 
    class="btn" 
    :class="{
      'btn-icon': singleIcon,
      'btn--fullWidth': fullWidth,
      'btn--filled--primary': primary,
      'btn--default': text,
      'btn--menu': menu,
      'f-12': fontSizeSmall,
      'btn--align--center': textAlignCenter
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
    primary: Boolean,
    text: Boolean,
    menu: Boolean,
    fontSizeSmall: Boolean,
    textAlignCenter: Boolean
  },
  methods: {
    onClick() {
      this.$emit('onClickEvent')
    } 
  } 
}
</script>

<style lang="scss" scoped>
  @import '@/assets/variables.scss';
  .btn {
    align-items: center;
    background: none;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    display: flex;
    font-size: $--font-size;
    font-weight: 600;
    height: 32px;
    line-height: 20px;
    padding: 5px 16px;
    transition: 0.15s ease-in;
    vertical-align: middle;
    white-space: nowrap;
    @include font-apple;
  }
  .btn--default {
    &:hover {
      background-color: $--color-btn-default-hover;
    }
  }
  .btn--menu {
    width: 100%;
    border-radius: 0;
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
  .btn--align--center {
    justify-content: center;
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
  .f-12 {
    font-size: 12px;
  }
</style>