
import React from 'react';
import { Table } from 'antd';
// import { Link } from 'dva/router';
// import Model from '@/model';
import styles from './index.module.styl';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'ID',
          dataIndex: '',
          render: () => 111,
        },
        {
          title: '个人店名称',
          dataIndex: '',
        },
        {
          title: '账号',
          dataIndex: '',
        },
        {
          title: '拓展时间',
          dataIndex: '',
        },
        {
          title: '状态',
          dataIndex: '',
        },
      ],
      data: [],
    };
  }


  componentDidMount() {

  }

  render() {
    const { columns, data } = this.state;
    return (
      <section className={styles.step_box}>
        <Table columns={columns}
          rowKey="collectId"
          dataSource={data}
          pagination={false}
        />
      </section>
    );
  }
}

export default Index;
