<template>
  <div class="notice-list-page">
    <div
      class="list-page"
      v-loading="listLoading"
      element-loading-text="数据正在加载中~"
      element-loading-background="rgba(255, 255, 255, 0.3)"
    >
      <div
        v-for="(notice, index) in notices"
        :key="notice.id"
        class="notice-line"
      >
        <div class="notice-item">
          <div class="notice-body">
            <span
              class="notice-title"
              :title="notice.title"
              @click="handleShowNoticeDialog(index)"
            >
              {{ notice.title }}
            </span>
            <span class="notice-time">
              管理员：{{ notice.createdAdminName }} |
              {{ formatDate(notice.createdAt) }}
            </span>
          </div>
        </div>
        <el-divider content-position="center"></el-divider>
      </div>
      <el-dialog
        title="公告"
        width="40%"
        :lock-scroll="false"
        :visible.sync="showNoticeDialog"
      >
        <el-form label-width="80px" :model="noticeForm">
          <el-form-item label="标题" prop="title">
            <span>{{ noticeForm.title }} </span>
          </el-form-item>
          <el-form-item label="内容" prop="title">
            <span>{{ noticeForm.content }} </span>
          </el-form-item>
        </el-form>
      </el-dialog>
      <pagination
        v-show="show_pagination"
        :pagination="pagination"
        @greet-event="getNoticeList"
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
      listLoading: false,
      notices: [],
      category: "",
      showListFlag: false,
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
      noticeForm: {
        adminName: "",
        title: "",
        content: "",
      },
      showNoticeDialog: false,
    };
  },
  created() {
    this.getNoticeList();
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
    },
    // 获取公告列表
    getNoticeList() {
      this.showListFlag = true;
      api
        .getNoticeList(this.pagination.currentPage, this.pagination.pageSize)
        .then((res) => {
          console.log(res.data);
          this.notices = res.data.userInfoList;
          this.pagination.total = res.data.total;
          this.showListFlag = false;
        })
        .catch((error) => {
          console.log(error);
          this.showListFlag = false;
        });
    },
    setCurrectPage(currentPage) {
      this.pagination.currentPage = currentPage;
    },
    handleShowNoticeDialog(index) {
      this.noticeForm.title = this.notices[index].title;
      this.noticeForm.content = this.notices[index].content;
      this.showNoticeDialog = true;
    },
  },
};
</script>

<style>
.notice-list-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.list-page {
  width: 900px;

  min-height: 100vh;
  padding: 20px;
  background: rgba(255, 255, 255, 0.75);
}

.notice-header {
  margin-bottom: 10px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  align-items: center;
  width: fit-content;
}

.notice-title {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
}
.notice-time {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
  font-weight: bold;
  text-align: left;
}
.notice-line {
  display: flex;
  flex-direction: column;
}
.notice-item {
  display: flex;
  flex-direction: row;

  margin-top: 10px;
}
.notice-body {
  display: flex;
  flex-direction: column;
}

.notice-avatar {
  text-align: center;
}
</style>
