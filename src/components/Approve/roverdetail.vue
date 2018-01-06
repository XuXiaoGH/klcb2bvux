<template>
  <div class="approvelist" style="height:100%">
      <view-box>
        <x-header :left-options="{showBack: false}">审批详情</x-header>
        <search></search>
        <group class="mingx">
            <cell   title="申请明细"   is-link  :border-intent="false"   :arrow-direction="showContent002 ? 'up' : 'down'" @click.native="showContent002 = !showContent002"></cell>
            <div class="slide" :class="showContent002?'animate':''">
                <ul>
                    <li v-for='(item,index) in goods' class="detailed">
                    <p><span class="left"> {{item.title}}</span><span class="right">￥{{item.price}}</span></p>
                    <x-number title="数量：" v-model="item.count" :min="0"   fillable width="3rem" align='left'></x-number>
                    </li>
                </ul>
                
            </div>
        </group>
        <!-- 申请明细 -->
        <group class="yijian">
            <group-title slot="title">流转意见</group-title>
            <div class="liuzhuan">
                <ul>
                    <li v-for='(item,index) in yijian' class="detailed">
                     <h4>{{item.user}}</h4>
                     <p><span>[{{item.statusName}}]</span> {{item.remark}}</p>
                     <p class="datatiem">{{item.created_at.date}}</p>
                    </li>
                </ul>
                
            </div>
        </group>
        <!-- 流转意见 -->
        <div class="caozuo" v-show="rover_type" v-if="privilegeJson.approvalOperate">
            <group title='审批操作' class="textarea">
                <x-textarea :max="100" placeholder="请输入意见" autosize v-model="remark"></x-textarea>
            </group>
            <div class="buttonsub">
                <x-button type='primary' mini @click.native="tysubmit">同意</x-button>
                <x-button type='warn' mini @click.native="bosubmit">驳回</x-button>
            </div>
        </div>
           <alert v-model="show" title="提示">请先填写驳回意见</alert>
      </view-box>
  </div>
</template>
<script>
import {XHeader,ViewBox,XButton,GroupTitle,Group,Cell,CellFormPreview,XTextarea,Alert,XNumber} from'vux'
import search from '@/components/search'
import axios from 'axios'//axios
import { urlConstants,urlPublic,sosoapi } from '@/utils/constants';//请求地址引用
import { prive } from '@/utils/utils';
export default {
    components: {
        XHeader,ViewBox,XButton,Group, GroupTitle, Cell,CellFormPreview,XTextarea,Alert,XNumber,
        search      
    },
    data () {
        return {
            showContent002: false,
            rover_id:this.$route.query.id,//获取id
            rover_type:this.$route.query.type,//获取   查看or审批  状态
             privilegeJson: {},
            goods:[],
            yijian:[],
            remark:'',//审批意见
            status:'',//是否通过
            show:false,//驳回弹框
            
        }
    },
    created () {
        console.log(this.rover_id);
        console.log(this.rover_type);
        this.getrover();
        this.privilegeJson = prive();
    },
    methods: {
        tysubmit(){
            let rovercount = [];
            this.goods.map(item =>{
                let params = {};
                if (item.id && item.count) {
                    params['id'] = item.id + '';
                    params['count'] = item.count;
                }
                rovercount.push(params);
            })
            if(this.remark==''){
                let params='remark=同意&status=1&data='+JSON.stringify(rovercount) ;
                console.log(params);
                axios.post(urlPublic.publicUrl+'approval/'+this.rover_id+'/result/1',params).then(response=>{   
                    console.log('提交成功');
                        this.$router.push({ path: '/approve/approvelist'})
                })
                .catch(error=>{
                    console.log(error);
                    //alertalert('网络错误，不能访问');  GET api/v1/approval/{id}/result/{status}
                })
            }else{
                let params='remark=同意&status=1&data='+JSON.stringify(rovercount) ;
                console.log(params);
                axios.post(urlPublic.publicUrl+'approval/'+this.rover_id+'/result/1',params).then(response=>{   
                    console.log('提交成功');
                        this.$router.push({ path: '/approve/approvelist'})
                })
                .catch(error=>{
                    console.log(error);
                    //alertalert('网络错误，不能访问');  GET api/v1/approval/{id}/result/{status}
                })
            }
            
           
        },
        bosubmit(){
              if(this.remark==''){
                this.show=true;
              }else{
                let params='remark='+this.remark+'&status=2';
                console.log(params);
                axios.post(urlPublic.publicUrl+'approval/'+this.rover_id+'/result/2',params).then(response=>{
                     console.log('提交成功');
                      this.$router.push({ path: '/approve/approvelist'})
                    })
                    .catch(error=>{
                        console.log(error);
                        //alertalert('网络错误，不能访问');
                    })
              }
        },
        getrover(){
            axios.get(urlPublic.publicUrl+'approval/'+this.rover_id+'/detail').then(response=>{
            let temp = response.data.result;
            //数据
            this.allCount =response.data.result.thispagenumber;
            this.goods = temp.goods;
            this.yijian=temp.record;
            this.yijian.map(item => {
              if(item.status == 1){
                item.statusName = '同意';
              }else if(item.status == 2){
                item.statusName = '不同意';
              } 
          })
            })
            .catch(error=>{
                console.log(error);
                //alertalert('网络错误，不能访问');
            })
        }
    }
}
</script>
<style lang="scss">
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

.slide {
  padding:0 0.8rem;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  background: #f9f9f9;
}
.animate {
    padding: 0rem 0.5rem  0.8rem 0.5rem;
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
}

.mingx{
    .detailed{
        //display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */  
        //display: -moz-box; /* Firefox 17- */  
        //display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */  
       // display: -moz-flex; /* Firefox 18+ */  
       // display: -ms-flexbox; /* IE 10 */  
       // display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
        border-bottom: 1px solid #ddd;
        padding: 0.5rem 0;
        p{
            line-height: 2;
            .left{}
            .right{
            text-align: right;float: right;
            }
        }
        .weui-cell {
            padding: 0px;
        }
        .weui-cell::before{
            border:0px
        }
    }
}

.liuzhuan{
  padding:0.8rem 0;
  overflow: hidden;
  background: #f9f9f9;
    .detailed{
      padding:0.2rem 0.5rem;border-bottom:1px solid #ddd;
        h4{
            width: 100%;
            font-size: 0.8rem;
            font-weight: normal;
            color: #9d71ea;margin-bottom: 0.5rem;
        }
        p{
            font-size: 14px;
            span{
                color: #999;
            }
        }
         p.datatiem {
            color: #999;margin-top: 0.5rem;
        }
        
    }
}
.buttonsub{
    text-align: center;
}
</style>

