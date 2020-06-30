/**
 * @Author: 福虎
 * @Email: Shenghu.tan@jdxiaokang.com
 * @Update: 2020-02-22 11:58:26
 * @Description: 服务商管理
 */
import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import { FormControl, Paginator } from '@jxkang/web-cmpt';
import { Common } from '@jxkang/utils';
import Config from '@/config';
import Model from '@/model';
import styles from './index.module.styl';


class ServiceProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFormData: {},
      level: Common.clone(Config.service.types).filter((v) => v.value === '2' || v.value === '1'),
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
        dataIndex: 'roleType',
        key: 'roleType',
        render: (v) => Config.service.getCurrent('types', v),
      }, {
        title: '上级服务商',
        dataIndex: 'upperCompanyName',
        key: 'upperCompanyName',
      }, {
        title: '归属种子服务商',
        dataIndex: 'topCompanyName',
        key: 'topCompanyName',
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
          return Common.seek()
            .equal(v === 1, '待支付保证金')
            .equal(v === 2, '等完善信息')
            .equal(v === 3, '入驻成功')
            .equal(v === 4, '入驻成功')
            .equal(v === 5, '入驻成功')
            .equal(v === 6, '平台吊销')
            .else('未知状态')
            .get();
        },
      }, {
        title: '操作',
        render: (item) => (
          <Link to={`detail/${item.companyId}`} className={item.status === 4 ? styles.detail_link_1 : styles.detail_link_2}>
            {/* item.status === 4 ? '审核' : '查看' */}
            查看
          </Link>
        ),
      },
    ];
  }

  componentDidMount() {
    // ...
  }

  gotoAdd = () => {
    const { history } = this.props;
    history.push('add');
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
    const { searchFormData, level } = this.state;

    return (
      /** Layout-admin:Start */
      <section className="pagination-page">
        <FormControl.Wrapper value={searchFormData}>
          <table className={styles.search_tbl}>
            <tbody>
              <tr>
                <th>服务商名称：</th>
                <td><FormControl placeholder="输入服务商名称" name="ispName" trim /></td>
                <th>账号：</th>
                <td><FormControl placeholder="输入账号" name="userName" trim /></td>
                <th>级别：</th>
                <td><FormControl placeholder="请选择" name="roleType" type="select" dataSource={level} width="100%" /></td>
                <th>上级服务商：</th>
                <td><FormControl placeholder="请输入" name="upperCompanyName" trim /></td>
              </tr>
              <tr>
                <th>归属种子服务商：</th>
                <td><FormControl placeholder="归属种子服务商" name="topCompanyName" trim /></td>
                <th>联系人：</th>
                <td><FormControl placeholder="联系人" name="contacts" trim /></td>
                <th>电话：</th>
                <td><FormControl placeholder="请输入" name="phone" trim /></td>
                <th>状态：</th>
                <td><FormControl type="select" name="status" dataSource={Config.service.selectStatus} placeholder="请选择" width="100%" /></td>
              </tr>
              <tr>
                <td align="right"><Button type="primary" ghost onClick={this.gotoAdd}>+新增种子服务商</Button></td>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td>
                  <div align="right" className="pt15 pb20">
                    <Button type="primary" className="mr15" onClick={this.onSearch}>搜索</Button>
                    <Button onClick={this.onResetSearch}>重置</Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </FormControl.Wrapper>
        <Paginator
          url={Model.service.getCompanyList}
          columns={this.columns}
          scope={(el) => this.myGrid = el}
          rowKey={null}
        />
      </section>
      /** Layout-admin:End */
    );
  }
}

export default ServiceProvider;
