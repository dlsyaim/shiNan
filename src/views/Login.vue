<template>
  <el-row>
    <el-col :span="8" :offset="8">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
          <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="loginForm.pwd" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleSubmit"
            :loading="loading"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        account: null,
        pwd: null
      },
      rules: {
        account: [
          {
            required: true,
            message: '请输入帐号',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      checked: false
    }
  },
  methods: {
    handleSubmit(e) {
      this.$refs.loginForm.validate(v => {
        if (v) {
          this.loading = true
          // var loginParams = {
          //   username: this.loginForm.account,
          //   password: this.loginForm.pwd
          // }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>
