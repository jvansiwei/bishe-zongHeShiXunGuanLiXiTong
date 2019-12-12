import request from '@/utils/request'

export function suggestlist(query) {
  return request({
    url: 'sys/suggest/list',
    method: 'get',
    params: query
  })
}

export function noticeadd(query) {
  return request({
    url: 'sys/notice/save',
    method: 'post',
    data: query
  })
}
