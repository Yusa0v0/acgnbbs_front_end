import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Argon from "./plugins/argon-kit";
// Vue.config.productionTip = false
// 引入路由
import router from './router'
import store from './store/'
import VueLocalStorage from 'vue-ls'
//axios
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.use(Argon);  //引入所有Argon组件
Vue.use(ElementUI);   // 这种方式引入了ElementUI中所有的组件
Vue.use(VueLocalStorage, {
  namespace: 'vuejs__' // 可选项。本地存储的命名空间，避免和其他应用程序的存储冲突。
});

import websocket from 'vue-native-websocket';
Vue.use(websocket, 'ws://localhost:8000', {
  connectManually: true, // 手动连接
  format: 'json', // json格式
  reconnection: true, // 是否自动重连
  reconnectionAttempts: 5, // 自动重连次数
  reconnectionDelay: 2000, // 重连间隔时间
});

new Vue({
  render: h => h(App),
  // 注册路由
  router,
  store,
}).$mount('#app')
