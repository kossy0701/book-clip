<template>
  <el-form ref='form' :model='form' :rules='rules' label-width='120px'>
    <el-form-item v-if='this.$store.state.twoStepAuth.status !== "require_otp"' label='email'>
      <el-input v-model='form.email' type='email' autocomplete='off'></el-input>
    </el-form-item>
    <el-form-item v-if='this.$store.state.twoStepAuth.status !== "require_otp"' label='password'>
      <el-input v-model='form.password' type='password' autocomplete='off'></el-input>
    </el-form-item>
    <el-form-item v-if='this.$store.state.twoStepAuth.status === "require_otp" && this.$store.state.twoStepAuth.otp_uri' label='otp'>
      <vue-qrcode :value='this.$store.state.twoStepAuth.otp_uri' tag="img"></vue-qrcode>
    </el-form-item>
    <el-form-item v-if='this.$store.state.twoStepAuth.status === "require_otp"' label='code'>
      <el-input v-if='this.$store.state.twoStepAuth.status === "require_otp"' v-model='form.code' type='text' autocomplete='off'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-if='this.$store.state.twoStepAuth.status !== "require_otp"' type='primary' @click='handleLogin'>ログイン</el-button>
      <el-button v-if='this.$store.state.twoStepAuth.status === "require_otp"' type='primary' @click='handleTwoStepVerify'>LogIn</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VueQrcode
  },
  name: 'BcLoginForm',
  data () {
    return {
      form: {
        email: '',
        password: '',
        code: ''
      },
      rules: {
        email: [
          { required: true, message: 'メールアドレスを入力してください', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'パスワードを入力してください', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    handleLogin() {
      this.$nextTick(() => {
        this.$store.dispatch('login', { email: this.form.email, password: this.form.password, code: this.form.code })
          .then(() => {
            // this.$router.push('/')
          })
          .catch(err => {
            alert(err);
          })
      })
    },

    handleTwoStepVerify() {
      this.$nextTick(() => {
        this.$store.dispatch('twoStepVerify', { email: this.form.email, password: this.form.password, code: this.form.code})
          .then(() => {
            this.$router.push('/')
          })
          .catch(err => {
            alert(err);
          })
      })
    }
  }
}
</script>

<style scoped>
</style>
