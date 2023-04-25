<template>
  <div class="write-content-box">
    <div class="write-content">
      <div class="navbar">
        <div class="navbar-logo" @click="goBack">返回</div>
        <div class="navbar-input">
          <el-input
            class="title-input"
            placeholder="【无标题】"
            v-model="title"
            size="small"
            round
          />
        </div>
        <div class="navbar-btns">
          <el-button
            type="success"
            class="navbar-btn"
            round
            @click="showEditDialog = true"
            >发布</el-button
          >
        </div>
      </div>

      <el-dialog title="发布帖子" :visible.sync="showEditDialog">
        <el-form
          ref="editForm"
          :model="editForm"
          :rules="editRules"
          label-width="80px"
        >
          <el-form-item label="帖子分类" prop="category">
            <el-radio-group v-model="editForm.category">
              <el-radio label="0">动漫</el-radio>
              <el-radio label="1">漫画</el-radio>
              <el-radio label="2">游戏</el-radio>
              <el-radio label="3">小说</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="添加封面" prop="cover">
            <el-upload
              :action="uploadUrl"
              list-type="picture-card"
              :limit="1"
              :on-exceed="handleExceed"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>

        </el-form>
        <div slot="footer">
          <el-button @click="showEditDialog = false">取消</el-button>
          <el-button type="primary" @click="addPost">发布</el-button>
        </div>
      </el-dialog>
      <quill-editor
        style="height: 100vh"
        ref="myTextEditor"
        v-bind:options="editorOption"
        v-model="content"
        @change="onEditorChange($event)"
      >
      </quill-editor>
    </div>
  </div>
</template>
 
<script>
// 设置基本的编辑框
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { Quill } from "vue-quill-editor";
// 设置调整图片大小
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);
// 设置拖拽
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);

import api from "@/api/request";

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      postId: 0,
      title: "",
      content: "",
      editorOption: null,
      Tlength: 0,
      showEditDialog: false,
      editForm: {
        nickname: "",
        category: "0",
        cover: "",
        city: "",
      },
      uploadUrl: "api/eduoss/fileoss",
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      editRules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        category: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { type: "number", message: "年龄必须为数字值", trigger: "blur" },
          { min: 0, max: 150, message: "年龄必须在0-150之间", trigger: "blur" },
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
      },
    };
  },
  methods: {
    goBack() {
      history.back();
      // this.$router.push({ path: "/home" });
    },
    handleSuccess(res, file) {
      this.imageUrl = res.data;
      console.log(this.imageUrl);
      this.$message.success("上传成功");
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log("this.dialogImageUrl" + this.dialogImageUrl);
      this.dialogVisible = true;
    },
    addPost() {
      let userId = localStorage.getItem("userId");
      api
        .addPost(
          this.postId,
          this.title,
          this.editForm.category,
          userId,
          this.content,
          this.imageUrl
        )
        .then((response) => {
          this.$message.success("发布成功");
          // setTimeout(() => {
          this.goBack();
          // this.$router.push("/");
          // }, 300);
          // this.$ls.set('token', token);
        })
        .catch((error) => {});
    },
    getWritePost(postId) {
      api
        .getWritePost(postId)
        .then((response) => {
          console.log(response.data);
          this.title = response.data.title;
          this.content = response.data.content;
          this.editForm.category = response.data.categoryId + "";
          this.editForm.cover = response.data.cover;
          console.log(this.editForm.category);
          console.log(this.editForm.cover);
        })
        .catch((error) => {});
    },
    //超出限制
    handleExceed() {},
    onEditorChange($event) {},
    init() {
      let quill = this.$refs.myTextEditor.quill;

      window.addEventListener(
        "paste",
        (evt) => {
          if (
            evt.clipboardData &&
            evt.clipboardData.files &&
            evt.clipboardData.files.length
          ) {
            evt.preventDefault();
            [].forEach.call(evt.clipboardData.files, (file) => {
              if (!file.type.match(/^image\/(gif|jpe?g|a?png|bmp)/i)) {
                return;
              }
              const formData = new FormData();
              formData.append("file", file);
              console.log(formData);
              this.$axios.post(this.uploadUrl, formData).then((res) => {
                if (res.data.code == 200) {
                  let length = quill.getSelection().index; //光标位置
                  console.log("length:" + length);
                  // 插入图片地址
                  quill.insertEmbed(length, "image", res.data.data);
                  // 光标后移一位
                  quill.setSelection(length + 1);
                } else {
                }
              });
            });
          }
        },
        false
      );
    },
  },
  created: function () {
    console.log(JSON.parse(decodeURIComponent(this.$route.query.post)));
    var post = JSON.parse(decodeURIComponent(this.$route.query.post));
    this.postId = post.id;
    console.log("postId:" + this.postId);
    if (this.postId > 0) {
      this.getWritePost(this.postId);
    }
    // this.content = post.content;
    // 工具栏配置
    const toolbarOption = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      //   [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      //   [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["image"],
      //   ["video"]
    ];

    this.editorOption = {
      theme: "snow",
      placeholder: "请输入正文",
      modules: {
        // 设置拖拽
        imageDrop: true,

        //设置图片大小, 也可以使用"imageResize:true"，官网上采用的是下面的配置方式
        imageResize: {
          displayStyles: {
            backgroundColor: "black",
            border: "none",
            color: "white",
          },
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },

        toolbar: {
          container: toolbarOption,
        },
      },
    };
  },
  mounted() {
    this.init();
  },
};
</script>
 
<style scope>
.write-content-box {
  display: flex; /* 将div设置为flex容器 */
  justify-content: center; /* 将子元素水平居中 */
  /* background: rgba(255, 255, 255, 0.75); */
}
.write-content {
  background-color: white;
  width: 900px;

  /* background: rgba(255, 255, 255, 0.75); */
}
.navbar {
  background-color: #f0f2f5;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-logo {
  display: block;
  width: 88px;
  height: 25px;
  line-height: 25px;
  /* font-size: 20px;
  font-weight: bold;
  margin-left: 20px; */
  cursor: pointer;
}

.navbar-input {
  flex-grow: 1;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-btns {
  display: flex;
  margin-right: 20px;
}

.navbar-btn {
  /* display: block; */

  /* height: 20px; */
  /* line-height: -20px; */
  font-size: 14px;
  text-align: center;

  padding: 0 10px;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

/* .el-input >>> .el-input__inner { */
/* .el-input.el-input__inner { */
.title-input .el-input__inner {
  display: block;
  height: 32px;
  /* width: 25vw; */
  /* flex: 9; */
  border: none;
  outline: none;
  border-radius: calc(0.5 * 32px);
  padding-left: 10px;
}

/* 上传 */
/* .avatar-uploader .el-upload {
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
} */
</style>
