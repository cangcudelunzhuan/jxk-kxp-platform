import { $get, $post, $ajax } from '@jxkang/utils';

export default {
  // 新增/编辑 商品类目
  addCategory: (reqModel) => $post('/productservice/product/category/addCategory', reqModel),
  // 类目列表
  getCategoryList: (reqModel) => $post('/productservice/product/category/getCategoryListByParentId', reqModel),
  // 类目删除
  deleteCategory: (reqModel) => $post('/productservice/product/category/deleteCategory', reqModel),

  categoryData: (reqModel) => $post('/productservice/product/category/getCategoryListByParentId', reqModel),
  // 商品列表
  getItemList: (reqModel) => $post('/productservice/product/item/getShopAllItemList', reqModel),
  // 商品规格列表
  getSpecList: (reqModel) => $post('/productservice/product/specsvalue/getSpecsPropertyPage', reqModel),
  // 新增规格属性
  addSpecAttr: (reqModel) => $post('/productservice/product/specsvalue/updateSpecsProperty', reqModel),
  // 规格删除接口
  deleteSpace: (reqModel) => $post('/productservice/product/specsvalue/deleteSpecsValue', reqModel),
  // 获取商品品牌信息
  getBrandMes: (reqModel) => $post('/productservice/product/brand/getBrandPage', reqModel),
  // 退货仓库
  getWarehouse: (reqModel) => $post('/productservice/scm/warehouse/getWarehouseByParam', reqModel),
  // 新增商品信息
  addNewGoods: (reqModel) => $post('/productservice/product/item/addItem', reqModel),
  // 退货地址列表    getSupplierWarehouseByParam
  refundAddress: (reqModel) => $post('/productservice/scm/warehouse/getWarehouseByParam', reqModel),
  // 新增品牌接口
  addBrand: (reqModel) => $post('/productservice/product/brand/addBrand', reqModel),
  // 类目查询
  getParentCategoryByName: (reqModel) => $post('/productservice/product/category/getParentCategoryByName', reqModel),
  // 填写商品属性接口
  updateItemSku: (reqModel) => $post('/productservice/product/itemsku/updateItemSku', reqModel),
  // 获取商品详情接口
  productDetail: (reqModel) => $get('/productservice/product/item/getItem', reqModel),
  // 查询图片详情
  imgDetail: (reqModel) => $get('/productservice/img/getImageByType', reqModel),
  // 编辑商品属性接口
  editorNewGoods: (reqModel) => $post('/productservice/product/item/modifyItem', reqModel),
  // 获取提交规格历史数据 productservice/product/itemsku/getItemSkuList
  getHistoryList: (reqModel) => $get('/productservice/product/itemsku/getItemSkuList', reqModel),
  // 上传附件接口
  postHistoryList: (reqModel) => $post('/productservice/product/item/modifyItemImage', reqModel),
  // 提交审核
  submitItem: (reqModel) => $get('/productservice/product/itemVerify/submitItem', reqModel),
  // 删除商品
  deleteItem: (reqModel) => $post('/productservice/product/item/batchDeleteItem', reqModel),
  // 库存列表 /scm/warehouse/getWarehouseFlowListByParam
  getWarehouseFlowListByParam: (reqModel) => $post('/productservice/scm/warehouse/getWarehouseFlowListByParam', reqModel),
  // sku上下架 /product/itemsku/shelfItemSku
  shelfItemSku: (reqModel) => $post('/productservice/product/itemsku/shelfItemSku', reqModel),
  // 查询商品统计信息 selectItemStatis
  selectItemStatis: (reqModel) => $post('/productservice/product/item/selectItemStatis', reqModel),
  // 查询商品规格接口
  getItemSkuById: (reqModel) => $get('/productservice/product/itemsku/getItemSkuById', reqModel),
  // productservice/product/itemtag/getTagPage // 获取标签列表
  getTagPage: (reqModel) => $post('/productservice/tag/itemtag/getTagPage', reqModel),
  // 查询规格列表信息
  getSimpleItemSkuList: (reqModel) => $get('/productservice/product/itemsku/getSimpleItemSkuList', reqModel),
  // 审核详情  productservice/product/itemVerify/getItemVerifyList
  getItemVerifyList: (reqModel) => $post('/productservice/product/itemVerify/getItemVerifyList', reqModel),
  // 退货地址删除  productservice/scm/warehouse/deleteWarehouse
  deleteWarehouse: (reqModel) => $get('/productservice/scm/warehouse/deleteWarehouse', reqModel),
  // 添加仓库地址
  addWarehouse: (reqModel) => $post('/productservice/scm/warehouse/addWarehouse', reqModel),
  // spu上下架
  shelfItem: (reqModel) => $post('/productservice/product/itemsku/shelfItem', reqModel),
  // 审核接口
  verifyItem: (reqModel) => $post('/productservice/product/itemVerify/verifyItem', reqModel),
  // 标签编辑接口  productservice/tag/itemtag/saveOrUpdateTage
  saveOrUpdateTage: (reqModel) => $post('/productservice/tag/itemtag/saveOrUpdateTage', reqModel),
  // sku更新库存数量
  updateStockQty: (reqModel) => $post('/productservice/product/itemsku/updateStockQty', reqModel),
  // 更新价格
  batchUpdatePrice: (reqModel) => $post('/productservice/product/itemsku/batchUpdatePrice', reqModel),
  // 删除标签
  deleteGroupTagById: (reqModel) => $get('/productservice/tag/itemtag/deleteGroupTagById', reqModel),
  // 商品强制下架 /product/itemsku/forceDownShelfByItemIds
  forceDownShelfByItemIds: (reqModel) => $post('/productservice/product/itemsku/forceDownShelfByItemIds', reqModel),

  // 导出商品列表  /export/product/getSupplierProductExport
  getPlatformProductExport: (reqModel) => $ajax({ url: '/productservice/export/product/getPlatformProductExport', type: 'post', special: { customTip: true }, data: reqModel, dataType: 'blob' }),
  // product/itemVerify/batchVerifyItem  审核商品
  batchVerifyItem: (reqModel) => $post('/productservice/product/itemVerify/batchVerifyItem', reqModel),
  // /productservice/product/category/getCategoryListByParentId
  getCategoryListByParentId: (reqModel) => $post('/productservice/product/category/getCategoryListByParentId', reqModel),
  // 获取一级分类  product/agentitem/category/getCategoryListByParentId

};
