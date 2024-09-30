const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  // 设置请求错误 -- 不要全屏显示提示
  devServer: {
    client: {
      overlay: false
    }
  }

})
