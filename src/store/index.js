import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// 导入所需要的API
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

// vuex的变量是保存在内存中的，一刷新，变量都要重新回归初始化。1. 使用第三方插件： vuex-persistedstate 2. token可以存放在localStorage中

export default new Vuex.Store({
  // Vuex中的数据
  state: {
    token: '',
    userInfo: '', // 保存用户信息(id, username, nickname, email, user_pic)，是为了在首页展示用户信息
  },
  mutations: {
    // 登录成功后的token值
    updateToken(state, newToken) {
      state.token = newToken
    },
    // 用于存储获取的用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo
    },
  },
  actions: {
    // 获取用户基本信息
    async initUserInfo(context) {
      const { data: res } = await getUserInfoAPI()
      // console.log(res)
      // console.log(res.data)
      if (res.code === 0) {
        context.commit('updateUserInfo', res.data)
      }
    },
  },
  getters: {
    nickname: (state) => state.userInfo.nickname,
    username: (state) => state.userInfo.username,
    user_pic: (state) => state.userInfo.user_pic,
  },
  modules: {},
  // vuex数持久化存储
  // plugins 在这里表示配置为vuex的插件
  plugins: [createPersistedState()],
})
