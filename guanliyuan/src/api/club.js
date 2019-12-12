// 管理员账号管理
import request from '@/utils/request'

export function clublist(query) {
  return request({
    url: 'sys/club/list',
    method: 'get',
    params: query
  })
}
export function clubonline(query) {
  return request({
    url: 'sys/club/online',
    method: 'get',
    params: query
  })
}
export function cluboffline(query) {
  return request({
    url: 'sys/club/offline',
    method: 'get',
    params: query
  })
}
export function clubadd(query) {
  return request({
    url: 'sys/club/save',
    method: 'post',
    data: query
  })
}
export function signuplist(query) {
  return request({
    url: '/sys/club/signup/list',
    method: 'get',
    params: query
  })
}
export function signupUpdate(query) {
  return request({
    url: '/sys/club/signup/update',
    method: 'post',
    data: query
  })
}
// 更新俱乐部首页排名
// export function clubPaixu(query) {
//   return request({
//     url: '/sys/club/update/homeSort',
//     method: 'get',
//     params: query
//   })
// }

export function clubPaixu(query) {
  return request({
    url: '/sys/club/update/homeSort',
    method: 'get',
    params: query
  })
}
