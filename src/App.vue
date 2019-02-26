<template>
  <el-container>
    <el-header>
      <span style="font-size: 18px;">{{translateName.headerName}}</span>
      <!--<span style="float: right;">-->
        <!--<a href="#" @click="changeLanguage">中文</a>/-->
        <!--<a href="#" @click="changeLanguage">English</a>-->
      <!--</span>-->
    </el-header>
    <el-container>
      <el-aside>
        <div class="more-button-wrapper" @click="changeCollapse">
          <i class="el-icon-more" :style="beActive"></i>
        </div>
        <el-menu default-active="this.$router.path"
                 router
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 :collapse="isCollapse"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item index="/">
            <i class="icon-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">工具使用</span>
            </template>
            <el-menu-item-group>
              <span slot="title">选择输入方式</span>
              <el-menu-item index="fileLoader" disabled>文件导入</el-menu-item>
              <el-menu-item index="manualLoader">手动输入</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/introduction">
            <i class="icon-file-text2"></i>
            <span slot="title">使用说明</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/index';

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

export default {
  name: 'App',
  router,
  data() {
    return {
      translateName: {
        headerName: '软件构件复杂度计算工具',
        navName: ['工具说明', '运行计算'],
      },
      isCollapse: true,
      beActive: '',
    };
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
      this.beActive = this.isCollapse ? '' : 'color:#ffd04b';
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeLanguage() {
      const Chinese = {
        English: 'Software component complexity calculation tool',
        navName: ['Tool description', 'Run Program'],
      };
      const English = {
        headerName: '软件构件复杂度计算工具',
        navName: ['工具说明', '运行计算'],
      };
      console.log(Chinese, English);
    },
  },
};
</script>

<style lang="less">
  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0;
    height: 100vh;
  }
  body > .el-container {
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: #545c64;
    color: #fff;
  }

  .el-header {
    height: 45px!important;
    line-height: 45px;
  }

  .el-aside {
    width: auto!important;
    background-color: #545c64;
    color: #909399;
    display: block;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .el-main {
    background-color: #fff;
    color: #333;
  }

  .el-menu {
    border: none;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .more-button-wrapper{
    text-align: center;
    border-top: 1px solid #909399;
    border-bottom: 1px solid #909399;
    padding: 20px 0;
    &:hover {
      cursor: pointer;
    }
  }
</style>
