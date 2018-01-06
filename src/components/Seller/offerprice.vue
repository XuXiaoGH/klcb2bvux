<template>
	<div class="shopcar" id="demo04" >
  <view-box>
    <x-header :left-options="{showBack: false}">报价单列表</x-header>
    <search></search>
		<div class="car-list">
			<ul>
				<li class="car-item" v-for="(item,index) in good_list">
					<div class="input-block" @click="select_one(index)">
					 	<img :src="selected" alt="" v-if="item.is_selected">
						<img :src="select" alt="" v-else> 
					</div>
          <!-- 选择按钮 -->
					<div class="car-item-content">
						<div class="car-cont">
							<h3>{{item.title}}</h3>
							<div class="cat-desc">
								<span>规格:{{item.attr}}</span>
							</div>
							<div class="cat-desc">
								<span>单位:{{item.unit}}</span>
							</div>
						</div>
            <!-- 产品名称、规格、单位 -->
						<div class="num">
							<input v-model.lazy="item.price" text="text" /> 元
						</div>
            <!-- 产品价格 -->
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
      <!-- 全选按钮 -->
			<div class="btn-box">
				<button @click="Submit">立即报价</button>
			</div>
      <!-- 立即报价 -->
		</div>
     </tabbar>
	
  </view-box>
    <!-- 未选中提示 -->
    <alert v-model="show" title="提示"><emotion is-gif>{{emotion}}</emotion>请选择需要报价的产品</alert>
    <!-- 未选择提示框 -->
    <div v-transfer-dom>
      <popup v-model="show8" position="left" width="100%">
        <div class="position-horizontal-demo">
          <div class="car-list car-popup">
            <ul>
              <li class="car-item" v-for="(item,index) in submitbefor">
                <!-- 选择按钮 -->
                <div class="car-item-content">
                  <div class="car-cont">
                    <h3>{{item.title}}</h3>
                    <div class="cat-desc">
                      <span>规格:{{item.attr}}</span><span class='price'>￥{{item.price}}元</span>
                    </div>
                    <div class="cat-desc">
                      <span>单位:{{item.unit}}</span>
                    </div>
                  </div>
                  <!-- 产品名称、规格、单位、价格-->
                </div>
              </li>
            </ul>
          </div>
          <div class="vux-close"> 
            <x-button mini type="primary"  @click.native="show8 = false">我再想想</x-button>
            <x-button mini type="warn" @click.native="bjsubmit">确定报价</x-button>
          </div>
        </div>
        </popup>
    </div>
    <!-- 报价成功提示 -->
    <alert v-model="show9" @on-hide='onnewload'>已成功报价</alert>
 
	</div>
</template>
<script scoped>
import axios from 'axios'
//import http from '@/utils/http';
import select from '../common/select.png'; //未选中图片
import selected from '../common/selected.png';//选中图片
import search from '@/components/search';//搜索引用
import {  XHeader,ViewBox,Tabbar,TabbarItem,XInput,Alert, Popup,TransferDom,XButton,WechatEmotion as Emotion } from 'vux';//vux组件引用
import { urlConstants,urlPublic,sosoapi } from '@/utils/constants';//请求地址引用
	export default {
      directives: {
        TransferDom
      },
		 components: {
       search,
       XHeader,//头组件
       XInput,//s输入框组件
       Alert,//弹框组件
       Emotion,//表情
       Popup,
       XButton,
       ViewBox,Tabbar,TabbarItem,
     },
		data () {
			return {
				select: select,//未选中图片
        selected:selected,//选择图片
				good_list:[],//数据
				totalPrice: 0,//总价
				totalNum: 0,//总数
				is_selected:false,//是否选择
				selected_all: false,//是否全选
				offeradd:[{
					sid:'',
					data:[],
        }],//数据提交 sid 和  data
        emotion:'擦汗',
        show:false,//弹框是否展示
        show8:false,//popup默认状态
        show9:false,//popup默认状态
        submitbefor:[],
         
			}
    },
		mounted: function () {
			this.getTotal();//总价计算
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
        this.getlist();//请求 加载
      
    },
		methods: {
      
			  // 请求接口方法
			getlist(){
				axios.get(urlPublic.publicUrl+'goods/list/page/1').then(response=>{
          let temp = response.data.result.datalist;
          //增加 is_selected 属性
          temp.map(item =>{
              if(item.price > 0){
                item['is_selected'] = true;
              }else{
                item['is_selected'] = false;
              }
          })
          //数据
					this.good_list = temp;
				})
				.catch(error=>{
					console.log(error);
					//alertalert('网络错误，不能访问');
				})
      },
      //计算总价
			getTotal () {
				this.totalPrice = 0
			 
				for (var i = 0; i < this.good_list.length; i++) {
					var _d = this.good_list[i]
					if(_d.is_selected){
						this.totalPrice += parseFloat(_d['price'])
					}
				}
      },
      //单选点击
			select_one (index) {
					if(this.good_list[index].is_selected == true){
					this.good_list[index].is_selected = false
					}else{
						this.good_list[index].is_selected = true
					}
        this.getTotal();//重新计算价格
               
			},
			slect_all() {
				if(this.selected_all){
          //为真
					for (var i = 0; i < this.good_list.length; i++) {
              this.good_list[i].is_selected = false;
          }
          //变假
					this.selected_all = false
				}else{
          //为假
          //不选中价格为 0 的
					for (var i = 0; i < this.good_list.length; i++) {
						 	if(this.good_list[i].price > 0){
                this.good_list[i].is_selected = true;
              }else{
                this.good_list[i].is_selected = false;
              }
          }
          //变真
					this.selected_all = true
				}
				this.getTotal();
      },
			//报价提交
			Submit(){
        //选中的数据 
				let submitGoodlist = this.good_list.filter(item => {
           return item.is_selected == true;
				})
				//console.log(submitGoodlist);
        this.submitbefor=submitGoodlist;
        if(submitGoodlist.length > 0){
          this.show8=true;
        }
        else{
         this.show=true;//显示弹框
        }
      },
       //报价确定提交
      bjsubmit(){
        let submitGoodlist = this.good_list.filter(item => {
           return item.is_selected == true;
        })
        let submitGoodlistTemp = [];
        submitGoodlist.map((item)=>{
						let params = {};
						params['id'] = item.id;
						params['price'] = item.price;
						submitGoodlistTemp.push(params);
          });
          this.offeradd={
            sid:this.$route.query.sid,
            data:submitGoodlistTemp,
          }
          let params = 'sid='+this.$route.query.sid+'&data=' + JSON.stringify(submitGoodlistTemp);
          console.log(params);
          axios.post(urlPublic.publicUrl+'offering/add',params).then(response=>{
            this.show9=true;
            this.show8=false;
                submitbefor:[]
          })
          .catch(error=>{
            console.log(error);
            alert('网络错误，不能访问');
          })
          
      },
      //重新加载路由
      onnewload(){
         window.location.reload();
      }
		}
	}
</script>
<style lang="scss" scoped>
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
    display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */  
    display: -moz-box; /* Firefox 17- */  
    display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */  
    display: -moz-flex; /* Firefox 18+ */  
    display: -ms-flexbox; /* IE 10 */  
    display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */ 
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
    margin-top: 5px;
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

  .foot-car {
    width: 42px;
    float: left;
    margin-left: 12px;
			img{
			margin-top:0.8rem;
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
    height: 100%;
    
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
		input{
            width: 3rem;
        border: 1px solid #ddd;
        text-align: center;
    }

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

.space{
  width: 100%;
  height: 0px;
  background-color: red;
}

.shopcar .weui-dialog__bd {
    display: flex;
    justify-content: center;
    line-height: 1.8rem;
}



.position-horizontal-demo {
  position: relative;
  width: 100%;
  .vux-close {
     position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    text-align: center;
    height: 5rem;
  }
}
.vux-popup-dialog{
  background:#fff ;
}
.car-list.car-popup {
    margin-bottom: 5rem;
}
</style>
