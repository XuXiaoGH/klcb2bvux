<template>
  <div class="shopcar" id="demo04">
    <view-box>
      <x-header>供应商发货</x-header>
      <div class="car-list">
        <ul>
          <li class="car-item" v-for="(item,index) in good_list">
            <div class="input-block"  @click="select_one(index)">
              <div  v-if="item.count != item.send_count">
                <img :src="selected" alt="" v-if="item.is_selected" >
                <img :src="select" alt="" v-else>
              </div>
            </div>
            <div class="car-item-content">
              <div class="car-cont">
                <h3>{{item.title}}</h3>
                <div class="cat-desc">
                  <span>属性:{{item.attr}}</span><span class='price'>￥{{item.price}}</span>
                </div>
                <div class="cat-desc">
                  采购数量：{{item.count}}
                </div>
                <div class="cat-desc">
                  已发数量：{{item.send_count}}
                </div>
                <div class="cat-desc">
                  发货数量：<input v-model="item.sendCount" class="account" :onchange='onchange(item)'/>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      	<tabbar slot="bottom">
          <div class="car-footer">
            <div class="foot-car" @click="slect_all">
                <img :src="selected" alt="" v-if="selected_all">
                <img :src="select" alt="" v-else>
            </div>
            <div class="total-cont" v-show="fahuo">
              <span>总价：{{totalPrice}}</span>

            </div>
            <div class="btn-box">
              <button @click="bjsubmit">立即发货</button>
            </div>
          </div>
      	</tabbar>
    </view-box>
  </div>
</template>
<script scoped>
  import axios from 'axios'
  import http from '@/utils/http';
  import {urlConstants, urlPublic, sosoapi} from '@/utils/constants';
  import {XHeader,CheckIcon,ViewBox,Tabbar, } from 'vux'
  import select from '../common/select.png';
import selected from '../common/selected.png';
  export default {
    data () {
      return {
         select: select,
        selected:selected,
        good_list: [],
        totalPrice: 0,
        totalNum: 0,
        selected_all: false,
        fahuo: false
      }
    },
    components:{
      XHeader,CheckIcon ,ViewBox,Tabbar,
    },
    mounted: function () {
      this.getTotal();
    },
    watch: {
      'good_list': {
        handler: function (val, oldVal) {
          // console.log(val)
          return val;
        },
        deep: true
      }
    },
    created(){

      this.getlist();
      console.log(this.$route.query.id);
    },
    methods: {
      //请求接口方法
      getlist(){
        axios.get(urlPublic.publicUrl + 'order/' + this.$route.query.id + '/goods/list/page/1').then(response => {
          let temp = response.data.result.datalist;
          for (let i = 0; i < temp.length; i++) {
            temp[i]['is_selected'] = false;
            temp[i]['sendCount']=temp[i].count-temp[i].send_count;
            if(temp[i]['sendCount']>temp[i].count-temp[i].send_count){
              temp[i]['sendCount']=temp[i].count-temp[i].send_count;
            }
             console.log( temp[i]['sendCount']);
          }
          this.good_list = temp;
        })
          .catch(error => {
            console.log(error);
          })
      },
      onchange(item){
        if(item.sendCount>item.count-item.send_count){
          let Maxsr=item.count-item.send_count
            alert('最大可发数量为:'+ Maxsr);
            item.sendCount=item.count-item.send_count;
        }
      },
      getTotal () {
        this.totalPrice = 0
        //this.totalNum = 0
        for (var i = 0; i < this.good_list.length; i++) {
          var _d = this.good_list[i]
          if (_d.is_selected) {
            this.totalPrice += parseFloat(_d['price'] * _d['count'])
            this.totalNum += _d['count']
          }
        }
      },
      select_one (index) {
        if (this.good_list[index].is_selected == true) {
          this.good_list[index].is_selected = false
        } else {
          this.good_list[index].is_selected = true
        }
        this.getTotal()
      },
      slect_all () {
        if (this.selected_all) {
          for (var i = 0; i < this.good_list.length; i++) {
            this.good_list[i].is_selected = false;
          }
          this.selected_all = false
        } else {
          for (var i = 0; i < this.good_list.length; i++) {
            this.good_list[i].is_selected = true;
          }
          this.selected_all = true
        }
        this.getTotal()
      },
      //发货提交
      bjsubmit(){
        let submitGoodlist = this.good_list.filter(item => {
          return item.is_selected == true;
        })
        //你选中的数据都在这里呢
        let submitGoodlistTemp = [];
        if (submitGoodlist.length > 0) {
          submitGoodlist.map((item) => {
            let params = {};
            params['id'] = item.id;
            params['count'] = item.sendCount;
            submitGoodlistTemp.push(params);
          });
        }
        let params = 'order_id=' + this.$route.query.id + '&data=' + JSON.stringify(submitGoodlistTemp);
        console.log(params)
        axios.post(urlPublic.publicUrl + 'sending/add', params).then(response => {
          if(response.data.status == 'success'){
              this.$router.push('/seller/sendgoodlist');
          }
        })
          .catch(error => {
            console.log(error);
            alert('网络错误，不能访问');
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
$buttoncolor:#F15A24;
  .shopcar {
   height: 100%;
    background: #f1f1f1;
  }

  .car-item {
    border-bottom: 1px solid #ddd;
    position: relative;
    overflow: hidden;
    padding: 0.4rem;
    background: #fff;
    display: flex;
     display: -ms-flex;
  }
  .car-item-content {
   width: 100%;
  }
  .input-block{
    width: 2.2rem;
		line-height: 5;
    img{
     margin-top: 20px;
     width: 25px;
     margin-left: 0px;
   }
  }
  .car-cont h3 {
    font-weight: 600;
    line-height: 24px;
    font-size: 14px;
  }

  .car-price {
    position: absolute;
    right: 12px;
    bottom: 0px;
    width: 40px;
    height: 40px;
    text-align: right;
  }

  .car-price span {
    display: block;
    height: 24px;
    line-height: 24px;
    width: 100%;
  }
  .cat-desc {
    input {
      width: 2.5rem;
      text-align: center;
    }
    .price {
      float: right;
      color: red;
    }

  }

  .car-footer {
  width: 100%;
  }

 .foot-car{
		width: 42px;
		float: left;
		margin-left: 12px;
			img{
				margin-top: 0.8rem;
				width: 25px;
				margin-left: 0px;
			}
		}

  .total-cont {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    float: left;
  }

  .total-cont span {
    display: inline-block;
    margin-left: 12px;
  }

 .btn-box{float :right;
		height :100%;
		}
	.btn-box button{
        height :100%;
		width: 100px;
		border :none;
		background: #F15A24;
		color :#fff;
		font-size: 16px;
    }
  .num {
    position: absolute;
    bottom: 0.3rem;
    right: 0.9rem;

  }

  .num span {
    color: red;
    display: inline-block;

    height: 28px;
    float: left;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
  }
  .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
   
    color: #F15A24 ;
}
</style>
