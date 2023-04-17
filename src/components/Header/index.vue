<template>
  <div>
    <div class="navbarBox">
      <div class="navbar-box">
        <!-- 导航栏容器 -->
        <div class="navbar-container">
          <!-- 左侧 -->
          <div class="navbar-container-left">
            <!-- 网页logo -->
            <!-- <div class="logo">
              <img
                src=""
                alt=""
              />
            </div> -->

            <!-- 左侧导航栏 -->
            <el-tabs v-model="activeTab" @tab-click="handleTabsClick">
              <el-tab-pane name="home">
                <span slot="label"> 主页</span>
              </el-tab-pane>
              <el-tab-pane name="animation">
                <span slot="label"> 动漫</span>
              </el-tab-pane>
              <el-tab-pane name="comic">
                <span slot="label"> 漫画</span>
              </el-tab-pane>
              <el-tab-pane name="game">
                <span slot="label">游戏</span>
              </el-tab-pane>
              <el-tab-pane name="novel">
                <span slot="label">小说</span>
              </el-tab-pane>
              <el-tab-pane name="rank">
                <span slot="label"> 排行</span>
              </el-tab-pane>
              <el-tab-pane name="sign">
                <span slot="label" v-if="!signed">
                  <a active-class="active" @click="sign"> 签到 </a>
                </span>
                <span slot="label" v-else>
                  <a active-class="active"> 今天已经签到过啦！ </a>
                </span>
              </el-tab-pane>
            </el-tabs>
          </div>

          <!-- 中间搜索框 -->
          <!-- <div class="navbar-container-middle">
            <div class="navbar-search-container"> -->
          <!-- <input
                type="text"
                autocomplete="off"
                id="search"
                :placeholder="defaultText"
              />
              <button>
                <i></i>
                <span>搜索</span>
              </button> -->
          <!-- </div>
          </div> -->

          <!-- 右侧导航栏 -->
          <div class="navbar-container-right">
            <div class="navbar-btns-User">
              <!--用户登录: 展示用户的头像以及其他信息-->
              <div
                class="userPhoto"
                @mouseover="mouseOver"
                @mouseleave="mouseLeave"
                v-if="logined"
              >
                <!-- 用户头像 -->
                <a class="hasAvatar" :style="{ opacity }" @click="goToUserInfo">
                  <img :src="avatar" />
                </a>
                <!-- 用信息弹出框 初始display:none-->
                <div class="navbar-profile" :style="{ display }">
                  <div class="profile-user">
                    <!-- 用户简介的头像 -->
                    <a class="profile-avatar" @click="goToUserInfo">
                      <img :src="avatar"
                    /></a>
                    <p class="profile-nickName">
                      {{ this.username
                      }}<span v-if="this.gender == 1">
                        <i class="el-icon-female" style="color: #ff69b4"></i>
                      </span>
                      <span v-else>
                        <i class="el-icon-male" style="color: #00bfff"></i>
                      </span>
                    </p>
                  </div>
                  <a href="" @click="logout">登出</a>
                </div>
              </div>
              <!--用户未登录: 提示提示信息-->
              <div class="userPhoto" v-else>
                <a href="" @click.prevent="goToLogin">登录</a>
                <a href="" @click.prevent="goToRegister">注册</a>
              </div>

              <!-- 会员中心 -->
              <!-- <div class="navbar-btn navbar-btn-dynamic navbar-fl">
                <a href="">会员中心</a>
              </div> -->
              <div class="navbar-btn navbar-btn-news navbar-fl">
                <el-button type="primary" @click="writePost">发布</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/request";
export default {
  name: "Header",
  data() {
    return {
      activeTab: "home",
      signed: false,
      username: localStorage.getItem("username"),
      avatar: localStorage.getItem("avatar"),
      gender: localStorage.getItem("gender"),
      opacity: 1,
      display: "none",
      defaultText: "搜索",
    };
  },
  computed: {
    listType() {
      // 获取全局变量
      return this.$store.state.listType;
    },
    logined() {
      return this.$store.state.logined === "true";
    },
  },
  methods: {
    handleTabsClick(tab, event) {
      if (tab.name == "home") {
        this.$router.push("/home");
      } else if (tab.name == "animation") {
        this.$router.push("/postList/animation");
      } else if (tab.name == "comic") {
        this.$router.push("/postList/comic");
      } else if (tab.name == "game") {
        this.$router.push("/postList/game");
      } else if (tab.name == "novel") {
        this.$router.push("/postList/novel");
      } else if (tab.name == "rank") {
        this.$router.push("/rank");
      } else if (tab.name == "sign") {
      }
    },
    sign() {
      if (this.logined) {
        api
          .sign()
          .then((response) => {
            this.signed = true;
            this.$message.success("签到成功");
          })
          .catch((error) => {
            this.error = error.response.data.message;
            this.$message.error("请求异常" + this.error);
          });
      } else {
        this.$message.error("请先登录再签到哦~");
        this.$router.push("/login");
      }
    },
    getSigned() {
      let userId = localStorage.getItem("userId");
      api
        .getSigned(userId)
        .then((response) => {
          // this.$message.success("签到成功");
          console.log("response:" + response.data);
          this.signed = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.$message.error("请求异常" + this.error);
        });
    },
    mouseOver() {
      this.opacity = 0;
      this.display = "block";
    },
    mouseLeave() {
      this.opacity = 1;
      this.display = "none";
    },
    transIndex() {
      this.$router.push("/index");
    },
    goToLogin() {
      console.log(1);
      this.$router.push("/login");
    },
    goToRegister() {
      this.$router.push("/register");
    },

    goToUserInfo() {
      // 使用 Vue Router 的编程式导航，跳转到帖子详情页
      const userId = localStorage.getItem("userId");
      this.$router.push({ path: "/userInfo/" + userId });
    },
    jumpToAnimation() {
      this.$router.push({ path: "/postLists/animation" });
    },
    jumpToGame() {
      this.$router.push({ path: "/postLists/game" });
    },
    logout() {
      localStorage.setItem("token", null);
      localStorage.setItem("userId", null);
      localStorage.setItem("logined", false);
      this.$store.state.logined = localStorage.getItem("logined");
      // alert("登出成功");
      this.$message.success("登出成功");

      api
        .logout()
        .then((response) => {
          // const token = response.data.token;
          // 登出，清空token
          // this.$ls.set('token', token);
          // this.$router.push("/home");
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    writePost() {
      if (this.logined) {
        var post = { id: 0 };
        this.$router.push({
          path: "/writePost",
          query: { post: encodeURIComponent(JSON.stringify(post)) },
        });
      } else {
        this.$message.error("请先登录哦~");
        this.$router.push("/login");
      }
      // this.$router.push("/writePost");
    },
  },
  mounted() {
    if (this.logined) {
      this.getSigned();
    }
  },
};
</script>
<style scoped>
.navbarBox {
  min-height: 48px;
  display: flex; /* 将div设置为flex容器 */
  justify-content: center; /* 将子元素水平居中 */
  align-items: center;
}
.navbar-box {
  position: fixed;
  z-index: 2001;
  top: 0px;
  width: 800px;
  /* left: 0px; */
  font-size: 14px;
  /* 字体粗细，400相当于normal */
  font-weight: 400;
  color: #222226;
  background-color: #fff;
  /* 阴影  水平阴影距离，垂直阴影距离， 模糊尺寸， 阴影尺寸 颜色*/
  box-shadow: 0 2px 4px 0 rgb(0, 0, 0, 5%);
  background: rgba(255, 255, 255, 0.75);
}
.navbar-container {
  width: 100%;
  /* 最小宽度，窗口缩小之后到1280px不会再缩小 */
  /* min-width: 1280px; */
  box-sizing: border-box;
  padding: 0 24px;
  margin: 0 auto;
  height: 48px;
  line-height: 48px;
  display: flex;
  justify-content: space-between;
  -webkit-box-pack: justify;
}
.toolbar-container-left {
  /* 元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器 */
  flex: none;
}
.logo {
  position: relative;
  float: left;
  margin-right: 8px;
  /* 当箭头鼠标移到会变成手式鼠标 */
  cursor: pointer;
}
.logo img {
  width: 80px;
  max-width: 80px;
  height: 44px;
  display: block;
  margin-top: calc((48px - 44px) / 2);
}

a {
  color: #000;
  padding: 0 10px;
  /* 删除a标签的下划线 */
  text-decoration: none;
}
/* 鼠标停留时的样式 */

.navbar-container-middle {
  padding: 0 40px;
  flex: 1;
}
.navbar-search-container {
  width: 100%;
  max-width: 720px;
  height: 32px;
  line-height: 32px;
  margin-top: calc((48px - 32px) / 2);
  box-sizing: border-box;
  font-size: 0px;
  margin-left: auto;
  margin-right: auto;
}
.navbar-search-container input {
  font-size: 14px;
  display: inline-block;
  width: calc(100% - 88px);
  height: 100%;
  line-height: inherit;
  /* 为了后面聚焦搜索框样式，将边框外围线清除 */
  outline: 0;
  background: #f5f6f7;
  color: #222226;
  vertical-align: top;
  text-indent: 16px;
  border: 1px solid #e8e8ed;
  border-right: none;
  box-sizing: border-box;
  border-radius: 16px 0 0 16px;
}
/* 搜索框聚焦样式 */
.navbar-search-container input:focus {
  border: 1px solid #fc5531;
  border-right: none;
}
.navbar-search-container button {
  display: inline-block;
  width: 88px;
  height: 100%;
  outline: 0;
  border: 0 none;
  border-radius: 0 16px 16px 0;
  font-size: 14px;
  line-height: 32px;
  cursor: pointer;
  background-color: #fc5531;
  text-align: left;
}
.navbar-search-container i {
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url(https://g.csdnimg.cn/common/csdn-toolbar/images/csdn-white-search.png)
    no-repeat center center;
  background-size: 100%;
  vertical-align: middle;
  position: relative;
  top: -1px;
  margin-left: 14px;
}
.navbar-search-container span {
  display: inline-block;
  vertical-align: top;
  color: #fff;
}
.navbar-btns-User {
  flex: 1;
}
.userPhoto {
  height: 100%;
  float: left;
  position: relative;
  line-height: 48px;
  text-align: center;
  padding: 0 8px;
}
.hasAvatar {
  display: block;
  line-height: 48px;
  color: #222226;
  margin-top: calc((48px - 32px) / 2);
  margin-right: 16px;
  opacity: 1;
    display: flex;
  align-items: center;
}
.hasAvatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.navbar-profile {
  width: 248px;
  color: #222226;
  background: #fff;
  position: absolute;
  min-height: 200px;
  top: 48px;
  left: 50%;
  margin-left: -132px;
  z-index: 9999999;
  border-radius: 4px;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 6%);

}
.navbar-profile .profile-user {
  text-align: center;
  padding: 20px 0 12px 0;
  border-bottom: 1px solid #e8e8ed;
}
.navbar-profile .profile-user .profile-avatar {
  position: absolute;
  width: 48px;
  height: 48px;
  padding: 0px;
  top: -32px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  border-radius: 50%;
  cursor: pointer;
  z-index: 9999;
  border: 1px solid #e8e8ed;
}
.profile-user .profile-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.navbar-profile .profile-user .profile-nickName {
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  font-size: 16px;
  color: #222226;
  font-weight: 500;
  height: 40px;
  line-height: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.navbar-btn {
  position: relative;
  height: 48px;
  line-height: 48px;
  color: inherit;
  text-align: center;
  padding: 0 4px;
}
.navbar-fl {
  float: left;
}
.navbar-avatar {
  display: flex;
  align-items: center;
}
</style>

