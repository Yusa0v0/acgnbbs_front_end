<template>
  <div>
    <div class="comment-box">
      <el-avatar :src="avatar" size="large" class="comment-avatar"></el-avatar>
      <el-input
        class="comment-input"
        type="textarea"
        placeholder="请输入评论内容"
        autosize
        :rows="1"
        v-model="commentContent"
        ref="commentInput"
        @keyup.enter.native="submitComment"
        @keydown.enter.native.prevent
      ></el-input>
      <el-button
        class="comment-button"
        type="primary"
        size="medium"
        @click="submitComment"
        :disabled="!commentContent"
      >
        发送评论
      </el-button>
    </div>
    <div v-if="comments.length === 0">还没有评论哦，赶快发送一条吧~</div>

    <!-- 评论列表 -->
    <div v-for="comment in comments" :key="comment.id" class="comment-item">
      <div
        class="comment-header"
        @click="goToUserInfo(comment.userId)"
        :title="comment.username"
      >
        <!-- 头像 -->
        <el-avatar
          :src="comment.avatar"
          size="large"
          class="comment-avatar"
        ></el-avatar>
        <!--用户名  -->
        <span class="comment-username">{{ comment.username }}</span>
      </div>

      <div class="comment-body">
        <p>{{ comment.content }}</p>
        <span class="comment-time">{{ formatDate(comment.createdAt) }}</span>
        <el-button
          class="reply-btn"
          type="text"
          size="mini"
          @click="replyComment(comment.username)"
        >
          回复
        </el-button>
      </div>
      <el-divider content-position="center"></el-divider>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/format";
import api from "@/api/request";
export default {
  props: {
    comments: { type: Array, required: true },
    postId: { type: String, required: true },
  },
  data() {
    return {
      commentContent: "",
      avatar: localStorage.getItem("avatar"),
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
    },
    goToUserInfo(userId) {
      let routerUrl = this.$router.resolve({
        path: "/userInfo/" + userId,
        // query: { content: content },
      });
      window.open(routerUrl.href, "_blank");
    },
    // 回复信息
    replyComment(username) {
      this.commentContent = "回复 " + username + ": ";
      this.$refs.commentInput.focus();
    },
    // 发布评论
    submitComment() {
      let userId = localStorage.getItem("userId");
      let content = this.commentContent;
      let this1 = this;
      let postId = this.postId;
      api
        .addComment(userId, postId, content)
        .then((response) => {
          // const token = response.data;
          this.$message.success("评论成功");
          this1.commentContent = "";
          // 如果评论数小于pageSize就刷新，否则不刷新
          if (this.comments.length < this.pageSize) {
            this1.$emit("refreshComments");
          }
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
  },
};
</script>

<style scoped>
.comment-card {
  margin-bottom: 20px;
  width: 800px;
}
.comment-header {
  margin-bottom: 10px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  align-items: center;
  width: fit-content;
  /* height: 100vh; */
}

.comment-username {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  /* line-height: 200px; */
  /* align-items: center; */
  text-align: left;
  flex: 1;
}
.comment-time {
  /* margin-left: 10px; */
  text-align: left;
  font-size: 12px;
  color: #999;
}
.comment-item {
  /* display: flex; */
  /* align-items: center; */
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
}
.reply-btn {
  text-align: right;
}
.actions {
  text-align: right;
}
.comment-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;

  /* width: 100%; */
}
.comment-avatar {
  text-align: center;
}
.comment-input {
  flex-grow: 1;
  padding-left: 10px;
  padding-right: 10px;
  flex: 1;
}

.comment-button {
  height: 100%;
  flex-shrink: 0;
}
</style>
