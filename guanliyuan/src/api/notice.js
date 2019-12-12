import request from '@/utils/request'

export function noticelist(query) {
  return request({
    url: 'sys/notice/list',
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
