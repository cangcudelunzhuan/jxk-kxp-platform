
import React from 'react';
import { Button, Col, Row, message, Modal, Upload, Input, Spin } from 'antd';
import { FormControl, Paginator } from '@jxkang/web-cmpt';
import { Common } from '@jxkang/utils';
// import { Link } from 'dva/router';
import Model, { getUploadProps } from '@/model';
// import Config from '@/config';
import styles from './index.module.styl';

const { TextArea } = Input;
// const { Option } = Select;

class Financial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      itemConfirm: null,
      checkItem: [],
      tradeMessage: '',
      // selectedRowKeys: [],
      loading: false,
    };
    this.columns = [
      {
        title: '导入批号',
        dataIndex: 'importNo',
        width: '250px',
        key: 'importNo',
        fixed: 'left',
      },
      {
        title: '手机号',
        dataIndex: 'userPhone',
        width: '250px',
        key: 'userPhone',
      }, {
        title: '姓名',
        dataIndex: 'contacts',
        width: '200px',
        key: 'contacts',
      }, {
        title: '店铺名称',
        width: '300px',
        dataIndex: 'shopName',
        key: 'shopName',
      }, {
        title: '有效期天数',
        width: '200px',
        dataIndex: 'effectiveDay',
        key: 'effectiveDay',
      },
      {
        title: '邀请码',
        dataIndex: 'invitationCode',
        width: '200px',
        key: 'invitationCode',
      },
      {
        title: '处理结果',
        dataIndex: 'taskResult',
        width: '300px',
        key: 'taskResult',
      },
      {
        title: '状态',
        width: '150px',
        fixed: 'right',
        render: (v) => (
          <span className={`${v.openStatus === 1 && styles.blue} ${v.openStatus === 2 && styles.yellow} ${v.openStatus === 3 && styles.green} ${v.openStatus === 4 && styles.red} ${v.openStatus === 5 && styles.gray}`}>
            {v.openStatus === 1 && '数据入库'}
            {v.openStatus === 2 && '处理中'}
            {v.openStatus === 3 && '试用成功'}
            {v.openStatus === 4 && '试用失败'}
            {v.openStatus === 5 && '执行过废弃数据'}
          </span>
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
    this.myGrid.fetch(params);
  }

  clear = () => {
    this.setState({
      formData: {},
    });
    this.myGrid.fetch({
      importNo: null,
      openStatus: null,
      userPhone: null,
    });
  }

  changeallvalue = (key, e) => {
    this.setState({
      checkItem: e,
      // selectedRowKeys: key,
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
          // selectedRowKeys: [],
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
    Model.service.exportExcel().then((data) => {
      if (data) {
        Common.download(data, '申请免费开店数据模版.xls', 'excel');
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
              action: Model.service.importFree(),
              name: 'importExcel',
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
        Modal.destroyAll();
        Modal.success({
          title: '导入成功',
          content: '您的数据已成功导入',
          okText: '好的',
          onOk: () => {
            this.searchPageList();
          },
        });
      }
    }
  }

  applyFreeShop = () => {
    const { formData } = this.state;
    const params = Common.clone(formData);
    this.searchPageList();
    Model.service.applyFreeShop(params).then((data) => {
      if (data) {
        message.success('申请成功');
        setTimeout(() => {
          this.searchPageList();
        }, 1000);
      }
    });
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
    const { formData, loading } = this.state;
    return (
      /** Layout-admin:Start */
      <section>
        <Spin tip="Loading..." spinning={loading}>
          <FormControl.Wrapper value={formData}>
            <Row>
              <Col span={6}>
                <div className={styles.title}>导入批号：</div>
                <FormControl
                  type="text"
                  name="importNo"
                  placeholder="输入导入批号"
                  width={180}
                  trim
                />
              </Col>
              <Col span={6}>
                <div className={styles.title}>手机号：</div>
                <FormControl
                  type="text"
                  name="userPhone"
                  placeholder="请输入手机号"
                  width={180}
                  trim
                />
              </Col>
              <Col span={6}>
                <div className={styles.title}>状态：</div>
                <FormControl type="select"
                  name="openStatus"
                  placeholder="请选择"
                  dataSource={[
                    {
                      label: '全部',
                      value: '',
                    },
                    {
                      label: '数据入库',
                      value: 1,
                    },
                    {
                      label: '处理中',
                      value: 2,
                    },
                    {
                      label: '试用成功',
                      value: 3,
                    },
                    {
                      label: '试用失败',
                      value: 4,
                    },
                    {
                      label: '已废弃',
                      value: 5,
                    },
                  ]}
                  width={180}
                />
              </Col>

            </Row>
            <Row style={{ margin: '16px 18px', textAlign: 'right' }}>
              <Col span={24}>
                <Button type="dashed" onClick={this.applyFreeShop}>批量申请试用</Button>
                <Button type="dashed" style={{ marginLeft: '12px' }} onClick={this.openModal}>数据导入</Button>
                <Button type="primary" style={{ marginLeft: '12px' }} onClick={this.searchPageList}>搜索</Button>
                <Button style={{ marginLeft: '12px' }} onClick={this.clear}>重置</Button>
              </Col>
            </Row>
            <Row className="pagination-page">
              <Paginator
                url={Model.service.freeList}
                columns={this.columns}
                rowKey="withdrawId"
                scope={(el) => this.myGrid = el}
                tableConfig={{
                  scroll: { x: '600px' },
                }}

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
