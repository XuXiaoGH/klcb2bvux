'use strict'

import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
  let  accessToken = sessionStorage.getItem('accesstoken');
  console.log(accessToken);
 
  //let accessToken = "eyJ0eXBlIjoiand0IiwiYWxnIjoiaHMyNTYifQ==.eyJpcCI6IjExNS4xNzEuMjIzLjEwMCIsInRpbWUiOjE1MTM5MzIyODAsInJhbmRudW1iZXIiOjE2NzI3OTk1MDMsInVpZCI6MX0=.424ac2f78e4e51f21b1bc1acb09abce5e9682c4da3aa5b41a59acffc31bc3ca1";
  //console.log(config); //打印token
  let url = config.url;
  if(accessToken && !url.includes('sosoapi')){ //到时候开启这里就行  
     config.headers['token'] = accessToken;
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    let data = response.data;
    return data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  /* if (res.status === -404) {
    alert(res.msg)
  }
  if (res.data && (!res.data.success)) {
    alert(res.data.error_msg)
  } */
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        
      }
    }).then(
      (response) => {
       // console.log(response);
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}