/**
 * @Author: 福虎
 * @Email: Shenghu.tan@jdxiaokang.com
 * @Update: 2020-02-22 19:31:53
 * @Description: 详情界面
 */
import React from 'react';
import { Button, Row, Col, Modal, Tabs } from 'antd';
import { Link } from 'dva/router';
import { FormControl, Icon, Paginator } from '@jxkang/web-cmpt';
import { Common } from '@jxkang/utils';
import Model from '@/model';
import Config from '@/config';
import Info from '../info';
import styles from './index.module.styl';


class WaitExamine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noVisible: false,
      yesVisible: false,
      tabCurrent: 0,
      verifyContent: '',
      freezeYesVisible: false,
      freezeNoVisible: false,
      searchFormData: {},
    };

    this.pageCol1 = [
      {
        title: 'ID',
        dataIndex: 'companyId',
        key: 'companyId',
      }, {
        title: '服务商名称',
        dataIndex: 'ispName',
        key: 'ispName',
      }, {
        title: '联系人',
        dataIndex: 'contacts',
        key: 'contacts',
      }, {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (v) => {
          return Config.service.getCurrent('status', v);
        },
      }, {
        title: '注册时间',
        dataIndex: 'openDate',
        key: 'openDate',
        render: (v) => {
          return Common.dateFormat(v, 'yyyy-mm-dd hh:ii:ss');
        },
      },
      // {
      //   title: '操作',
      //   dataIndex: '',
      //   key: '',
      //   render: () => <Link to="/personalList">查看</Link>,
      // },
    ];
    this.pageCol2 = [
      {
        title: 'ID',
        dataIndex: 'companyId',
        key: 'companyId',
      }, {
        title: '服务商名称',
        dataIndex: '',
        key: '',
      }, {
        title: '上级服务商',
        dataIndex: '',
        key: '',
      }, {
        title: '联系人',
        dataIndex: '',
        key: '',
      }, {
        title: '联系电话',
        dataIndex: '',
        key: '',
      }, {
        title: '状态',
        dataIndex: '',
        key: '',
      }, {
        title: '推荐服务商数',
        dataIndex: '',
        key: '',
      }, {
        title: '推荐个店数',
        dataIndex: '',
        key: '',
      }, {
        title: '操作',
        dataIndex: '',
        key: '',
        render: () => <Link to="/personalList">查看</Link>,
      },
    ];
  }

  componentDidMount() {
    // ...
  }

  onShowExamineYes = () => {
    this.setState({ yesVisible: true });
  }

  onShowExamineNo = () => {
    this.setState({ noVisible: true });
  }

  onShowFreezeYes = () => {
    this.setState({ freezeYesVisible: true });
  }

  onShowFreezeNo = () => {
    this.setState({ freezeNoVisible: true });
  }

  onHideDialog = (t) => {
    this.setState({ [t]: false });
  }

  onChangeTab = (idx) => {
    this.setState({ tabCurrent: idx });
  }

  /**
   * layout的props属性
   */
  setLayoutProps = () => {
    return {
      customWarper: true,
    };
  }

  /**
   * 提交审核结果
   */
  handleExamine = (label) => {
    if (label === '失败' && !this.state.verifyContent) {
      Modal.warning({
        title: '提示',
        content: '必须填写失败原因',
      });
      return;
    }
    const { detail } = this.props;
    const statusList = [
      { value: 5, label: '失败' },
      { value: 6, label: '通过' },
    ];
    const status = (statusList.find((vv) => vv.label === label) || {}).value;
    Model.service.doCompanyExamine({
      status,
      verifyContent: this.state.verifyContent,
      companyId: detail.id,
    }).then(() => {
      if (this.state.yesVisible) {
        this.onHideDialog('yesVisible');
      } else {
        this.onHideDialog('noVisible');
      }
      this.props.getDetail();
    });
  }

  /**
   * 提交冻结结果
   */
  handleFreeze = (label) => {
    const { detail } = this.props;
    const statusList = [
      { value: 0, label: '解冻' },
      { value: 1, label: '冻结' },
    ];
    const status = (statusList.find((vv) => vv.label === label) || {}).value;
    Model.service.freezeCompany({
      freeze: status,
      companyId: detail.id,
    }).then(() => {
      if (this.state.freezeYesVisible) {
        this.onHideDialog('freezeYesVisible');
      } else {
        this.onHideDialog('freezeNoVisible');
      }
      this.props.getDetail();
    });
  }

  /**
   * 获取输入的失败原因内容
   */
  getFailReason = (value) => {
    this.state.verifyContent = value;
  }

  onResetSearch = () => {
    this.setState({ searchFormData: {} });
    this.myGrid.fetch({}, false);
  }

  onSearch = () => {
    const { searchFormData } = this.state;
    this.myGrid.fetch(searchFormData, false);
  }

  render() {
    const { noVisible, yesVisible, tabCurrent, freezeYesVisible, freezeNoVisible, searchFormData } = this.state;
    const { detail, imageList } = this.props;
    const companyLabel = Config.service.getCurrent('types', detail.roleType);

    return (
      <section>
        <section className={styles.top_box}>
          <div className={styles.pageicon}>
            <Icon type="fuwushangicon" />
          </div>
          <div align="center" className="mt15 mb15">
            <span>{detail.ispName}</span>
            <Button type="primary" ghost className="ml20">
              {companyLabel}
            </Button>
          </div>
          <div className={styles.service_status}>
            <Row>
              <Col span={4}><div align="right">ID：</div></Col>
              <Col span={8}>{detail.companyId}</Col>
              <Col span={4}><div align="right">登录账号：</div></Col>
              <Col span={8}>{detail.masterUserName}</Col>
            </Row>
            <Row>
              <Col span={4}><div align="right">状态：</div></Col>
              <Col span={8}>
                <a>
                  {
                    Config.service.getCurrent('status', detail.status)
                  }
                </a>
              </Col>
              { detail.status === 3 ? <Col span={4}><div align="right">失败原因：</div></Col> : null}
              { detail.status === 3 ? <Col span={8}>{detail.verifyContent}</Col> : null }
            </Row>
          </div>
          <div className={styles.tabs}>
            <span className={tabCurrent === 0 ? styles.current : null} onClick={() => this.onChangeTab(0)}>基本信息</span>
            <span className={tabCurrent === 1 ? styles.current : null} onClick={() => this.onChangeTab(1)}>推荐服务商</span>
          </div>
        </section>
        <section className={styles.box_main}>
          {
            tabCurrent === 0
              ? (
                <>
                  <Info detail={detail} imageList={imageList} />
                  {
                    // 显示 上级服务商-审核通过
                    detail.status === 4
                      ? (
                        <p align="center" className="mt30">
                          <Button type="primary" onClick={this.onShowExamineYes}>审核通过</Button>
                          <Button type="primary" ghost className="ml15" onClick={this.onShowExamineNo}>审核失败</Button>
                        </p>
                      )
                      : null
                  }
                  {
                    // 服务商审核通过 || 吊销冻结
                    detail.status === 6 || detail.status === 10
                      ? (
                        <p align="center" className="mt30">
                          {detail.freeze === 1
                            ? <Button type="primary" ghost className="ml15" onClick={this.onShowFreezeNo}>撤销吊销</Button>
                            : <Button type="primary" onClick={this.onShowFreezeYes}>吊销资质</Button>}
                        </p>
                      )
                      : null
                  }
                </>
              ) : null
          }
          {
            tabCurrent === 1
              ? (
                <Tabs>
                  <Tabs.TabPane key={0} tab="直推服务商">
                    <div className="pagination-page">
                      <FormControl.Wrapper value={searchFormData}>
                        <table className={styles.search_tbl}>
                          <tbody>
                            <tr>
                              <th>服务商名称：</th>
                              <td><FormControl placeholder="输入服务商名称" name="ispName" trim /></td>
                              <th>联系人：</th>
                              <td><FormControl placeholder="输入账号" name="contacts" trim /></td>
                              <th>联系电话：</th>
                              <td><FormControl placeholder="请输入" name="phone" trim /></td>
                              <th>状态：</th>
                              <td><FormControl type="select" placeholder="请选择" dataSource={Config.service.selectStatus} width="100%" name="status" trim /></td>
                            </tr>
                            <tr>
                              <td colSpan={7} />
                              <td>
                                <Button type="primary" className="mr15" onClick={this.onSearch}>搜索</Button>
                                <Button onClick={this.onResetSearch}>重置</Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </FormControl.Wrapper>
                      <Paginator
                        url={Model.service.getDirectCompanyList}
                        params={{ upperCompanyId: detail.companyId }}
                        columns={this.pageCol1}
                        scope={(el) => this.myGrid = el}
                      />
                    </div>
                  </Tabs.TabPane>
                  {/* <Tabs.TabPane key={1} tab="间推服务商">
                    <div className="pagination-page">
                      <table className={styles.search_tbl}>
                        <tbody>
                          <tr>
                            <th>服务商名称：</th>
                            <td><FormControl placeholder="输入服务商名称" /></td>
                            <th>上级服务商：</th>
                            <td><FormControl type="text" placeholder="输入服务商名称" /></td>
                            <th>联系电话：</th>
                            <td><FormControl placeholder="请输入" /></td>
                            <th>联系人：</th>
                            <td><FormControl placeholder="输入账号" /></td>
                          </tr>
                          <tr>
                            <th>状态：</th>
                            <td><FormControl type="select" placeholder="请选择" dataSource={[]} width="100%" /></td>
                            <td colSpan={5} />
                            <td>
                              <Button type="primary" className="mr15">搜索</Button>
                              <Button>重置</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Paginator
                        columns={this.pageCol2}
                        dev={5}
                      />
                    </div>
                  </Tabs.TabPane> */}
                </Tabs>
              )
              : null
          }
        </section>
        <Modal
          title="失败原因"
          visible={noVisible}
          onCancel={() => this.onHideDialog('noVisible')}
          onOk={() => this.handleExamine('失败')}
        >
          <FormControl type="textarea" placeholder="可编辑的失败原因..." style={{ height: 120 }} onChange={(value) => this.getFailReason(value)} />
        </Modal>
        <Modal
          title="审核通过"
          visible={yesVisible}
          onCancel={() => this.onHideDialog('yesVisible')}
          onOk={() => this.handleExamine('通过')}
        >
          <h3 className={styles.adopt}>确定审核通过？</h3>
          <div className={styles.adopt_remark}>
            审核通过后
            {companyLabel}
            账号将开通成功
          </div>
        </Modal>
        <Modal
          title="吊销资质"
          visible={freezeYesVisible}
          onCancel={() => this.onHideDialog('freezeYesVisible')}
          onOk={() => this.handleFreeze('冻结')}
        >
          <h3 className={styles.adopt}>确定吊销资质？</h3>
          {/* <div className={styles.adopt_remark}>
            审核通过后将由平台二次审核，即可开通成功
          </div> */}
        </Modal>
        <Modal
          title="撤销吊销"
          visible={freezeNoVisible}
          onCancel={() => this.onHideDialog('freezeNoVisible')}
          onOk={() => this.handleFreeze('解冻')}
        >
          <h3 className={styles.adopt}>确定撤销吊销？</h3>
          {/* <div className={styles.adopt_remark}>
            审核通过后将由平台二次审核，即可开通成功
          </div> */}
        </Modal>
      </section>
    );
  }
}

export default WaitExamine;
