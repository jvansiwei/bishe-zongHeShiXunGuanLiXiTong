// 管理员账号管理
import request from '@/utils/request'

export function coachlist() {
  return request({
    url: 'api/admin/list',
    method: 'get'
  })
}
export function arealist() {
  return request({
    url: 'api/admin/list',
    method: 'get'
  })
}
export function packagelist() {
  return request({
    url: 'api/admin/list',
    method: 'get'
  })
}
