<template>
    <div class="consumption">
        <div class="flex topPick">
            <div class="flex1">开始时间：</div>
            <div class="flex1 time" @click="pickerBegin()">{{ beginDate | formatDate }}</div>
            <div class="flex1">结束时间: </div>
            <div class="flex1 time" @click="pickerEnd()">{{ endDate | formatDate }}</div>
        </div>

        <template v-if="consum.length > 0">
            <div class="main" v-for="(item, index) in consum" :key="index">
                <div class="flex">
                    <div class="num">交易号：{{item.trade_seq}}</div>
                    <div class="money">{{(item.amount / 100).toFixed(2)}}</div>
                </div>
                <div class="flex second">
                    <div>商家：{{item.merchant_name}}</div>
                    <div>{{item.trade_time}}</div>
                </div>
            </div>
        </template>

        <template v-else>
            <Nothing></Nothing>            
        </template>

        <!-- DatePicker -->
        <mt-datetime-picker
            ref="beginDate"
            v-model="beginDate"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="beginConfirm">
        </mt-datetime-picker>

        <mt-datetime-picker
            ref="endDate"
            v-model="endDate"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="endConfirm">
        </mt-datetime-picker>
    </div>
</template>

<script>
import Nothing from './Nothing'
import { formData } from '../util/request'
export default {
    name: 'Consumption',
    data () {
        return {
            beginDate: '',
            endDate: '',
            consum: [],
            userId: this.$store.state.userId
        }
    },
    created() {
        this.endDate = new Date()
        this.beginDate = new Date(this.endDate - 1000 * 60 * 60 * 24 * 30)
        this.getUserExpenseList()
    },
    filters: {
        formatDate: function(time) {
            if(time != null && time != "") {
                let date = new Date(time)
                return formData('yyyy-MM-dd', date)
            } else {
                return ""
            }
        }
    },
    components: {
        Nothing
    },
    methods: { 
        getUserExpenseList () {
            let param = {
                userId: this.userId,
                start_date: formData('yyyyMMdd', this.beginDate),
                end_date: formData('yyyyMMdd', this.endDate)
            }
            this.$post('base/user/getUserExpenseList', param).then(res => {
                this.consum = res
            }) 
        },
        pickerBegin () {
            this.$refs.beginDate.open()
        },
        beginConfirm (val) {
            this.beginDate = val
            this.searchList()
        },
        pickerEnd () {
            this.$refs.endDate.open()
        },
        endConfirm (val) {
            this.endDate = val
            this.searchList()
        },
        searchList () {
            this.$post('base/user/getUserExpenseList', { start_date: formData('yyyyMMdd', this.beginDate), end_date: formData('yyyyMMdd', this.endDate), userId: this.userId }).then(res => {
                this.consum = res
            })
        }
    }
}
</script>

<style lang="less" scoped>
.consumption {
    min-height: 100%;
    background-color: #fff;
    .topPick {
        padding: 13px 12px;
        font-size: 14px;
        color: #333;
        align-items: center;
        line-height: 20px;
        background-color: #f2f2f2;
        text-align: center;
        .time {
            background-color: #fff;
            padding: 5px 10px;
        }
    }
    .main {
        padding: 12px;
        padding-bottom: 0;
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
