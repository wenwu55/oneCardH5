<template>
    <div class="message" v-if="temp">
        <template v-if="messageList.length > 0">
            <mt-cell-swipe v-for="(item, index) in messageList" :key="index"
                :title = item.leaveContent
                :label = item.leaveTime
                :right="[{
                    content: '删除',
                    style: { background: 'red', color: '#fff' },
                    handler: () => deleteMessage(item.leaveId)
                }]"
            >
            </mt-cell-swipe>
        </template>
        <template v-else>
            <Nothing></Nothing>            
        </template>
        <div class="btnDiv">
            <button class="button" @click="addMessage()">新增留言</button>
        </div>
    </div>
</template>

<script>
import Nothing from './Nothing'
export default {
    name: 'message',
    data () {
        return {
            messageList: [],
            userId: this.$store.state.userId
        }
    },
    props: { 
        temp: {
            type: Boolean,
            default: true
        } 
    },
    components: {
        Nothing
    },
    created () {
        this.getMessageList()
    },
    methods: {
        getMessageList () {
            this.$post('leaveMessage/getMessageByUserId', { userId: this.userId }).then(res => {
                this.messageList = res
            })
        },
        addMessage () {
            this.$router.push('./newMessage')
        },
        deleteMessage (id) {
            this.$post('leaveMessage/deleteMessageById', { leaveId: id }).then(res => {
                console.log(res)
                this.$toast('删除成功')
                this.getMessageList()
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
</style>

