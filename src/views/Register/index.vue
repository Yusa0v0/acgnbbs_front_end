<template>
  <div class="register-container-box">
    <div class="register-container">
      <div class="logo">
        <!-- <img src="@/assets/logo.png" alt="Logo" /> -->
        <h1>Register</h1>
      </div>
      <Vcode :show="isShow" @success="success" @close="close" />
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="100px"
        class="register-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号/邮箱" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号或邮箱"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            type="password"
            v-model="form.confirmPassword"
            placeholder="请再次输入密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="验证码" prop="bio">
          <el-input
            v-model="form.bio"
            maxlength="4"
            clearable
            placeholder="请输入验证码"
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
          <el-button type="primary" @click="showVcode">注册</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "@/api/request";
import Vcode from "vue-puzzle-vcode";
import validate from "@/utils/validate";
export default {
  components: {
    Vcode,
  },
  data() {
    return {
      form: {
        username: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: "男",
        bio: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        phone: [
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
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (isEqual(value, this.form.password)) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        bio: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      countdown: 0,
      isShow: false, // 验证码模态框是否出现
    };
  },
  computed: {
    countdownText() {
      return this.countdown > 0
        ? `${this.countdown}秒后重新发送`
        : "发送验证码";
    },
  },
  methods: {
    // 用户通过了验证
    success() {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      this.register();
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },
    showVcode() {
      this.isShow = true;
    },
    handleSendCode() {
      if (this.countdown > 0) {
        return;
      }
      if (!this.form.phone) {
        this.$message.error("请输入手机号/邮箱");
        return;
      }
      const username = this.form.phone;
      // 发送验证码逻辑
      api
        .sendCaptcha(username)
        .then((response) => {
          // const token = response.data;
          this.$message.success("发送成功");
        })
        .catch((error) => {
          this.error = error.response.data.message;
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

    // async submitForm() {
    //   try {
    //     await this.$refs.form.validate();
    //     // 校验通过，调用注册接口
    //     await register(this.form);
    //     this.$message.success("注册成功");
    //     // 跳转到登录页
    //     this.$router.push("/login");
    //   } catch (error) {
    //     this.$message.error("注册失败");
    //   }
    // },
    register() {
      let gender = 0;
      if (this.form.gender === "男") {
        gender = 0;
      } else {
        gender = 1;
      }
      api
        .register(
          this.form.username,
          this.form.phone,
          this.form.password,
          this.form.bio,
          gender
        )
        .then((response) => {
          if (response.msg == "注册成功") {
            // alert("密码验证错误");
            this.$message.success("注册成功，即将跳转到登录页面");
            setTimeout(() => {
              this.$router.push("/login");
            }, 1000);
          } else {
            this.$message.error("注册失败");
          }
        })
        .catch((error) => {
          this.error = error.response.data.message;
          // alert("请求异常:" + this.error);
          this.$message.error("请求异常" + this.error);
        });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
<style scoped>
.register-container-box {
  display: flex;
  justify-content: center;
}
.register-container {
  min-height: 95vh;
  width: 900px;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.75);
}
.login-card {
  width: 400px;
  border: 1px solid #ebebeb;
}
.register-form {
  padding: 20px;
}
.el-input {
  width: 350px;
  /* border: 1px solid #dcdfe6; */
  border-radius: 4px;
  /* padding: 6px 12px; */
  font-size: 14px;
  line-height: 1.5;
  /* color: #606266;
  background-color: #f5f7f9; */
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.code-btn {
  podisplay: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
