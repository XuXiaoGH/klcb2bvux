//公共相关
import Home from '@/components/Home'
import login from '@/components/login'
import index from '@/components/index'
//买家相关
import offerorder from '@/components/Buyers/offerorder'//买家下单
import takelist from '@/components/Buyers/takelist'//
import takeSendlist from '@/components/Buyers/sendlist'//
import senddeta from '@/components/Buyers/senddeta'//
import takedetails from '@/components/Buyers/takedetails'
import orderDetail from '@/components/Buyers/orderDetail'
//卖家相关
import offerprice from '@/components/Seller/offerprice'
import sendlist from '@/components/Seller/sendlist'
import sendgdetails from '@/components/Seller/sendgdetails'
import sendgoodlist from '@/components/Seller/sendgoodlist'
import senddetails from '@/components/Seller/senddetails'
//卖家商友关系里边里的 采购商管理
import buyerlist from '@/components/buyercmd/buyerlist'//采购商列表
import buyeradd from '@/components/buyercmd/buyeradd'//采购商添加


//审批
import approvelist from '@/components/Approve/approvelist'//审批列表
import roverdetail from '@/components/Approve/roverdetail'//审批详情
//商品管理
import goodadd from '@/components/goods/goodadd'//商品添加
//申购管理
import purchadd from'@/components/apply/purchadd'//申购申请
import purchlist from'@/components/apply/purchlist'//申购列表
import purchdetail from'@/components/apply/purchdetail'//申购列表
 
import VueRouter from 'vue-router'
import axios from 'axios'
import {
  urlConstants,
  urlPublic
} from '@/utils/constants';


let routes = [

  {path: '/login',name: 'login',component: login},
  {path: '/',name: 'Home',component: Home,meta: {requiresAuth: true},
    children:[
      {path:'/',name:'index',component:index,meta:{requiresAuth:true}},//首页
      {path:'/approve/approvelist',name:'approvelist',component:approvelist,meta:{requiresAuth:true}},//审批列表
      {path:'/approve/roverdetail',name:'roverdetail',component:roverdetail,meta:{requiresAuth:true}},//审批详情
      {path: '/buyercmd/buyerlist',name: 'buyerlist',component: buyerlist,meta: {requiresAuth: true}},//卖家商友关系里边里的 采购商列表
      {path: '/buyercmd/buyeradd',name: 'buyeradd',component: buyeradd,meta: {requiresAuth: true}},//卖家商友关系里边里的 采购商添加
      {path: '/buyers/offerorder',name: 'offerorder',component: offerorder,meta:{requiresAuth:true}},//买家
      {path: '/buyers/takelist',name: 'takelist',component: takelist,meta:{requiresAuth:true}},//买家
      {path: '/buyers/takeSendlist',name: 'takeSendlist',component: takeSendlist,meta:{requiresAuth:true}},//买家
      {path: '/buyers/senddeta',name: 'senddeta',component: senddeta,meta:{requiresAuth:true}},//买家
      {path: '/buyers/takedetails',name: 'takedetails',component: takedetails,meta:{requiresAuth:true}},//买家
      {path: '/buyers/orderDetail',name: 'orderDetail',component: orderDetail,meta:{requiresAuth:true}},//买家
      {path: '/goods/goodadd',name: 'goodadd',component: goodadd,meta: {requiresAuth: true}},//商品添加
      {path: '/seller/offerprice',name: 'offerprice',component: offerprice,meta:{requiresAuth:true}},//卖家
      {path: '/seller/sendlist',name: 'sendlist',component: sendlist,meta:{requiresAuth:true}},//卖家
      {path: '/seller/senddetails',name: 'senddetails',component: senddetails,meta:{requiresAuth:true}},//卖家
      {path: '/seller/sendgoodlist',name: 'sendgoodlist',component: sendgoodlist,meta:{requiresAuth:true}},//卖家
      {path: '/seller/sendgdetails',name: 'sendgdetails',component: sendgdetails,meta:{requiresAuth:true}},//卖家
      {path: '/apply/purchadd',name: 'purchadd',component: purchadd,meta:{requiresAuth:true}},//申购申请
      {path: '/apply/purchlist',name: 'purchlist',component: purchlist,meta:{requiresAuth:true}},//申购列表
      {path: '/apply/purchdetail',name: 'purchdetail',component: purchdetail,meta:{requiresAuth:true}},//申购详情
    ]
  },
]
const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //如果是来自微信，则判断是否有token，如果有则放入缓存
    const {
      token,
      from
    } = to.query;
    console.log('token :' + token + ',  from = ' + from);
    if (from && from == 'weixin' && token) {
      sessionStorage.setItem('accesstoken', token);
    }
    axios.get(urlPublic.publicUrl + 'privilege/my').then(response => {
      let privilege=response.data.result.datalist;
      console.log(privilege);
      sessionStorage.setItem('privilege', JSON.stringify(privilege));
     
    });
    //校验这个目标页面是否需要登录
    axios.get(urlPublic.publicUrl + 'privilege/my').then(result => {
        if (result.data.status != 'success') {
            if(from && from == 'weixin'){ //如果是微信的登陆失败,则alert
              alert('微信登陆失败，请稍后重试');
            }else{ //如果是浏览器登录态校验失败，则跳转登录页
              next({
                path: '/login', 
              });
            }
            
        } 
        else {
            next();
        }
        
    });
  } else {
    next(); // 确保一定要调用 next()
  }
});

export default router;
