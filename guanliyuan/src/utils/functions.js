// 定义的全局函数
import Vue from 'vue'

// 将下拉列表的值转换成对应的名称
Vue.prototype.qiehuan = function(res, shuzu) {
  for (let i = 0; i < shuzu.length; i++) {
    if (res === shuzu[i].value) {
      if (shuzu[i].name) {
        return shuzu[i].name
      } else {
        return ''
      }
    }
  }
  return ''
}
