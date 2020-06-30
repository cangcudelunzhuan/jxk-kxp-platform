import React from 'react';
import { Row, Card, Input, Button, Select, message, Modal, Form, Popover } from 'antd';
import { BoxTitle, Paginator, FormControl, ShowImage } from '@jxkang/web-cmpt';
import { Common } from '@jxkang/utils';
import Model from '@/model';
import utils from '@/utils';
import { formatDateTime } from '@/utils/filter';
import styles from './index.module.styl';


const { confirm } = Modal;
const { Option } = Select;

@Form.create()
class goodsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFormData: {},
      rejectArr: '',
      pageListColumns: [
        {
          title: '商品ID',
          dataIndex: 'itemId',
          // sorter: true,
          width: 140,
          key: 'itemId',
        }, {
          title: '商品名称',
          // sorter: true,
          width: 180,
          render: (item) => (
            <div style={{ width: '100%' }}>
              <div>{item.itemTitle}</div>
              {/* <div>
                品牌：
                {item.brandName}
              </div> */}
            </div>
          ),
        }, {
          title: '商品主图',
          width: 100,
          render: (item) => (
            <div className={styles.photoMes}>
              {/* {item.mainImgUrl ? <img src={getFileUrl(item.mainImgUrl)} alt="" /> : ''} */}
              {item.mainImgUrl
                ? (
                  <ShowImage>
                    <img src={utils.getFileUrl(item.mainImgUrl)} alt="图片详情" title="图片详情" />
                  </ShowImage>
                ) : ''}
            </div>
          ),
        }, {
          title: '店铺名称',
          width: 150,
          render: (item) => (
            <div style={{ width: '100%' }}>
              <div>{item.supplierName}</div>
            </div>
          ),
        }, {
          title: '所属分类',
          dataIndex: 'firstCatName',
          width: 110,
          key: '',
        }, {
          title: '商品售价区间',
          width: 110,
          render: (item) => (
            <div>
              {item.minVipTradePrice}
              {item.minVipTradePrice == item.maxVipTradePrice ? null : (
                <span>
                  ~
                  {item.maxVipTradePrice}
                </span>
              )}
            </div>
          ),
        },
        {
          title: '商品状态',
          width: 140,
          render: (item) => (
            <div>
              {item.shelfStatus == 0 ? <div>已下架</div> : ''}
              {item.shelfStatus == 1 ? <div>已上架</div> : ''}
            </div>
          ),
        },
        {
          title: '审核状态',
          width: 140,
          render: (item) => (
            <div>
              {item.verifyStatus == 1 ? <div style={{ color: '' }}>未提交</div> : ''}
              {item.verifyStatus == 2 ? <div style={{ color: '#F5772F' }}>待审核</div> : ''}
              {item.verifyStatus == 3 ? (
                <Popover title={`操作人:${item.verifyOperation}  时间:${formatDateTime(item.verifyTime)}`} content={`失败原因:${item.verifyContent}`} style={{ color: '#F5222D' }}>
                  <a style={{ color: 'red', textDecoration: 'underline' }}>审核失败</a>
                  {' '}
                </Popover>
              ) : ''}
              {item.verifyStatus == 4 ? <div style={{ color: '#7D57E4' }}>审核通过</div> : ''}
            </div>
          ),
        }, {
          title: '上传时间',
          width: 140,
          dataIndex: 'submissionTime',
          render: (item) => (
            <div>
              {formatDateTime(item)}
            </div>
          ),
        }, {
          title: '操作',
          width: 180,
          render: (item) => (
            <div>
              <a onClick={() => this.lookItemDetail(item)} style={{ color: '#7D57E4', marginRight: '10px' }}>查看</a>
              {item.verifyStatus !== 4 ? '' : <a style={{ color: '#7D57E4' }} onClick={() => { this.forceDownShelfByItemIds(item); }}>强制下架</a>}
            </div>
          ),
        },
      ],
      itemDetail: '',
      params: {
        goodsName: '',
        warehouseId: '',
        supplierIdName: '',
        verifyStatus: '',
        shelfStatus: '',
        category1: '',
        category2: '',
        category3: '',
      },
      // 批量操作的值
      batchOperatioChangeValue: '',
      // 所有选中的数据的值
      allSelectValue: [],
      newData: '',
      rejectVisibleDetail: false,
      showPretail: false,
      happendsId: '',
      token: '',
      itemConfirm: 'disabled',
      category: [],
      // currentStatus: '',
    };
  }


  componentDidMount() {
    const token = Common.getCookie(globalThis.webConfig.fetchTokenName);
    this.getCategoryListByParentId();
    this.setState({
      token,
    });
  }

  // 获取一级分类
  getCategoryListByParentId = () => {
    const currentData = {
      parentCid: 0,
      pageNum: 1,
      pageSize: 1000,
    };
    Model.goods.getCategoryListByParentId(currentData).then((res) => {
      if (!res) return false;
      const newArr = (res.records || []).map((v) => {
        return { label: v.catName, value: v.id };
      });
      this.setState({
        category: newArr,
      });
    });
  }

  /**
   * @description: 底部批量操作
   * @param {e}
   * @return: 无
   */
  batchOperatioChange = (e) => {
    this.setState({
      batchOperatioChangeValue: e,
      itemConfirm: '',
    });
  }

  /**
   * @description: 选中表格中的某个值的出发事件
   * @param {key,value}
   * @return:无
   */
  changeallvalue = (key, value) => {
    this.setState({
      allSelectValue: value,
    });
  }

  /**
   * @description: 批量操作 0上架 1下架  2 批量删除
   * @param {type}
   * @return:
   */
  confirmOperate = () => {
    const that = this;
    const { batchOperatioChangeValue, allSelectValue } = this.state;
    if (!batchOperatioChangeValue) return false;
    if (allSelectValue.length == 0) {
      message.warning('请选择要操作的数据');
      return false;
    }
    const newArr = (allSelectValue || []).map((v) => {
      return v.itemId;
    });
    if (batchOperatioChangeValue === '0') {
      confirm({
        title: '审核通过',
        content: '审核通过后对应的商品会自动上架，确认审核通过？',
        okType: 'danger',
        onOk() {
          // 审核通过
          const currentData = {
            itemIds: newArr,
            editStatus: 'PASS',
          };
          Model.goods.batchVerifyItem(currentData).then((res) => {
            if (res) {
              message.success('审核成功');
              that.fetchGrid.fetch();
            }
          });
        },
        // 审核失败
      });
    }

    if (batchOperatioChangeValue === '1') {
      that.setState({
        rejectVisibleDetail: true,
        rejectArr: 1,
      });
    }
  }

  postAllForm = () => {
    const that = this;
    const { allSelectValue } = this.state;
    if (allSelectValue.length == 0) {
      message.warning('请选择要操作的数据');
      return false;
    }
    const newArr = (allSelectValue || []).map((v) => {
      return v.itemId;
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const currentData = {
          itemIds: newArr,
          editStatus: 'FAILED',
          verifyContent: values.verifyContent,
        };

        Model.goods.batchVerifyItem(currentData).then((res) => {
          if (res) {
            that.fetchGrid.fetch();
            message.success('提交成功');
            this.setState({
              rejectVisibleDetail: false,
              showPretail: false,
            });
          }
        });
      }
    });
  }

  lookItemDetail = (item) => {
    this.setState({
      showPretail: true,
      itemDetail: item,
    });
  }

  forceDownShelfByItemIds = (item) => {
    const that = this;
    confirm({
      title: '确认下架当前商品？',
      okType: 'danger',
      onOk() {
        const currentData = {
          itemIds: [item.itemId],
        };
        Model.goods.forceDownShelfByItemIds(currentData).then((res) => {
          if (res) {
            message.success('操作成功');
            that.fetchGrid.reload();
          }
        });
      },
    });
  }

  /**
   * @description: 点击搜索按钮查询值
   * @param {type}
   * @return:无
   */
  searchValue = () => {
    const { searchFormData } = this.state;
    const params = Common.clone(searchFormData);
    const df = 'yyyy-mm-dd hh:ii:ss';
    if (params.submissionTime && params.submissionTime.length) {
      params.gmtStart = Common.dateFormat(params.submissionTime[0].valueOf(), df);
      params.gmtEnd = Common.dateFormat(params.submissionTime[1].valueOf(), df);
    }
    params.verifyStatusList = params.verifyStatusList ? [params.verifyStatusList] : [];
    delete params.submissionTime;
    this.fetchGrid.fetch(params);
  }

  resetItem = () => {
    this.setState({ searchFormData: {} });
    this.fetchGrid.fetch({}, false);
  }

  /**
   * @description:状态筛选
   * @param {Object}
   * @return:
  */
  rejHandleChange = (e) => {
    const { params } = this.state;
    params.verifyStatusList = e;
    this.setState({
      params,
    });
  }

  /**
    * @description: 单个商品成功审核
    * @param {type}
    * @return:
    */

  verifyItem = (item, type) => {
    const that = this;
    let currentData;
    if (type === 1) {
      confirm({
        title: '审核通过',
        content: '审核通过后对应的商品会自动上架，确认审核通过？',
        okType: 'danger',
        onOk() {
          currentData = {
            itemId: item.itemId,
            editStatus: 'PASS',
          };
          Model.goods.verifyItem(currentData).then((res) => {
            if (res) {
              that.setState({
                showPretail: false,
              });
              that.fetchGrid.fetch();
            }
          });
        },
      });
    } else {
      this.setState({
        rejectVisibleDetail: true,
        happendsId: item.itemId,
      });
    }
  }

  // 单个商品失败审核
  postForm = () => {
    const that = this;
    const { happendsId } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const currentData = {
          itemId: happendsId,
          editStatus: 'FAILED',
          verifyContent: values.verifyContent,
        };

        Model.goods.verifyItem(currentData).then((res) => {
          if (res) {
            that.fetchGrid.fetch();
            message.success('提交成功');
            this.setState({
              rejectVisibleDetail: false,
              showPretail: false,
            });
          }
        });
      }
    });
  }

  // 审核筛选数据监听
  handleChange = (value) => {
    const { params } = this.state;
    params.shelfStatus = value;
    this.setState({
      params,
    });
  }


  dealData = (value) => {
    return value;
  }


  // 审核详情
  auditDetails = (data) => {
    this.getItemVerifyList(data.itemId);
  }

  // 关闭审核理由填写
  hideModalForm = () => {
    this.setState({
      rejectVisibleDetail: false,
    });
  }

  // 关闭查看按钮
  hideModalDetail = () => {
    this.setState({
      showPretail: false,
    });
  }


  render() {
    const { pageListColumns, newData, rejectVisibleDetail, showPretail } = this.state;
    const { searchFormData, token, itemDetail, rejectArr, itemConfirm, category } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
      },
    };
    return (
      /** Layout-admin:Start */
      <div>
        <Card style={{ width: '100%' }}>
          <section className={styles.headTop}>
            <FormControl.Wrapper value={searchFormData}>
              <Row type="flex" style={{ marginBottom: '10px' }}>
                <div className={styles.searchLable} style={{ width: '100px', lineHeight: '32px', textAlign: 'center' }}>商品ID:</div>
                <FormControl type="text" name="itemId" placeholder="请输入商品ID" width={180} trim />

                <div className={styles.searchLable} style={{ width: '100px', lineHeight: '32px', textAlign: 'center' }}>商品名称:</div>

                <FormControl type="text" name="goodsName" placeholder="请输入商品名称" width={180} trim />

                <div className={styles.searchLable} style={{ width: '100px', lineHeight: '32px', textAlign: 'center' }}>所属分类:</div>
                <FormControl type="select"
                  name="firstCatId"
                  placeholder="选择所属分类"
                  dataSource={[{ label: '全部', value: '' }, ...category]}
                  width={160}
                />

                <div className={styles.searchLable} style={{ width: '100px', lineHeight: '32px', textAlign: 'center' }}>店铺名称:</div>
                <FormControl type="text"
                  name="supplierIdName"
                  placeholder="请输入店铺名称"
                  width={180}
                  trim
                />
              </Row>

              <Row type="flex" style={{ marginBottom: '10px' }}>
                {/* <div className={styles.searchLable} style={{ width: '100px', lineHeight: '32px', textAlign: 'center' }}> 商品状态：</div>
                <FormControl type="select"
                  name="promotionType"
                  placeholder="选择商品状态"
                  dataSource={[{ label: '全部', value: '' }, { label: '未提交', value: '1' }, { label: '爆品活动', value: '2' }]}
                  width={180}
                /> */}

                <div className={styles.searchLable} style={{ width: '100px', lineHeight: '32px', textAlign: 'center' }}> 审核状态：</div>
                <FormControl type="select"
                  name="verifyStatusList"
                  placeholder="选择审核状态"
                  dataSource={[{ label: '全部', value: '' }, { label: '待审核', value: 'IN_VERIFY' }, { label: '审核失败', value: 'FAILED' }, { label: '审核通过', value: 'PASS' }]}
                  width={180}
                />

                <div className={styles.searchLable} style={{ width: '100px', lineHeight: '32px', textAlign: 'center' }}> 商品状态：</div>
                <FormControl type="select"
                  name="shelfStatus"
                  placeholder="选择商品状态"
                  dataSource={[{ label: '全部', value: '' }, { label: '已上架', value: 'ON_SALES' }, { label: '已下架', value: 'DOWN_SALES' }]}
                  width={180}
                />

                <div className={styles.searchLable} style={{ width: '100px', lineHeight: '32px', textAlign: 'center' }}> 上传时间：</div>
                <FormControl type="date-range" name="submissionTime" showTime style={{ width: 380 }} />
              </Row>
              <Row style={{ marginBottom: '10px' }}>
                <div className={styles.buttonStyles}>
                  <Button style={{ marginLeft: '20px', width: '116px' }} type="primary" onClick={this.searchValue}>搜索</Button>
                  <Button style={{ marginLeft: '20px', width: '116px' }} onClick={this.resetItem}>重置</Button>
                </div>
              </Row>
            </FormControl.Wrapper>
          </section>
          <section className={styles.contentBot}>
            <div className="pagination-page">
              {/* 表格 */}
              <BoxTitle
                title="商品列表"
                theme="purple"
                className={styles.box_title}
              />
              {/* 分页器 */}
              <Paginator
                url={Model.goods.getItemList}
                columns={pageListColumns}
                params={newData}
                tableConfig={{
                  rowSelection: {
                    onChange: (key, e) => {
                      this.changeallvalue(key, e);
                    },
                  },
                }}
                scope={(el) => this.fetchGrid = el}
                onDeal={(e) => this.dealData(e)}
                extra={(
                  <div>
                    <Select placeholder="批量操作" style={{ width: 120, marginRight: '10px' }} onChange={this.batchOperatioChange}>
                      <Option value="0">审核通过</Option>
                      <Option value="1">审核失败</Option>
                    </Select>
                    <Button type="primary" ghost onClick={this.confirmOperate} disabled={itemConfirm}>确定</Button>
                  </div>
                )}
              />
            </div>
            {/** 列表分页 */}
          </section>
        </Card>
        {/* 详情 */}
        <div className={styles.detailMes}>
          <Modal
            footer={null}
            visible={showPretail}
            closable={false}
            onOk={this.postForm}
            bodyStyle={{ padding: 0 }}
            width={400}
            style={{ height: '800px', padding: 0, position: 'relative' }}
            onCancel={this.hideModalDetail}
          >
            <iframe
              title="11111"
              width="100%"
              height="675px"
              // src={`https://daily-shop-m.kangxiaopu.com/app/v1.2.3/#/pages/goodsdetail/goodsdetail?itemId=${itemDetail.itemId}&platform=preview&token=${token}&client=platform-kxp`}
              src={`https://shop-m.kangxiaopu.com/app/v1.2.3/#/pages/goodsdetail/goodsdetail?itemId=${itemDetail.itemId}&platform=preview&token=${token}&client=platform-kxp`}
              // src={`http://192.168.10.161:4252/#/pages/goodsdetail/goodsdetail?itemId=2645&platform=preview&token=${token}&client=PC`}
              frameBorder="0"
            />
            <div className={styles.maskMes}>
              <div className={styles.maskBottom}>
                {itemDetail.verifyStatus == 2 ? (
                  <div>
                    <Button className={styles.buttonMes} onClick={() => this.verifyItem(itemDetail, 0)}>审核失败</Button>
                    <Button className={styles.buttonSucMes} onClick={() => this.verifyItem(itemDetail, 1)}>审核通过</Button>
                  </div>
                ) : null}

              </div>
            </div>
          </Modal>
        </div>
        {/* 拒绝理由 */}
        <Modal
          title="审核失败"
          visible={rejectVisibleDetail}
          onOk={rejectArr && rejectArr == 1 ? this.postAllForm : this.postForm}
          width={660}
          onCancel={this.hideModalForm}
          zIndex="1000"
        >
          <Form {...formItemLayout}>
            <Form.Item label="失败原因">
              {
                getFieldDecorator('verifyContent', {
                  rules: [{
                    required: true,
                    message: '请填写审核失败原因，最多200字',
                    max: 200,
                  }],
                })(<Input.TextArea placeholder="请填写审核失败原因，最多200字" rows={4} />
                )
              }
            </Form.Item>
          </Form>

        </Modal>
      </div>
      /** Layout-admin:End */
    );
  }
}

export default goodsList;
