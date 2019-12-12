<template>
  <div class="login-container">
    <video
      autoplay
      loop
      poster="https://qiniu.langjukeji.com/lelunhua/bg.jpg"
      class="bgvid"
    >
      <source src="http://cdn.moji.com/websrc/video/video621.mp4" type="video/mp4">
    </video>
    <el-form
      ref="forgetRuleForm"
      :model="forgetForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">乐轮滑</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="forgetForm.username"
          placeholder="请输入手机号"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="forgetForm.code"
          placeholder="验证码"
          style="width: 170px !important"
          name="code"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-code">
          <el-button
            :disabled="anniuVal"
            style="height:50px;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important"
            type="primary"
            @click="get_code"
          >获取验证码</el-button>
        </span>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="forgetForm.password"
          :type="passwordType"
          placeholder="请输入新密码"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:20px;"
        @click.native.prevent="handleLogin"
      >找回密码</el-button>
      <div class="tips">
        <router-link style="color:#409EFF" to="/login">已有账号，直接登录</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validatePhone, isStudentNo } from '@/utils/validate'
// import { find_pwdByUsername, getCode } from '@/api/register'

export default {
  name: 'Forget',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validatePhone(value)) {
        this.anniuVal = true
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
        this.anniuVal = false
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (!isStudentNo(value)) {
        callback(new Error('请输入正确验证码'))
      } else {
        callback()
      }
    }
    return {
      anniuVal: true,
      forgetForm: {
        username: '',
        password: '',
        code: ''
      },
      getCode: {
        username: '',
        is_exist: 1
      },
      loginRules: {
        username: [
          { required: true, trigger: 'change', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    get_code() {
      console.log('成功')
    }
    // handleLogin() {
    //   this.$refs.forgetRuleForm.validate(valid => {
    //     if (valid) {
    //       this.loading = true
    //       find_pwdByUsername(
    //         this.forgetForm.username,
    //         this.forgetForm.code,
    //         this.forgetForm.password
    //       )
    //         .then(() => {
    //           this.loading = false
    //           this.$router.push({ path: this.redirect || '/login' })
    //         })
    //         .catch(() => {
    //           this.loading = false
    //         })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    // get_code() {
    //   if (
    //     !validateEmail(this.forgetForm.username) &&
    //     !validatePhone(this.forgetForm.username)
    //   ) {
    //     this.$message.error('你输入的账号不合法')
    //   } else {
    //     this.getCode.username = this.forgetForm.username
    //     getCode(this.getCode)
    //       .then(resonse => {
    //         this.$message({
    //           message: resonse.msg,
    //           type: 'success'
    //         })
    //       })
    //       .catch(() => {})
    //   }
    // }
  }
}
</script>

<style  lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  background: url("http://cdn.moji.com/websrc/video/video621.mp4") no-repeat
    center 0px;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 420px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 100px auto;
  }
  .tips {
    font-size: 14px;
    text-align: right;
    color: #fff;
    margin-bottom: 15px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: #caff70;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .show-code {
    position: absolute;
    //  top: 7px;
    right: 0px;
    cursor: pointer;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .bgvid {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -100;
    background-size: cover;
  }
}
</style>

