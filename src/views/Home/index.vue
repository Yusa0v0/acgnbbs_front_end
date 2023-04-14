<template>
    <div class="contain">
      <!-- <PostList></PostList> -->
      <card :cardData="cardData"></card>
    </div>
</template>

<script>
// 引入其余组件
import Card from "@/components/Card/index.vue";
export default {
  name: "Home",
  components: {
    Card,
  },
  data() {
    return {


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
.contain {
  // width: 80%;
  // margin-top: 20px;
  display: flex;
  justify-content: center;
  // padding-bottom: 500px;
  // margin-bottom: 600px;
}
</style>
