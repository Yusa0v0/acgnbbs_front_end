<template>
  <div id="app">
    <div class="bgimageview" :style="{ '--bg': `url(${headImg}) no-repeat` }">
      <Header v-if="$route.meta.headerShow"></Header>
      <router-view></router-view>
    </div>
    <live2d />
    <meting-js
      :id="musicForm.id"
      :server="musicForm.server"
      type="playlist"
      fixed="true"
      :autoplay="musicForm.autoplay"
      :loop="musicForm.loop"
      :order="musicForm.order"
      list-folded="ture"
      list-max-height="500px"
      lrc-type="0"
    >
    </meting-js>
    <Footer v-if="$route.meta.footerShow"></Footer>
  </div>
</template>


<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Live2d from "./components/Live2d";
import api from "@/api/request";

export default {
  name: "App",
  data() {
    return {
      musicForm: {
        id: localStorage.getItem("id"),
        server: localStorage.getItem("server"),
        loop: localStorage.getItem("loop"),
        order: localStorage.getItem("order"),
        autoplay: localStorage.getItem("autoplay"),
      },
      headImg:
        "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/icons/202304231900041.png",
      // "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/icons/202304042106470.jpg",
      notice: null,
    };
  },
  components: {
    Header,
    Footer,
    Live2d,
    APlayer,
  },

  mounted() {
    this.getNewNotice();
  },

  methods: {
    getNewNotice() {
      console.log("id" + this.musicForm.id);
      console.log("server" + this.musicForm.server);
      api
        .getNewNotice()
        .then((res) => {
          this.notice = res.data;
          this.$notify.info({
            title: this.notice.title,
            message: this.notice.content,
            duration: 10000,
          });
        })
        .catch((error) => {
          // this.$message.error("获取公告失败~");
        });
    },
  },
};
</script>

<style>
#app {
}
.bgimageview {
  background: var(--bg) no-repeat fixed center top;
  background-attachment: fixed;
  min-height: 100vh;
  text-align: center;
  background-size: 100% 100%;
}
</style>
