<template>
  <div>
      <x-header >采购商收货单</x-header>
      <search></search>
       <div class="orderInfo" v-for="(item,index) in orderList" v-if="allCount > 0">
        <div class="orderNo">
           <p>供应商：<span class="black">{{item.s_sname}}</span></p>
         
          <p>状态：<span class="blue">{{item.statusName}}</span></p>
        </div>
        <div class="offerDeta">
          <p>订单号：{{item.sn}}</p>
          <p>下单时间：{{item.create_time}}</p>
          <p>总&nbsp;&nbsp;&nbsp;价：<span class="price">￥{{item.price}}</span></p>
        </div>
         <!-- <div class="getBtn" @click="" ></div> -->
        <div  class="butsubmit">
           <x-button mini :gradients="['#1D62F0', '#19D5FD']" @click.native="sure(item.id)" v-if="item.status != 3">收货</x-button>
          <!-- <x-button mini :gradients="['#1D62F0', '#19D5FD']" @click.native="senddeta(item.id)">订单详情</x-button> -->
        </div>
      </div>

      <div v-if="allCount == 0" class="noSend">
        抱歉，供货商暂未发货
      </div>
  </div>
</template>

<script scoped>
import { XButton, XHeader } from 'vux'
import axios from 'axios'
import { urlConstants,urlPublic,sosoapi } from '@/utils/constants';

import search from '@/components/search'
export default {
  components: {
    XButton,search,
    XHeader
  },
  created(){
    this.id = this.$route.query.id;
    this.getlist();
  },
  methods: {
    change () {
    },
    getlist(){
      let url = 'sending/list/order/' + this.id+'/page/1';
      axios.get(urlPublic.publicUrl+url)//GET 开发完成 order/list/page/{page}
      .then(response=>{
          this.allCount =response.data.result.thispagenumber;
          this.orderList = response.data.result.datalist;
          this.orderList.map(item => {
            if(item.status == '2'){
              item.statusName = '已发货';
            }else if(item.status == '3'){
              item.statusName = '已完成';
            }
          });
      }).catch(error=>{
          console.log(error);
      })
    },
    sure: function(id){
      this.$router.push('/buyers/takedetails?id=' + id);
    },
    senddeta(id){
       window.alert('订单'+id);
      this.$router.push('/buyers/senddeta?id=' + id);
    }
  },
  data () {
    return {
      orderList: [],
      id:'',
      allCount:0
    }
  }
}
</script>

<style lang="scss" scoped>
$background:#F2F2F2;
body{
  background-color: $background;
}
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
.noSend{
  width: 100%;
  height: 100px;
  text-align: center;
  margin: 60px auto;
  color:#999999;
}

.butsubmit{text-align:right;}
.butsubmit .weui-btn{margin:0.3rem;} 
</style>
