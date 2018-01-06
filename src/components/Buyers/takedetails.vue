<template>
  <div id="example">
    <x-header>收货单详情</x-header>
    <div class="car-list">
      <ul>
         <li class="car-item"  :value="item" v-for="(item, index) in items" :key="index">
           <div class="input-block"  @click="selectClick(index)">
            <div>  
              <!-- v-if="item.count != item.send_count" -->
	            <img :src="selected" alt="" v-if="item.isSelect" >
					    <img :src="select" alt="" v-else>
            </div>
					</div>
          <div class="car-item-content">
						<div class="car-cont">
							<h3>{{item.title}}</h3>
							<div class="cat-desc">
								<span>规格:{{item.attr}}</span><span class='price'>￥{{item.price}}</span>
							</div>
              <div class="cat-desc">
                采购数量：{{item.count}} {{item.unit}}
              </div>
							<div class="cat-desc">
								收货货数量：<input type="text" class="sureCount" v-model.trim="item.sureCount">&nbsp;&nbsp;{{item.unit}}
							</div>
						</div>
					</div>
      </li>
      </ul>
    </div>
    <div class="sureBtn">
      <x-button type="primary" mini @click.native="sureGet" width="50%">确认收货</x-button>
    </div>
  </div>
</template>
<script scoped>
  import {Group, XButton, Cell, XInput, XHeader} from 'vux'
  import axios from 'axios'
  import {urlConstants, urlPublic, sosoapi} from '@/utils/constants';
  import select from '../common/select.png';
  import selected from '../common/selected.png';
  export default {
    components: {
      Group,
      XButton,
      Cell,
      XInput,
      XHeader
    },
    data () {
      return {
        select: select,
        selected: selected,
        id: '',
        items: []
      }
    },
    created(){
      this.id = this.$route.query.id;
      this.getList(this.id);
    },
    methods: {
      getList: function (id) { //取得列表数据
        axios.get(urlPublic.publicUrl + 'sending/' + id + '/goods/list/page/1').then(response => {
          let itemTemp = response.data.result.datalist;
          itemTemp.map(item => {
            item['isSelect'] = false;
            item['sureCount'] = item.send_count;
          })
          this.items = itemTemp;
        })
      },
      sureGet: function () {
        let paramsArray = [];
        this.items.map(item => {
          if (item.isSelect) {
            let params = {
              id: item.id,
              count: item.sureCount
            };
            paramsArray.push(params);
          }
        });
        let params = 'data=' + JSON.stringify(paramsArray);
        axios.post(urlPublic.publicUrl + 'sending/' + this.id + '/confirm', params)
          .then(response => {
            console.log('提交成功');
            this.$router.go(-1);
          })
          .catch(error => {
            console.log(error);
            alert('网络错误，不能访问');
          })
      },
      selectClick: function (index) {
        this.items[index].isSelect = !this.items[index].isSelect;
      }
    },
    mounted: function () {
    }

  }
</script>

<style lang='scss' scoped>
 $buttoncolor:#F15A24;
  .shopcar {
    margin-bottom:5rem;
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
   height: 3.7rem;
    background: #f5f5f5;
    position: absolute;
    bottom: 3.2rem;
    left: 0;
    right: 0;
  }

  .foot-car {
    width: 42px;
    height: 60px;
    float: left;
    margin-left: 12px;
    position: relative;
			img{
			margin-top: 20px;
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

  .btn-box {
    float: right;
    height: 60px;
    line-height: 60px;
  }

  .btn-box button {
    height: 100%;
    width: 100px;
    border: none;
    background: $buttoncolor;
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
  .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
   
    color: #F15A24 ;
}

  .sureCount {
    width: 50px;
    padding-left: 5px;
    border: 1px solid #999999;
    border-radius: 2px;
  }

.sureBtn{text-align: center;
    margin: 0.5rem auto;}

</style>
