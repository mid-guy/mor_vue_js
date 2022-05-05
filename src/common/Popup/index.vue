<template>
  <div class="popup_background_overflow">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  .popup_background_overflow {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 1002;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>