<template>
    <div class="newMessage">
        <mt-header fixed title="新增留言">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="back()"></mt-button>
            </router-link>
        </mt-header>

        <mt-field type="textarea" placeholder="请输入留言" rows="5" v-model="newMessage"></mt-field>

        <div class="btnDiv">
            <!-- <button class="button" @click="addMessage()">发送</button> -->
            <mt-button type="primary" @click.native="addMessage()" style="width: 50%">发送</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'newMessage',
    data () {
        return {
            newMessage: '',
            userId: this.$store.state.userId
        }
    },
    methods: {
        addMessage () {
            if(!this.newMessage) {
                this.$toast('请先输入留言内容~!')
                return
            }
            let param = {
                userId: this.userId,
                leaveContent: this.newMessage
            }
            this.$post('leaveMessage/insertMessage', param).then(res => {
                console.log(res)
                this.back()
            })
        },
        back () {
            this.$store.commit('checkSelect', 'message')
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
.newMessage{
    padding-top: 48px;
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
}
</style>
