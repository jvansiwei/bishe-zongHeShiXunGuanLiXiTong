import request from '@/utils/request'

export function carousellist(query) {
  return request({
    url: 'sys/carousel/list',
    method: 'get',
    params: query
  })
}
export function carouseonline(query) {
  return request({
    url: 'sys/carousel/online',
    method: 'get',
    params: query
  })
}
export function carouseoffline(query) {
  return request({
    url: 'sys/carousel/offline',
    method: 'get',
    params: query
  })
}
export function carouseladd(url) {
  return request({
    url: 'sys/carousel/save',
    method: 'post',
    data: url
  })
}
export function carouseldel(ids) {
  return request({
    url: 'sys/carousel/del',
    method: 'post',
    data: ids
  })
}
export function carouselupdate(ids) {
  return request({
    url: 'sys/carousel/update',
    method: 'post',
    data: ids
  })
}
export function carouselclubs(query) {
  return request({
    url: 'sys/carousel/clubs',
    method: 'get',
    params: query
  })
}
export function carouselpackages(query) {
  return request({
    url: 'sys/carousel/packages',
    method: 'get',
    params: query
  })
}
