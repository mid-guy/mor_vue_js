<template>
  <div id="header--position--fixed"></div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import '@/assets/variables.scss';
  #header--position--fixed {
    position: sticky;
    top: 0;
    width: 100%;
    height: 62px;
    background-color: $--color-header-bg;
  }
</style>