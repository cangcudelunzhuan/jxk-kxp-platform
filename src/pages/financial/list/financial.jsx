/**
 * @Author: chunxiao.zhang
 * @Email: chunxiao.zhang@jdxiaokang.com
 * @Update: 2020-02-24 12:24:02
 * @Description: 财务
 */
import React from 'react';
import { Button, Tabs, Col, Row } from 'antd';
import { FormControl, Paginator } from '@jxkang/web-cmpt';
import { Common } from '@jxkang/utils';
import { Link } from 'dva/router';
import Model from '@/model';
import Config from '@/config';


const { TabPane } = Tabs;
class Financial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'companyId',
        key: 'companyId',
      }, {
        title: '服务商名称',
        dataIndex: 'ispName',
        key: 'ispName',
      }, {
        title: '账号',
        dataIndex: 'masterUserName',
        key: 'masterUserName',
      }, {
        title: '级别',
        // dataIndex: 'roleType',
        // key: 'roleType',
        render: (item) => (
          <div>
            {item.roleType == '1' && '种子服务商'}
            {item.roleType == '2' && '总监服务商'}
          </div>
        ),
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (v) => Config.service.getCurrent('status', v),

      }, {
        title: '操作',
        render: (item) => (
          <Link to={`/financial/detail/${item.companyId}`}>
            查看
          </Link>
        ),
      },
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
      ispName: '',
      userName: '',
      roleType: '',
      status: '',
    });
  }

  componentDidMount() {
    // ...
  }

  render() {
    const { formData } = this.state;
    return (
      /** Layout-admin:Start */
      <section>
        <Tabs defaultActiveKey="1">
          <TabPane tab="服务商" key="1">
            <FormControl.Wrapper value={formData}>
              <Row>
                <Col span={6}>
                  服务商名称：
                  <FormControl
                    type="text"
                    name="ispName"
                    placeholder="输入服务商名称"
                    width={180}
                    trim
                  />
                </Col>
                <Col span={6}>
                  账号：
                  <FormControl
                    type="text"
                    name="userName"
                    placeholder="请输入"
                    width={180}
                    trim
                  />
                </Col>
                <Col span={6}>
                  级别：
                  <FormControl type="select"
                    name="roleType"
                    placeholder="请选择"
                    dataSource={[
                      {
                        label: '种子服务商',
                        value: '1',
                      }, {
                        label: '总监服务商',
                        value: '2',
                      },
                    ]}
                    width={180}
                  />
                </Col>
                <Col span={6}>
                  状态：
                  <FormControl type="select"
                    placeholder="请选择"
                    name="status"
                    dataSource={Config.service.selectStatus}
                    width={180}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: '16px' }}>
                <Col span={4} push={20}>
                  <Button type="primary" onClick={this.searchPageList}>搜索</Button>
                  <Button style={{ marginLeft: '12px' }} onClick={this.clear}>重置</Button>
                </Col>
              </Row>
              <Row className="pagination-page">
                <Paginator
                  url={Model.service.getList}
                  columns={this.columns}
                  scope={(el) => this.myGrid = el}
                />
              </Row>
            </FormControl.Wrapper>
          </TabPane>
          {/* <TabPane tab="云仓店" key="2">
            <Row>
              <Col span={6}>
                服务商名称：
                <FormControl type="text" placeholder="输入服务商名称" width={180} />
              </Col>
              <Col span={6}>
                账号：
                <FormControl type="text" placeholder="请输入" width={180} />
              </Col>
              <Col span={6}>
                级别：
                <FormControl type="select"
                  placeholder="请选择"
                  dataSource={[
                    {
                      label: '男',
                      value: '1',
                    }, {
                      label: '女',
                      value: '2',
                    },
                  ]}
                  width={180}
                />
              </Col>
              <Col span={6}>
                状态：
                <FormControl type="select"
                  placeholder="请选择"
                  dataSource={[
                    {
                      label: '男',
                      value: '1',
                    }, {
                      label: '女',
                      value: '2',
                    },
                  ]}
                  width={180}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: '16px' }}>
              <Col span={4} push={20}>
                <Button type="primary">搜索</Button>
                <Button style={{ marginLeft: '12px' }}>充值</Button>
              </Col>
            </Row>
            <Row className="pagination-page">
              <Paginator
                columns={this.pageCol2}
                dev={3}
              />
            </Row>
          </TabPane>
          <TabPane tab="个人店" key="3">
            <Row>
              <Col span={6}>
                服务商名称：
                <FormControl type="text" placeholder="输入服务商名称" width={180} />
              </Col>
              <Col span={6}>
                账号：
                <FormControl type="text" placeholder="请输入" width={180} />
              </Col>
              <Col span={6}>
                级别：
                <FormControl type="select"
                  placeholder="请选择"
                  dataSource={[
                    {
                      label: '男',
                      value: '1',
                    }, {
                      label: '女',
                      value: '2',
                    },
                  ]}
                  width={180}
                />
              </Col>
              <Col span={6}>
                状态：
                <FormControl type="select"
                  placeholder="请选择"
                  dataSource={[
                    {
                      label: '男',
                      value: '1',
                    }, {
                      label: '女',
                      value: '2',
                    },
                  ]}
                  width={180}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: '16px' }}>
              <Col span={4} push={20}>
                <Button type="primary">搜索</Button>
                <Button style={{ marginLeft: '12px' }}>充值</Button>
              </Col>
            </Row>
            <Row className="pagination-page">
              <Paginator
                columns={this.pageCol2}
                dev={3}
              />
            </Row>
          </TabPane> */}
        </Tabs>
      </section>
      /** Layout-admin:End */
    );
  }
}

export default Financial;
