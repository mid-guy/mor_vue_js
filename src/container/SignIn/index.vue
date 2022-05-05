
<template>
  <div id="sign_in_page--container">
    <h1>Sign in to TodoList</h1>
    <div class="container">
      <div class="content">
        <div class="mb-16">
          <Text class="mb-8">Username or email address</Text>
          <Input name="email" :value="email"  @onChangeValue="handleChange" />
        </div>
        <div class="mb-16">
          <div class="d-flex jtc-space-between mb-8">
            <Text class="mb-0">Password</Text>
            <Link :href="`${ROUTES.SIGN_UP}`" fontSizeSmall>Forgot password?</Link>
          </div>
          <Input type="password" name="password" :value="password" @onChangeValue="handleChange" />
        </div>
          <Button fullWidth primary textAlignCenter @onClickEvent="handleSubmit">
            Sign in
          </Button>
      </div>
      <div class="content" style="display: flex; align-items: center; justify-content: center;">
        <Text class="mb-0 d-inline-block" fontSizeSmall>
          New to GitHub?
          <Link :href="`${ROUTES.SIGN_UP}`">Create an account.</Link>
        </Text>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import { COOKIES, ROUTES } from '@/helper/constants';
  import Button from '@/components/common/Button/index.vue';
  import Input from '@/components/common/Input/index.vue';
  import Text from '@/components/common/Text/index.vue';
  import Link from '@/components/common/Link/index.vue';
  import { signInRequest } from '@/service/Auth';
  export default {
    components: {
    Button,
    Input,
    Text,
    Link
},
    data() {
      return {
        email: '',
        password: '',
        ROUTES: ROUTES
      }
    },
    methods: {
      handleChange(data) {
        this[data.name] = data.value
      },
      async handleSubmit() {
        const body = { username: this.email, password: this.password }
        try {
          const response = await signInRequest(body)
          Cookies.set(`${COOKIES.AUTH_TOKEN}`, response.data.accessToken)
          this.$router.push(`${ROUTES.HOME}`)
        } catch(err) {
          console.log(err)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/style/SignIn/style.scss";
</style>