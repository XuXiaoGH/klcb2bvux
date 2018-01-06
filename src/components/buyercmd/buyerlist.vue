<template>
    <div class="buyerlist">
        <x-header>报价列表</x-header>
        <grid>
                <grid-item>
                    <span slot="icon" class="icon iconfont el-iconx-sousuo-copy"></span>
                    <span slot="label">搜索</span>  
                </grid-item>
                <grid-item link='/goods/goodadd'>
                    <!-- link='/buyercmd/buyeradd' -->
                    <span slot="icon" class="icon iconfont el-iconx-shangpin1"></span>
                    <span slot="label">增加产品</span>  
                </grid-item>
                <grid-item >
                    <!-- link='/buyercmd/buyeradd' -->
                    <span slot="icon" class="icon iconfont el-iconx-jia-fangkuang"></span>
                    <span slot="label">增加采购商</span>  
                </grid-item>
        </grid>
        <!-- 三个导航 -->
        <group>
                <popup-radio title="筛选" :options="options2" v-model="option2" placeholder="请选择"></popup-radio>
        </group>
        <!-- 筛选效果 -->
       <ul class="cus-ul">
            <li class="cus-li" v-for="(item,index) in buylist">
                <div class="leftbox">
                    <h4 class="ell" name="name">{{item.name}}</h4>  
                    <small class="c2 ell">
                        <i class="icon iconfont el-iconx-yonghu-xianxing"></i>
                        <span class="dib vm" name="contactor">{{item.admuser}}</span>
                    </small> 
                </div>
                 <div class="r rightbox"> 
                    <small class="c2 ell cus-labelGreen small12">{{item.grade}}</small>  
 
                    <button class="icon iconfont el-iconx-dianhua" name="mobileNum" @click='boda(item.id)'></button> 
                    <button class="baijia"   @click='baojia(item.id)' v-if="privilegeJson.sellOfferingAdd">报价</button> 
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { Grid, GridItem, GroupTitle,XHeader,PopupRadio,Group  } from 'vux';//vux组件引用
import { prive } from '@/utils/utils';
export default {
    components: {
     Grid, GridItem, GroupTitle,
        XHeader,PopupRadio ,Group
    },
    data () {
        return {
            privilegeJson: {},
            option2: '',
            options2: [
                {
                    key: 'A',
                    value: '全部'
                },{
                    key: 'B',
                    value: '已开通'
                }, {
                    key: 'C',
                    value: '未开通'
                }
            ],
            buylist:[
                {
                    id:'1',
                    name:'中国石油化工股份有限公司',
                    grade:'优质',
                    admuser:'张总',
                    admphone:'2222222222',
                },
                {
                    id:'2',
                    name:'中国石油天然气股份有限公司',
                    grade:'良好',
                    admuser:'王总',
                    admphone:'33333333333',
                },
                {
                    id:'3',
                    name:'中国建筑股份有限公司',
                    grade:'一般',
                    admuser:'李总',
                    admphone:'44444444444',
                },
                {
                    id:'4',
                    name:'上海汽车集团股份有限公司',
                    grade:'优质',
                    admuser:'刘总',
                    admphone:'18236914530',
                },
                {
                    id:'5',
                    name:'中国平安保险（集团）股份有限公司',
                    grade:'优质',
                    admuser:'秦总',
                    admphone:'1111111111',
                },
            ]
        }
    },
    created () {
         this.privilegeJson = prive();
    },
    methods: {
        boda(id){
            //alert(this.buylist[id-'1'].admphone)
            window.location.href="tel:"+this.buylist[id-'1'].admphone;
        },
        baojia(id){
            window.location.href='/seller/offerprice?sid='+id;
        }
    }
  
}
</script>
<style lang='scss'>
.buyerlist{
    .weui-grid{
        text-align: center;
        padding: 0.5rem;
        p{
            color: #999;
        }
        
    }
    .weui-grid:before,.weui-grid:after{
        border: 0px;
    }
    .weui-grid__icon {
        width: auto;
        height: auto;
        margin: 0 auto;
        line-height: 1;
    }
    span.icon.iconfont {
        font-size: 1.7rem;
    }
    .el-iconx-jia-fangkuang{
        color: #3ea5fc;//  //
    }
    .el-iconx-sousuo-copy{
        color: #f94c36;
    }
    .el-iconx-shangpin1{
        color: #3bc6a4;//
    }
    .weui-cells{margin-top: 0px;background: #f4f4f4;}

    .cus-li {
        overflow: hidden;
        background: #fff;
        padding: 0.3rem;
        margin-bottom: .8rem;
        line-height: 2rem;
        display:  flex;
        border-bottom: 1rem solid #f4f4f4;
        .leftbox {
            width: 100%;
        }
        .r.rightbox {
            width:40%;
            small.c2.ell.cus-labelGreen.small12 {
                display: inherit;
                text-align:  center;
                color: #999;
                height: 1.4rem;
                line-height: 2.3;
                margin-bottom: 0.7rem;
            }
            button.icon.iconfont.el-iconx-dianhua {
                display: block;
                text-align: center;
                color: #03b8d0;
                height: 1.6rem;
                background: #f1f1f1;float: left;border: 0px;width: 2rem;
                line-height: 1.8; 
            }
            button.baijia{
                width: 2rem;
                display: block;
                background: #03b8d0;
                border: 0px;
                color: #fff;
                height: 1.6rem;
                line-height: 1.8;
                float: left;
                margin-left: 0.3rem;
            }
            
        }
    }
    
    
}
 
</style>
 

