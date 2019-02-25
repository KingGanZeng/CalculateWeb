<template>
    <el-container class="manual-loader">
        <el-row class="manual-loader-header">
            <el-col>
                <el-steps :active="0" align-center>
                    <el-step title="步骤1"
                             description="请输入活动定义"></el-step>
                    <el-step title="步骤2"
                             description="请输入构件定义"></el-step>
                    <el-step title="步骤3"
                             description="请输入软件架构"></el-step>
                    <el-step title="步骤4"
                             description="确认输入，等待计算结果"></el-step>
                </el-steps>
            </el-col>
        </el-row>
        <el-row class="manual-loader-container">
            <el-col class="manual-activities border-shadow">
                <div class="title">活动定义</div>
                <div class="example">例如：A=[a,1]</div>
                <div class="input-wrapper"
                    is="activity-form"
                    :activities="activities">
                </div>
            </el-col>
            <el-col class="manual-components border-shadow">
                <div class="title">构件定义</div>
                <div class="example">例如：P=A;(B||2C)</div>
                <div class="input-wrapper"
                     is="component-form"
                     :components="components">
                </div>
            </el-col>
            <el-col class="manual-architecture border-shadow">
                <div class="title">软件架构</div>
                <div class="example">例如：P||2Q#3W</div>
                <div class="input-wrapper">
                    <el-form class="input-item"
                             ref="form"
                             :model="architecture"
                             size="mini">
                        <el-form-item>
                            <el-col :span="8">
                                <el-input v-model="architecture.calculate"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary"
                               size="small"
                               round
                               @click="onSubmit">提交</el-button>
                </div>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
import ActivityForm from './common/ActivityForm';
import ComponentForm from './common/ComponentForm';

export default {
  name: 'ManualLoader',
  components: {
    'activity-form': ActivityForm,
    'component-form': ComponentForm,
  },
  data() {
    return {
      activities: {
        list: [{
          labelName: '活动1',
          indexNum: 1,
          activityName: 'A',
          atomName: 'a',
          number: 1,
        }],
      },
      components: {
        list: [{
          labelName: '构件1',
          indexNum: 1,
          componentName: 'P',
          componentCal: 'A;(B||2C)',
        }],
      },
      architecture: {
        calculate: '',
      },
    };
  },
  methods: {
    onSubmit() {
      console.log('活动', this.activities);
      console.log('构件', this.components);
      console.log('架构', this.architecture);
    },
  },
};
</script>

<style scoped lang="less">
    .manual-loader {
        position: relative;
    }

    .manual-loader-header {
        width: 100%;
        position: absolute;
        top: 0;
    }

    .manual-loader-container {
        width: 100%;
        position: absolute;
        top: 80px;
    }

    .manual-activities {
        padding: 15px;
        margin-bottom: 18px;
    }

    .manual-components {
        padding: 15px;
        margin-bottom: 18px;
    }

    .manual-architecture {
        padding: 15px;
        margin-bottom: 18px;
    }

    .title {
        padding-bottom: 10px;
        border-bottom: 1px solid #E3E3E3;
        font-weight: bold;
    }
    .example {
        margin: 10px 0 18px;
        color: #999999;
        font-size: 14px;
    }

    .input-wrapper {
        .line {
            text-align: center;
            white-space: pre-wrap;
        }
    }
</style>
