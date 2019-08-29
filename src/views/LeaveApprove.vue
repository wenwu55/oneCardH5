<template>
    <div class="leaveApprove">
        <mt-header fixed title="请假审批">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="getBack()"></mt-button>
            </router-link>
        </mt-header>
        <mt-navbar v-model="selected">
            <mt-tab-item id="0">未审批</mt-tab-item>
            <mt-tab-item id="1">已审批</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="0">
                <template v-if="notList.length > 0">
                    <div class="approveList" v-for="(item, index) in notList" :key="index" @click="goInfo(item.forId, item.name, item.forContent)">
                        <div class="flex">
                            <div>{{item.name}}</div>
                            <div>{{item.className}}</div>
                        </div>
                        <div class="content">{{item.forContent}}</div>
                        <div class="time">{{item.endTime}}</div>
                    </div>
                </template>
                <template v-else>
                    <Nothing></Nothing>
                </template>
            </mt-tab-container-item>
            <mt-tab-container-item id="1">
                <template v-if="list.length > 0">
                    <div class="approveList" v-for="(item, index) in list" :key="index">
                        <div class="flex">
                            <div>{{item.name}}</div>
                            <div>{{item.className}}</div>
                        </div>
                        <div class="content">{{item.forContent}}</div>
                        <div class="time">{{item.endTime}}</div>
                    </div>
                </template>
                <template v-else>
                    <Nothing></Nothing>
                </template>
            </mt-tab-container-item>
        </mt-tab-container>

        <div class="btnDiv">
            <button class="button" @click="addLeave()">新增请假</button>
        </div>
    </div>
</template>

<script>
import { getUrlVars, isAndroid_ios } from '../util/request'
import Nothing from '../components/Nothing'
export default {
    name: 'LeaveApprove',
    data () {
        return {
            selected: "0",
            notList: [],
            list: [],
            userId: this.$store.state.userId
        }
    },
    components: {
        Nothing
    },
    created() {
        let userId = getUrlVars().userId || sessionStorage.getItem('userId')
        sessionStorage.setItem('userId', userId)
        this.$store.commit('saveUserId', userId)
        this.getLeaveNotList()
        this.getLeaveList()
    },
    methods: {
        getLeaveNotList () {
            this.$post('forLeave/getLeaveByUserId', { approvalId: this.$store.state.userId, forStatus: 0 }).then(res => {
                this.notList = res
            })
        },
        getLeaveList () {
            this.$post('forLeave/getLeaveByUserId', { approvalId: this.$store.state.userId, forStatus: 1 }).then(res => {
                console.log(res.length)
                this.list = res
                console.log(this.list)
            })
        },
        addLeave () {
            this.$router.push('./teacherLeave')
        },
        goInfo (id, name, content) {
            this.$router.push({
                name: 'approveDetail',
                query: {
                    id: id,
                    name: name,
                    content: content
                }
            })
        },
        getBack () {
            console.log(isAndroid_ios())
            if (isAndroid_ios()) {
                window.creativeJSCallbackForOther.xbl_goback();
            } else {
                window.webkit.messageHandlers.xblGoback.postMessage({});
            }
        }
    }
}
</script>

<style lang="less" scoped>
.leaveApprove {
    padding-top: 40px;
    padding-bottom: 55px;
    .mint-header {
        background-color: #fff;
        color: #333;
        line-height: 45px;
    }
    .mint-navbar {
        border-top: 1px solid #E5E5E5;
    }
    .approveList {
        margin-top: 10px;
        padding: 12px;
        background-color: #fff;
        .flex {
            padding-bottom: 12px;
            border-bottom: 1px solid #e5e5e5;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 600;
            color: #333;
        }
        .content {
            font-size: 14px;
            color: #333;
            font-weight: 400;
            line-height: 30px;
            display: -webkit-box;
            text-overflow: ellipsis;
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
    .btnDiv {
        position: fixed;
        width: 100%;
        bottom: 20px;
        z-index: 500;
        text-align: center;
        .button {
            background: linear-gradient(90deg,rgba(81,185,243,1) 0%,rgba(11,110,233,1) 100%);
            height: 40px;
            color: #fff;
            border-radius: 20px;
            width: 300px;
            border: none;
        }
    }
}
</style>

