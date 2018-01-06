<template>
  <div id="example">
    <x-header :left-options="{showBack: false}">订单列表</x-header>
    <search></search>
   <div class="orderInfo" v-for="(item,index) in items">
        <div class="orderNo">
          <p>供应商：<span class="black">{{item.b_sname}}</span></p>
          <p>状态：<span class="blue">{{item.statusName}}</span></p>
        </div>
        <div class="offerDeta">
           <p>订单号：{{item.sn}}</p>
          <p>下单时间：{{item.create_time}}</p>
          <p>总&nbsp;&nbsp;&nbsp;价：<span class="price">￥{{item.price}}</span></p>
        </div>
        <div  class="butsubmit">
          <x-button mini :gradients="['#1D62F0', '#19D5FD']" @click.native="senddetail(item.id)"  v-show='item.fahuo'>发货</x-button>
          <x-button mini :gradients="['#1D62F0', '#19D5FD']" @click.native="sendgdetail(item.id)"v-show='!item.fahuo'>查看详情</x-button>
            
        </div>
           
         
      </div>
  </div>
</template>
<script scoped>
  import axios from 'axios'
  import http from '@/utils/http';
  import {XButton, XHeader} from 'vux'
  import {urlConstants, urlPublic, sosoapi} from '@/utils/constants';

  import search from '@/components/search'
  export default {
    components: {
      search,
      XButton,
      XHeader
    },
    data () {
      return {
        items: [],
      }
    },
    created () {
      this.getlist();
    },
    methods: {
      // 请求接口方法
      getlist(){
        axios.get(urlPublic.publicUrl + 'order/sell/list/page/1').then(response => {
          this.items = response.data.result.datalist;
          // for(var i=0;i<this.items.length;i++){
          //       this.items[i]['fahuo']=true;
          //       console.log(this.items[i].status);
          //       if(this.items[i].status == 0 ){
          //               this.items[i].fahuo=true;
          //       }else if (item[i].status == 1) {
          //          this.items[i].fahuo=false;
          //       }
          //   }
          this.items.map(item => {
            if (item.status == 0) {
              item.fahuo = true;
              item.statusName = '未完成';
            } else if (item.status == 1) {
               item.fahuo =false;
              item.statusName = '已完成';
            }
          })
          /*for( let i=0;i<this.items.length; i++){
           this.items[i]['zhuangt']='';
           let zhuatz=this.items[i].status;
           if(zhuatz = 0){
           this.fahuo=true;
           this.chakan=false;
           this.items[i].zhuangt='未完成';
           }else if(zhuatz =1){
           //this.chakan=true;
           this.fahuo=false;
           this.items[i].zhuangt='已完成';
           }
           }*/
        })
          .catch(error => {
            console.log(error);
            //alertalert('网络错误，不能访问');
          })
      },
      senddetail(id){
        this.$router.push({path: '/seller/senddetails?id=' + id})
      },
      sendgdetail(id){
        this.$router.push({path: '/seller/sendgdetails?id=' + id})
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
