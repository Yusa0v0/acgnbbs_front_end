<template>
  <div class="login-container-box">
    <div class="login-container">
      <!-- <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div> -->
      <h1>Login</h1>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            maxlength="20"
            clearable
            placeholder="请输入手机号或邮箱"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="loginType === 1">
          <el-input
            v-model="loginForm.password"
            type="password"
            maxlength="20"
            clearable
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="code" v-if="loginType === 2">
          
            <el-input
              v-model="loginForm.code"
              maxlength="4"
              clearable
              placeholder="请输入验证码"
              prefix-icon="el-icon-lock"
            />
            <el-button
              class="code-btn"
              :disabled="countdown > 0"
              @click="handleSendCode"
            >
              {{ countdown > 0 ? `${countdown}s` : "发送验证码" }}
            </el-button>
        </el-form-item>
        <el-form-item>
          <div class="login-content">
            <el-radio-group v-model="loginType">
              <el-radio :label="1">密码登录</el-radio>
              <el-radio :label="2">验证码登录</el-radio>
            </el-radio-group>
            <el-button type="primary" @click="login">登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "@/api/request";
import validate from "@/utils/validate";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      loginType: 1,
      countdown: 0,
      loginRules: {
        username: [
          { required: true, message: "请输入手机号或邮箱", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!validate.isPhoneOrEmail(value)) {
                callback(new Error("请输入正确的手机号或者邮箱"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!validate.isPassword(value)) {
                callback(
                  new Error(
                    "密码长度在 6 到 20 个字符，支持字母、数字及特殊字符"
                  )
                );
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      if (this.loginType === 1) {
        api
          .login(this.loginForm.username, this.loginForm.password)
          .then((response) => {
            if (response.msg == "登录失败") {
              // alert("密码验证错误");
              this.$message.error("登录失败");
            } else {
              const token = response.data.token;
              const userId = response.data.userId;
              const avatar = response.data.avatar;
              // 设置token
              localStorage.setItem("token", token);
              // 设置登录状态
              localStorage.setItem("logined", true);
              this.$store.state.logined = localStorage.getItem("logined");
              // 设置userId
              localStorage.setItem("userId", userId);
              // 设置avatar
              localStorage.setItem("avatar", avatar);
              // alert("登录成功");
              this.$message.success("登录成功，即将跳转到首页");
              // setTimeout(() => {
                this.$router.push("/");
              // }, 1000);
              // this.$ls.set('token', token);
            }
          })
          .catch((error) => {
            this.error = error.response.data.message;
            // alert("请求异常:" + this.error);
            this.$message.error("请求异常" + this.error);
          });
      } else if (this.loginType === 2) {
        api
          .loginByCaptcha(this.loginForm.username, this.loginForm.code)
          .then((response) => {
            if (response.msg == "登录失败") {
              // alert("验证码错误");
              this.$message.error("验证码错误");
            } else {
              const token = response.data.token;
              const userId = response.data.userId;
              const avatar = response.data.avatar;

              // 设置token
              localStorage.setItem("token", token);
              // 设置登录状态
              localStorage.setItem("logined", true);
              this.$store.state.logined = localStorage.getItem("logined");
              // 设置userId
              localStorage.setItem("userId", userId);
              // 设置avatar
              localStorage.setItem("avatar", avatar);
              // alert("登录成功");
              this.$message.success("登录成功，即将跳转到首页");

              // this.$ls.set('token', token);
              setTimeout(() => {
                this.$router.push("/");
              }, 3000);
            }
          })
          .catch((error) => {
            this.error = error.response.data.message;
            // alert("请求异常:" + this.error);
            this.$message.error("请求异常" + this.error);
          });
      }
    },
    handleSendCode() {
      if (this.countdown > 0) {
        return;
      }
      if (!this.loginForm.username) {
        this.$message.error("请输入手机号/邮箱");
        return;
      }
      const username = this.loginForm.username;
      // 发送验证码逻辑
      api
        .sendCaptcha(username)
        .then((response) => {
          // const token = response.data;
          // alert("发送成功");
          this.$message.success("验证码发送成功");
        })
        .catch((error) => {
          this.error = error.response.data.message;
          // alert("请求异常:" + this.error);
          this.$message.error("请求异常" + this.error);
        });
      this.countdown = 60;
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.login-container-box {
  display: flex;
  justify-content: center;
}
.login-container {
  min-height: 95vh;
  width: 800px;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.75);
}

.login-form {
  padding: 20px;
}

.el-input {
  width: 350px;
  /* border: 1px solid #dcdfe6; */
  border-radius: 4px;
  /* padding: 6px 12px; */
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
  background-color: #f5f7f9;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  font-size: 28px;
}
.el-input:focus {
  width: 248px;
  border-color: #409eff;
  outline: 0;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}
.el-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.login-content {
  display: flex;
  flex-direction: column;
}

</style>