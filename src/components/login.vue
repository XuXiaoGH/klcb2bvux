<template>
  <div>
      <x-header class="header">登录页</x-header>
      <div style="padding:15px;">
        <group>
            <x-input title="手机号码" v-model.trim="mobile" placeholder="请输入手机号码" keyboard="number" ></x-input>
        </group>

        <group>
            <x-input title="密码" type="password" v-model.trim="password" placeholder="请输入密码" keyboard="number" ></x-input>
        </group>

        <group>
            <x-input title="验证码" class="weui-cell_vcode" v-model.trim="vercode" @keyup.enter.native='login'>
                <img slot="right" class="weui-vcode-img" :src="imgpath" @click="updateImgCode">
            </x-input>
        </group>
      </div>
    <br>
    <div @click="login" class="loginBtn">
        登录
    </div>



  </div>
</template>

<script>
import { XButton, XHeader, XInput,Group,Alert} from 'vux'
import http from '@/utils/http'
import axios from 'axios'


import { urlConstants,urlPublic } from '@/utils/constants';
export default {
  components: {
    XButton,
    XHeader,
    XInput,
    Group,
    Alert
  },
  methods: {
    login: function(){
      let params = 'username=' + this.mobile + '&password=' + this.password + '&vercode=' + this.vercode + '&imgcode=' + this.imgcode;
       
      axios.post(urlPublic.publicUrl + 'login', params)
      .then(res => {
          //console.log(res);
          if(res.data.status == 'success'){
            let accesstoken = res.data.result.accesstoken;
            sessionStorage.setItem('accesstoken', accesstoken?accesstoken:'');
           
            // if(this.mobile == '18700222200' || this.mobile == '18700333300'){
            //   this.$router.push('/buyers/offerorder');
            // }else if(this.mobile == '18700111100' || this.mobile == '18700444400'){
            //   this.$router.push('/buyercmd/buyerlist');
            // }
            
            this.$router.push({ path: '/'})
          }else{
            alert(res.data.result.errortext);
          }
      })
    },
    updateImgCode: function(){
        axios.get(urlPublic.publicUrl + 'vercode').then(response => {
        console.log(response);
        this.imgcode = response.data.result.imgcode;
        this.imgpath = urlConstants.baseUrl + response.data.result.imgpath;
    })
    }
  },
  data () {
    return {
      imgcode: '',
      imgpath: '',
      mobile:'',
      password:'',
      vercode: '',
    }
  },
  created(){
    this.updateImgCode();
  },
}
</script>

<style lang="less">

.loginBtn{
    width: 90%;
    height: 40px;
    background-color:#1aad19;
    color:white;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    border-radius: 3px;
    margin: 0 auto;
}
.custom-primary-red {
  border-radius: 99px!important;
  border-color: #CE3C39!important;
  color: #CE3C39!important;
  &:active {
    border-color: rgba(206, 60, 57, 0.6)!important;
    color: rgba(206, 60, 57, 0.6)!important;
    background-color: transparent;
  }
}

</style>
