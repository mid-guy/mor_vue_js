<script>
  import MorButton from '@/common/MorButton/index.vue'
  import MorInput from '@/common/MorInput/index.vue'
  import baseAPI from '@/config/index.js'
  import Cookies from 'js-cookie';
import { API_AUTH_PAGE, COOKIES, ROUTES } from '../../utils/constants';
import Button from '../../common/Button/index.vue';
import Input from '../../common/Input/index.vue';
import Text from '../../common/Text/index.vue';
import Link from '../../common/Link/index.vue';
  export default {
    components: {
    MorInput,
    MorButton,
    Button,
    Input,
    Text,
    Link
},
    data() {
      return {
        todoContent: '',
        email: '',
        password: '',
        ROUTES: ROUTES
      }
    },
    methods: {
      handleChange(data) {
        this[data.name] = data.value
      },
      handleSubmit() {
        const body = { username: this.email, password: this.password }
        baseAPI.post(`${API_AUTH_PAGE.SIGN_IN}`, body)
          .then((res) => {
            Cookies.set(`${COOKIES.AUTH_TOKEN}`, res.data.accessToken)
            this.$router.push(`${ROUTES.HOME}`)
          })
          .catch((err) => console.log(err))
      }
    }
  }
</script>

<template>
  <div id="sign_in_page--container">
    <h1>Sign in to TodoList</h1>
    <div class="container">
      <div class="content">
        <div class="mb-16">
          <Text class="mb-8">Username or email address</Text>
          <Input name="email" :value="email"  @onChange="handleChange" />
        </div>
        <div class="mb-16">
          <div class="d-flex jtc-space-between mb-8">
            <Text class="mb-0">Password</Text>
            <Link class="`${ROUTES.SIGN_UP}`" fontSizeSmall>Forgot password?</Link>
          </div>
          <Input type="password" name="password" :value="password" @onChange="handleChange" />
        </div>
          <Button fullWidth @onClickEvent="handleSubmit">
            Sign in
          </Button>
      </div>
      <div class="content" style="display: flex; align-items: center; justify-content: center;">
        <Text class="mb-0 d-inline-block f-12">
          New to GitHub?
          <Link :href="`${ROUTES.SIGN_UP}`">Create an account.</Link>
        </Text>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  @import '../../assets/variables.scss';
  #sign_in_page--container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      @include font-apple;
      margin: 0;
      font-size: 24px;
      font-weight: 300;
      letter-spacing: -0.5px;
    }
    .container {
      width: 300px;
    }
    .content {
      margin-top: 16px;
      border-radius: 5px;
      border: 1px solid rgb(216, 222, 228);
      box-sizing: border-box;
      padding: 16px;
    }
  }

</style>>