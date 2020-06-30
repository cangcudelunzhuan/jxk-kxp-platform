
import React from 'react';
// import { Link } from 'dva/router';
// import Model from '@/model';
import styles from './index.module.styl';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  componentDidMount() {

  }

  render() {
    return (
      <section>
        <div className={styles.info_box}>
          <div className={styles.item}>
            <label>账户余额</label>
            ¥1221242.00
          </div>
          <div className={styles.item}>
            <label>待结算金额</label>
            19967440096
          </div>
          <div className={styles.item}>
            <label>已结算金额</label>
            2020-12-22 21:23:00
          </div>
          <div className={styles.item}>
            <label>已提现金额</label>
            ccccc
          </div>
          <div className={styles.item}>
            <label>会员数</label>
            2020-12-22 21:23:00
          </div>
          <div className={styles.item}>
            <label>拓展个人店</label>
            2020-12-22 21:23:00
          </div>
          <div className={styles.item}>
            <label>订单金额</label>
            2020-12-22 21:23:00
          </div>
          <div className={styles.item}>
            <label>拓展个人店</label>
            2020-12-22 21:23:00
          </div>
          <div className={styles.item}>
            <label>分佣金额</label>
            2020-12-22 21:23:00
          </div>
        </div>
      </section>
    );
  }
}

export default Index;
