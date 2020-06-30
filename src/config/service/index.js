/**
 * 服务商
 */

export default {
  // 服务商 类型
  types: [
    { label: '货品供应端(M端)', value: 'SUPPLIER' },
    { label: '平台服务供应端(S端)', value: 'PLATFORM' },
    { label: '货品购买端(B端)', value: 'CUSTOMER' },
    { label: '总监服务商', value: '2' },
    { label: '种子服务商', value: '1' }, // 顶级服务商
    { label: '商品服务商', value: 'PRODUCTSERVICE' },
    { label: 'SHOP', value: '个人店铺' },
    { label: 'PERSON', value: '个人' },
  ],
  // 数据状态 类型
  status: [
    { value: '1', label: '待支付保证金' },
    { value: '2', label: '等完善信息' },
    { value: '3', label: '入驻成功' },
    { value: '4', label: '入驻成功' },
    { value: '5', label: '入驻成功' },
    { value: '6', label: '平台吊销' },
  ],
  // 下拉框的数据 类型
  selectStatus: [
    { value: '1', label: '待支付保证金' },
    { value: '2', label: '等完善信息' },
    { value: '5', label: '入驻成功' },
    { value: '6', label: '平台吊销' },
  ],
};
