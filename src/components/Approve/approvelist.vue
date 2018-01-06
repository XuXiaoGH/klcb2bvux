<template>
    <div class="approvelist" style="height:100%">
        <view-box>
            <x-header :left-options="{showBack: false}">我的审批</x-header>
            <search></search>
            <div class="orderInfo" v-for="(item,index) in good_list" v-if="allCount > 0">
                <div class="orderNo">
                    <p>
                        <span class="black">{{item.name}}</span>
                    </p>
                    <p>
                        <span class="blue">[{{item.statusName}}]</span>
                    </p>
                </div>
                <div class="offerDeta">
                    <p>申&nbsp;&nbsp;请&nbsp;&nbsp;人：{{item.user}}</p>
                    <p>编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{{item.sn}}</p>
                    <p>申请时间：{{item.created_at.date}}</p>

                </div>
                <div class="butsubmit">

                    <x-button mini :gradients="['#1AA9F8', '#1AA9F8']" @click.native="rover(item)" v-if='privilegeJson.approvalOperate' v-show="item.shenp">审批</x-button>
                    <x-button mini :gradients="['#1AA9F8', '#1AA9F8']" @click.native="seen(item)" v-show="item.chakan">查看</x-button>
                </div>
            </div>
            <div v-if="allCount == 0" class="noSend">
                暂无审批...
            </div>
        </view-box>
    </div>
</template>
<script>
import { XHeader, ViewBox, XButton } from 'vux' //vux组件
import search from '@/components/search'//搜索组件
import axios from 'axios'//axios
import { urlConstants, urlPublic, sosoapi } from '@/utils/constants';//请求地址引用

import { prive } from '@/utils/utils';
export default {
    components: {
        XHeader, ViewBox, XButton,
        search
    },
    data() {
        return {
            good_list: [],
            allCount: 0,
            privilegeJson: {},
            shenp: true,
        }
    },
    created() {
        this.getlist();
        this.privilegeJson = prive();
        document.body.style.background = '#F2F2F2';
    },
    methods: {
        rover(item) {
            this.$router.push({ path: '/approve/roverdetail', query: { id: item.id, type: true } })
        },
        seen(item) {
            this.$router.push({ path: '/approve/roverdetail', query: { id: item.id, type: false } })
        },

        // 请求接口方法
        getlist() {
            axios.get(urlPublic.publicUrl + 'approval/approvaling/list/page/1').then(response => {
                let temp = response.data.result.datalist;
                //数据
                this.allCount = response.data.result.thispagenumber;
                this.good_list = temp;
                for (var i = 0; i < this.good_list.length; i++) {
                    this.good_list[i]['shenp'] = true;
                    this.good_list[i]['chakan'] = true;
                    console.log(this.good_list[i].status);
                    if (this.good_list[i].status == '3') {
                        this.good_list[i].shenp = false;
                    } else if (this.good_list[i].status == '4') {
                        this.good_list[i].shenp = false;
                    } else {
                        this.good_list[i].chakan = false;
                    }
                }
                this.good_list.map(item => {
                    if (item.status == '0') {
                        item.statusName = '未完成';
                    } else if (item.status == '1') {
                        item.statusName = '待审批';
                    } else if (item.status == '2') {
                        item.statusName = '审批中';
                    } else if (item.status == '3') {
                        item.statusName = '已审批';
                    } else if (item.status == '4') {
                        item.statusName = '未通过';
                    }

                });
                console.log(this.good_list)

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
$borerbottom:1px solid #f8f8f8;
$black:black;
$bule:#00A0EA;
$price:#E7454A;
$borerbottom2:1px solid #dcdcdc;
.orderInfo {
    width: 98%;
    margin: 10px auto;
    border-radius: 3px;
    box-shadow: 0 5px 84px 0 rgba(4, 0, 0, 0.09); /* px */
    background-color: white;
    color: #A9A9A9;
    margin-bottom: 5px;
    border-radius: 2px;
}

.orderNo {
    width: 98%;
    height: 2rem;
    border-bottom: $borerbottom;
    line-height: 2rem;
    margin: 0 auto;
}

.orderNo p:first-child {
    float: left;
    margin-left: 10px;
}

.orderNo p:last-child {
    float: right;
    margin-right: 10px;
}

.offerDeta {
    width: 92%; // height: 160px;
    margin: 0 auto;
    background-color: white;
    padding: 0.5rem;
    color: #A9A9A9;
    border-bottom: $borerbottom;
}

.blue {
    color: $bule;
}

.black {
    color: $black;
}


.price {
    color: $price;
}

.getBtn {
    background-color: #00A0EA;
    color: white;
    width: 30%;
    text-align: center;
    line-height: 40px;
    height: 40px;
    border-radius: 2px;
    margin: 0 auto;
    margin-top: 15px;
}

.header {
    background-color: red;
}

.butsubmit {
    text-align: right;
}

.butsubmit .weui-btn {
    margin: 0.3rem;
}

.noSend {
    width: 100%;
    height: 100px;
    text-align: center;
    margin: 60px auto;
    color: #999999;
}
</style>

