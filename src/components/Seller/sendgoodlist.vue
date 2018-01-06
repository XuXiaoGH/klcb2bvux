<template>
  <div id="example">
    <x-header :left-options="{showBack: false}" >发货单列表</x-header>
     <search></search>
   <div class="orderInfo" v-for="(item,index) in items">
        <div class="orderNo">
          <p>采购商：<span class="black">{{item.b_sname}}</span></p>
          <p>状态：<span class="blue">{{item.statusName}}</span></p>
        </div>
        <div class="offerDeta">
          <p>订单号：{{item.sn}}</p>
          <p>下单时间：{{item.create_time}}</p>
          <p>总&nbsp;&nbsp;&nbsp;价：<span class="price">￥{{item.price}}</span></p>
        </div>
        <div  class="butsubmit">
          <x-button mini :gradients="['#1AA9F8', '#1AA9F8']" @click.native="senddetail(item.id)" >查看详情</x-button>
        </div>
           
         
      </div>
  </div>
</template>
<script scoped>
import axios from 'axios'
import http from '@/utils/http';
import {   XButton, XHeader  } from 'vux'
import { urlConstants,urlPublic,sosoapi } from '@/utils/constants';
import search from '@/components/search'
export default {
  components: {
   XButton,search,
    XHeader
  },
  data () {
    return {
      items: [],
      fahuo:false,
    }
  },
  created () {
    document.body.style.background = '#F2F2F2';
    this.getlist();
  },
  methods: {
     // 请求接口方法
			 getlist(){
            axios.get(urlPublic.publicUrl+'sending/list/page/1').then(response=>{
                this.items=response.data.result.datalist;
                this.items.map(item => {
                  if (item.status == 2) {
                    item.statusName = '已发货';
                  } else if (item.status == 3) {
                    item.statusName = '已收货';
                  }else if (item.status == 4) {
                    item.statusName = '已拒收';
                  }
               })
            })
            .catch(error=>{
                console.log(error);
                //alertalert('网络错误，不能访问');
            })
      },
      senddetail(id){
        this.$router.push({ path: '/seller/sendgdetails?id='+id })
      }
  }


}
</script>

<style lang='scss' scoped>
$borerbottom:1px solid #f8f8f8;
$black:black;
$bule:#00A0EA;
$price:#E7454A;
$borerbottom2:1px solid #dcdcdc;
.orderInfo{
  width: 98%;
  margin: 10px auto;
  border-radius: 3px;
  box-shadow: 0 5px 84px 0 rgba(4, 0, 0, 0.09); /* px */
  background-color: white;
  color:#A9A9A9;
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
