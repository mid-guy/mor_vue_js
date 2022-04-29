<script>
  import MorButton from '@/common/MorButton/index.vue'
  import MorInput from '@/common/MorInput/index.vue'
  import baseAPI from '@/config/index.js'
  import Cookies from 'js-cookie';
import { API_AUTH_PAGE, COOKIES, ROUTES } from '../../utils/constants';
  export default {
    components: {
      MorInput,
      MorButton,
    },
    data() {
      return {
        todoContent: '',
        email: '',
        password: '',
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
    <h1>Sign in</h1>
    <div class="content">
      <div class="form_input">
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  #sign_in_page--container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      margin: 0;    
      font-size: 24px;
      font-weight: 300;
      letter-spacing: -0.5px;
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    }
    .content {
      width: 330px;
      border-radius: 5px;
      border: 1px solid hsla(210,18%,87%,1);
      background-color: #f6f8fa;
      padding: 16px;
      box-sizing: border-box;
    }
  }
  
  #sign_in_page--container .content > button {
    width: 100%;
  }

  #sign_in_page--container .content .form_input {
    background-color: inherit;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px
  }
  h2 {
    text-align: center;
  }

</style>>