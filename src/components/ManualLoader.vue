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
                <div class="example">例如：A=[a,3]</div>
                <div class="input-wrapper">
                    <el-form class="input-item"
                             ref="form"
                             :model="activities"
                             size="mini">
                        <el-form-item is="activity-form-item"
                                      :indexNum="item.indexNum"
                                      v-for="item in activities.list"
                                      :key="item.indexNum">
                        </el-form-item>
                    </el-form>
                    <div class="plus-button">
                        <i class="el-icon-circle-plus-outline" @click="addActivity"></i>
                    </div>
                    <el-button type="primary" @click="activitiesSubmit">下一步</el-button>
                    <el-button>重置</el-button>
                </div>
            </el-col>
            <el-col class="manual-components border-shadow">
                <div class="title">构件定义</div>
                <div class="example">例如：P=A;(B||2C)</div>
                <div class="input-wrapper">
                    <el-form class="input-item"
                             ref="form"
                             :model="activities"
                             size="mini">
                        <el-form-item is="component-form-item"
                                      :indexNum="item.indexNum"
                                      v-for="item in components.list"
                                      :key="item.indexNum">
                        </el-form-item>
                    </el-form>
                    <div class="plus-button">
                        <i class="el-icon-circle-plus-outline" @click="addComponent"></i>
                    </div>
                    <el-button type="primary" @click="componentsSubmit">下一步</el-button>
                    <el-button>重置</el-button>
                </div>
            </el-col>
            <el-col class="manual-architecture">
                <div class="title">软件架构</div>
                <div class="input-wrapper"></div>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
import ActivityFormItem from './common/ActivityFormItem';
import ComponentFormItem from './common/ComponentFormItem';

export default {
  name: 'ManualLoader',
  components: {
    'activity-form-item': ActivityFormItem,
    'component-form-item': ComponentFormItem,
  },
  data() {
    return {
      activities: {
        list: [{
          indexNum: 1,
          activityName: 'A',
          atomName: 'a',
          number: 1,
        }],
      },
      components: {
        list: [{
          indexNum: 1,
          componentName: 'A',
          componentCal: 'A',
        }],
      },
    };
  },
  methods: {
    activitiesSubmit() {
      console.log(this.activities);
    },
    componentsSubmit() {
      console.log(this.components);
    },
    addActivity() {
      this.activities.list.push({
        indexNum: this.activities.list.length + 1,
        activityName: 'A',
        atomName: 'a',
        number: 1,
      });
    },
    addComponent() {
      this.components.list.push({
        indexNum: this.components.list.length + 1,
        componentName: 'A',
        componentCal: 'A',
      });
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

    .plus-button {
        width: 60px;
        margin-bottom: 18px;
        text-align: center;
        &:hover {
            cursor: pointer;
        }
        i {
            font-size: 18px;
            transition-property: color;
            transition-duration: .3s;
            transition-timing-function: ease-out;
            &:hover {

                color: #0aa8f4;
            }
        }
    }

    .input-wrapper {
        .line {
            text-align: center;
            white-space: pre-wrap;
        }
    }
</style>
