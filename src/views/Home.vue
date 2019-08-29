<template>
  <div class="home">
    <mt-header fixed :title="`${array[selected]}记录`">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="getBack()"></mt-button>
      </router-link>
    </mt-header>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="accessControl">
        <AccessControl></AccessControl>
      </mt-tab-container-item>
      <mt-tab-container-item id="consumption">
        <Consumption></Consumption>
      </mt-tab-container-item>
      <mt-tab-container-item id="message">
        <Message :temp="selected == 'message'"></Message>
      </mt-tab-container-item>
      <mt-tab-container-item id="leave">
        <Leave :temp="selected == 'leave'"></Leave>
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="accessControl">
        <img v-show="selected == 'accessControl'" slot="icon" src="../assets/ic_doorguard_selected@2x.png">
        <img v-show="selected != 'accessControl'" slot="icon" src="../assets/ic_doorguard_unselected@2x.png">
        门禁
      </mt-tab-item>
      <mt-tab-item id="consumption">
        <img v-show="selected == 'consumption'" slot="icon" src="../assets/ic_consumption_selected@2x.png">
        <img v-show="selected != 'consumption'" slot="icon" src="../assets/ic_consumption_unselected@2x.png">
        消费
      </mt-tab-item>
      <mt-tab-item id="message">
        <img v-show="selected == 'message'" slot="icon" src="../assets/ic_message_selected@2x.png">
        <img v-show="selected != 'message'" slot="icon" src="../assets/ic_message_unselected@2x.png">
        留言
      </mt-tab-item>
      <mt-tab-item id="leave">
        <img v-show="selected == 'leave'" slot="icon" src="../assets/ic_leave_selected@2x.png">
        <img v-show="selected != 'leave'" slot="icon" src="../assets/ic_leave_unselected@2x.png">
        请假
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import AccessControl from '../components/AccessControl'
import Consumption from '../components/Consumption'
import Message from '../components/Message'
import Leave from '../components/Leave'
import { getUrlVars, isAndroid_ios } from '../util/request'

export default {
  name: 'home',
  data () {
    return {
      selected: this.$store.state.selected,
      array: {
        'accessControl': '门禁',
        'consumption': '消费',
        'message': '留言',
        'leave': '请假'
      },
      userId: this.$store.state.userId
    }
  },
  components: {
    AccessControl,
    Consumption,
    Message,
    Leave
  },
  created() {
    let userId = getUrlVars().userId || sessionStorage.getItem('userId')
    sessionStorage.setItem('userId', userId)
    this.$store.commit('saveUserId', userId)
    this.getUserInfo()
  },
  methods: {
    // 根据userId => userInfo
    getUserInfo () {
      this.$post('base/redirect/getClassByToken', { userId: getUrlVars().userId }).then(res => {
        this.$store.commit('saveUserInfo', res)
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

<style scoped>
.home {
  padding-top: 40px;
  padding-bottom: 55px;
  height: 100%;
}
.mint-header {
  background-color: #fff;
  color: #333;
  line-height: 45px;
}
</style>
