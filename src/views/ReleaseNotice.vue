<template>
    <div class="releaseNotice">
        <mt-header fixed title="管理相关">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="getBack()"></mt-button>
            </router-link>
        </mt-header>
        <mt-navbar v-model="selected">
            <mt-tab-item id="0">查看报表</mt-tab-item>
            <mt-tab-item id="1">发布公告</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="0">
                <div class="main" v-for="(item, index) in tableList" :key="index">
                    <div class="flex">
                        <div class="num">{{item.orgName}}</div>
                        <div class="money">{{item.direction}}</div>
                    </div>
                    <div class="flex second">
                        <div>{{item.departName}}{{item.studentName}}</div>
                        <div>{{item.time}}</div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="1">
                <mt-field type="textarea" placeholder="请输入公告内容" rows="5" style="margin-top: 10px;" v-model="newNotice"></mt-field>
                <div class="btnDiv">
                    <!-- <button class="button" @click="addLeave()">发布</button> -->
                    <mt-button type="primary" @click.native="addLeave()" style="width: 50%">发送</mt-button>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import { getUrlVars, isAndroid_ios } from '../util/request'
import { Toast } from 'mint-ui'
export default {
    name: 'ReleaseNotice',
    data () {
        return {
            newNotice: '',
            selected: '0',
            tableList: [],
            orgNo: ''
        }
    },
    async created () {
        let userId = getUrlVars().userId || sessionStorage.getItem('userId')
        sessionStorage.setItem('userId', userId)
        this.$store.commit('saveUserId', userId)
        await this.getUserInfo()
    },
    methods: {
        getUserInfo () {
            this.$get('base/user/getUsers', { userId: this.$store.state.userId }).then(res => {
                this.orgNo = res.orgId
                this.getTableData()
            })
        },
        addLeave () {
            let param = {
                issueContent: this.newNotice,
                orgNo: this.orgNo
            }
            this.$post('issue/insertIssue', param).then(res => {
                console.log(res)
                Toast({
                    message: '操作成功',
                    duration: 2000
                })
            })
        },
        getTableData () {
            this.$post('accessControl/GetAccessControl', { orgNo: this.orgNo }).then(res => {
                this.tableList = res
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
.releaseNotice {
    padding-top: 45px;
    .mint-header {
        background-color: #fff;
        color: #333;
        line-height: 45px;
    }
    .btnDiv {
        margin-top: 20px;
        width: 100%;
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
    .main {
        padding: 12px;
        padding-bottom: 0;
        background-color: #fff;
        margin-top: 12px;
        .flex {
            justify-content: space-between;
            align-items: center;
            line-height: 30px;
            .num {
                font-size: 13px;
                color: #333;
            }
            .money {
                font-size: 14px;
                color: #333;
                font-weight: 600;
            }
        }
        .second {
            color: #999;
            font-size: 13px;
            border-bottom: 1px solid #e5e5e5;
            line-height: 24px;
            padding-bottom: 10px;
        }
    }
}
</style>
