<template>
  <div class="rank-list-page">
    <div class="list-page">
      <el-tabs v-model="activeTab" @tab-click="handleTabsClick">
        <el-tab-pane name="scoreRank">
          <span slot="label"><i class="el-icon-s-data"></i> 积分排行</span>
        </el-tab-pane>
        <el-tab-pane name="signNumRank">
          <span slot="label"><i class="el-icon-s-data"></i> 签到排行</span>
        </el-tab-pane>
        <el-tab-pane name="fanNumRank">
          <span slot="label"><i class="el-icon-s-data"></i> 粉丝排行</span>
        </el-tab-pane>
        <el-tab-pane name="postNumRank">
          <span slot="label"><i class="el-icon-s-data"></i> 发帖排行</span>
        </el-tab-pane>
        <el-tab-pane name="commentNumRank">
          <span slot="label"><i class="el-icon-s-data"></i> 评论排行</span>
        </el-tab-pane>

        <!-- <el-tab-pane name="pageViewRank">
          <span slot="label"><i class="el-icon-s-data"></i> 浏览量排行</span>
        </el-tab-pane> -->
      </el-tabs>
      <div class="rank-item">
        <div class="rank-header">排名</div>
        <div class="rank-body"></div>
        <div class="rank-user-score">{{ this.tag }}</div>
      </div>

      <div v-for="rank in rankList" :key="rank.value.id" class="rank-line">
        <div class="rank-item">
          <div class="rank-content">{{ rank.rank }}</div>
          <div class="rank-header" @click="goToUserInfo(rank.value.id)">
            <el-avatar
              :src="rank.value.avatar"
              size="large"
              class="rank-avatar"
              :title="rank.value.username"
            ></el-avatar>
          </div>

          <div class="rank-body">
            <span
              class="rank-title"
              :title="rank.value.username"
              @click="goToUserInfo(rank.value.id)"
            >
              {{ rank.value.username }}
            </span>
            <span class="post-time"> {{ rank.value.bio }}</span>
          </div>

          <div class="rank-user-score">{{ rank.score }}</div>
        </div>
        <el-divider content-position="center"></el-divider>
      </div>

      <pagination
        v-show="show_pagination"
        :pagination="pagination"
        @greet-event="getCurrectPagerankList"
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
      activeTab: "scoreRank", // 默认显示帖子列表
      rankList: [],
      tag: "积分",
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
    };
  },
  mounted() {
    this.scoreRank();
  },
  methods: {    
    scoreRank() {
      api
        .scoreRank()
        .then((response) => {
          this.rankList = response.data;
          for (let index = 0; index < this.rankList.length; index++) {
            const element = this.rankList[index];
            element.rank = index + 1;
          }
          console.log(this.rankList);
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
    signNumRank() {
      api
        .signNumRank()
        .then((response) => {
          this.rankList = response.data;
          for (let index = 0; index < this.rankList.length; index++) {
            const element = this.rankList[index];
            element.rank = index + 1;
          }
          console.log(this.rankList);
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
    fanNumRank() {
      api
        .fanNumRank()
        .then((response) => {
          this.rankList = response.data;
          for (let index = 0; index < this.rankList.length; index++) {
            const element = this.rankList[index];
            element.rank = index + 1;
          }
          console.log(this.rankList);
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
    postNumRank() {
      api
        .postNumRank()
        .then((response) => {
          this.rankList = response.data;
          for (let index = 0; index < this.rankList.length; index++) {
            const element = this.rankList[index];
            element.rank = index + 1;
          }
          console.log(this.rankList);
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
    commentNumRank() {
      api
        .commentNumRank()
        .then((response) => {
          this.rankList = response.data;
          for (let index = 0; index < this.rankList.length; index++) {
            const element = this.rankList[index];
            element.rank = index + 1;
          }
          console.log(this.rankList);
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },

    // 处理tabs变化
    handleTabsClick(tab, event) {
      // console.log(tab, event);
      // console.log(tab.name);
      if (tab.name == "scoreRank") {
        this.tag = "积分";
        this.scoreRank();
      } else if (tab.name == "signNumRank") {
        this.tag = "签到天数";
        this.signNumRank();
      } else if (tab.name == "fanNumRank") {
        this.tag = "粉丝数";
        this.fanNumRank();
      } else if (tab.name == "postNumRank") {
        this.tag = "发帖数";
        this.postNumRank();
      } else if (tab.name == "commentNumRank") {
        this.tag = "评论数";
        this.commentNumRank();
      }
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
    getCurrectPagerankList() {
      if (this.category === "animation") {
        this.animationrankList();
      } else if (this.category === "comic") {
        this.comicrankList();
      } else if (this.category === "game") {
        this.gamerankList();
      } else if (this.category === "novel") {
        this.novelrankList();
      }
    },
  },
};
</script>

<style>
.rank-list-page {
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
.rank-content {
  font-size: 22px;
  text-align: center;
  margin-right: 20px;
}
.rank-header {
  margin-bottom: 10px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  align-items: center;
  width: fit-content;
}
.rank-body {
  flex: 9;
  display: flex;
  flex-direction: column;
}
.rank-user-score {
  flex: 1;
}
.rank-title-name {
  float: right;
}
.rank-title {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
}
.rank-time {
  /* margin-left: 10px; */
  font-size: 12px;
  color: #999;
  margin-left: 10px;
  font-weight: bold;
  text-align: left;
}
.rank-line {
  display: flex;
  flex-direction: column;
}
.rank-item {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.rank-avatar {
  text-align: center;
}
</style>
