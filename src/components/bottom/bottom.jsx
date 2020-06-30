import React, { Component } from 'react';
import styles from './index.module.styl';

class Bottom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.bottom_page}>
        <div>
          <span className={styles.text}>帮助</span>
          <span className={styles.text}>隐私</span>
          <span className={styles.text}>条款</span>
        </div>
        <div className={styles.desc}>copyright@2020 京小铺体验技术部出品</div>
      </div>
    );
  }
}

export default Bottom;
