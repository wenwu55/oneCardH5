<template>
    <div class="teacher">
        <mt-header fixed title="请假审批"></mt-header>

        <mt-navbar v-model="selected">
            <mt-tab-item id="1">未审批</mt-tab-item>
            <mt-tab-item id="2">已审批</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="box" @click="info()">
                    <div class="flex">
                        <div>周杰伦</div>
                        <div>高一234班</div>
                    </div>
                    <div class="messageBox">小明，放学早点回家吃饭，今天刘阿姨来家里做客，妈妈做了很多好吃的。</div>
                    <div class="time">2018-05-10 20:08:40</div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="box" @click="info()">
                    <div class="flex">
                        <div>周杰伦</div>
                        <div>高一234班</div>
                    </div>
                    <div class="messageBox">这是一条五百字的请假，这是一条五百字的请假啊啊啊啊这是一条五百字的请假，这是一条五百字的请假啊啊啊啊这是一条五百字的请假，这是一条五百字的请假啊啊啊啊这是一条五百字的请假，这是一条五百字的请假啊啊啊啊这是一条五百字的请假，这是一条五百字的请假啊啊啊啊最多显示六行字了啦啦啦，超过500字到这里就过500字到这里就过500字到这里就过500字到这里就过500字到这里就过500字到这里就过500字到这里就省略了…</div>
                    <div class="time">2018-05-10 20:08:40</div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
export default {
    name: 'teacher',
    data () {
        return {
            selected: '1'
        }
    },
    methods: {
        info () {
            this.$router.push('/approve')
        }
    }
}
</script>

<style lang="less" scoped>
.teacher {
  padding-top: 40px;
    .mint-header {
        background-color: #fff;
        color: #333;
        line-height: 45px;
    }
    .mint-navbar {
        border-top: 1px solid #E5E5E5;
    }
    .box {
        padding: 12px;
        background-color: #fff;
        margin-top: 12px;
        .flex {
            justify-content: space-between;
            align-items: center;
            color: #333;
            font-weight: 600;
            font-size: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e5e5e5;
        }
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
        .time {
            color: #999;
            text-align: right;
            font-size: 13px;
            line-height: 20px;
        }
    }
}
</style>
