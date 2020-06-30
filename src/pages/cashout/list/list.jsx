
import React from 'react';
import { Button, Col, Row, Select, message, Modal, Upload, Input, Spin } from 'antd';
import { FormControl, Paginator } from '@jxkang/web-cmpt';
import { Common } from '@jxkang/utils';
// import { Link } from 'dva/router';
import Model, { getUploadProps } from '@/model';
// import Config from '@/config';
import { formatDateTime } from '@/utils/filter';
import styles from './index.module.styl';

const { TextArea } = Input;
const { Option } = Select;

class Financial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      itemConfirm: null,
      checkItem: [],
      tradeMessage: '',
      selectedRowKeys: [],
      loading: false,
    };
    this.columns = [
      {
        title: '提现编号',
        dataIndex: 'withdrawId',
        width: '250px',
        key: 'withdrawId',
      }, {
        title: '会员账号',
        dataIndex: 'username',
        width: '200px',
        key: 'username',
      }, {
        title: '所属店铺',
        width: '200px',
        dataIndex: 'shopName',
        key: 'shopName',
      }, {
        title: '提现金额',
        width: '200px',
        dataIndex: 'amount',
        key: 'amount',
        // render: (item) => (
        //   <div>
        //     {item.roleType == '1' && '种子服务商'}
        //     {item.roleType == '2' && '总监服务商'}
        //   </div>
        // ),
      },
      {
        title: '实际到账',
        dataIndex: 'realAmount',
        width: '200px',
        key: 'realAmount',
      },
      {
        title: '手续费',
        dataIndex: 'serviceFeeAmount',
        width: '200px',
        key: 'serviceFeeAmount',
      },
      {
        title: '所属银行',
        dataIndex: 'bankName',
        width: '200px',
        key: 'bankName',
      },
      {
        title: '姓名',
        dataIndex: 'accountName',
        width: '200px',
        key: 'accountName',
      },
      {
        title: '卡号',
        dataIndex: 'cardNo',
        width: '200px',
        key: 'cardNo',
      },
      {
        title: '备注',
        dataIndex: 'tradeMessage',
        width: '200px',
        key: 'tradeMessage',
      },
      {
        title: '提现时间',
        dataIndex: 'createTime',
        width: '200px',
        key: 'createTime',
        render: (v) => {
          return <span>{formatDateTime(v)}</span>;
        },
      },
      {
        title: '状态',
        // dataIndex: 'tradeStatusDesc',
        // key: 'tradeStatusDesc',
        width: '100px',
        fixed: 'right',
        render: (v) => (
          <span className={`${v.tradeStatus === 1 && styles.blue} ${v.tradeStatus === 2 && styles.green} ${v.tradeStatus === 3 && styles.red}`}>{v.tradeStatusDesc}</span>
        ),

      },
      // {
      //   title: '操作',
      //   render: (item) => (
      //     <Link to={`/ financial / detail / ${ item.companyId }`}>
      //       查看
      //     </Link>
      //   ),
      // },
    ];
  }

  // 搜索
  searchPageList = () => {
    const { formData } = this.state;
    const params = Common.clone(formData);
    const df = 'yyyy-mm-dd hh:ii:ss';
    if (params.gmtModified && params.gmtModified.length) {
      params.startTime = Common.dateFormat(params.gmtModified[0].valueOf(), df);
      params.endTime = Common.dateFormat(params.gmtModified[1].valueOf(), df);
    }
    delete params.gmtModified;
    this.myGrid.fetch(params);
    this.setState({
      checkItem: [],
      selectedRowKeys: [],
    });
  }

  clear = () => {
    this.setState({
      formData: {},
    });
    this.myGrid.fetch({
      tradeStatus: '',
      username: '',
      shopName: '',
      accountName: '',
      cardNo: '',
      startTime: '',
      endTime: '',
    });
  }

  changeallvalue = (key, e) => {
    this.setState({
      checkItem: e,
      selectedRowKeys: key,
    });
  }

  confirmOperate = () => {
    const { checkItem, itemConfirm } = this.state;
    if (checkItem.length < 1) {
      message.error('请选中数据');
      return;
    }
    if (itemConfirm === 3) {
      this.openCashFail();
    }
    if (itemConfirm === 2) {
      this.openCashSuccess();
    }
  }

  process = () => {
    const list = [];
    const { checkItem, itemConfirm, tradeMessage } = this.state;
    checkItem.map((item) => list.push(item.withdrawId));
    Model.financial.process({
      tradeStatus: itemConfirm,
      withdrawIds: list,
      tradeMessage: itemConfirm === 3 ? tradeMessage : '',
    }).then((res) => {
      if (res) {
        message.success('操作成功');
        this.searchPageList();
        this.setState({
          checkItem: [],
          selectedRowKeys: [],
        });
      }
    });
  }

  openCashSuccess = () => {
    Modal.confirm({
      title: '同意提现申请',
      content: '确定通过提现申请吗',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        Modal.destroyAll();
        this.process();
      },
    });
  }

  openCashFail = () => {
    Modal.confirm({
      title: '拒绝提现原因',
      content: this.cashnode(),
      okText: '确认',
      cancelText: '取消',
      onOk: (res) => {
        console.log('>', res);
        const { tradeMessage } = this.state;
        if (!tradeMessage) {
          message.error('请填写失败原因');
          return;
        }
        Modal.destroyAll();
        this.process();
      },
    });
  }

  onDownLoadShippTpl = () => {
    Model.financial.cashTemplate().then((data) => {
      if (data) {
        Common.download(data, '提现导入模版.xls', 'excel');
      }
    });
  }

  cashnode = () => {
    const { tradeMessage } = this.state;
    const node = (
      <TextArea rows={4} defaultValue={tradeMessage} onChange={(e) => { this.setState({ tradeMessage: e.target.value }); }} />
    );
    return node;
  }

  batchOperatioChange = (e) => {
    this.setState({
      itemConfirm: e,
    });
  }

  openModal = () => {
    Modal.confirm({
      title: '批量导入',
      icon: '',
      content: this.node(),
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        console.log('>>><<');
      },
    });
  }

  node = () => {
    const node = (
      <section>
        <div className={styles.excel_up_out}>
          <span className={styles.title}>导入文件</span>
          <Upload
            {...getUploadProps({
              action: Model.financial.importCash(),
              name: 'file',
              accept: '.xlsx,.xls,.csv',
              onChange: this.handleChange,
              onFinish: this.uploadShipFinish,
            })}
          >
            <Button>上传文件</Button>
          </Upload>

        </div>
        <div className={styles.down}>
          没有模板?
          <span onClick={this.onDownLoadShippTpl}>下载EXCEL模板</span>
        </div>
        <div className={styles.desc}>
          <p>1.支持扩展名：仅支持CSV.EXCEL格式</p>
          <p>2.标记提现成功的所有待处理的提现单将会变更为提现成功状态，请谨慎操作</p>
          <p>3.标记提现失败时必须填写失败原因</p>
        </div>
      </section>
    );
    return node;
  }

  handleChange = (info) => {
    this.setState({ loading: true });
    if (info.file.status === 'done') {
      this.setState({ loading: false });
      if (info.file.response.entry) {
        const { entry } = info.file.response;
        Modal.destroyAll();
        Modal.confirm({
          title: '导入结果',
          content: `导入成功${entry.successCount}条，导入失败${entry.failCount}条`,
          okText: `${entry.failCount > 0 ? '导出失败条目' : '好的'}`,
          cancelText: '知道了',
          onOk: (res) => {
            console.log('>res', res);
            if (entry.failCount === 0) {
              Modal.destroyAll();
            } else {
              Model.financial.imporFail({ importNo: entry.importNo }).then((data) => {
                if (data) {
                  Common.download(data, '提现导入失败条目.xls', 'excel');
                  Modal.destroyAll();
                }
              });
            }
            this.searchPageList();
            this.setState({
              checkItem: [],
              selectedRowKeys: [],
            });
          },
        });
      }
    }
  }

  importApplyList = () => {
    const { formData } = this.state;
    const params = Common.clone(formData);
    const df = 'yyyy-mm-dd hh:ii:ss';
    if (params.gmtModified && params.gmtModified.length) {
      params.startTime = Common.dateFormat(params.gmtModified[0].valueOf(), df);
      params.endTime = Common.dateFormat(params.gmtModified[1].valueOf(), df);
    }
    Model.financial.importApplyList(params).then((data) => {
      if (data) {
        Common.download(data, '提现申请表.xls', 'excel');
      }
    });
  }

  uploadShipFinish = () => {

  }

  componentDidMount() {
    // ...
  }

  render() {
    const { formData, itemConfirm, selectedRowKeys, loading } = this.state;
    return (
      /** Layout-admin:Start */
      <section>
        <Spin tip="Loading..." spinning={loading}>
          <FormControl.Wrapper value={formData}>
            <Row>
              <Col span={6}>
                <div className={styles.title}>会员账号：</div>
                <FormControl
                  type="text"
                  name="username"
                  placeholder="输入会员账号"
                  width={180}
                  trim
                />
              </Col>
              <Col span={6}>
                <div className={styles.title}>所属店铺：</div>
                <FormControl
                  type="text"
                  name="shopName"
                  placeholder="请输入所属店铺"
                  width={180}
                  trim
                />
              </Col>
              <Col span={6}>
                <div className={styles.title}>姓名：</div>
                <FormControl
                  type="text"
                  name="accountName"
                  placeholder="请输入姓名"
                  width={180}
                  trim
                />
              </Col>
              <Col span={6}>
                <div className={styles.title}>卡号：</div>
                <FormControl
                  type="text"
                  name="cardNo"
                  placeholder="请输入卡号"
                  width={180}
                  trim
                />
              </Col>

            </Row>
            <Row style={{ margin: '16px 0' }}>
              <Col span={6}>
                <div className={styles.title}>状态：</div>
                <FormControl type="select"
                  name="tradeStatus"
                  placeholder="请选择"
                  dataSource={[
                    {
                      label: '全部',
                      value: '',
                    },
                    {
                      label: '处理中',
                      value: 1,
                    }, {
                      label: '成功',
                      value: 2,
                    },
                    {
                      label: '失败',
                      value: 3,
                    },
                  ]}
                  width={180}
                />
              </Col>

              <Col span={6}>
                <div className={styles.title}>提现编号：</div>
                <FormControl
                  type="text"
                  name="withdrawId"
                  placeholder="请输入提现编号"
                  width={180}
                  trim
                />
              </Col>
              <Col span={12}>
                <div className={styles.title}>时间：</div>
                <FormControl type="date-range" name="gmtModified" showTime style={{ width: 280 }} />
              </Col>
            </Row>

            <Row style={{ margin: '16px 18px', textAlign: 'right' }}>
              <Col span={24}>
                <Button type="dashed" onClick={this.importApplyList}>批量导出</Button>
                <Button type="dashed" style={{ marginLeft: '12px' }} onClick={this.openModal}>批量导入</Button>
                <Button type="primary" style={{ marginLeft: '12px' }} onClick={this.searchPageList}>搜索</Button>
                <Button style={{ marginLeft: '12px' }} onClick={this.clear}>重置</Button>
              </Col>
            </Row>
            <Row className="pagination-page">
              <Paginator
                url={Model.financial.applyList}
                columns={this.columns}
                rowKey="withdrawId"
                scope={(el) => this.myGrid = el}
                tableConfig={{
                  rowSelection: {
                    onChange: (key, e) => {
                      this.changeallvalue(key, e);
                    },
                    fixed: true,
                    selectedRowKeys,
                    getCheckboxProps: (record) => ({
                      disabled: record.tradeStatus === 2 || record.tradeStatus === 3, // Column configuration not to be checked
                    }),
                  },
                  scroll: { x: '600px' },
                }}
                extra={(
                  <div>
                    <Select placeholder="批量操作" style={{ width: 120, marginRight: '10px' }} onChange={this.batchOperatioChange}>
                      <Option value={2}>提现成功</Option>
                      <Option value={3}>提现失败</Option>
                    </Select>
                    <Button type="primary" ghost onClick={this.confirmOperate} disabled={itemConfirm === null}>确定</Button>
                  </div>
                )}
              />
            </Row>
          </FormControl.Wrapper>
        </Spin>
      </section>
      /** Layout-admin:End */
    );
  }
}

export default Financial;
