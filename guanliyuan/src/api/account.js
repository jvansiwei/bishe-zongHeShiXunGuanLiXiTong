// 管理员账号管理
import request from '@/utils/request'

export function accountlist(query) {
  return request({
    url: 'sys/admin/list',
    method: 'get',
    params: query
  })
}
export function accountadd(query) {
  return request({
    url: 'sys/admin/save',
    method: 'post',
    data: query
  })
}
export function accountupdate(query) {
  return request({
    url: 'sys/admin/update',
    method: 'post',
    data: query
  })
}
export function accountdel(ids) {
  return request({
    url: 'sys/admin/del',
    method: 'delete',
    data: ids
  })
}
