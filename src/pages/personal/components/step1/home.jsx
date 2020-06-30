
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
      <section className={styles.step_box}>
        <div className={styles.info_box}>
          <div className={styles.item}>
            <label>联系人：</label>
            周云超
          </div>
          <div className={styles.item}>
            <label>联系电话：</label>
            19967440096
          </div>
          <div className={styles.item}>
            <label>注册时间：</label>
            2020-12-22 21:23:00
          </div>
          <div className={styles.item}>
            <label>邀请人：</label>
            ccccc
          </div>
          <div className={styles.item}>
            <label>归属种子服务商：</label>
            2020-12-22 21:23:00
          </div>
        </div>
        <div className={styles.photo_box}>
          <label>资质：</label>
          <div className={styles.content}>
            <img src="http://img5.imgtn.bdimg.com/it/u=3836022977,4193961472&fm=26&gp=0.jpg" alt="" />
            <img src="http://img5.imgtn.bdimg.com/it/u=3836022977,4193961472&fm=26&gp=0.jpg" alt="" />
            <img src="http://img5.imgtn.bdimg.com/it/u=3836022977,4193961472&fm=26&gp=0.jpg" alt="" />
            <img src="http://img5.imgtn.bdimg.com/it/u=3836022977,4193961472&fm=26&gp=0.jpg" alt="" />
            <img src="http://img5.imgtn.bdimg.com/it/u=3836022977,4193961472&fm=26&gp=0.jpg" alt="" />
          </div>
        </div>
      </section>
    );
  }
}

export default Index;
