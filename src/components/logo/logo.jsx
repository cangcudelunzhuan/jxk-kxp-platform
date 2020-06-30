import React, { Component } from 'react';
import styles from './index.module.styl';

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title } = this.props;
    return (
      <div className={styles.logo_page}>
        <div className={styles.logo}>京</div>
        <div className={styles.store_name}>京小铺是XXXXXXXXXXXXXXX</div>
        <div className={styles.login_title}>{title}</div>
      </div>
    );
  }
}

export default Logo;
