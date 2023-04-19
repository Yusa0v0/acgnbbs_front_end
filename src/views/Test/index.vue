<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      websock: null,
    };
  },
  created() {
    //页面刚进入时开启长连接
    this.initWebSocket();
  },
  destroyed: function () {
    //页面销毁时关闭长连接
    this.websocketclose();
  },
  methods: {
    //初始化weosocket
    initWebSocket() {
      const wsuri =
        "ws:localhost:8000/webSocket/" + localStorage.getItem("userId"); //ws地址
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      //数据接收
      // const redata = JSON.parse(e.data);
      // console.log(redata.value);
      console.log(e.data);
    },
    websocketsend(agentData) {
      //数据发送
      this.websock.send(agentData);
    },
    websocketclose(e) {
      //关闭
      console.log("connection closed (" + e.code + ")");
    },
  },
};
</script>
