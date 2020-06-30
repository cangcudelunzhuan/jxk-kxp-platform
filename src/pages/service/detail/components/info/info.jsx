/**
 * @Author: 福虎
 * @Email: Shenghu.tan@jdxiaokang.com
 * @Update: 2020-02-22 19:31:53
 * @Description: 详情界面
 */
import React from 'react';
import { Row, Col } from 'antd';
// import { ShowImage } from '@jxkang/web-cmpt';
import { Common } from '@jxkang/utils';
import styles from './index.module.styl';

// const companyType = [
//   { value: 0, label: '个体' },
//   { value: 1, label: '公司' },
// ];


const Info = ({ detail }) => {
  return (
    <div className={styles.content}>
      <Row>
        {/* <Col span={12}>
          注册类型：
          <span className={styles.filedval}>
            {(companyType.find((vv) => vv.value === detail.companyType) || {}).label}
          </span>
        </Col> */}
        <Col span={12}>
          {/*
          统一社会信用代码：
          <span className={styles.filedval}>{detail.creditCode}</span>
          */}
        </Col>
      </Row>
      <Row className="mt15 mb15">
        <Col span={12}>
          联系人：
          <span className={styles.filedval}>{detail.contacts}</span>
        </Col>
        <Col span={12}>
          联系电话：
          <span className={styles.filedval}>{detail.phone}</span>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          上级服务商：
          <span className={styles.filedval}>{detail.upperCompanyName}</span>
        </Col>
        <Col span={12}>
          注册时间：
          <span className={styles.filedval}>{Common.dateFormat(detail.openDate, 'yyyy-mm-dd hh:ii:ss')}</span>
        </Col>
      </Row>
      {/* <div className="mt15 mb15">资质：</div>
      <div>
        {
          imageList.length ? imageList.map((item) => {
            return (
              <span className="upload_ret_items">
                <ShowImage><img src={item.url} alt="图片" /></ShowImage>
              </span>
            );
          }) : null
        }
      </div> */}
    </div>
  );
};

export default Info;
