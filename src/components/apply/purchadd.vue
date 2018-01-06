<template>
	<div class="shopcar" id="demo04">
		  <view-box>
		<x-header :left-options="{showBack: false}">采购单下单页</x-header>
		<div class="car-list">
			<ul>
				<li class="car-item" v-for="(item,index) in good_list">

					<div class="input-block" @click="select_one(index)">
						<img :src="selected" alt="" v-if="item.is_selected">
						<img :src="select" alt="" v-else>
					</div>

					<div class="car-item-content">
						<div class="car-cont">
							<h3>{{item.title}}</h3>
							<div class="cat-desc">
								<span>规格:{{item.attr}}</span>
								<span v-if='item.add' class='price'>￥{{item.price}}元/{{item.unit}}</span>
								<span v-if='item.reduce' class='price disparity'>￥{{item.price}}元/{{item.unit}}</span>
							</div>
							<div class="cat-desc">
								<x-number title="数量：" v-model="item.count" :min="0"  @on-change="getSelTotalPrice(item)" fillable width="5rem" align='left'></x-number>
							</div>
						</div>


					</div>
					 <span v-if='item.add' class="disparity">{{item.disparity}}</span>
					 <span v-if='item.reduce' class="disparity reduce" >{{item.disparity}}</span>
				</li>
			</ul>
		</div>
        <!-- <p>{{good_list}}</p> -->
		<tabbar slot="bottom">
			<div class="car-footer">
				<div class="foot-car" @click="slect_all">
						<img :src="selected" alt="" v-if="selected_all">
						<img :src="select" alt="" v-else>
				</div>
				<div class="btn-box">
				
					<button @click="submit">立即申购	</button>
				</div>
				<div class="btn-box total-cont" v-if='false'>
					<button>总价：{{totalPrice}}/元</button>
				</div>
			</div>
		</tabbar>
		  </view-box>
		<!--使用条约-->
		<confirm v-model="show2"  title="使用条约" @on-confirm="submiterci">
			<contract></contract>	
		</confirm>
		<alert v-model="show" title="提示"><emotion is-gif>{{emotion}}</emotion>请选择产品后下单</alert>
		<!-- 未选择提示框 -->
		<!-- 确定下单 -->
		<div v-transfer-dom>
		<popup v-model="show8" position="left" width="100%">
			<div class="position-horizontal-demo">
			<div class="car-list car-popup">
				<ul>
				<li class="car-item" v-for="(item,index) in submitbefor">
					<div class="car-item-content">
						<div class="car-cont">
							<h3>{{item.title}}</h3>
							<div class="cat-desc">
								<span>规格:{{item.attr}}</span>
								<span v-if='item.add' class='price'>￥{{item.price}}元/{{item.unit}}</span>
								<span v-if='item.reduce' class='price disparity'>￥{{item.price}}元/{{item.unit}}</span>
							</div>
							<div class="cat-desc">
								<span>数量:{{item.count}}</span>
								 
							</div>
						</div>


					</div>
					 <span v-if='item.add' class="disparity">{{item.disparity}}</span>
					 <span v-if='item.reduce' class="disparity reduce" >{{item.disparity}}</span>
				</li>
				  <cell title="总价">￥{{totalPrice}}元</cell>
				</ul>
			</div>
			<div class="vux-close"> 
				<x-button mini type="primary"  @click.native="show8 = false">我再想想</x-button>
				<x-button mini type="warn" @click.native="bjsubmit">确定申购</x-button>
			</div>
			</div>
			</popup>
		</div>
	</div>
</template>
<script scoped>
import axios from 'axios'
//import http from '@/utils/constants'
import { urlConstants,urlPublic,sosoapi } from '@/utils/constants';
import select from '../common/select.png';
import selected from '../common/selected.png';
import { XHeader,Group,Confirm ,ViewBox,Tabbar,TabbarItem,Alert,XButton,XNumber,Cell, TransferDom,Badge,Popup,WechatEmotion as Emotion  } from 'vux'
import contract from '@/components/contract'
	export default {
		data() {
			return {
				select: select,//未选中图片
				selected: selected,//选中选择图片
				good_list: [],//数据
				totalPrice: 0,//总价
				totalNum: 0,//总数量
				selected_all: true,//全选
				cishu:1,//是否初次下单
				submitbefor:[],//确定下单弹窗数据
				show:false,//弹框是否展示
				show2: false,//初次下单弹窗
				show8:false,////popup默认状态
				emotion:'擦汗',
			}
		},
		 directives: {
			TransferDom
		},
		components: {
			XHeader,Group,XNumber,Badge,
			Confirm,
			contract,
			Alert,//弹框组件
			Emotion,//表情
			Popup,
			XButton,
			Cell,ViewBox,Tabbar,TabbarItem,
		},
		mounted: function() {
			this.getTotal() 
		},
		watch: {
			'good_list': {
				handler: function(val, oldVal) {
					// console.log(val)
					return val;
				},
				deep: true
			}
		},
		created() {
			this.getlist();

		},
		methods: {
			change (val) {
			console.log('change', val)
			},
            //请求接口方法
           getlist() {
				axios.get(urlPublic.publicUrl + 'offering/1/goods/list/page/1').then(response =>{
					let temp = response.data.result.datalist;
					temp.map(item =>{
						item.count = 0;//增加数量字段
						item.totalPrice = 0;//增加总价
						item.oldprice=20;//增加老得价格
						item.disparity=0;//增加差价字段
						item.is_selected = true;//是否选中
						item.add=false;//加价
						item.reduce=false;//减价
					});
					this.good_list = temp;
					for (var i = 0; i < this.good_list.length; i++) {
						var Floatprice=this.good_list[i].price;
						//var Float_price=parseFloat(Floatprice).toFixed(3); //不四舍五入
						//this.good_list[i].price=Float_price.substring(0,Float_price.toString().length - 1)   //不四舍五入
						this.good_list[i].price= Math.round(Floatprice * 100) / 100 //四舍五入
						this.good_list[i].disparity=this.good_list[i].price-this.good_list[i].oldprice;
						//console.log(this.good_list[i].disparity);
						if(this.good_list[i].disparity>0){
							this.good_list[i].disparity="+"+this.good_list[i].disparity;//增加 + 符号
							this.good_list[i].add=true;
							this.good_list[i].reduce=false;
						}else if(this.good_list[i].disparity<0){
							this.good_list[i].disparity="-"+Math.abs(this.good_list[i].disparity); //增加 -符号
							this.good_list[i].add=false;
							this.good_list[i].reduce=true;
						}else{  //Math.abs
							this.good_list[i].disparity= Math.abs(this.good_list[i].disparity); //增加 -符号
							this.good_list[i].add=false;
							this.good_list[i].reduce=true;
						}
					}
				}).
				catch(error =>{
					console.log(error);
					//alertalert('网络错误，不能访问');
				})
			},
			getTotal () {
				this.totalPrice = 0
				this.good_list.map(item => {
					if(item.is_selected){
						this.totalPrice += parseFloat(item.totalPrice);//总价计算
					}
				})
			},
			select_one (index) {
				if(this.good_list[index].is_selected == true){
					this.good_list[index].is_selected = false
				}else{
					this.good_list[index].is_selected = true
				}
				this.getTotal() 
			},
			slect_all () {
				if(this.selected_all){
					for (var i = 0; i < this.good_list.length; i++) {
						this.good_list[i].is_selected = false;
					}
					this.selected_all = false
				}else{
						for (var i = 0; i < this.good_list.length; i++) {
						 	if(this.good_list[i].count > 0){
								this.good_list[i].is_selected = true;
							}else{
								this.good_list[i].is_selected = false;
							}
						}
						
					this.selected_all = true;
 
				}
				this.getTotal() 
			},
			getSelTotalPrice(item){ //得到选中的总价
			 	console.log(item);
				item.totalPrice = item.price * item.count;
				this.getTotal() 
			},
			submit(){
					let chuci=this.cishu;
					let submitGoodlist = this.good_list.filter(item => {
						return item.is_selected == true;
					})
					this.submitbefor=submitGoodlist;
					if(chuci>0 ){
						if(submitGoodlist.length > 0){
							this.show8=true;//下单确认框
						}
						else{
							this.show=true;//显示弹框
						}
					}else{
						if(submitGoodlist.length > 0){
							this.show2=true;
						}
						else{
							this.show=true;//显示条约弹框	
						}
						//
					}
			},
			submiterci(){
					this.show8=true;//下单确认框				 
			},
			//报价提交
			bjsubmit() {
				let submitGoodlist = this.good_list.filter(item =>{
					return item.is_selected == true;
				})
				let submitGoodlistTemp = [];
				submitGoodlist.map(item =>{
					let params = {};
					if (item.id && item.count) {
						params['id'] = item.id + '';
						params['count'] = item.count;
					}
					submitGoodlistTemp.push(params);
				})
				let param = {
					data: submitGoodlistTemp,
				}
				param = 'data=' + JSON.stringify(submitGoodlistTemp) + '&approval_name=xu';
				console.log(param);
				axios.post(urlPublic.publicUrl + 'apply/add', param).then(response =>{
					console.log('提交成功');
					this.$router.push('/apply/purchlist');
				}).
				catch(error =>{
					console.log(error);
					alert('网络错误，不能访问');
				})
			}
		},
		
	}
</script>
<style lang="scss">

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
	.car-cont h3{font-weight :600;
		line-height :24px;
		font-size :14px;}

	.car-price {position :absolute;
		right: 12px;
		bottom: 0px;
		width :40px;
		height: 40px;
		text-align: right;}

	.car-price span{display: block;
		height :24px;
		line-height :24px;
		width: 100%;}
	.cat-desc{
		input{
			width: 2.5rem;
			text-align: center;
		}
		.price{
			float: right;
			color: red;font-weight: 600;
		}
		span.price.disparity {
			position:  relative;
			color:  #07ce07;
			bottom:  0;
			right: 0;
			font-size: 14px;
		}
	}
	.car-footer {
		width: 100%;}
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
	.btn-box.total-cont button {
		background: none;
		color: #000;width: auto;padding: 0 0.5rem;
	}
	.num{
        position: absolute;
		bottom: 0.3rem;
		right:0.9rem ;
    }
	.num span{
		color: red;
        display: inline-block;
		height: 28px;
		float: left;
		text-align: center;
		line-height: 28px;
		font-size: 14px;
    }

	.account{
        border:1px solid #888888;
  }
.vux-confirm .weui-dialog {
    height: 90%;
 .weui-dialog__bd{
    height: 77%;
	
	overflow-y: auto;}
}
.cat-desc .weui-cell{padding: 0;} 

span.disparity {
   width: auto;
    position: absolute;
    right: 0.4rem;
    bottom: 0.4rem;
    display: inline-block;
    text-align: center;
    color: #f74c31;
    font-size: 12px;
    background-clip: padding-box;
    vertical-align: middle;
}
span.disparity.reduce{
	color: #07ce07;
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
.vux-popup-dialog.vux-popup-left {
    width: auto;
    height: 100%;
    top: 0;
    right: auto;
    bottom: auto;
    left: 0;
    background: #fff;
}
.car-list.car-popup {
    margin-bottom: 5rem;
	.weui-cell:before{
		border: 0;
	}
}
 
</style>
