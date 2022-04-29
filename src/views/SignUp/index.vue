<script>
  import MorButton from '@/common/MorButton/index.vue'
  import MorInput from '@/common/MorInput/index.vue'
  import baseAPI from '@/config/index.js'
  import Cookies from 'js-cookie';
  export default {
    components: {
      MorInput,
      MorButton,
    },
    data() {
      return {
        email: '',
        password: '',
        passwordConfirm: '',
      }
    },
    methods: {
      handleChange(data) {
        this[data.name] = data.value
      },
      handleSubmit() {
        const body = { email: this.email, password: this.password, passwordConfirm: this.passwordConfirm }
        baseAPI.post('/api/auth/signup', body)
          .then((res) => { 
            Cookies.set('auth_token', res.data.auth_token)
            this.$router.push('/')
          })
          .catch((err) => console.log(err))
      }
    }
  }
</script>

<template>
  <div id="sign_in_page--container">
    <div class="content">
      <div class="form_input">
        <MorInput name="email" :place="'Email'" @onChange="handleChange" />
        <MorInput name="password" :place="'Password'"  @onChange="handleChange" />
        <MorInput name="passwordConfirm" :place="'Confirm Password'"  @onChange="handleChange" />
      </div>
      <MorButton content="Sign Up" :onClick="handleSubmit" />
    </div>
  </div>
</template>


<style>
  #sign_in_page--container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #sign_in_page--container .content {
    width: 330px;
    border-radius: 15px;
    background-color: rgb(199, 199, 199);
    padding: 20px 25px;
    box-sizing: border-box;
  }

  #sign_in_page--container .content .form_input {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px
  }
</style>