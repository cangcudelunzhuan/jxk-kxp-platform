
import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import { FormControl, Paginator } from '@jxkang/web-cmpt';
// import Model from '@/model';
import styles from './index.module.styl';

class Downstream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };
    this.pageCol2 = [
      {
        title: '店铺ID',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '店铺名称',
        dataIndex: '',
        key: '',
      }, {
        title: '店铺类型',
        dataIndex: '',
        key: '',
      }, {
        title: '账号',
        dataIndex: '',
        key: '',
      }, {
        title: '店铺状态',
        dataIndex: '',
        key: '',
      }, {
        title: '提交时间',
        dataIndex: '',
        key: '',
      }, {
        title: '操作',
        dataIndex: '',
        key: '',
        render: () => <Link to="/serviceVerify">查看</Link>,
      },
    ];
  }

  sub = () => {
    const { formData } = this.state;
    console.log('搜索条件数据', formData);
  }

  reset = () => {
    this.setState({
      formData: {},
    });
  }

  componentDidMount() {

  }

  render() {
    const { formData } = this.state;

    return (
      /** Layout-admin:Start */
      <section>
        <div className={styles.info_box}>
          <div className={styles.item}>
            <label>累计店铺</label>
            222个
          </div>
          <div className={styles.item}>
            <label>近7天新增</label>
            19967440096
          </div>
          <div className={styles.item}>
            <label>待审核</label>
            3333
          </div>
        </div>
        <div className="pagination-page">
          <div className={styles.search_box}>
            <FormControl.Wrapper value={formData}>
              <table>
                <tbody>
                  <tr>
                    <th>店铺ID：：</th>
                    <td><FormControl placeholder="输入店铺ID：" name="id" /></td>
                    <th>店铺名称：</th>
                    <td><FormControl placeholder="请输入" /></td>
                    <th>账号：：</th>
                    <td><FormControl placeholder="请输入" /></td>
                    <td><Button onClick={this.reset}>重置</Button></td>
                  </tr>
                  <tr>
                    <th>店铺类型：</th>
                    <td><FormControl placeholder="请输入" /></td>
                    <th>店铺状态：</th>
                    <td><FormControl type="select" placeholder="请选择" dataSource={[{ label: 1, value: 1 }]} width="100%" /></td>
                    <td />
                    <td />
                    <td><Button type="primary" onClick={this.sub}>搜索</Button></td>
                  </tr>
                </tbody>
              </table>
            </FormControl.Wrapper>
          </div>
          <Paginator
            columns={this.pageCol2}
            dev={3}
          />
        </div>
      </section>
      /** Layout-admin:End */
    );
  }
}

export default Downstream;
