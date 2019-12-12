import request from '@/utils/request'

export function appversionlist(query) {
  return request({
    url: '/sys/appversion/list',
    method: 'get',
    params: query
  })
}

export function appversionadd(query) {
  return request({
    url: '/sys/appversion/publish',
    method: 'post',
    data: query
  })
}
