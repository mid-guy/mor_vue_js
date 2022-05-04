<template>
  <div class="menu_background_overflow">
    <div :style="`top: ${bottom}px; left: ${left}px;`" class="menu_container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bottom: { 
      type: String,
      default: 0 
    },
    left: { 
      type: String,
      default: 0 
    },
  }
}
</script>

<style lang="scss" scoped>
  .menu_background_overflow {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 1001;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    .menu_container {
      position: absolute;
      width: 100px;
      height: fit-content;
      background-color: #FFFFFF;
      padding: 16px;
      border-radius: 5px;
      box-sizing: border-box;
      -webkit-box-shadow: 0px 2px 10px 1px rgb(0 0 0 / 20%);
      box-shadow: 0px 2px 10px 1px rgb(0 0 0 / 20%);
      cursor: pointer;
      font-weight: 600;
    }
  }
</style>