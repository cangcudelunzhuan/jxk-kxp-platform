import Utils from '@/utils';

const { loadRouter } = Utils;

export default [
  { // 商品列表
    url: '/goods/selflist',
    component: loadRouter(() => import('@/pages/goods/selflist')),
  },
];
