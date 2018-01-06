<template>
  <div style="height:100%">
     <view-box>
      <transition>
        <router-view></router-view>
      </transition>
        <tabbar  slot="bottom">
          <tabbar-item  link="/">
            <span slot="icon" class="icon iconfont el-iconx-shouye-xianxing"></span>
            <span slot="label">首页</span>
          </tabbar-item> 
          <!-- 首页 -->
          <tabbar-item link="/buyercmd/buyerlist">
          <!-- v-if="privilegeJson.sellOfferingAdd" -->
            <span slot="icon" class="icon iconfont el-iconx-baojia"></span>
            <span slot="label">报价</span>
          </tabbar-item>
          <!-- 卖家首页 -->
          <tabbar-item  link="/seller/sendlist">
          <!-- v-if="privilegeJson.sellOrderList" -->
            <span slot="icon" class="icon iconfont el-iconx-dingdan1"></span>
            <!-- <span slot="label">卖家订单</span> -->
            <span slot="label">订单</span>
          </tabbar-item>
          <!-- 卖家订单 -->
          <tabbar-item  link="/seller/sendgoodlist"  >
          <!-- v-if="privilegeJson.sellSendingList" -->
            <span slot="icon" class="icon iconfont el-iconx-baoguofahuo-xianxing"></span>
            <span slot="label">发货</span>
          </tabbar-item>
          <!-- 卖家发货单 -->
          
          <tabbar-item link="/buyers/offerorder" >
          <!-- v-if="privilegeJson.buyOrderAdd" -->
            <span slot="icon" class="icon iconfont el-iconx-caigou-xianxing"></span>
            <span slot="label">下单</span>
          </tabbar-item>
          <!-- 买家首页 -->
          <tabbar-item  link="/buyers/takelist" >
          <!--  v-if="privilegeJson.buyOrderList" -->
            <span slot="icon" class="icon iconfont el-iconx-dingdan1"></span>
            <!-- <span slot="label">买家订单</span> -->
            <span slot="label">订单</span>
          </tabbar-item>
          <!-- 买家订单 -->
          <tabbar-item  link="/approve/approvelist" >
          <!-- v-if="privilegeJson.approvalingList" -->
            <span slot="icon" class="icon iconfont el-iconx-shenpi"></span>
            <span slot="label">审批</span>
          </tabbar-item>
          <!-- 公共审批 -->
          <tabbar-item  link="/apply/purchadd">
            <span slot="icon" class="icon iconfont el-iconx-caigoushenqing"></span>
            <span slot="label">申购</span>
          </tabbar-item>
          <!-- 采购员申购 -->
          <tabbar-item  link="/apply/purchlist">
            <span slot="icon" class="icon iconfont el-iconx-gouhuoshenqing"></span>
            <!-- <span slot="label">申购列表</span> -->
            <span slot="label">申购</span>
          </tabbar-item>
          <!-- 采购员申购列表 -->
          <tabbar-item  link="">
            <span slot="icon" class="icon iconfont el-iconx-jicai"></span>
            <span slot="label">集采</span>
          </tabbar-item>
          <!-- 厨师长集中采购单列表 -->

          
          <tabbar-item  link="" >
            <span slot="icon" class="icon iconfont el-iconx-yonghu-xianxing"></span>
            <span slot="label">我的</span>
          </tabbar-item>
          <!-- 公共我的 -->
        </tabbar>
    </view-box>
   
  </div>
</template>

<script>
import { Tabbar,TabbarItem,Cell,Group,ViewBox, XHeader } from 'vux';
import { prive } from '@/utils/utils';
export default {
  name: 'app',
  components: {
     Tabbar,Cell,Group,TabbarItem,ViewBox,XHeader
  },
  data () {
    return {
      privilegeJson: {},
    }
  },
  created:function(){
    this.privilegeJson = prive();
    console.log(this.privilegeJson);
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
 
</style>
