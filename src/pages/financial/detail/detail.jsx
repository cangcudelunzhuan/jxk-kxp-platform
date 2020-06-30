/**
 * @Author: chunxiao.zhang
 * @Email: chunxiao.zhang@jdxiaokang.com
 * @Update: 2020-02-24 12:24:02
 * @Description: 财务
 */
import React from 'react';
import { Col, Row } from 'antd';
import { Paginator } from '@jxkang/web-cmpt';
import icon1 from '@/assets/images/personal/icon1.png';
import Model from '@/model';
import { formatDateTime } from '@/utils/filter';
import styles from './index.module.styl';

class Financial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      companyInfo: {},
    };
    this.columns = [
      {
        title: '时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (item) => <div>{formatDateTime(item)}</div>,
      }, {
        title: '收入类型',
        dataIndex: 'costTypeDesc',
        key: 'costTypeDesc',
        render: (item) => <div>{item}</div>,
      }, {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        render: (item) => <div>{item}</div>,
      }, {
        title: '当前余额',
        dataIndex: 'afterAmount',
        key: 'afterAmount',
        render: (item) => <div>{item}</div>,
      },
    ];
  }

  componentDidMount() {
    this.getCompany();
  }


  getPrice = (role) => {
    const { id } = this.state;

    Model.financial.getSystemPrice({
      companyId: id,
      role: 'TOPSAASSERVICE',
    }).then((data) => {
      if (!data) return false;
      this.setState({
        balanceAccount: data.balanceAccount,
      });
    });
  }

  getCompany = async () => {
    const { id } = this.state;
    const res = await Model.financial.getCompanyDetail({ companyId: id });
    if (!res) return;
    this.setState({
      companyInfo: res,
    }, () => {
      const { roleType } = this.state.companyInfo;
      this.getPrice(roleType);
    });
  }

  callback = (key) => {
    // eslint-disable-next-line no-console
    console.log('key:', key);
  }

  render() {
    const { companyInfo, id, balanceAccount } = this.state;
    const { roleType } = companyInfo;
    return (
      /** Layout-admin:Start */
      <section className={styles.container}>
        <Row>
          <img src={icon1} alt="" className={styles.icon} />
        </Row>
        <Row>
          <Col span={4} push={10} style={{ textAlign: 'center' }}>
            {companyInfo.companyName}
          </Col>
          <Col span={2} push={10}>
            {
              companyInfo.roleType == '1' && <a className={styles.normal}>种子服务商</a>
            }
            {
              companyInfo.roleType == '2' && <a className={styles.normal}>总监服务商</a>
            }
          </Col>
        </Row>
        <Row>
          <Col span={8} push={8}>
            <Col span={12}>
              状态：
              {companyInfo.status == 1 && '待支付保证金'}
              {companyInfo.status == 2 && '等完善信息'}
              {companyInfo.status == 3 && '入驻成功'}
              {companyInfo.status == 4 && '入驻成功'}
              {companyInfo.status == 5 && '入驻成功'}
              {companyInfo.status == 6 && '平台吊销'}
            </Col>
            <Col span={12}>
              账号：
              {companyInfo.masterUserName}
            </Col>
          </Col>
        </Row>
        <Row style={{ textAlign: 'center' }}>
          余额：¥
          <a>{balanceAccount}</a>
        </Row>
        {
          roleType && (
            <Paginator
              columns={this.columns}
              url={Model.financial.getFlowList}
              params={{ companyId: id, role: 'TOPSAASSERVICE' }}
            />
          )
        }

        {/* <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="收入" key="1" className="pagination-page">
            <Paginator
              columns={this.columns}
              dev={3}
            />
          </TabPane>
          <TabPane tab="提现" key="2" className="pagination-page">
            <Paginator
              columns={this.columns}
              dev={3}
            />
          </TabPane>

        </Tabs> */}
      </section>
      /** Layout-admin:End */
    );
  }
}

export default Financial;
