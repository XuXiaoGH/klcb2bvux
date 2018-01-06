<template>
  <div class="goodadd">
      <x-header>添加商品</x-header>
      <group>
          <x-textarea title="商品名称" placeholder="请填写商品名称" :show-counter="false" :rows="3"></x-textarea>
      </group>
  </div>
</template>
<script>
import { XHeader,Group,XTextarea} from 'vux'
export default {
  data () {
      return {
          
      }
  },
  components:{
      XHeader,Group,XTextarea
  }
}
</script>
<style>

</style>

