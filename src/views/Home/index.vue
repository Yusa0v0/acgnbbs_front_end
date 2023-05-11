<template>
  <div class="home-contain">
    <!-- <PostList></PostList> -->
    <div class="home-content">
      <card :cardData="cardData"></card>
      <!-- <my-carousel class="carsousel-content" :imgList="imgList"></my-carousel> -->
      <!-- <el-button @click="goToTest">测试</el-button> -->
    </div>
  </div>
</template>

<script>
// 引入其余组件
import Card from "@/components/Card/index.vue";
import MyCarousel from "@/components/MyCarousel/index.vue";

export default {
  name: "Home",
  components: {
    Card,
    MyCarousel,
  },
  methods: {
    goToTest() {
      this.$router.push("/test");
    },
  },
  data() {
    return {
      imgList: [
        {
          imageUrl: "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/images/2023/04/23/bc839a343142446793bb2115c44bd6bbimage.png",
          jumpTo: "postDetails/36",
        },
        {
          imageUrl:
            "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/icons/202304042106470.jpg",
          jumpTo: "/postDetails/1",
        },
        {
          imageUrl: "https://placekitten.com/640/480?image=3",
          jumpTo: "/postDetails/18",
        },
        {
          imageUrl: "https://placekitten.com/640/480?image=4",
          jumpTo: "/postDetails/18",
        },
      ],
      cardData: [
        {
          title: "Animation",
          description: "动漫",
          image:
            "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/icons/202305111000470.jpg",
          jumpTo: "/postList/animation",
        },
        {
          title: "Comic",
          description: "漫画",
          image:
            "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/icons/202304042046321.jpg",
          jumpTo: "/postList/comic",
        },
        {
          title: "Game",
          description: "游戏",
          image:
            // "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/icons/202304042039153.jpg",
            "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/icons/202305110951477.png",
          jumpTo: "/postList/game",
        },
        {
          title: "Novel",
          description: "小说",
          image:
            "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/icons/202304042044317.jpg",
          jumpTo: "/postList/novel",
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
.home-contain {
  display: flex;
  justify-content: center;
  align-items: center;
}
.home-content {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  background: rgba(255, 255, 255, 0.75);
  min-height: 100vh;
  width: 900px;
}
.carsousel-content{
  padding: 20px;
}
</style>
