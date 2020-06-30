import Utils from '@/utils';

const { loadRouter } = Utils;

export default [
  { // 服务商管理
    url: '/service/list',
    component: loadRouter(() => import('@/pages/service/list')),
  }, { // 新增种子服务商
    url: '/service/add',
    component: loadRouter(() => import('@/pages/service/add')),
  }, { // 详情界面
    url: '/service/detail/:id',
    component: loadRouter(() => import('@/pages/service/detail')),
  }, { // 登录界面
    url: '/login',
    component: loadRouter(() => import('@/pages/login')),
  }, { // 用户导入
    url: '/freeShop/list',
    component: loadRouter(() => import('@/pages/freeShop/list')),
  },
];
