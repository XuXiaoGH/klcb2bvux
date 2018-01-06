<template>
  <div class="shopcar" id="demo04">
    <x-header>采购商收货详情</x-header>
     <search></search>
    <div class="car-list">
      <ul>
        <li class="car-item" v-for="(item,index) in good_list">
          
            <div class="car-cont">
              <div class="info">
                <p>{{item.title}}</p>
                <p>{{item.statusName}}</p>
              </div>
            </div>
            <div class="cat-desc">
                <span>规格:{{item.attr}}</span>
              </div>
            <div class="cat-desc">
              数量：{{item.count}}
            </div>
            <div class="num">
              <span>￥{{item.price}}</span>
            </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script scoped>
  import axios from 'axios'
  import http from '@/utils/http';
  import {urlConstants, urlPublic, sosoapi} from '@/utils/constants';
  import {XButton, XHeader} from 'vux'
  import search from '@/components/search'
  export default {
    data () {
      return {
        good_list: [],
        totalPrice: 0,
        totalNum: 0,
        selected_all: false
      }
    },
    components:{
      XHeader,search
    },
    mounted: function () {

    },
    watch: {},
    created(){
      this.getlist();
      console.log(this.$route.query.id);
    },
    methods: {
      //请求接口方法
      getlist(){
        axios.get(urlPublic.publicUrl + 'order/' + this.$route.query.id + '/goods/list/page/1').then(response => {
          this.good_list = response.data.result.datalist;
          this.good_list.map(item => {
              if(item.status == 2){
                item.statusName = '已发货';
              }else if(item.status == 3){
                item.statusName = '已收货';
              }else if(item.status == 4){
                item.statusName = '已拒收';
              }
          })
        })
          .catch(error => {
            console.log(error);
            //alertalert('网络错误，不能访问');
          })
      },


    }
  }
</script>
<style lang="scss" scoped>

  .shopcar {
    margin-bottom: 3rem;
    background: #f1f1f1;
  }

  .car-item {
    border-bottom: 1px solid #ddd;
    position: relative;
    // height: 3rem;
    overflow: hidden;
    padding: 0.4rem;
    background: #fff;
    margin: 0.2rem auto
  }

  .car-checkbox {
    display: none;
  }

  // .car-item-content{margin-left: 1.5rem}
  .input-block {
    width: 30px;
    float: left;
    height: 55px;
    line-height: 55px;
  }

  .input-label {
    cursor: pointer;
    position: absolute;
    width: 18px;
    height: 18px;
    top: 18px;
    left: 0.3rem;
    background: #fff;
    border: 2px solid #ccc;
    border-radius: 50%;
  }

  .input-label:after {
    opacity: 0;
    content: '';
    position: absolute;
    width: 9px;
    height: 5px;
    background: transparent;
    top: 6px;
    left: 6px;
    border: 2px solid #333;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .input-label.active {
    background: #F15A24;
  }

  .car-cont   {
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
    height: 60px;
    background: #f5f5f5;
    position: fixed;
    bottom: 2rem;
    left: 0;
    right: 0;
  }

  .foot-car {
    width: 42px;
    height: 60px;
    float: left;
    margin-left: 12px;
    position: relative;
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

  .btn-box {
    float: right;
    height: 60px;
    line-height: 60px;
  }

  .btn-box button {
    height: 100%;
    width: 100px;
    border: none;
    background: #F15A24;
    color: #fff;
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
.info{

  }
  .info p:first-child{
    display: inline-block;
  }

  .info p:last-child{
    color:#00A0EA;
    display: inline-block;
    float: right;
  }
</style>
