import http from '@/utils/http'; // axios引用

import { urlConstants,urlPublic,sosoapi } from '@/utils/constants';

//登陆页面请求 验证码
// export const getLoginvercode =params =>{return http.get(urlPublic.publicUrl+'vercode',{params:params});}


//登陆获取 token 和登陆状态
export const getLogin = params =>{return http.get(urlPublic.urlPublic+'login',{params:params})}

//系统商品分类    获取
export const  getCategory =params =>{ return http.get(sosoapi.sosoUrl+'system/category/list',{params:params});};

//企业列表  获取
// export const getCompanylist =params =>{return http.get(sosoapi.sosoUrl+'store/list/page/1',{params:params});}

//用户商品清单列表  获取
// export const userGood =params =>{return http.get(sosoapi.sosoUrl+'store/list/page/1',{params:params});}

