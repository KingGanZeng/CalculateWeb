<template>
  <el-row class="introduction">
    <el-col :span="8" class="introduction-title">
      主要符号定义：<br><br>
      ;  为顺序结构，例如P=A;B  (2为参数)<br>
      @  为调用结构，例如P=A@2B  (2为参数)<br>
      || 为同步结构，例如P=A||2B  (2为参数)<br>
      #  为同步结构，例如P=A#2B  (2为参数)<br>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Introduction',
};
</script>

<style scoped lang="less">
  .introduction-title {
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
         content: '使用说明';
         font-size: 28px;
         padding: 0 5px;
   }
  }
</style>
