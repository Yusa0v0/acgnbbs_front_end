<template>
  <div class="user-profile-box">
    <div class="user-profile">
      <!-- 用户信息 -->
      <div class="user-info">
        <el-avatar :src="userInfo.avatar"></el-avatar>
        <h2>{{ userInfo.username }}</h2>
        <div v-show="!this.showEditButton">
          <div v-if="!isFollowed">
            <el-button type="primary" @click="addFollow"
              >关注{{ userInfo.username }}</el-button
            >
          </div>
          <div v-else>
            <el-button @click="cancelFollow">已关注</el-button>
          </div>
        </div>
        <h3>用户ID: {{ userInfo.id }}</h3>
        <h3>性别: {{ userInfo.gender }}</h3>

        <h3>个人简介: {{ userInfo.bio }}</h3>
        <span>关注:{{ this.followNum }}</span>
        <span>粉丝:{{ this.fansNum }} </span>
        <div v-if="this.showEditButton">
          <el-button type="primary" @click="showDialog">修改个人信息</el-button>
        </div>
        <el-dialog title="修改资料" :visible.sync="showEditDialog">
          <el-form
            ref="editForm"
            :model="editForm"
            :rules="editRules"
            label-width="80px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="editForm.username"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <el-upload
                class="avatar-uploader"
                action="api/eduoss/fileoss"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="editForm.avatar"
                  :src="editForm.avatar"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="editForm.gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="个人简介" prop="bio">
              <el-input v-model="editForm.bio"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="showEditDialog = false">取消</el-button>
            <el-button type="primary" @click="saveUserInfo">保存</el-button>
          </div>
        </el-dialog>
      </div>

      <div class="tabs">
        <el-tabs v-model="activeTab" @tab-click="handleTabsClick">
          <el-tab-pane name="myPosts">
            <span slot="label"><i class="el-icon-s-order"></i> 帖子</span>
            <div v-if="myPosts.length === 0">暂无帖子</div>

            <el-table
              :data="myPosts"
              @cell-click="cellHandleClick"
              v-loading="listLoading"
              element-loading-text="数据正在加载中~"
            >
              <el-table-column prop="id" label="帖子ID"></el-table-column>
              <el-table-column prop="authorName" label="作者"></el-table-column>
              <el-table-column prop="title" label="标题"></el-table-column>
              <el-table-column
                prop="categoryName"
                label="分类"
              ></el-table-column>
              <el-table-column label="操作" v-if="this.showEditButton">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDeletePost(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="收藏夹" name="myFavorites">
            <span slot="label"
              ><i class="el-icon-collection-tag"></i> 收藏</span
            >

            <div v-if="myFavorites.length === 0">暂无收藏</div>

            <el-table
              :data="myFavorites"
              @cell-click="cellHandleClick"
              v-loading="listLoading"
              element-loading-text="数据正在加载中~"
            >
              <el-table-column prop="id" label="帖子ID"></el-table-column>
              <el-table-column prop="authorName" label="作者"></el-table-column>
              <el-table-column prop="title" label="标题"></el-table-column>
              <el-table-column
                prop="categoryName"
                label="分类"
              ></el-table-column>
              <el-table-column label="操作" v-if="this.showEditButton">
                <template slot-scope="scope">
                  <!-- <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                > -->
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDeleteFavorite(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane name="myComments">
            <span slot="label"
              ><i class="el-icon-chat-dot-square"></i> 评论</span
            >

            <div v-if="myComments.length === 0">暂无评论</div>
            <el-table
              :data="myComments"
              @cell-click="cellHandleClick"
              v-loading="listLoading"
              element-loading-text="数据正在加载中~"
            >
              <el-table-column prop="id" label="评论ID"></el-table-column>
              <el-table-column prop="postTitle" label="标题"></el-table-column>
              <el-table-column
                prop="content"
                label="评论内容"
              ></el-table-column>
              <el-table-column label="操作" v-if="this.showEditButton">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDeleteComment(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <pagination
          :pagination="pagination"
          @greet-event="getCurrectPageList"
          :setCurrectPage="setCurrectPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/request";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      listLoading: true,
      isFollowed: false,
      activeTab: "myPosts", // 默认显示帖子列表
      userInfo: {
        username: "",
        id: "",
        gender: "",
        bio: "",
        avatar: "https://avatars.githubusercontent.com/u/46166283?v=4", // 默认头像
      },
      showEditDialog: false,
      showEditButton: false,
      editForm: {
        username: "",
        avatar: "",
        gender: "",
        age: 1,
        bio: "",
      },
      editRules: {
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      followNum: 0,
      fansNum: 0,
      followList: [],
      fansList: [],
      myFavorites: [],
      myPosts: [],
      myComments: [],
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
    };
  },
  watch: {
    $route(to, from) {
      console.log("to:" + to.params.userId);
      console.log("from:" + from.params.userId);
      if (to.params.userId != from.params.userId) {
        this.showEditButton = false;
        this.userId = to.params.userId;
        console.log("this:" + this.userId);
        // 判断本地存储用户和访问的用户界面是否为同一个人
        if (localStorage.getItem("userId") == this.userId) {
          this.showEditButton = true;
          console.log((this.showEditButton = true));
        }
      }

      this.refreshUserInfo();
    },
  },
  created() {
    // 获取路由参数
    this.userId = this.$route.params.userId;
    // 判断本地存储用户和访问的用户界面是否为同一个人
    if (localStorage.getItem("userId") == this.userId) {
      this.showEditButton = true;
    }
  },
  mounted() {
    this.refreshUserInfo();
    this.getFollowList();
    this.getFansList();
  },
  methods: {
    refreshUserInfo() {
      this.getUserInfo();
      this.userPostList();
      this.getIsFollowed();
    },
    // 编辑
    handleEdit(index, row) {
      var post = { id: row.id };
      this.$router.push({
        path: "/writePost",
        query: { post: encodeURIComponent(JSON.stringify(post)) },
      });

      // this.$router.push({ path: "/writePost" });
    },
    // 删除帖子
    handleDeletePost(index, row) {
      api
        .deletePost(this.userId, row.id)
        .then((response) => {
          this.$message.success("删除成功");
          this.userPostList();
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
    //删除评论
    handleDeleteComment(index, row) {
      api
        .deleteComment(this.userId, row.id)
        .then((response) => {
          this.$message.success("删除成功");
          this.userCommentList();
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
    //删除收藏
    handleDeleteFavorite(index, row) {
      api
        .deleteFavorite(this.userId, row.id)
        .then((response) => {
          this.$message.success("删除成功");
          this.userFavoriteList();
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },

    cellHandleClick(row, column, cell, event) {
      // 删除
      if (column.label == "操作") {
        console.log(row);
        // this.$message.success("删除成功");
      }
      // 跳转到帖子界面
      else {
        this.goToPostDetails(row.id);
      }
      console.log(row);
      // console.log(column);
      // console.log(cell);
      // console.log(event);
    },
    // 跳转到用户主页
    goToUserInfo(userId) {
      this.$router.push({ path: "/userInfo/" + userId });
    },
    goToPostDetails(postId) {
      this.$router.push({ path: "/postDetails/" + postId });
    },
    // 处理tabs变化
    handleTabsClick(tab, event) {
      // console.log(tab, event);
      // console.log(tab.name);
      if (tab.name == "myFavorites") {
        this.userFavoriteList();
      } else if (tab.name == "myPosts") {
        this.userPostList();
      } else if (tab.name == "myComments") {
        this.userCommentList();
      }
    },
    //页码变了
    getCurrectPageList() {
      console.log("activeTab:" + this.activeTab);
      if (this.activeTab == "myFavorites") {
        this.userFavoriteList();
      } else if (this.activeTab == "myPosts") {
        this.userPostList();
      } else if (this.activeTab == "myComments") {
        this.userCommentList();
      }
    },
    setCurrectPage(currentPage) {
      this.pagination.currentPage = currentPage;
      console.log("父组件" + this.pagination.currentPage);
    },
    showDialog() {
      this.showEditDialog = true;
      this.editForm.username = this.userInfo.username;
      this.editForm.avatar = this.userInfo.avatar;
      this.editForm.gender = this.userInfo.gender;
      this.editForm.bio = this.userInfo.bio;
      console.log(this.editForm);
    },
    //查看关注
    getIsFollowed() {
      api
        .getIsFollowed(localStorage.getItem("userId"), this.userId)
        .then((response) => {
          this.isFollowed = response.data;
          console.log("isFollowed:" + this.isFollowed);
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },
    addFollow() {
      api
        .addFollow(localStorage.getItem("userId"), this.userId)
        .then((response) => {
          this.$message.success("关注成功");
          this.isFollowed = true;
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },
    cancelFollow() {
      api
        .cancelFollow(localStorage.getItem("userId"), this.userId)
        .then((response) => {
          this.$message.success("取关成功");
          this.isFollowed = false;
        })
        .catch((error) => {
          this.$message.error("请求异常" + error);
        });
    },

    saveUserInfo() {
      var gender = 0;
      if (this.editForm.gender === "女") {
        gender = 1;
      }
      let userId = localStorage.getItem("userId");
      api
        .setUserInfo(
          userId,
          this.editForm.username,
          this.editForm.avatar,
          gender,
          this.editForm.bio
        )
        .then((response) => {
          this.userInfo.username = this.editForm.username;
          this.userInfo.avatar = this.editForm.avatar;
          localStorage.setItem("avatar", this.userInfo.avatar);
          localStorage.setItem("username", this.userInfo.username);
          this.userInfo.gender = this.editForm.gender;
          this.userInfo.bio = this.editForm.bio;
          this.showEditDialog = false;
          this.$message.success("修改成功");
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
    getUserInfo() {
      api
        .getUserInfo(this.userId)
        .then((response) => {
          this.userInfo = response.data;
          console.log(response.data);
          if (this.userInfo.gender === 0) {
            this.userInfo.gender = "男";
          } else {
            this.userInfo.gender = "女";
          }
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
    userPostList() {
      this.listLoading = true;

      api
        .userPostList(
          this.userId,
          this.pagination.currentPage,
          this.pagination.pageSize
        )
        .then((response) => {
          this.myPosts = response.data.userPostList;
          for (let index = 0; index < this.myPosts.length; index++) {
            const element = this.myPosts[index];
            if (element.categoryId == 0) {
              element.categoryName = "动漫";
            } else if (element.categoryId == 1) {
              element.categoryName = "漫画";
            } else if (element.categoryId == 2) {
              element.categoryName = "游戏";
            } else if (element.categoryId == 3) {
              element.categoryName = "小说";
            }
          }
          this.pagination.total = response.data.total;
          console.log(this.pagination.total);
          console.log(this.myPosts);
          this.listLoading = false;
        })
        .catch((error) => {
          this.error = error.response.data.message;

          this.$message.error("请求异常" + this.error);
        });
    },
    userCommentList() {
      this.listLoading = true;
      api
        .userCommentList(
          this.userId,
          this.pagination.currentPage,
          this.pagination.pageSize
        )
        .then((response) => {
          this.myComments = response.data.userCommentList;
          this.pagination.total = response.data.total;
          console.log(this.myComments);
          this.listLoading = false;
        })
        .catch((error) => {
          this.error = error.response.data.message;

          this.$message.error("请求异常" + this.error);
        });
    },
    userFavoriteList() {
      this.listLoading = true;
      api
        .userFavoriteList(
          this.userId,
          this.pagination.currentPage,
          this.pagination.pageSize
        )
        .then((response) => {
          this.myFavorites = response.data.favoritePostList;
          for (let index = 0; index < this.myFavorites.length; index++) {
            const element = this.myFavorites[index];
            if (element.categoryId == 0) {
              element.categoryName = "动漫";
            } else if (element.categoryId == 1) {
              element.categoryName = "漫画";
            } else if (element.categoryId == 2) {
              element.categoryName = "游戏";
            } else if (element.categoryId == 3) {
              element.categoryName = "小说";
            }
          }
          this.listLoading = false;

          console.log(this.myFavorites);
          this.pagination.total = response.data.total;
          console.log(this.pagination.total);
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
    getFollowList() {
      api
        .followList(this.userId, 1, 10)
        .then((response) => {
          this.followList = response.data.userInfoList;
          this.followNum = response.data.total;
          console.log(this.followList);
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
    getFansList() {
      api
        .fansList(this.userId, 1, 10)
        .then((response) => {
          this.fansList = response.data.userInfoList;
          this.fansNum = response.data.total;
          console.log(this.fanList);
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
    handleAvatarSuccess(res, file) {
      this.editForm.avatar = res.data;
      console.log(this.editForm.avatar);
      this.$message.success("头像合法");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
  },
};
</script>

<style>
.user-profile-box {
  display: flex; /* 将div设置为flex容器 */
  justify-content: center; /* 将子元素水平居中 */
}
.user-profile {
  align-items: center;
  /* margin: 20px; */
  background: rgba(255, 255, 255, 0.7);
  width: 800px;
  display: flex;
  flex-direction: column;
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 800px;
}
.tabs {
  width: 100%;
  padding: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>