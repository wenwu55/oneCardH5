<template>
  <div class="accessControl">
    <template v-if="accessControl.length > 0">
      <div class="card" v-for="(item, index) in accessControl" :key="index">
        <img :src="item.picPath" alt="">
        <div class="flex">
          <div>{{item.orgName}}</div>
          <div><span>{{item.consumerName}}</span>
            <img v-if="item.status == 20" class="img" src="../assets/ic_out@2x.png" alt="">
            <img v-else class="img" src="../assets/ic_in@2x.png" alt="">
          </div>
        </div>
        <div class="flex">
          <div class="font14"></div>
          <div class="font14">{{time(item.recordTime)}}</div>
        </div>
      </div>
    </template>
    <template v-else>
      <Nothing></Nothing>
    </template>
  </div>
</template>

<script>
import { formData } from '../util/request'
import Nothing from './Nothing'

export default {
  name: 'AccessControl',
  data() {
    return {
      accessControl: [],
      userId: this.$store.state.userId
    }
  },
  created() {
    this.getAccessControl()
  },
  components: {
    Nothing
  },
  methods: {
    getAccessControl() {
      let param = {
        userId: this.userId,
        pageNo: 1,
        pageSize: 6,
        startRecordTime: formData('yyyyMMddhhmmss', new Date(new Date - 1000 * 60 * 60 * 24 * 30)),
        endRecordTime: formData('yyyyMMddhhmmss', new Date())
      }
      this.$post('base/user/getInoutRecord', param).then(res => {
        this.accessControl = res.list
      })
    },
    time (date) {
      let year = date.substring(0, 4)
      let MM = date.substring(4, 6)
      let dd = date.substring(6, 8)
      let hh = date.substring(8, 10)
      let mm = date.substring(10, 12)
      let ss = date.substring(12, 14)

      return year + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
    }
  }
}
</script>
<style lang="less" scoped>
.mint-tab-container {
  overflow-y:auto;
}
.accessControl {
  padding: 8px 0;
  .card {
    padding: 16px;
    margin-bottom: 8px;
    background-color: #fff;
    font-size: 15px;
    color: #333;
    font-weight: 500;
    img {
      height: 193px;
      width: 100%;
      margin-bottom: 12px;
    }
    .flex {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      .font14 {
        color: #666;
      }
      .img {
        width: 16px;
        height: 16px;
        margin-left: 8px;
        margin-bottom: 0;
      }
    }
  }
}
</style>


