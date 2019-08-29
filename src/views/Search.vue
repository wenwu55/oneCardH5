<template>
    <div>
        <form action="" onsubmit="return false;">
            <mt-search
                v-model="value"
                ref="mtSearch"
                show
                cancel-text="取消"
                @keyup.enter.native="search"
                placeholder="搜索">
            </mt-search>
        </form>
        <div v-for="(item, index) in studentList" :key="index">
            <mt-cell :title="item.name" @click.native="goBack(item.name, item.userId)"></mt-cell>
        </div>
    </div>
</template>

<script>
export default {
    name: 'search',
    data() {
        return {
            value: '',
            classId: this.$route.query.classId,
            studentList: []
        }
    },
    mounted () {
        this.$nextTick(()=>{
            let cancel = this.$refs.mtSearch.$el.querySelectorAll('.mint-searchbar-cancel')[0]
            cancel.onclick=()=>{
                this.$router.go(-1)
            }
        })
    },
    methods: {
        search () {
            let param = {
                classId: this.classId,
                studentName: this.value || ''
            }
            this.$post('forLeave/getStudentListByName', param).then(res => {
                this.studentList = res
            })
        },
        goBack (name, id) {
            this.$router.push({
                name: 'teacherLeave',
                query: {
                    studentName: name,
                    userId: id
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.mint-search {
    height: auto;
}
</style>
