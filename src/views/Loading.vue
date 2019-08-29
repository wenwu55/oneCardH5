<template>
    <div class="spinner">
        <mt-spinner :size="100" type="double-bounce" color="#26a2ff"></mt-spinner>
        <div class="font">正在跳转中。。。</div>
    </div>
</template>

<script>
export default {
    name: 'loading',
    data(){
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.spinner {
    position: fixed;
    top: 150px;
    left: 35%;
    .font {
        font-size: 14px;
        color: #26a2ff;
        line-height: 50px;
    }
}
</style>
