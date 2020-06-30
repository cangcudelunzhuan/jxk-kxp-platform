
import React from 'react';
import { Tabs, Button } from 'antd';
// import { Link } from 'dva/router';
// import Model from '@/model';
import icon1 from '@/assets/images/personal/icon1.png';
import styles from './index.module.styl';
import Step1 from './components/step1';
import Step2 from './components/step2';
import Step3 from './components/step3';
import Step4 from './components/step4';

class Downstream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: 1,
          name: '基本信息',
          template: () => {
            return (
              <Step1 />
            );
          },
        },
        {
          id: 2,
          name: '经营信息',
          template: () => {
            return (
              <Step2 />
            );
          },
        },
        {
          id: 3,
          name: '拓展记录',
          template: () => {
            return (
              <Step3 />
            );
          },
        },
        {
          id: 4,
          name: '资金记录',
          template: () => {
            return (
              <Step4 />
            );
          },
        },
      ],
    };
  }

  componentDidMount() {

  }

  render() {
    const { list } = this.state;

    return (
      /** Layout-admin:Start */
      <section className={styles.personal_box}>
        <div className={styles.top_box}>
          <div className={styles.img_box}>
            <img src={icon1} alt="" />
          </div>
          <div className={styles.name_box}>
            杭州XXX服务商/19967440096
            <span className={styles.type}>个人店</span>
          </div>
          <div className={styles.status_box}>
            状态：
            <span className={styles.status}>待平台审核</span>
          </div>
        </div>
        <Tabs className={styles.tab_out}>
          {
            list.map((item) => (

              <Tabs.TabPane key={item.id} tab={item.name}>
                <section className={styles.content_box}>
                  {item.template()}
                </section>
              </Tabs.TabPane>
            )
            )
          }
        </Tabs>
        <div className={styles.button_box}>
          <Button type="primary">审核通过</Button>
          <Button ghost type="primary">审核失败</Button>
        </div>
      </section>
      /** Layout-admin:End */
    );
  }
}

export default Downstream;
