<template>
  <el-container>
    <el-header>
      <span style="font-size: 18px;">{{ this.$t('localization.title') }}</span>
      <span style="float: right;">
        <el-select
          v-model="value"
          @change="switchLanguage(value)"
          class="el-select"
          size="small"
        >
          <el-option
            v-for="item in language"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>
    </el-header>
    <el-container>
      <el-aside>
        <div class="more-button-wrapper" @click="changeCollapse">
          <i class="icon-indent-increase" :class="beActive"></i>
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
            <span slot="title">{{ this.$t('localization.navBar.mainPage') }}</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="icon-stack"></i>
              <span slot="title">{{ this.$t('localization.navBar.useWay') }}</span>
            </template>
            <el-menu-item-group>
              <span slot="title">{{ this.$t('localization.navBar.chooseWay') }}</span>
              <el-menu-item index="fileLoader">
                <template slot="title">
                  <i class="icon-upload"></i>
                  <span slot="title">{{ this.$t('localization.navBar.fileImport') }}</span>
                </template>
              </el-menu-item>
              <el-menu-item index="manualLoader">
                <template slot="title">
                  <i class="icon-keyboard"></i>
                  <span slot="title">{{ this.$t('localization.navBar.manuallyEnter') }}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/introduction">
            <i class="icon-file-text2"></i>
            <span slot="title">{{ this.$t('localization.navBar.docs') }}</span>
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
      isCollapse: true,
      beActive: [], // 激活class
      value: this.$i18n.locale === 'en' ? 'English' : '简体中文',
      language: [
        { value: 'en', label: 'English' },
        { value: 'zh-CN', label: '简体中文' },
      ],
    };
  },
  methods: {
    /**
     * 侧边栏展开/缩小
     */
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
      this.beActive = this.isCollapse ? [] : ['isActive'];
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    switchLanguage() {
      if (this.value === 'zh-CN') {
        this.$i18n.locale = 'zh-CN';
      } else if (this.value === 'en') {
        this.$i18n.locale = 'en';
      }
      // eslint-disable-next-line
      const _this = this;
      this.$cookie.set('DefaultLanguage', (_this.value), { expires: '30m' });
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
      background-color: rgb(67, 74, 80);
    }
    [class^="icon-"] {
      -webkit-transition: ease .3s;
      -moz-transition: ease .3s;
      -ms-transition: ease .3s;
      -o-transition: ease .3s;
      transition: ease .3s;
    }
    .isActive {
      color: #ffd04b;
      transform: rotate(180deg);
    }
  }
  /*样式覆写*/
  .el-select {
    .el-input__inner {
      background: #545c64;
      color: #ffffff;
    }
  }
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #ffd04b;
  }
  .el-select .el-input__inner:focus {
    border-color: #ffd04b;
  }
  .el-select-dropdown__list {
    background: #545c64;
    .el-select-dropdown__item {
      color: #ffffff;
    }
  }
  .el-select-dropdown__item.selected {
    color: #ffd04b;
  }
  .el-select-dropdown__item.hover {
    background-color: rgb(67, 74, 80);
  }
  .popper__arrow {
    border-bottom-color: #545c64;
  }
  .el-popper[x-placement^=bottom] .popper__arrow::after {
    border-bottom-color: #545c64;
  }
</style>
