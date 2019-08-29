<template>
    <div class="approve">
        <mt-header fixed title="周杰伦">
            <router-link to="/teacher" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>

        <div class="box">
            <div class="messageBox">这是一条五百字的请假，这是一条五百字的请假啊啊啊啊这是一条五百字的请假，这是一条五百字的请假啊啊啊啊这是一条五百字的请假，这是一条五百字的请假啊啊啊啊这是一条五百字的请假，这是一条五百字的请假啊啊啊啊这是一条五百字的请假，这是一条五百字的请假啊啊啊啊最多显示六行字了啦啦啦，超过500字到这里就过500字到这里就过500字到这里就过500字到这里就过500字到这里就过500字到这里就过500字到这里就省略了…</div>
        </div>

        <div class="flex">
            <button class="cancel">取消</button>
            <button class="confim">确认</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'approve'
}
</script>

<style lang="less" scoped>
.approve {
    padding-top: 40px;
    .mint-header {
        background-color: #fff;
        color: #333;
        line-height: 45px;
    }
    .box {
        margin-top: 8px;
        padding: 12px;
        background-color: #fff;
        .messageBox {
            padding-top: 8px;
            font-size: 14px;
            color: #333;
            font-weight: 400;
            line-height: 24px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
            overflow: hidden;
        }
    }
    .flex {
        justify-content: space-around;
        margin-top: 20px;
        .cancel {
            border: 1px solid #51B9F3;
            color: #51B9F3;
            background-color: #fff;
            border-radius: 20px;
            height: 44px;
            line-height: 44px;
            width: 150px;
        }
        .confim {
            border-radius: 20px;
            height: 44px;
            line-height: 44px;
            width: 150px;
            border: none;
            background:linear-gradient(90deg,rgba(81,185,243,1) 0%,rgba(11,110,233,1) 100%);
            color: #fff;
        }
    }
}
</style>

