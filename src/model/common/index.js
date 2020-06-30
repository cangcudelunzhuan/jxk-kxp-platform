// 公共接口
import { $ajax, $post, $get } from '@jxkang/utils';

const common = {
  // 文件上传接口
  upload: () => `${$ajax.getBaseUrl()}/productservice/img/upload`,
  // 用户登录
  login: (reqModel) => $post('/userservice/login/doLogin', reqModel),
  // 用户登出
  logout: (reqModel) => $post('/userservice/login/logout', reqModel),
  // 资质图片
  getImage: (reqModel) => $get('/productservice/img/getImageByType', reqModel),
};


export default common;
