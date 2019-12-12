import request from '@/utils/request'

// 二维码列表
export function QRcodelist(query) {
  return request({
    url: 'sys/qrcode/stu/list',
    method: 'get',
    params: query
  })
}
// 生成二维码
export function QRcodeadd(query) {
  return request({
    url: 'sys/qrcode/stu/generate',
    method: 'get',
    params: query
  })
}
// 俱乐部二维码列表
export function clubQRcodelist(query) {
  return request({
    url: 'sys/qrcode/club/list',
    method: 'get',
    params: query
  })
}
// 生成俱乐部二维码
export function clubQRcodeadd(query) {
  return request({
    url: 'sys/qrcode/club/generate',
    method: 'get',
    params: query
  })
}
// 分配二维码
export function QRcodearrange(query) {
  return request({
    url: 'sys/qrcode/stu/allot',
    method: 'get',
    params: query
  })
}QRcodeClub
// 下载二维码
export function QRcodedown(ids) {
  return request({
    url: 'sys/qrcode/stu/download',
    method: 'post',
    data: ids,
    responseType: 'arraybuffer'
  })
}
// 将选中二维码分配给俱乐部
export function QRcodeClub(ids) {
  console.log(ids)
  return request({
    url: 'sys/qrcode/stu/update/' + ids.clubId,
    method: 'post',
    data: ids.codeIds,
    responseType: 'arraybuffer'
  })
}
// 上传logo 这写的没用，到clubs文件夹下的index文件中修改
// export function QRcodeup(query) {
//   return request({
//     url: 'sys/qrcode/stu/upload/{clubId}',
//     method: 'post',
//     data: query
//   })
// }
