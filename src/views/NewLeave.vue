<template>
    <div class="newMessage">
        <mt-header fixed title="新增请假">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>

        <mt-cell title="学校" :value="classInfo.orgName"></mt-cell>
        <mt-cell title="班级" :value="classInfo.name"></mt-cell>
        <mt-cell title="教师" :value="classInfo.adviserNames"></mt-cell>
        <mt-cell title="开始时间"  @click.native="openTime(1)">
            <span>{{ dateTime | formatDate }}</span>
        </mt-cell>
        <mt-cell title="结束时间"  @click.native="openTime(2)">
            <span>{{ endTime | formatDate }}</span>
        </mt-cell>

        <mt-field type="textarea" placeholder="请输入请假内容" rows="5" style="margin-top: 10px;" v-model="newMessage"></mt-field>

        <div class="btnDiv">
            <!-- <button class="button" @click="addLeave()">发送</button> -->
            <mt-button type="primary" @click.native="addLeave()" style="width: 50%">发送</mt-button>
        </div>
        <mt-datetime-picker
            ref="picker"
            v-model="pickerVisible"
            type="datetime"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            hour-format='{value} 时'
            minute-format='{value} 分'
            @confirm="handleConfirm">
        </mt-datetime-picker>
    </div>
</template>

<script>
import { formData } from '../util/request'
export default {
    name: 'newLeave',
    data () {
        return {
            newMessage: '',
            userInfo: {},
            classInfo: {},
            dateTime: '',
            pickerVisible: '',
            val: '',
            endTime: '',
            userId: this.$store.state.userId
        }
    },
    created() {
        this.dateTime = new Date()
        this.endTime = new Date()

        this.getUserInfo()
        this.getClassInfo()
    },
    filters: {
        formatDate: function(time) {
            if(time != null && time != "") {
                let date = new Date(time)
                return formData('yyyy-MM-dd hh:mm:ss', date)
            } else {
                return ""
            }
        }
    },
    methods: {
        openTime(val) {
            this.val = val
            if (val == 0) {
                this.pickerVisible = this.dateTime
            } else {
                this.pickerVisible = this.endTime
            }
            this.$refs.picker.open()
        },
        handleConfirm(value){
            if (this.val === 1) {
                this.dateTime = value
            } else {
                this.endTime = value
            }
        },
        getUserInfo() {
            this.$get('/base/user/getUsers', { userId: this.userId }).then(res => {
                this.userInfo = res
            })
        },
        getClassInfo() {
            this.$post('base/redirect/getClassByToken', { userId: this.userId }).then(res => {
                this.classInfo = res
            })
        },
        addLeave() {
            let param = {
                approvalId: this.classInfo.adviserIds,
                userId: this.userId,
                forContent: this.newMessage,
                startTime: formData('yyyy-MM-dd hh:mm:ss', this.dateTime),
                endTime: formData('yyyy-MM-dd hh:mm:ss', this.endTime),
                type: 1
            }
            if (!param.forContent) {
                this.$toast('请填写请假信息！')
                return false
            }
            if (this.endTime <= this.dateTime) {
                this.$toast('结束时间必须大于开始时间')
                return false
            }
            this.$post('forLeave/insertLeave', param).then(res => {
                this.$toast('操作成功')
                console.log(res)
                this.back()
            })
        },
        back () {
            this.$store.commit('checkSelect', 'leave')
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
    .mint-cell-value {
        color: #333;
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


