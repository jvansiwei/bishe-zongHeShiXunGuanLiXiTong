/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = [
  // {
  //   path: '/demo',
  //   component: Layout,
  //   redirect: '/demo',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/demo/index'),
  //       name: 'Demo',
  //       meta: { title: '测试', icon: 'dashboard', affix: false }
  //     }
  //   ]
  // },
  {
    path: '/clubs',
    component: Layout,
    redirect: '/clubs',
    meta: { title: '俱乐部管理', icon: 'table', affix: false },
    children: [
      {
        path: '',
        component: () => import('@/views/clubs/index'),
        name: 'Clubs',
        meta: { title: '俱乐部管理', icon: 'table', affix: false }
      }, {
        path: '/signUp',
        component: () => import('@/views/clubs/signUp'),
        name: 'Clubs',
        meta: { title: '俱乐部报名列表', icon: 'table', affix: false }
      }
    ]
  }, {
    path: '/qrcode',
    component: Layout,
    redirect: '/qrcode',
    meta: { title: '二维码管理', icon: 'people', affix: false },
    children: [
      {
        path: '',
        component: () => import('@/views/QRcode/index'),
        name: 'qrcode',
        meta: { title: '学员二维码', icon: 'people', affix: false }
      }, {
        path: '/clubqrcode',
        component: () => import('@/views/QRcode/clubQRcode'),
        name: 'clubqrcode',
        meta: { title: '俱乐部二维码', icon: 'people', affix: false }
      }
    ]
  },
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/user/index'),
  //       name: 'User',
  //       meta: { title: '用户管理', icon: 'people', affix: false }
  //     }, {
  //       hidden: true,
  //       path: 'add',
  //       component: () => import('@/views/user/add'),
  //       name: 'Useradd',
  //       meta: { title: '维护用户数据', icon: 'people', affix: false }
  //     }
  //   ]
  // }, {
  //   path: '/coach',
  //   component: Layout,
  //   redirect: '/coach',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/coach/index'),
  //       name: 'Coach',
  //       meta: { title: '教练管理', icon: 'peoples', affix: false }
  //     }, {
  //       hidden: true,
  //       path: 'add',
  //       component: () => import('@/views/coach/add'),
  //       name: 'Coachadd',
  //       meta: { title: '维护教练数据', icon: 'peoples', affix: false }
  //     }
  //   ]
  // },
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice',
    children: [
      {
        path: '',
        component: () => import('@/views/notice/index'),
        name: 'Notice',
        meta: { title: '通知管理', icon: 'message', affix: false }
      }, {
        hidden: true,
        path: 'add',
        component: () => import('@/views/notice/add'),
        name: 'Noticeadd',
        meta: { title: '维护通知', icon: 'message', affix: false }
      }
    ]
  }, {
    path: '/complaint',
    component: Layout,
    redirect: '/complaint',
    children: [
      {
        path: '',
        component: () => import('@/views/complaint/index'),
        name: 'Complaint',
        meta: { title: '投诉管理', icon: 'message', affix: false }
      }, {
        hidden: true,
        path: 'add',
        component: () => import('@/views/complaint/add'),
        name: 'Complaintadd',
        meta: { title: '维护投诉信息', icon: 'message', affix: false }
      }
    ]
  },
  // {
  //   path: '/match',
  //   component: Layout,
  //   redirect: '/match',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/match/index'),
  //       name: 'Match',
  //       meta: { title: '赛事管理', icon: 'star', affix: false }
  //     }, {
  //       hidden: true,
  //       path: 'add',
  //       component: () => import('@/views/match/add'),
  //       name: 'Matchadd',
  //       meta: { title: '维护赛事信息', icon: 'star', affix: false }
  //     }
  //   ]
  // },
  {
    path: '/account',
    component: Layout,
    redirect: '/account',
    children: [
      {
        path: '',
        component: () => import('@/views/account/index'),
        name: 'Account',
        meta: { title: '账号管理', icon: 'user', affix: false, roles: ['admin', 'editor'] }
      }
    ]
  }, {
    path: '/carousel',
    component: Layout,
    redirect: '/carousel',
    children: [
      {
        path: '',
        component: () => import('@/views/carousel/index'),
        name: 'Carousel',
        meta: { title: '轮播图管理', icon: 'component', affix: false, roles: ['admin', 'editor'] }
      }
    ]
  }, {
    path: '/setting',
    component: Layout,
    redirect: '/setting',
    children: [
      {
        path: '',
        component: () => import('@/views/setting/index'),
        name: 'Setting',
        meta: { title: '设置', icon: 'component', affix: false, roles: ['admin', 'editor'] }
      }
    ]
  },
  //  {
  //   path: '/apply',
  //   component: Layout,
  //   redirect: '/apply',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/apply/index'),
  //       name: 'Apply',
  //       meta: { title: '申请列表', icon: 'table', affix: false }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export default tableRouter
