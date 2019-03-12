<template>
  <el-row class="introduction">
    <el-col :span="16"
            class="introduction-title"
            :class="this.$t('localization.type') === 'English' ? 'en' : 'zh-cn'">
      <ul>
        <li class="half-border-bottom" style="padding: 10px 0;">
          <el-row type="flex">
            <el-col :span="5">
              <el-tag class="tag-font"
                      color="#409EFF"
              >{{this.$t('localization.activityDefine')}}</el-tag>
            </el-col>
            <el-col class="des-wrapper"
                    :span="16"
            >{{this.$t('localization.activityDes')}}<i>{{this.$t('localization.noRepeat')}}</i>
            </el-col>
          </el-row>
        </li>
        <li class="half-border-bottom" style="padding: 10px 0;">
          <el-row type="flex">
            <el-col :span="5">
              <el-tag class="tag-font"
                      color="#E6A23C"
              >{{this.$t('localization.componentDefine')}}</el-tag>
            </el-col>
            <el-col class="des-wrapper"
                    :span="16"
            >{{this.$t('localization.componentDes')}}<i>{{this.$t('localization.noRepeat')}}</i>
            </el-col>
          </el-row>
        </li>
        <li style="padding: 10px 0 0;">
          <el-row type="flex">
            <el-col :span="5">
              <el-tag  class="tag-font"
                       color="#F56C6C"
              >{{this.$t('localization.systemArchitect')}}</el-tag>
            </el-col>
            <el-col class="des-wrapper"
                    :span="16"
            >{{this.$t('localization.systemArchitectDes')}}</el-col>
          </el-row>
        </li>
      </ul>
    </el-col>
    <el-col :span="16"
            class="character-title"
            :class="this.$t('localization.type') === 'English' ? 'en' : 'zh-cn'"
    >
      <el-table
              :data="this.$t('localization.type') === 'English' ?
              characterArr : characterArrChinese"
              class="character-wrapper"
      >
        <el-table-column
                width="100px;"
                prop="character"
                :label="this.$t('localization.symbol')">
        </el-table-column>
        <el-table-column
                prop="intro"
                :label="this.$t('localization.desc')">
        </el-table-column>
        <el-table-column
                prop="type"
                :label="this.$t('localization.symbolType')">
        </el-table-column>
        <el-table-column
                :label="this.$t('localization.needParam')">
          <template slot-scope="scope">
            <div slot="reference" class="needParam-wrapper">
              <i v-if="scope.row.needParam === true" class="icon icon-checkmark"></i>
              <i v-if="scope.row.needParam === false" class="icon icon-cross"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column
                prop="example"
                :label="this.$t('localization.example')">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Introduction',
  data() {
    return {
      characterArr: [
        { character: '*', intro: 'For multiplication calculation', type: 'Multiplication', needParam: false, example: 'P=3*A' },
        { character: ';', intro: 'For sequential structure', type: 'Sequential', needParam: false, example: 'P=A;B' },
        { character: '#', intro: 'For Choice structures', type: 'Choice', needParam: true, example: 'P=A#2B' },
        { character: '@', intro: 'For Call structures', type: 'Call', needParam: true, example: 'P=A@2B' },
        { character: '||', intro: 'For Concurrent structure', type: 'Parallel', needParam: true, example: 'P=A||2B' },
      ],
      characterArrChinese: [
        { character: '*', intro: '乘法计算', type: 'Multiplication', needParam: false, example: 'P=3*A' },
        { character: ';', intro: '顺序计算', type: 'Sequential', needParam: false, example: 'P=A;B' },
        { character: '#', intro: '选择计算', type: 'Choice', needParam: true, example: 'P=A#2B' },
        { character: '@', intro: '调用计算', type: 'Call', needParam: true, example: 'P=A@2B' },
        { character: '||', intro: '并发计算', type: 'Parallel', needParam: true, example: 'P=A||2B' },
      ],
    };
  },
};
</script>

<style scoped lang="less">
  .same-title {
    border: 1px solid #999999;
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
      font-size: 28px;
      padding: 0 5px;
    }
  }

  .introduction-title {
    .same-title();
    &.zh-cn:before {
      content: '使用说明';
    }
    &.en:before {
      content: 'Introductions';
    }
    .tag-font {
      color: #ffffff;
      font-size: 14px;
      font-weight: bold;
    }
  }

  .character-title {
    .same-title();
    &.en:before {
      content: 'Symbol';
    }
    &.zh-cn:before {
      content: '符号说明';
    }
  }

  .character-wrapper {
    font-size: 14px;
    font-weight: bold;
  }

  .des-wrapper {
    font-size: 16px;
    line-height: 25px;
    padding-top: 4px;
    white-space: pre-line;
  }
</style>
