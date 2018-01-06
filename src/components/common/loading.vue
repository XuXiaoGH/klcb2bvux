<template>
    <div>
        <div class="loading" v-if="loading" @touchmove.prevent>
            <img :src="loadingIcon" alt="" class="loadingImg">
        </div>
    </div>
</template>

<script>
export default{
    props:['loading'],
    data(){
        return{
            loadingIcon: '../../../static/img/loading.png',
        };
    },
};
</script>

<style lang="scss">
    .loading {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 9999;
        background-color: rgba(0,0,0,0.3);
    }
    .loadingImg{
        position: fixed;
        width: 40px;
        left: 45%;
        top: 47%;
        transform: translate(-50%, -50%);
        z-index: 9999;
    }
    .loading img {
        animation: change 2s infinite linear;
    }
    @keyframes change {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
