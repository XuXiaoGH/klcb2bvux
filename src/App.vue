<template>
  <div id="app" style="height:100%;">
         <transition>
          <router-view class="router-view"></router-view>
        </transition>
  </div>
</template>

<script>
import './assets/font/iconfont.css'
import { ViewBox,XHeader } from 'vux'
export default {
  name: 'app',
  components: {
     XHeader,
     ViewBox

  },
  data () {
    return {
      title:'',
    }
  },
  methods: {

  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form,fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
body, button, input, select, textarea { font-size:14px;font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif; }
h1, h2, h3, h4, h5, h6{ font-size:100%; }
address, cite, dfn, em, var { font-style:normal; }
code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
small{ font-size:12px; }
ul, ol { list-style:none; }
a { text-decoration:none; }
sup { vertical-align:text-top; }
sub{ vertical-align:text-bottom; }
legend { color:#000; }
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; }
 html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  .car-list .weui-icon-success,.car-list .weui-icon-success:before, {
    font-size: 23px;
    color: #F15A24 ;
}
 
</style>
