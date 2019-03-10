<template>
  <el-row class="index">
    <el-col :span="this.$t('localization.type')==='English'? 12 : 8" class="index-title">
      {{this.$t('localization.indexTitle')}}
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Index',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .index-title {
      border: 1px solid #999999;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      padding: 20px 20px 30px;
      margin-top: 10px;
      position: relative;
      white-space: pre-line;
      transition: ease-in-out .3s;
      &:before {
        position: absolute;
        top: -20px;
        background-color: #ffffff;
        content: 'Welcome';
        font-size: 28px;
        padding: 0 5px;
    }
  }
</style>
