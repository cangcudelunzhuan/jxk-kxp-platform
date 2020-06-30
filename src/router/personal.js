import Utils from '@/utils';

const { loadRouter } = Utils;

export default [
  { // 个人
    url: '/personal',
    component: loadRouter(() => import('@/pages/personal')),
  },
  { // 个人列表
    url: '/personalList',
    component: loadRouter(() => import('@/pages/personal-list')),
  },
];
