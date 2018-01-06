<template>
  <div  class="indexcss">
      <div class="fangke">
            <div class="fangktop">
                <span class="lefttop">访问量<i class="icon iconfont"></i></span>
                <span class="select">今天<i class="icon iconfont el-iconx-xiangxiazhankai"></i></span>
                <span class="riqi">2017.12.12-2017.12.31 <i class="icon iconfont el-iconx-xiangxiazhankai"></i></span>
            </div>
            <button-tab v-model="index" class="xuanztou">
                <button-tab-item selected @on-item-click='consoleIndex1'>订单金额</button-tab-item>
                <button-tab-item @on-item-click='consoleIndex2'>客户统计</button-tab-item>
                <button-tab-item @on-item-click='consoleIndex3'>订单完成</button-tab-item>
            </button-tab>
             <div class="charts">
                 <div class="charts-item" v-if="char1">
                      <ve-line :data="chartData1"></ve-line>
                 </div>
                 <div class="charts-item" v-if="char2">
                     <ve-histogram :data="chartData2" :settings="chartSettings2"></ve-histogram>
                 </div>
                 <div class="charts-item" v-if="char3">
                     <ve-ring :data="chartData3" :settings="chartSettings3"></ve-ring>
                 </div>
                
             </div>
      </div>
    <divider class="dibu">下边没了，开发中....</divider>
  </div>
</template>
<script>
import { ButtonTab, ButtonTabItem,Divider ,Tab, TabItem,Swiper, SwiperItem  } from 'vux'
 
export default {
    components: {
        ButtonTab,ButtonTabItem,  Divider , Tab,TabItem,Swiper, SwiperItem,
        
    },
    data () {
        return {
            index: 0,
            char1:true,
            char2:false,
            char3:false,
        }
    },
    created () {
        this.chartData1 = {
            columns: ['日期', '销售量'],
            rows: [
                { '日期': '1月1日', '销售量': 123 },
                { '日期': '1月2日', '销售量': 1223 },
                { '日期': '1月3日', '销售量': 2123 },
                { '日期': '1月4日', '销售量': 4123 },
                { '日期': '1月5日', '销售量': 3123 },
                { '日期': '1月6日', '销售量': 7123 }
            ]
        },
        this.chartData2 = {
            columns: ['日期', '成本', '利润', '占比', '其他'],
            rows: [
            { '日期': '1月1日', '成本': 1523, '利润': 1523, '占比': 0.12, '其他': 100 },
            { '日期': '1月2日', '成本': 1223, '利润': 1921, '占比': 0.345, '其他': 100 },
            { '日期': '1月3日', '成本': 2123, '利润': 5523, '占比': 0.7, '其他': 100 },
            { '日期': '1月4日', '成本': 4123, '利润': 6523, '占比': 0.31, '其他': 100 }
            ]
        }
        this.chartSettings2 = {
            metrics: ['成本', '利润'],
            showLine: ['利润']
        },
        this.chartData3 = {
            columns: ['日期', '成本', '比率'],
            rows: [
            { '日期': '1月1号', '成本': 123, '比率': 0.1 },
            { '日期': '1月2号', '成本': 1223, '比率': 0.2 },
            { '日期': '1月3号', '成本': 2123, '比率': 0.3 },
            { '日期': '1月4号', '成本': 4123, '比率': 0.4 },
            { '日期': '1月5号', '成本': 3123, '比率': 0.5 },
            { '日期': '1月6号', '成本': 7123, '比率': 0.6 }
            ]
        }
        this.chartSettings3 = {
            radius: [100, 10],
            offsetY: 300
        }
    },
    methods: {
        consoleIndex1(){
            this.char1=true;
            this.char2=false;
            this.char3=false;
        },
        consoleIndex2(){
            this.char1=false;
            this.char2=true;
            this.char3=false;
        },
        consoleIndex3(){
            this.char1=false;
            this.char2=false;
            this.char3=true;
        }
    },
}
</script>

<style lang='scss' scoped>
$bsbeijing:#fff;
$lvse:#04BE02;
$ziticolor1:#fff;
$ziticolor2:#979797;
$fontweight: normal;
    .fangke{
        padding: 0.5rem;
        background: $bsbeijing;
        .fangktop{
            padding: 0.5rem 0.1rem 1rem 0.1rem;
            display: flex;
            justify-content: space-between;
            line-height: 1.6;
            color: $ziticolor2;
            font-weight: $fontweight;
            .select{
                background: $lvse;
                color: $ziticolor1;
                padding: 0 0.5rem;
                width: 45px;
                text-align: center;
                border-radius: 15px;
            }
        }
        .vux-button-group.xuanztou{
            margin: 1rem 0;
        }
    }
    .vux-divider.dibu{
        color: $ziticolor2;
    }

</style>
