<template>
  <div class="post-page">
    <div
      class="post-page-content"
      v-loading="listLoading"
      element-loading-text="数据正在加载中~"
      element-loading-background="rgba(255, 255, 255, 0.3)"

    >
      <reading-post :post="post" :postId="postId" />
      <el-divider content-position="center"></el-divider>

      <post-comments
        :comments="comments"
        :postId="postId"
        @refreshComments="postComments"
      />
      <pagination
        v-show="show_pagination"
        :pagination="pagination"
        @greet-event="postComments"
        :setCurrectPage="setCurrectPage"
      />
    </div>
  </div>
</template>
<script>
import ReadingPost from "@/views/PostDetails/ReadingPost";
import PostComments from "@/views/PostDetails/PostComments";
import Pagination from "@/components/Pagination";
import api from "@/api/request";
export default {
  name: "PostDetails",
  components: {
    ReadingPost,
    PostComments,
    Pagination,
  },
  computed: {
    show_pagination() {
      if (this.pagination.total < this.pagination.pageSize) return false;
      else return true;
    },
  },
  data() {
    return {
      listLoading: true,
      post: {},
      postId: 0,
      comments: [],
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
    };
  },
  created() {
    // 获取路由参数
    this.postId = this.$route.params.postId;
  },
  mounted() {
    // this.postDetails();
    this.postComments();
    this.postDetails();
  },
  methods: {
    setCurrectPage(currentPage) {
      this.pagination.currentPage = currentPage;
      console.log("父组件log：" + this.pagination.currentPage);
    },
    postDetails() {
      this.listLoading = true;
      api
        .postDetails(this.postId)
        .then((res) => {
          this.post = res.data;
          this.pagination.total = this.post.commentNum;
          console.log("this.post.liked:"+this.post.liked);
          this.listLoading = false;
        })
        .catch((error) => {
          console.log("" + error);
        });
    },
    postComments() {
      api
        .postCommentList(
          this.postId,
          this.pagination.currentPage,
          this.pagination.pageSize
        )
        .then((res) => {
          this.comments = res.data;
          console.log("父组件");
          console.log(this.comments);
        })
        .catch((error) => {
          console.log("未登录：" + error);
        });
    },
  },
};
</script>

<style scoped lang="less">
.post-page {
  // margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.post-page-content {
  background: rgba(255, 255, 255, 0.75);
  min-height: 95vh;
}
</style>