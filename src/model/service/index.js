import { $post, $get, $ajax } from '@jxkang/utils';

export default {
  // 服务商列表
  getCompanyList: (reqModel) => $post('/userservice/companyIsp/getListByParam', reqModel),
  // 添加种子服务商
  addSeedCompany: (reqModel) => $post('/userservice/companyIsp/addSeedCompany', reqModel),
  // 通过ID获取店铺详情
  getCompanyDetail: (reqModel) => $get('/userservice/companyIsp/detail', reqModel),
  // 对普通服务商进行业务审核
  doCompanyExamine: (reqModel) => $post('/userservice/companyIspExamine/doCompanyExamine', reqModel),
  // 冻结、解冻公司资料
  freezeCompany: (reqModel) => $post('/userservice/company/freezeCompany', reqModel),
  // 服务商管理-直推列表（指定公司ID）
  getDirectCompanyList: (reqModel) => $post('/userservice/companyIsp/getDirectListByCompanyId', reqModel),
  // 财务管理服务商列表
  getList: (reqModel) => $post('/userservice/companyIsp/getAccountListByParam', reqModel),
  // 免费开店用户列表
  freeList: (reqModel) => $post('/userservice/applyFreeShop/pList', reqModel),
  // 导入免费开店表
  importFree: () => `${$ajax.getBaseUrl()}/userservice/applyFreeShop/importExcel`,
  // 免费开店申请
  applyFreeShop: (reqModel) => $post('/userservice/applyFreeShop/applyFreeShop', reqModel),
  // 下载模板
  exportExcel: (reqModel) => $ajax({ url: '/userservice/applyFreeShop/exportExcel', type: 'get', special: { customTip: true }, data: reqModel, dataType: 'blob' }),

};
