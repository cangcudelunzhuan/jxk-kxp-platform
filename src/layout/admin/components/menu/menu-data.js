/**
 * 菜单配置
 */


// 服务商管理模块
const serviceProvider = [
  {
    icon: 'user1',
    name: '服务商管理',
    children: [
      {
        name: '服务商列表',
        url: '/service/list',
      }, {
        name: '试用店铺导入',
        url: '/freeShop/list',
      },
    ],
  },
];


// 财务模块
const financeMenus = [
  {
    icon: 'yunyingshang-caiwuguanli',
    name: '财务管理',
    children: [
      {
        name: '账户列表',
        url: '/financial/list',
      }, {
        name: '会员提现',
        url: '/cashout/list',
      },
    ],
  },
  {
    icon: 'yunyingshang-caiwuguanli',
    name: '商品管理',
    children: [
      {
        name: '店主自营商品',
        url: '/goods/selflist',
      },
    ],
  },
];

export default serviceProvider
  .concat(financeMenus);
