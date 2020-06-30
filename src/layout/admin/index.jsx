import React from 'react';
import classnames from 'classnames';
import { Dropdown, Button } from 'antd';
import { Common } from '@jxkang/utils';
import Model from '@/model';
import AsideMenu from './components/menu';
import styles from './index.module.styl';


const G = globalThis;

class LayoutAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(G.localStorage.getItem('adminUserInfo') || '{}'),
      userCommandStatus: false,
    };
    this.menuOpenKeys = JSON.parse(G.sessionStorage.getItem('menuOpenKeys') || '[]');
    this.menuSelectedKeys = JSON.parse(G.sessionStorage.getItem('menuSelectedKeys') || '[]');
  }

  /**
   * 用户名下拉展开事件
   */
  openUserCommand = (v) => {
    this.setState({ userCommandStatus: v });
  }

  /**
   * 获取数据
   */
  getStateData = (v) => this.state[v];

  /**
   * 退出登陆
   */
  userExit = () => {
    Model.common.logout().then((resModel) => {
      if (resModel) {
        Common.delCookie(G.fetchTokenName);
        G.localStorage.removeItem('adminUserInfo');
        G.location.href = '/login';
      }
    });
  }

  /**
   * 用户手动刷新界面
   */
  onReloadPage = () => {
    location.reload();
  }

  render() {
    const { children, customWarper, ...props } = this.props;
    const { userCommandStatus, userInfo } = this.state;
    Object.assign(children.props, props, { getStateData: this.getStateData });

    const userDropMenu = (
      <div className={classnames(styles.user_drop_menu, { [styles.udopen]: userCommandStatus })}>
        <span onClick={this.userExit}>切换账号</span>
        <span onClick={this.userExit}>退出登录</span>
      </div>
    );

    return (
      <section className={styles.layout_wrap}>
        <aside className={styles.aside_menu}>
          <div className={styles.logo} />
          <AsideMenu />
        </aside>
        <section className={styles.right_box}>
          <section className={styles.top_bar}>
            <div className={styles.user_box}>
              <Button
                type="primary"
                icon="reload"
                size="small"
                onClick={this.onReloadPage}
              >
                刷新
              </Button>
              <Dropdown overlay={userDropMenu} onVisibleChange={this.openUserCommand} placement="bottomLeft">
                <div className={classnames(styles.user_name_wraper, { [styles.udopen]: userCommandStatus })}>
                  <img className={styles.photo} src={userInfo.headImg} alt={userInfo.nickName || userInfo.userName || '头像'} title={userInfo.nickName || userInfo.userName} />
                  <span className={styles.username}>{userInfo.nickName || userInfo.userName}</span>
                </div>
              </Dropdown>
            </div>
          </section>
          <main className={styles.main}>
            <section className={styles.main_container}>
              {
                customWarper ? children : (
                  <section className={`main-content ${styles.content}`}>
                    {children}
                  </section>
                )
              }
            </section>
          </main>
        </section>
      </section>
    );
  }
}

export default LayoutAdmin;
