<template>
  <div>
      <x-header >采购订单页</x-header>
       <search></search>
      <div class="orderInfo" v-for="(item,index) in orderList">
        <div class="orderNo">
          <p>订单号：<span class="black">{{item.sn}}</span></p>
          <p>状态：<span class="blue">{{item.statusName}}</span></p>
        </div>
        <div class="offerDeta">
          <p>下单时间：{{item.create_time}}</p>
          <p>供应商：{{item.s_sname}}</p>
          <p>总&nbsp;&nbsp;&nbsp;价：<span class="price">￥{{item.price}}</span></p>
        </div>
        <div  class="butsubmit">
          <x-button mini :gradients="['#1D62F0', '#19D5FD']" @click.native="goOrderDetail(item.id)">订单详情</x-button>
          <x-button mini :gradients="['#1D62F0', '#19D5FD']" @click.native="goSendList(item.id)">收货详情</x-button>
          <!-- <x-button mini type="primary">关闭订单</x-button>
          <x-button mini type="warn">删除订单</x-button> -->
          <!-- <x-button mini type="primary">确认完成</x-button>  收货中确认完成 这里不需要 -->
        </div>
           
         
      </div>
  </div>
</template>

<script scope>
import { XButton, XHeader ,Flexbox, FlexboxItem,} from 'vux'
import axios from 'axios'
import { urlConstants,urlPublic,sosoapi } from '@/utils/constants';
 import search from '@/components/search'
export default {
  components: {
    XButton,search,
    XHeader,Flexbox, FlexboxItem,
  },
  created(){
      document.body.style.background = '#F2F2F2';
    this.getlist();
  },
  methods: {
    change () {
    },
    getlist(){
      axios.get(urlPublic.publicUrl+'order/list/page/1')//GET 开发完成 order/list/page/{page}
      .then(response=>{
          this.orderList = response.data.result.datalist;
          this.orderList.map(item => {
            if(item.status == '0'){
              item.statusName = '未完成';
            }else if(item.status == '1'){
              item.statusName = '已完成';
            }else if(item.status == '2'){
              item.statusName = '审核中';
            }else if(item.status == '3'){
              item.statusName = '未通过';
            }
          });
          console.log(response.data.result.datalist);
      }).catch(error=>{
          console.log(error);
          //alertalert('网络错误，不能访问');
      })
    },
    goOrderDetail: function(id){
     //window.alert('订单'+id);
      this.$router.push('/buyers/orderDetail?id=' + id);
    },
    goSendList(id){ //去发货单列表页
     //window.alert('收货'+id);
      this.$router.push('/buyers/takeSendlist?id=' + id);
    }
  },
  data () {
    return {
      orderList: []
    }
  }
}
</script>

<style lang="scss" scoped>
$borerbottom:1px solid #f8f8f8;
$black:black;
$bule:#00A0EA;
$price:#E7454A;
$borerbottom2:1px solid #dcdcdc;
.orderInfo{
  width: 100%;
  // height: 160px;
  background-color: white;
  color:#A9A9A9;
  border-bottom:$borerbottom2;
}
.orderNo{
 width: 98%;
    height: 2rem;
    border-bottom: $borerbottom;
    line-height: 2rem;
    margin: 0 auto;
}
.orderNo p:first-child{
  float: left;
  margin-left: 10px;
}

.orderNo p:last-child{
  float: right;
  margin-right: 10px;
}
.offerDeta{
  width: 92%;
  // height: 160px;
  margin: 0 auto;
  background-color: white;
  padding: 0.5rem;
  color:#A9A9A9;
  border-bottom:$borerbottom;
}
.blue{color:$bule;}
.black{color:$black;}

 
.price{color:$price;}

.getBtn{
  background-color: #00A0EA;
  color:white;
  width: 30%;
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-radius: 2px;
  margin: 0 auto;
  margin-top:15px;
}

.header{
  background-color: red;
}
.butsubmit{text-align:right;}
.butsubmit .weui-btn{margin:0.3rem;} 


</style>
