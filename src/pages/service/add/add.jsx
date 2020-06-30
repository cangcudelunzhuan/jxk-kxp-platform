/**
 * @Author: 福虎
 * @Email: Shenghu.tan@jdxiaokang.com
 * @Update: 2020-02-22 13:52:26
 * @Description: 新增种子服务商
 */
import React from 'react';
import { Button, Row, Col, message } from 'antd';
import { FormControl, BoxTitle } from '@jxkang/web-cmpt';
import Model from '@/model';
// import Utils from '@/utils';
// import styles from './index.module.styl';


class AddOriginal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };
  }

  onChangeImg = (uploadType = 'qualificationsImage', src, resFile) => {
    // qualificationsImage(资质图片), qualificationsFile(资质文件)
    const { formData } = this.state;
    formData.urls = formData.urls || [];

    if (!formData.urls.find((v) => v.type === uploadType)) {
      formData.urls.push(
        {
          type: uploadType,
          urlObjects: [],
        }
      );
    }

    const urlObjects = formData.urls.find((v) => v.type === uploadType).urlObjects;

    // 最多10张
    if (urlObjects.length < 10) {
      urlObjects.push({
        name: resFile.file.name,
        url: src,
      });
    } else {
      message.warn('最多不超过10张');
    }

    this.setState({ formData });
  }

  onRemoveImg = (index) => {
    const { formData } = this.state;
    const urlObjects = formData.urls.find((v) => v.type === 'qualificationsImage').urlObjects;
    urlObjects.splice(index, 1);
    this.setState({ formData });
  }

  onSubmit = () => {
    const { history } = this.props;
    this.myform.validateAll((err, values) => {
      // const notUpload = !values.urls || values.urls.length === 0 || values.urls.find((v) => v.type === 'qualificationsImage').urlObjects.length === 0;
      // if (notUpload) {
      //   return message.warn('请上传服务商资质');
      // }
      if (!values.phone || !/^1\d{10}/.test(values.phone)) {
        return message.warn('请输入正确的登录手机号');
      }

      if (!err) {
        Model.service.addSeedCompany(values).then((resModel) => {
          if (resModel) {
            message.success('提交成功');
            history.push('list');
          }
        });
      }
    });
  }

  render() {
    const { formData } = this.state;
    // const images = ((formData.urls || []).find((v) => v.type === 'qualificationsImage') || {}).urlObjects || [];

    return (
      /** Layout-admin:Start */
      <section>
        <BoxTitle
          title="新增种子服务商信息填写"
          theme="purple"
        />
        <FormControl.Wrapper value={formData} ref={(el) => this.myform = el}>
          <section>
            <Row className="mt20" type="flex" align="middle">
              <Col span={4}><div className="required">登录手机号：</div></Col>
              <Col span={20}>
                <FormControl
                  name="phone"
                  placeholder="请设置种子服务商的登录手机号"
                  trim
                  maxLength={11}
                  required
                  verifMessage="请输入登录手机号"
                />
              </Col>
            </Row>
            {/* <Row className="mt20">
                <Col span={4}><div className="required">注册类型：</div></Col>
                <Col span={20}>
                  <FormControl
                    type="select"
                    name="companyType"
                    placeholder="请选择"
                    verifMessage="请选择注册类型"
                    required
                    dataSource={[
                      { label: '企业', value: '1' },
                      { label: '个体', value: '0' },
                    ]}
                    width="100%"
                  />
                </Col>
              </Row> */}
            <Row className="mt15 mb15">
              <Col span={4}><div className="required">服务商名称：</div></Col>
              <Col span={20}>
                <FormControl
                  name="companyName"
                  placeholder="请按营业执照填写"
                  verifMessage="请输入服务商名称"
                  trim
                  required
                  maxLength={30}
                />
              </Col>
            </Row>
            {/* <Row>
                <Col span={4}><div className="required">统一社会信用代码：</div></Col>
                <Col span={20}>
                  <FormControl
                    name="creditCode"
                    placeholder="即纳税人识别号"
                    verifMessage="请输入社会信用代码"
                    trim
                    required
                    maxLength={30}
                  />
                </Col>
              </Row> */}
            <Row className="mt15 mb15">
              <Col span={4}><div className="required">联系人：</div></Col>
              <Col span={20}>
                <FormControl
                  name="contactPerson"
                  placeholder="请输入，最多10字"
                  verifMessage="请输入联系人"
                  maxLength={10}
                  trim
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col span={4}><div className="required">联系电话：</div></Col>
              <Col span={20}>
                <FormControl
                  name="contacts"
                  placeholder="请输入联系人电话"
                  verifMessage="请输入联系人电话"
                  maxLength={15}
                  trim
                  required
                />
              </Col>
            </Row>
            {/* <Row className="mb20 mt15">
                <Col span={4}><div className="required">服务商资质：</div></Col>
                <Col span={20}>
                  <div className="upload_btn_box">
                    <FormControl
                      type="file"
                      listType="picture-card"
                      maxSize={5242880}
                      onChange={(...args) => this.onChangeImg('qualificationsImage', ...args)}
                    >
                      <Icon antd="antd" type="plus" />
                      <div>上传照片</div>
                    </FormControl>
                  </div>
                  {
                images.map((item, i) => (
                  <span key={i} className="upload_ret_items">
                    <i className="upload_ret_remove" title="删除" onClick={() => this.onRemoveImg(i)} />
                    <ShowImage><img src={Utils.getFileUrl(item.url)} alt="图片" /></ShowImage>
                  </span>
                ))
              }
                  <p className={styles.remark}>
                    请上传5M以内的PNG，JPG格式的图片，最多上传10张
                  </p>
                </Col>
              </Row> */}
            <Row className="mt30">
              <Col span={4} />
              <Col span={20}>
                <Button type="primary" onClick={this.onSubmit}>提交</Button>
              </Col>
            </Row>
          </section>
        </FormControl.Wrapper>
      </section>
      /** Layout-admin:End */
    );
  }
}

export default AddOriginal;
