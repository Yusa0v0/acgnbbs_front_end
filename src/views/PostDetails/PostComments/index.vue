<template>
  <div>
    <div class="comment-box" v-if="this.islogined">
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
    <div v-if="comments.length === 0">还没有评论哦~</div>

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
        <span class="comment-username"
          >{{ comment.username }}
          <span v-if="comment.gender">
            <i class="el-icon-female" style="color: #ff69b4"></i>
          </span>
          <span v-else>
            <i class="el-icon-male" style="color: #00bfff"></i>
          </span>
        </span>
      </div>

      <div class="comment-body">
        <p class="comment-content-body">{{ comment.content }}</p>
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
  computed:{
    islogined() {
      return this.$store.state.logined === "true";
    },
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
      if (content == "") {
        this.$message.error("请输入内容");
      } else {
        api
          .addComment(userId, postId, content)
          .then((response) => {
            this.$message.success("评论成功");
            this1.commentContent = "";
            // 如果评论数小于pageSize就刷新，否则不刷新
            if (this.comments.length < this.pageSize) {
              this1.$emit("refreshComments");
            }
          })
          .catch((error) => {
            this.$message.error("请求异常" + error);
          });
      }
    },
  },
};
</script>

<style scoped>
.comment-card {
  margin-bottom: 20px;
  width: 900px;
}
.comment-header {
  margin-bottom: 10px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  align-items: center;
  width: fit-content;
}

.comment-username {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  flex: 1;
}
.comment-time {
  text-align: left;
  font-size: 12px;
  color: #999;
}
.comment-item {
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
.comment-content-body {
  max-width: 860px;
}

.comment-button {
  height: 100%;
  flex-shrink: 0;
}
</style>
