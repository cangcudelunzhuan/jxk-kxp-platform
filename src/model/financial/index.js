import { $post, $get, $ajax } from '@jxkang/utils';

export default {
  // 财务列表
  getCompanyList: (reqModel) => $post('/userservice/companyV2/getAccountListByParamV2', reqModel),
  // 通过ID获取店铺详情
  getCompanyDetail: (reqModel) => $get('/userservice/companyIsp/detail', reqModel),
  // 系统查询指定公司账户流水展示
  // getFlowList: (reqModel) => $get('/userservice/companyIsp/getDirectListByCompanyId', reqModel),
  getFlowList: (reqModel) => $get('/settleservice/fund-account/system-query-flow-list', reqModel),
  // 系统查询指定公司资金账户
  getSystemPrice: (reqModel) => $get('/settleservice/fund-account/system-query', reqModel),
  // 提现列表
  applyList: (reqModel) => $get('/settleservice/withdraw/apply-list', reqModel),
  // 提现申请
  process: (reqModel) => $post('/settleservice/withdraw/process', reqModel),
  // 提现模板
  cashTemplate: (reqModel) => $ajax({ url: '/settleservice/export/withdraw-apply-template', type: 'get', special: { customTip: true }, data: reqModel, dataType: 'blob' }),
  // 导入提现结果
  importCash: () => `${$ajax.getBaseUrl()}/settleservice/withdraw/import-result`,
  // 导出失败的
  imporFail: (reqModel) => $ajax({ url: '/settleservice/export/import-fail', type: 'get', special: { customTip: true }, data: reqModel, dataType: 'blob' }),
  // 导出提现申请表
  importApplyList: (reqModel) => $ajax({ url: '/settleservice/export/withdraw-apply-list', type: 'get', special: { customTip: true }, data: reqModel, dataType: 'blob' }),
};
