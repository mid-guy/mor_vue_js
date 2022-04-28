<template>
  <div class="popup_background--overflow">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  .popup_background--overflow {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>