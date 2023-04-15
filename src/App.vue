<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div class="bgimageview" :style="{ '--bg': `url(${headImg}) no-repeat` }">
      <Header v-if="$route.meta.headerShow"></Header>
      <router-view></router-view>
    </div>
    <live2d />
    <Footer v-if="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Live2d from "./components/Live2d";

export default {
  name: "App",
  data() {
    return {
      headImg:
        "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/icons/202304042106470.jpg",
    };
  },
  components: {
    Header,
    Footer,
    Live2d
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
/* *：{ margin:0; padding:0} */
.bgimageview {
  background: var(--bg) no-repeat fixed center top;
  background-attachment: fixed;

  min-height: 100vh;
  text-align: center;
  background-size: 100% 100%;
}
</style>
