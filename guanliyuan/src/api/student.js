// 管理员账号管理
import request from '@/utils/request'

export function signUplist(query) {
  return request({
    url: 'api/admin/list',
    method: 'get',
    params: query
  })
}
export function signUp(query) {
  return request({
    url: 'api/admin/save',
    method: 'post',
    data: query
  })
}
export function accountadd(query) {
  return request({
    url: 'api/admin/save',
    method: 'post',
    data: query
  })
}
export function accountupdate(query) {
  return request({
    url: 'api/admin/update',
    method: 'post',
    data: query
  })
}
export function accountdel(ids) {
  return request({
    url: 'api/admin/del',
    method: 'delete',
    data: ids
  })
}
