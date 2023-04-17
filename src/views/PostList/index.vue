<template>
  <div class="post-list-page">
    <div
      class="list-page"
      v-loading="listLoading"
      element-loading-text="数据正在加载中~"
      element-loading-background="rgba(255, 255, 255, 0.3)"
    >
      <div v-for="post in posts" :key="post.id" class="post-line">
        <div class="post-item">
          <div class="post-header" @click="goToUserInfo(post.authorId)">
            <el-avatar
              :src="post.avatar"
              size="large"
              class="post-avatar"
              :title="post.authorName"
            ></el-avatar>
          </div>
          <div class="post-body">
            <span
              class="post-title"
              :title="post.title"
              @click="goToPostDetails(post.id)"
            >
              {{ post.title }}
            </span>
            <span class="post-time">
              楼主：{{ post.authorName }} | {{ formatDate(post.createdAt) }}
            </span>
          </div>
        </div>
        <!-- <div> -->
        <!-- <img src="https://img-blog.csdnimg.cn/8d04d7d28bc1484aad1b8546462603c9.png#pic_center" /> -->
        <!-- </div> -->
        <el-divider content-position="center"></el-divider>
      </div>

      <pagination
        v-show="show_pagination"
        :pagination="pagination"
        @greet-event="getCurrectPagePostList"
        :setCurrectPage="setCurrectPage"
      />
    </div>
  </div>
</template>

<script>
import api from "@/api/request";
import Pagination from "@/components/Pagination";
import { formatDate } from "@/utils/format";
export default {
  created() {},
  watch: {
    $route(to, from) {
      console.log("to:" + to.params.category);
      console.log("from:" + from.params.category);
      if (to.params.category != from.params.category) {
        this.category = to.params.category;
        console.log("this:" + this.category);
      }
      this.refreshList();
    },
  },
  components: {
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
      posts: [],
      notices: [],
      category: "",
      // false展示公告，true展示帖子列表
      showListFlag: false,
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
    };
  },
  mounted() {
    // 获取路由参数
    this.category = this.$route.params.category;
    console.log(this.category);
    this.refreshList();
    // this.noticeList();
  },
  methods: {
    refreshList() {
      if (this.category === "animation") {
        this.animationPostList();
      } else if (this.category === "comic") {
        this.comicPostList();
      } else if (this.category === "game") {
        this.gamePostList();
      } else if (this.category === "novel") {
        this.novelPostList();
      }
    },
    formatDate(date) {
      return formatDate(date);
    },
    // 获取公告列表
    noticeList() {
      api
        .noticeList()
        .then((res) => {
          this.notices = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.showListFlag = false;
    },
    // 获取漫画帖子列表
    animationPostList() {
      this.listLoading = true;

      api
        .animationPostList(this.pagination.currentPage)
        .then((res) => {
          this.posts = res.data.postList;
          this.pagination.total = res.data.total;
          console.log("total:" + this.pagination.total);
          this.listLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
      this.showListFlag = true;
    },
    // 获取动漫帖子列表
    comicPostList() {
      this.listLoading = true;

      api
        .comicPostList(this.pagination.currentPage)
        .then((res) => {
          this.posts = res.data.postList;
          this.pagination.total = res.data.total;
          console.log("total:" + this.pagination.total);
          this.listLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
      this.showListFlag = true;
    },
    // 获取游戏帖子列表
    gamePostList() {
      this.listLoading = true;

      api
        .gamePostList(this.pagination.currentPage)
        .then((res) => {
          this.posts = res.data.postList;
          this.pagination.total = res.data.total;
          this.listLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
      this.showListFlag = true;
    },
    // 获取小说帖子列表
    novelPostList() {
      this.listLoading = true;

      api
        .novelPostList(this.pagination.currentPage)
        .then((res) => {
          this.posts = res.data.postList;
          this.pagination.total = res.data.total;
          this.listLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
      this.showListFlag = true;
    },
    // 跳转至详细信息
    goToPostDetails(id) {
      // 使用 Vue Router 的编程式导航，跳转到帖子详情页
      this.$router.push({ path: "/postDetails/" + id });
      // 编程式导航打开新窗口
      // let routerUrl = this.$router.resolve({
      //   path: "/postDetails/" + id,
      //   // query: { content: content },
      // });
      // window.open(routerUrl.href, "_blank");
    },
    goToUserInfo(userId) {
      console.log("goToUserInfo");
      let routerUrl = this.$router.resolve({
        path: "/userInfo/" + userId,
        // query: { content: content },
      });
      window.open(routerUrl.href, "_blank");
    },
    setCurrectPage(currentPage) {
      this.pagination.currentPage = currentPage;
      console.log("父组件" + this.pagination.currentPage);
    },
    getCurrectPagePostList() {
      if (this.category === "animation") {
        this.animationPostList();
      } else if (this.category === "comic") {
        this.comicPostList();
      } else if (this.category === "game") {
        this.gamePostList();
      } else if (this.category === "novel") {
        this.novelPostList();
      }
    },
  },
};
</script>

<style>
.post-list-page {
  /* margin: 20px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* opacity:0.8; */
}

.list-page {
  /* display: flex;
  flex-direction: column; */
  width: 800px;
  /* justify-content: center; */
  /* align-items: center; */
  min-height: 100vh;
  padding: 20px;
  background: rgba(255, 255, 255, 0.75);
}

.post-header {
  margin-bottom: 10px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  align-items: center;
  width: fit-content;
}

.post-title {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
}
.post-time {
  /* margin-left: 10px; */
  font-size: 12px;
  color: #999;
  margin-left: 10px;
  font-weight: bold;
  text-align: left;
}
.post-line {
  display: flex;
  flex-direction: column;
}
.post-item {
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  /* text-align: left; */
  margin-top: 10px;
}
.post-body {
  display: flex;
  flex-direction: column;
}

.post-avatar {
  text-align: center;
}
</style>
