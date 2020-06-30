/**
 * @Author: 福虎
 * @Email: Shenghu.tan@jdxiaokang.com
 * @Update: 2020-02-22 19:31:53
 * @Description: 详情界面
 */
import React from 'react';
import { Icon } from '@jxkang/web-cmpt';
import styles from './index.module.styl';


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    // ...
  }

  /**
   * layout的props属性
   */
  setLayoutProps = () => {
    return {
      customWarper: true,
    };
  }

  render() {
    const { detail } = this.props;

    return (
      <section>
        <section className={styles.top_box}>
          <div className={styles.pageicon}>
            <Icon type="fuwushangicon" />
          </div>
          <div>{detail.masterUserName}</div>
          <div>
            状态：
            <a>待提交资质</a>
          </div>
        </section>
        <section className={styles.box_main}>
          <div className={styles.iconimg1} />
          <p className={styles.pagetip}>用户暂未提交资质信息！</p>
        </section>
      </section>
    );
  }
}

export default Detail;
