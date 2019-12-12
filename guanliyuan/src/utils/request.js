import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
// 新创建一个vue实例
const v = new Vue()
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: '/api',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['sysToken'] = getToken()
      // config.headers['sysToken'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    let res = {}
    const query = String.fromCharCode.apply(null, new Int8Array(response.data))
    if (query) {
      res = JSON.parse(query)
    } else {
      res = response.data
    }
    console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      if (res.code === 401) {
        // to re-login
        v.$alert('您已掉线，请重新登录', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          }
        })
      } else {
        if (res && res.msg) {
          Message({
            message: res.msg,
            type: 'error',
            duration: 2 * 1000
          })
        }
      }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      if (res.msg) {
        return Promise.reject(new Error(res.msg || 'Error'))
      } else {
        return
      }
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
