<template>
  <el-row class="index">
    <el-col :span="8" class="index-title">
      本工具主要基于认知复杂度，按软件活动为单位进行复杂度计算<br>
      提供两种输入方式：手动输入和文件输入
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .index-title {
    border: 2px solid #999999;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 40px 20px;
    margin-top: 10px;
    position: relative;
    &:before {
      position: absolute;
      top: -20px;
      background-color: #ffffff;
      content: '欢迎使用本工具';
      font-size: 28px;
      padding: 0 5px;
    }
  }
</style>
