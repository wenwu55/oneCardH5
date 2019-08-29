<template>
    <div class="message" v-if="temp">
        <template v-if="leaveList.length > 0">
            <mt-cell-swipe v-for="(item, index) in leaveList" :key="index"
                :right="[{
                    content: '删除',
                    style: { background: 'red', color: '#fff' },
                    handler: () => deleteLeave(item.forId)
                }]"
            >
            <div slot="title" class="contentDiv">
                <div class="content">{{item.forContent}}</div>
                <div class="time">
                    <span class="status">{{item.contentStatus}}</span>
                    <span>{{item.startTime}}</span>
                </div>
            </div>
            </mt-cell-swipe>
        </template>
        <template v-else>
            <Nothing></Nothing>            
        </template>
        <div class="btnDiv">
            <button class="button" @click="addLeave()">新增请假</button>
        </div>
    </div>
</template>

<script>
import Nothing from './Nothing'
export default {
    name: 'leave',
    data () {
        return {
            text: '未审批',
            leaveList: [],
            userId: this.$store.state.userId
        }
    },
    components: {
        Nothing
    },
    props: { 
        temp: {
            type: Boolean,
            default: true
        } 
    },
    created () {
        this.getLeaveList()
    },
    methods: {
        getLeaveList () {
            this.$post('forLeave/getLeaveByUserId', { userId: this.userId }).then(res => {
                console.log(res)
                res.forEach(item => {
                    console.log(item)
                    item.contentStatus = item.forStatus === 0 ? '' : item.forStatus === 1 ? '已通过' : '已拒绝'
                })
                this.leaveList = res
            })
        },
        addLeave () {
            this.$router.push('./newLeave')
        },
        deleteLeave (id) {
            this.$post('forLeave/deleteLeaveById', { forId: id }).then(res => {
                console.log(res)
                this.$toast('删除成功')
                this.getLeaveList()
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .message {
        min-height: 100%;
        padding: 8px 0 100px 0;
        /deep/.mint-cell-swipe {
            // margin-bottom: 8px;
            /deep/.mint-cell-wrapper {
                /deep/.mint-cell-title .mint-cell-text{
                    border: none;
                    font-size: 14px;
                    color: #333;
                    font-weight: 400;
                    line-height: 30px;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 6;
                    overflow: hidden;
                    width: 100%;
                }
                /deep/.mint-cell-label {
                    color: #999;
                    text-align: right;
                    font-size: 13px;
                    line-height: 20px;
                }
            }
        }
        .btnDiv {
            position: fixed;
            width: 100%;
            bottom: 80px;
            z-index: 500;
            // margin: 20px 0;
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
    .contentDiv {
        .content {
            border: none;
            font-size: 14px;
            color: #333;
            font-weight: 400;
            line-height: 30px;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
            overflow: hidden;
            width: 100%;
        }
        .time {
            color: #999;
            font-size: 13px;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            .status {
                font-size: 12px;
                color: skyblue;
            }
        }
    }
</style>

