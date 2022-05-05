
<template>
  <input 
    v-if="!mutiline"
    class='form-control'
    :value="value"
    :type="type"
    @input="handleChange"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    autofocus="autofocus"
  />
  <textarea 
    v-if="mutiline"
    class='form-control'
    rows="5"
    :value="value"
    :type="type"
    @input="handleChange"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    autofocus="autofocus"
  />
</template>
<script>
  export default {
    props: {
      value: { 
        type: String, 
        default: ''
      },
      name: String,
      type: {
        type: String,
        default: 'text'
      },
      mutiline: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleChange(e) {
        this.$emit('onChangeValue', { name: this.name, value: e.target.value } )
      },
    } 
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/variables.scss';
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
</style>