/**
 * @Author: 福虎
 * @Email: Shenghu.tan@jdxiaokang.com
 * @Update: 2020-02-22 19:31:53
 * @Description: 详情界面
 */
import React from 'react';
import { Common } from '@jxkang/utils';
import Model from '@/model';
import tool from '@/utils';
import WaitExamine from './components/wait-examine';
import WaitSubmit from './components/wait-submit';


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      detail: null,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    this.getDetail();
    this.getImage();
  }

  // 获取详情
  getDetail = () => {
    Model.service.getCompanyDetail({ companyId: this.props.match.params.id }).then((res) => {
      this.setState({
        detail: res,
      });
    });
  }

  // 回显资质图片
  getImage = async () => {
    const id = this.props.match.params.id;
    const res = await Model.common.getImage({
      bizId: id,
      bizType: 'company',
      type: 'qualificationsImage',
    });
    if (!res) return false;
    const list = res.records.map((item) => {
      return {
        uid: item.id,
        name: item.name,
        status: 'done',
        url: item.url ? item.url : item.response.entry,
      };
    });
    this.getUrlsParams(list);
  }

  getUrlsParams = (oldList) => {
    const list = oldList.map((item) => {
      return {
        url: tool.getFileUrl(item.url),
      };
    });
    this.setState({
      imageList: list,
    });
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
    const { detail, imageList } = this.state;
    if (!detail) {
      return null;
    }

    return (
      /** Layout-admin:Start */
      <section>
        {
        Common.seek()
          .equal(detail.status === 1, <WaitSubmit detail={detail} />)
          .equal(detail.status !== 1, <WaitExamine detail={detail} imageList={imageList} getDetail={this.getDetail} />)
          .get()
        }
      </section>
    /** Layout-admin:End */
    );
  }
}

export default Detail;
