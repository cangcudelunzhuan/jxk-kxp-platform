import { $ajax, Common } from '@jxkang/utils';
import errCode from '@/config/err-code';
import { message } from 'antd';
import Config from '@/config';
import common from './common';
import service from './service';
import financial from './financial';
import goods from './goods';

const CallClient = 'platform-kxp';

// 接口host配置
if (Config.getEnv() === 'production') { // 正式环境
  $ajax.setBaseUrl('https://api.jingxiaokang.com');
} else if (Config.getEnv() === 'pre') { // 预发环境
  $ajax.setBaseUrl('https://pre-api.jingxiaokang.com');
} else if (Config.getEnv() === 'test') { // 开发环境
  $ajax.setBaseUrl('https://daily-api.jdxiaokang.com');
} else {
  $ajax.setBaseUrl('https://daily-api.jdxiaokang.com');
}

// 注入全局的请求头
$ajax.injectHeaders({
  jdxiaokang_client: CallClient,
  token: Common.getCookie(globalThis.webConfig.fetchTokenName),
});

// 注入全局方法
$ajax.injectResponse((resModel) => {
  // 公司信息暂时未审核通过 1000010007 资料丢失 系统问题
  if (resModel && resModel.responseCode === 1000010008) {
    globalThis.sessionStorage.setItem('sup_CurrentMenu', '[6,0]');
    setTimeout(() => {
      globalThis.location.href = '/system/systemmange';
    }, 2500);
  }
});


// 注入需要重新登录时的 异常code
$ajax.injectErrCode(errCode);

export default {
  common,
  service,
  financial,
  goods,
};

export const getFetchHeader = () => ({
  jdxiaokang_client: CallClient,
  token: Common.getCookie(globalThis.webConfig.fetchTokenName),
});

export const getUploadProps = ({ onChange, onFinish, showUploadList = false, beforeUpload = () => { }, maxSize, ...nextProps }) => {
  const props = {
    action: common.upload(),
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
      info.fileList.forEach((item) => {
        if (item.status === 'done') {
          return item.url;
        }
      });

      if (typeof onChange === 'function') {
        onChange(info);
      }

      if (info.file.status === 'done') {
        const response = info.file.response;
        const code = `${response.responseCode}`;
        if (code === '0') {
          const concatUpload = (data, only = true) => (only ? [data.file.response.entry] : data.fileList.map((v) => v.response.entry));
          if (typeof onFinish === 'function') { onFinish(info, concatUpload(info), concatUpload(info, false)); }
        } else {
          message.error(response.message || '系统繁忙，请稍后再试');
        }
      }
    },
    showUploadList,
    headers: getFetchHeader(),
    multiple: false,
  };
  return { ...props, ...nextProps };
};


// export const getUploadProps = ({ onChange, onFinish, beforeUpload = () => true, maxSize, ...nextProps }) => {
//   const props = {
//     action: common.upload(),
//     name: 'file',
//     accept: '.jpg,.jpeg,.png',
//     beforeUpload(file, files) {
//       if (typeof maxSize === 'number' && file.size > maxSize) {
//         const uni = maxSize / 1024 / 1024 > 1 ? `${maxSize / 1024 / 1024}M` : `${maxSize / 1024}KB`;
//         message.warn(`上传文件大小已超过${uni}`);
//         return false;
//       }
//       return beforeUpload(file, files);
//     },
//     onChange(info) {
//       info.fileList.forEach((item) => {
//         if (item.status === 'done') {
//           item.url = item.response.entry.url;
//         }
//       });

//       if (typeof onChange === 'function') {
//         onChange(info);
//       }

//       if (info.file.status === 'done') {
//         const response = info.file.response;
//         const code = `${response.responseCode}`;
//         if (code === '0') {
//           const concatUpload = (data, only = true) => (only ? [data.file.response.entry] : data.fileList.map((v) => v.response.entry));
//           if (typeof onFinish === 'function') {
//             onFinish(info, concatUpload(info), concatUpload(info, false));
//           }
//         } else {
//           message.error(response.message || '系统繁忙，请稍后再试');
//         }
//       }
//     },
//     showUploadList: false,
//     headers: getFetchHeader(),
//     multiple: false,
//   };
//   return { ...props, ...nextProps };
// };

export { CallClient };
