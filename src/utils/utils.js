import React from 'react';
import Loadable from 'react-loadable';
import { Spin, message } from 'antd';
import { Common } from '@jxkang/utils';
import Config from '@/config';
import Model, { CallClient } from '@/model';

class Utils {
  loadRouter = (callLoad) => {
    return Loadable({
      loader: callLoad,
      loading: ({ error, pastDelay }) => {
        if (error) {
          return '系统正处于发布中,请稍后刷新或重新登录再试';
        } if (pastDelay) {
          return <Spin tip="Loading..." style={{ position: 'absolute', left: '50%', top: '50%' }} />;
        }
        return null;
      },
    });
  }

  /**
   * 获取完整的文件URL路径
   * @param {String} v 文件路径
   */
  getFileUrl = (v) => {
    const p = `/${v}`.replace(/^\/+/, '/');
    return v && (`${v}`.indexOf('//') > -1 ? v : `${Config.imgHost}${p}`);
  }

  /**
   * 获取文件下载路径
   * @param {String} v 文件下载路径
   */
  downloadFileUrl = (v) => {
    const p = `/${v}`.replace(/^\/+/, '/');
    return v && (`${v}`.indexOf('//') > -1 ? v : `${Config.downImgHost}${p}`);
  }

  /**
   * 获取文件的排序 序列号
   * @param {String} v 文件原始名称
   */
  getUploadImgSort = (v) => {
    const ret = /(?:_|-)(\d+)\.[a-z]+$/.exec(v);
    return ret && ret[1];
  }

  getFetchHeader = () => ({
    jdxiaokang_client: CallClient,
    token: Common.getCookie(globalThis.fetchTokenName),
  })

  /**
   * Upload 上传参数
   */
  getUploadProps = ({ onChange, onFinish, beforeUpload = () => {}, maxSize, ...nextProps }) => {
    const props = {
      action: Model.common.upload(),
      name: 'file',
      accept: '.jpg,.jpeg,.png',
      beforeUpload(file, files) {
        if (typeof maxSize === 'number' && file.size > maxSize) {
          const uni = maxSize / 1024 / 1024 > 1 ? `${maxSize / 1024 / 1024}M` : `${maxSize / 1024}KB`;
          message.warn(`上传文件大小已超过${uni}`);
          return false;
        }
        return beforeUpload(file, files);
      },
      onChange(info) {
        if (typeof onChange === 'function') {
          onChange(info);
        }

        if (info.file.status === 'done') {
          const response = info.file.response;
          const code = `${response.responseCode}`;
          if (code === '0') {
            const concatUpload = (data, only = true) => (only ? [data.file.response.entry] : data.fileList.map((v) => v.response.entry));
            if (typeof onFinish === 'function') {
              onFinish(info, concatUpload(info), concatUpload(info, false));
            }
          } else {
            message.error(response.message || '系统繁忙，请稍后再试');
          }
        }
      },
      showUploadList: false,
      headers: this.getFetchHeader(),
      multiple: false,
    };
    return { ...props, ...nextProps };
  }
}

export default new Utils();
