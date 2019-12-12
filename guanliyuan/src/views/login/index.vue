<template>
  <div class="login-container">
    <video autoplay loop poster="https://qiniu.langjukeji.com/lelunhua/bg.jpg" x5-video-player-type="h5" class="bgvid">
      <source src="http://cdn.moji.com/websrc/video/video621.mp4" type="video/mp4">
    </video>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">乐轮滑-后台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入帐号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.enter.native="handleLogin"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <div style="height:47px">
        <el-form-item prop="yanzheng" class="fl" style="width:50%">
          <span class="svg-container fl">
            <svg-icon icon-class="edit" />
          </span>
          <el-input
            ref="yanzheng"
            v-model="loginForm.code"
            class="fl"
            style="width:80%"
            placeholder="请输入验证码"
            name="yanzheng"
            type="text"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <!-- <img class="fr" style="width: 35%;opacity:0.7;border-radius: 5px;" height="47px" :src="src" @click="getyanzheng"> -->
        <el-image class="fr" fit="fill" style="width: 35%;height: 47px;opacity:0.7;border-radius: 5px;" :src="src" @click="getyanzheng">
          <div slot="placeholder" style="padding-top:15px;color: white" class="image-slot">
            <span class="dot">加载中...</span>
          </div>
        </el-image>
      </div>

      <div class="tips">
        <router-link to="/forget">忘记密码？</router-link>
      </div>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:20px;height:40px"
        @click.native.prevent="handleLogin"
      >登录</el-button>
      <!-- <div class="tips">
        <router-link
          style="color:#409EFF"
          to="/register"
        >立即注册</router-link>
      </div> -->
    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
// import SocialSign from './components/SocialSignin'
export default {
  name: 'Login',
  // components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (this.loginForm.username.length < 1) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (this.loginForm.password.length < 1) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    const validateYanzheng = (rule, value, callback) => {
      if (this.loginForm.code.length < 1) {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      src: '',
      loginForm: {
        username: 'admin',
        password: 'langjukeji.327',
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        yanzheng: [
          { required: true, trigger: 'blur', validator: validateYanzheng }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    this.getyanzheng()
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    guid() {
      return (this.S4() + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4())
    },
    S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    },
    getyanzheng() {
      const uuid = {
        uuid: this.guid()
      }
      this.loginForm.uuid = uuid.uuid
      // api.getyanzhengma(uuid).then(res => {
      // })
      this.src = '/api/captcha.jpg?uuid=' + this.loginForm.uuid //  测试环境http
      // this.src = 'https://api.prod.lelunhua.com/langju-roller/captcha.jpg?uuid=' + this.loginForm.uuid //  开发环境https
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= 'a' && key <= 'z')) ||
          (!shiftKey && (key >= 'A' && key <= 'Z'))
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.getyanzheng()
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.getyanzheng()
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$store
      //       .dispatch('user/login', this.loginForm)
      //       .then(() => {
      //         this.getyanzheng()
      //         this.$router.push({
      //           path: this.redirect || '/',
      //           query: this.otherQuery
      //         })
      //         this.loading = false
      //       })
      //       .catch(() => {
      //         this.getyanzheng()
      //         this.loading = false
      //       })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
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
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  // position: fixed;
  height: 100%;
  width: 100%;
  // position: absolute;
  z-index: 100;
  background-color: rgba(	175,238,238, 0.2) !important;
  // background-color: $bg;
  background:url("http://cdn.moji.com/websrc/video/video621.mp4") no-repeat center 0px;
  .login-form {

    background-color: rgba(155, 177, 179, 0.2);
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 420px;
    max-width: 100%;
    padding: 25px 30px 15px 30px;
  }
  .tips {
    font-size: 14px;
    text-align: right;
    color: rgb(221, 219, 219);
    margin-top: 10px;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: rgb(199, 197, 197);
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
   @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

// .login-container {
//   min-height: 100%;
//   width: 100%;
//   background-color: $bg;
//   overflow: hidden;

//   .login-form {
//     position: relative;
//     width: 520px;
//     max-width: 100%;
//     padding: 160px 35px 0;
//     margin: 0 auto;
//     overflow: hidden;
//   }

//   .tips {
//     font-size: 14px;
//     color: #fff;
//     margin-bottom: 10px;
//     text-align: right;
//     span {
//       &:first-of-type {
//         margin-right: 16px;
//       }
//     }
//   }

//   .svg-container {
//     padding: 6px 5px 6px 15px;
//     color: $dark_gray;
//     vertical-align: middle;
//     width: 30px;
//     display: inline-block;
//   }

//   .title-container {
//     position: relative;

//     .title {
//       font-size: 26px;
//       color: $light_gray;
//       margin: 0px auto 40px auto;
//       text-align: center;
//       font-weight: bold;
//     }
//   }

//   .show-pwd {
//     position: absolute;
//     right: 10px;
//     top: 7px;
//     font-size: 16px;
//     color: $dark_gray;
//     cursor: pointer;
//     user-select: none;
//   }

//   .thirdparty-button {
//     position: absolute;
//     right: 0;
//     bottom: 6px;
//   }

//   @media only screen and (max-width: 470px) {
//     .thirdparty-button {
//       display: none;
//     }
//   }
// }
</style>
