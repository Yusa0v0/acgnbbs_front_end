<template>
  <div class="post-content-box">
    <div class="post-content">
      <h1 style="text-align: center">{{ post.title }}</h1>
      <div class="post-info">
        <small
          >作者：{{ post.authorName }}
          <el-divider direction="vertical"></el-divider> 发布时间：{{
            formatDate(post.createdAt)
          }}
          <el-divider direction="vertical"></el-divider>
          更新时间：{{ formatDate(post.updateAt) }}
          <el-divider direction="vertical"></el-divider> 浏览次数：{{
            post.viewTimes
          }}
        </small>
        <favorite
          :favorited="this.post.favorited"
          :favoriteNum="this.post.favoriteNum"
          @toggleFavorite="toggleFavorite"
        ></favorite>
        <like
          @addLike="addLike"
          :liked="post.liked"
          :count="post.likeNum"
        ></like>
      </div>
      <el-divider content-position="center"></el-divider>

      <div v-html="post.content"></div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/format";
import Like from "@/components/Like";
import Favorite from "@/components/Favorite";
import api from "@/api/request";

export default {
  components: {
    Like,
    Favorite,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    addLike() {
      const userId = localStorage.getItem("userId");
      let id = this.post.id;
      if (this.post.liked === false) {
        api
          .addLike(userId, id)
          .then((res) => {
            this.post.likeNum += 1;
            this.post.liked = true;
          })
          .catch((error) => {
            console.log("" + error);
            this.$message.error("请先登录");
          });
      } else {
        api
          .deleteLike(userId, id)
          .then((res) => {
            this.post.likeNum -= 1;
            this.post.liked = false;
          })
          .catch((error) => {
            console.log("" + error);
            this.$message.error("请先登录");
          });
      }
    },
    formatDate(date) {
      return formatDate(date);
    },

    star() {
      const userId = localStorage.getItem("userId");
      let id = this.post.id;
      api
        .addFavorite(userId, id)
        .then((res) => {
          // this.$message.success("收藏成功");
          this.post.favorited = !this.post.favorited;
          this.post.favoriteNum += 1;
          console.log(this.post.favorited.type);
        })
        .catch((error) => {
          console.log("" + error);
          this.$message.error("请先登录");
        });
    },
    cancelStar() {
      const userId = localStorage.getItem("userId");
      api
        .deleteFavorite(userId, this.post.id)
        .then((res) => {
          // this.$message.success("取消收藏成功");
          this.post.favorited = !this.post.favorited;
          this.post.favoriteNum -= 1;
        })
        .catch((error) => {
          console.log("" + error);
          this.$message.error("请先登录");
        });
    },
    toggleFavorite() {
      if (this.post.favorited) {
        this.cancelStar();
      } else {
        this.star();
      }
    },
  },
};
</script>
<style scoped>
.post-content-box {
  width: 800px;
  margin-bottom: 1px;
}
.post-content {
  margin-left: 20px;
  margin-right: 20px;
}
.post-info {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: auto;
}
</style>
