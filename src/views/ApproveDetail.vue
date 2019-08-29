<template>
    <div class="approveDetail">
        <mt-header fixed :title="name">
            <router-link to="/LeaveApprove" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="content">{{content}}</div>
        <div class="flex">
            <!-- <button class="cancel" @click="approve(2)">拒绝</button> -->
            <mt-button @click.native="approve(2)" style="width: 30%">拒绝</mt-button>
            <mt-button type="primary" @click.native="approve(1)" style="width: 30%">发送</mt-button>
            <!-- <button class="confim" @click="approve(1)">同意</button> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'ApproveDetail',
    data () {
        return {
            content: this.$route.query.content,
            id: this.$route.query.id,
            name: this.$route.query.name
        }
    },
    methods: {
        approve (status) {
            this.$post('forLeave/updateLeaveById', { forId: this.id, forStatus: status }).then(res => {
                console.log(res)
                this.$router.go(-1)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.approveDetail {
    padding-top: 40px;
    padding-bottom: 55px;
    .mint-header {
        background-color: #fff;
        color: #333;
        line-height: 45px;
    }
    .content {
        padding: 12px;
        margin-top: 12px;
        font-size: 14px;
        color: #333;
        font-weight: 400;
        line-height: 30px;
        background-color: #fff;
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


