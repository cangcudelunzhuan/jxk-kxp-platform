/**
 * @Author: 福虎
 * @Email: Shenghu.tan@jdxiaokang.com
 * @Update: 2020-03-05 19:56:58
 * @Description: 登录界面
 */
import React from 'react';
import { Button, message } from 'antd';
import { FormControl, Icon } from '@jxkang/web-cmpt';
import { $ajax, Common } from '@jxkang/utils';
import Model, { getFetchHeader } from '@/model';
import Assets from '@/assets';
import styles from './index.module.styl';


const G = globalThis;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        platformRole: 'PLATFORM',
      },
    };
  }

  onSubmit = () => {
    const { formData } = this.state;
    const { history } = this.props;
    if (formData.userName && formData.password) {
      Model.common.login(formData).then((resModel) => {
        if (resModel) {
          Common.setCookie({
            key: G.webConfig.fetchTokenName,
            value: resModel.token,
          });

          // 重新注入新的token信息
          $ajax.injectHeaders(getFetchHeader());

          // 判断是否有用户头像，没有就用默认头像
          resModel.headImg = resModel.headImg || 'https://static.jdxiaokang.com/assets/images/1579400326986_672.png';
          G.localStorage.setItem('adminUserInfo', JSON.stringify(resModel));
          history.push('/service/list');
        }
      });
    } else {
      message.warn('账户和密码必填');
    }
  }

  render() {
    const { formData } = this.state;

    return (
      <section className={styles.login}>
        <div style={{ backgroundImage: `url(${Assets.Login.Logo})` }} className={styles.logo} />
        <div className={styles.title}>账户密码登录</div>
        <div>
          <FormControl.Wrapper value={formData}>
            <FormControl
              prefix={<Icon antd="antd" type="user" />}
              type="text"
              name="userName"
              placeholder="账户"
              trim
              maxLength={20}
            />
            <FormControl
              prefix={<Icon antd="antd" type="lock" />}
              oType="password"
              name="password"
              className="mt20 mb20"
              trim
              placeholder="密码"
            />
            <Button
              onClick={this.onSubmit}
              type="primary"
              className={styles.submit}
            >
              登 录
            </Button>
          </FormControl.Wrapper>
        </div>
        <footer className={styles.footer}>
          <div className={styles.items_box}>
            <span>帮助</span>
            <span>隐私</span>
            <span>条款</span>
          </div>
          <div>
            copyright &copy; 2020 康小铺体验技术部出品
          </div>
        </footer>
      </section>
    );
  }
}

export default Login;
