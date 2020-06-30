import Utils from '@/utils';

const { loadRouter } = Utils;

export default [
  { // 财务列表
    url: '/financial/list',
    component: loadRouter(() => import('@/pages/financial/list')),
  },
  { // 财务详情
    url: '/financial/detail/:id',
    component: loadRouter(() => import('@/pages/financial/detail')),
  },
  { // 提现列表
    url: '/cashout/list',
    component: loadRouter(() => import('@/pages/cashout/list')),
  },
];
