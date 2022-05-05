<template>
  <div id="sign_up_page--container">
    <h1>Sign up to TodoList</h1>
    <div class="container">
      <div class="content">
        <div class="mb-16">
          <Text class="mb-8">Username or email address</Text>
          <Input name="email" :value="email"  @onChangeValue="handleChange" />
        </div>
        <div class="mb-16">
          <div class="d-flex jtc-space-between mb-8">
            <Text class="mb-0">Password</Text>
          </div>
          <Input type="password" name="password" :value="password" @onChangeValue="handleChange" />
        </div>
        <div class="mb-16">
          <div class="d-flex jtc-space-between mb-8">
            <Text class="mb-0">Confrim password</Text>
          </div>
          <Input type="password" name="passwordConfirm" :value="passwordConfirm" @onChangeValue="handleChange" />
        </div>
        <Button fullWidth primary textAlignCenter @onClickEvent="handleSubmit">
          Sign up
        </Button>
      </div>
      <div class="content" style="display: flex; align-items: center; justify-content: center;">
        <Text class="mb-0 d-inline-block" fontSizeSmall>
          Already have account?
          <Link :href="`${ROUTES.SIGN_UP}`">Sign in with an account.</Link>
        </Text>
      </div>
    </div>
  </div>
</template>

<script>
  import { ROUTES } from '@/helper/constants';
  import Button from '@/components/common/Button/index.vue';
  import Input from '@/components/common/Input/index.vue';
  import Text from '@/components/common/Text/index.vue';
  import Link from '@/components/common/Link/index.vue';
  import { signUpRequest } from '@/service/Auth';
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
        passwordConfirm: '',
        ROUTES: ROUTES
      }
    },
    methods: {
      handleChange(data) {
        this[data.name] = data.value
      },
      async handleSubmit() {
        const body = { 
          username: this.email, 
          password: this.password,
          passwordConfirm: this.passwordConfirm
        }
        try {
          await signUpRequest(body)
          this.$router.push(`${ROUTES.SIGN_IN}`)
        } catch(err) {
          console.log(err)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/style/SignUp/style.scss";
</style>