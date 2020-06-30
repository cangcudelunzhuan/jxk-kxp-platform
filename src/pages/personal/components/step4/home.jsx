
import React from 'react';
import { Table, Tabs } from 'antd';
// import { Link } from 'dva/router';
// import Model from '@/model';
import styles from './index.module.styl';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '时间',
          dataIndex: '',
          render: () => 111,
        },
        {
          title: '收入类型',
          dataIndex: '',
        },
        {
          title: '金额',
          dataIndex: '',
        },
        {
          title: '当前余额',
          dataIndex: '',
        },
      ],
      data: [],
      total: 100,
      current: 1,
    };
  }


  componentDidMount() {

  }

  render() {
    const { columns, data, total, current } = this.state;
    return (
      <section className={styles.step_box}>
        <Tabs>
          <Tabs.TabPane key={1} tab="收入">
            <Table columns={columns}
              rowKey="collectId"
              dataSource={data}
              pagination={false}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key={2} tab="提现">
            <Table columns={columns}
              rowKey="collectId"
              dataSource={data}
              pagination={{
                total,
                current,
              }}
            />
          </Tabs.TabPane>
        </Tabs>

      </section>
    );
  }
}

export default Index;
