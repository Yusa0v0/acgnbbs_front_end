const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        // 以 “/api” 开头的 代理到 下边的 target 属性 的值 中
        target: 'http://localhost:8000',
        changeOrigin: true, // 是否改变域名
        ws: true,
        pathRewrite: {
        //   // 路径重写（以正则的规则去写）
          "^/api": ""
        }
      }
    }
  },
  // 解决quill富文本编辑器依赖冲突
//   chainWebpack: config => {
//     config.plugin('provide').use(webpack.ProvidePlugin, [{
//         'window.Quill': 'quill/dist/quill.js',
//         'Quill': 'quill/dist/quill.js'
//     }]);
// }


})
