<template>
  <div id="header--position--fixed">
    <div class="header_container d-flex">
      <Button class="btn_logout" @click="handleLogout">Log out</Button>
    </div>
  </div>
</template>

<script>
import Button from "../common/Button/index.vue";
import Cookies from 'js-cookie';
import { COOKIES } from "@/helper/constants"
import { ROUTES } from "@/helper/constants"
export default {
  components: { Button },
  methods: {
    handleLogout() {
      Cookies.remove(COOKIES.AUTH_TOKEN)
      this.$router.push(`${ROUTES.SIGN_IN}`)
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/variables.scss';
  #header--position--fixed {
    align-items: center;
    background-color: $--color-header-bg;
    display: flex;
    height: 62px;
    position: sticky;
    top: 0;
    width: 100%;

    .header_container {
      box-sizing: border-box;
      flex-direction: row-reverse;
      margin: auto;
      padding: 16px 32px;
      width: 1216px;
      .btn_logout {
        color: #FFFFFF;
      }
    }
  }
</style>