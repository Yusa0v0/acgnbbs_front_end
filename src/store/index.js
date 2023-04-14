// 引入Vuex
import Vuex from 'vuex'
import Vue from 'vue'

// 注册Vuex
Vue.use(Vuex)

import state from '@/store/state'
import getters from '@/store/getters'
import actions from '@/store/actions'
import mutations from '@/store/mutations'

// 创建Vuex实例
const store = new Vuex.Store({state,getters,actions,mutations});

// state: {
//   listType: 0
// },
// mutations: {
//   selectAnimation() {
//     listType = 0;
//   },
//   selectComic() {
//     listType = 1;
//   },
//   selectGame() {
//     listType = 2;
//   },
//   selectNovel() {
//     listType = 3;
//   },
// }
// 导出Vuex实例
export default store
