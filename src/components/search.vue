<template>
  <div class="search">
      <search @on-submit="onSubmit" :auto-fixed="autoFixed" v-model="booksearchtext" @on-focus="onFocus" @on-cancel="onCancel"></search>
  </div>
</template>
<<script>
import { Search } from "vux";

export default {
  components: {
      Search,
  },
  data () {
      return {
          autoFixed:true,
          booksearchtext:''
      }
  },
  methods: {
    onSubmit (val) {
      window.alert('提交' + val)
    },
     onCancel (val) {
     window.alert('取消' + val)
    },
    onFocus () {
      console.log('on focus')
    }
  }
}
</script>
<style lang='scss'>
$backGcolor:#fff;
.search .weui-search-bar {
    padding: 10px 10px;
    background-color: $backGcolor; 
}
.search .weui-search-bar__label {
    line-height: 2;
}
</style>

