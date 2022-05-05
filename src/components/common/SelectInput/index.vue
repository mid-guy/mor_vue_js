<template>
  <div class="select_input_container">
    <input 
      class="form-control" 
      @focus="handleOpenSelect"
      readonly
      :name="name"
      :value="value" 
      :disabled="disabled"
    />
    <div class="select_items">
      <slot 
        name="option" 
        :isOpen="isOpen" 
        :onToggle="handleOpenSelect"
      >
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  props: {
    value: String,
    name: String,
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean, 
      default: false
    },
  },
  methods: {
    onChange(e) {
      this.$emit('onChange', { name: this.name, value: e.target.value } )
    },
    handleOpenSelect() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/variables.scss';
  .select_input_container {
    position: relative;
    .form-control {
      @include font-apple;
      padding: 5px 12px;
      line-height: 20px;
      vertical-align: middle;
      border-radius: 6px;
      outline: none;
      border: 1px solid $--color-border-default;
      transition: 0.15s ease-in;
      width: 100%;
      box-sizing: border-box;
      &:focus {
        border-color: $--color-border-focus-visible;
        box-shadow: inset 0 0 0 1px $--color-border-focus-visible;
      }
    }
    .select_items {
      position: absolute;
      top: calc(100% + 2px);
      z-index: 1005;
      width: 100%;
      border-radius: 5px;
      background-color: #FFFFFF;
      -webkit-box-shadow: 0px 2px 10px 1px rgb(0 0 0 / 20%);
      box-shadow: 0px 2px 10px 1px rgb(0 0 0 / 20%);
    }
    input:disabled {
      opacity: 0.65;
    }
  }
</style>