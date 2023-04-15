<template>
  <div class="home-contain">
    <!-- <PostList></PostList> -->
    <div class="home-content">
      <card :cardData="cardData"></card>
      <my-carousel :imgList="imgList"></my-carousel>
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
  data() {
    return {
      imgList: [
        {
          imageUrl: "https://placekitten.com/640/480?image=2",
          jumpTo: "/userInfo/8",
        },
        {
          imageUrl:
            "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/banner/202304152253647.jpg",
          jumpTo: "/postDetails/18",
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
            "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/icons/202304042049737.jpg",
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
            "https://ruabit-acgnbbs.oss-cn-hangzhou.aliyuncs.com/icons/202304042039153.jpg",
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
  width: 800px;
}
</style>
