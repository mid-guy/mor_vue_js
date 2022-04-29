
<script>
  export default {
    props: {
      content: String,
      outlined: { 
        type: Boolean,
        default: false
      },
      standard: {
        type: Boolean,
        default: false
      },
      danger: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onClick() {
        this.$emit('onClickEvent')
      } 
    } 
  }
</script>

<template>
  <button 
    @click="onClick" 
    class="base_btn"
    :class="{ 'btn_outlined': outlined, 'btn_default': standard, 'btn_danger': danger }"
  >
    {{ content }}
  </button>
</template>

<style scoped>
  .base_btn {
    background: none;
    cursor: pointer;
    padding: 10px 16px;
    height: 42px;
    font-size: 14px;
    border-radius: 5px;
    border: 2px solid black;
  }
  .btn_default {
    color: black;
  }
  .btn_outlined{
    color: #FFF;
    background-color: black;
  }

  .btn_danger {
    color: #FFF;
    background-color: rgb(215, 27, 27);
    border: 2px solid rgb(215, 27, 27);
  }
</style>