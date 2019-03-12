<template>
    <el-container class="manual-loader">
        <el-row class="manual-loader-header">
            <el-col>
                <el-steps :active="inputComplete" align-center>
                    <el-step :title="this.$t('localization.type')==='English'? 'Step 1' : '步骤1'"
                             :description="this.$t('localization.stepDes.stepOne')"></el-step>
                    <el-step :title="this.$t('localization.type')==='English'? 'Step 2' : '步骤2'"
                             :description="this.$t('localization.stepDes.stepTwo')"></el-step>
                    <el-step :title="this.$t('localization.type')==='English'? 'Step 3' : '步骤3'"
                             :description="this.$t('localization.stepDes.stepThree')"></el-step>
                    <el-step :title="this.$t('localization.type')==='English'? 'Step 4' : '步骤4'"
                             :description="this.$t('localization.stepDes.stepFour')"></el-step>
                </el-steps>
            </el-col>
        </el-row>
        <el-row class="manual-loader-container">
            <el-col class="manual-activities border-shadow">
                <div class="title">{{this.$t('localization.activityDefine')}}</div>
                <div class="example">{{this.$t('localization.type')
                  ==='English'? 'e.g. ' : '例如：'}} A=[a,1]
                </div>
                <div class="input-wrapper"
                    is="activity-form"
                    :activities="activities"
                    @changeInputComplete="changeInputComplete">
                </div>
            </el-col>
            <el-col class="manual-components border-shadow">
                <div class="title">{{this.$t('localization.componentDefine')}}</div>
                <div class="example">{{this.$t('localization.type')
                  ==='English'? 'e.g. ' : '例如：'}} P=A;(B||2C)
                </div>
                <div class="input-wrapper"
                     is="component-form"
                     :components="components"
                     @changeInputComplete="changeInputComplete">
                </div>
            </el-col>
            <el-col class="manual-architecture border-shadow">
                <div class="title">{{this.$t('localization.systemArchitect')}}</div>
                <div class="example">{{this.$t('localization.type')
                  ==='English'? 'e.g. ' : '例如：'}} P||2Q#3W
                </div>
                <div class="input-wrapper">
                    <el-form class="input-item"
                             ref="form"
                             :model="architecture"
                             size="medium">
                        <el-form-item prop="calculate"
                            :rules="this.$t('localization.type') ==='English' ?
                            requiredRules : requiredRulesChinese">
                            <el-col :span="8">
                                <el-input v-model="architecture.calculate" clearable></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"
                                size="medium"
                                round
                                @click="onSubmit"
                                 :loading="isSubmitting"
                            >
                                {{this.$t('localization.type') ==='English' ? 'Submit' : '提交'}}
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col class="manual-result border-shadow">
                <div class="title">{{this.$t('localization.result')}}</div>
                <div class="result">
                    <el-table
                    :data="result"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                        <el-table-column
                            type="index"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            :label="this.$t('localization.trace')">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    <el-tag class="tag-font"
                                            color="#ffffff"
                                            :class="scope.row.split('=')[1].trim() === '-1.0' ?
                                             redFont : ''"
                                    >{{
                                        scope.row.split('=')[0].trim()
                                    }}</el-tag>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                :label="this.$t('localization.value')">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    <div :class="scope.row.split('=')[1].trim() === '-1.0' ?
                                     redFont : ''">{{
                                        scope.row.split('=')[1].trim() === '-1.0' ?
                                        'Deadlock' : scope.row.split('=')[1].trim()
                                    }}</div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="average" v-if="confirmAverage">
                    {{this.$t('localization.type') === 'English' ?
                    'Calculate the average?' : '是否计算平均值？'}}
                    <span style="display: inline-block;margin-left: 10px;" >
                        <el-button
                            size="small"
                            round
                            @click="calculateAverage">
                            {{this.$t('localization.type') === 'English' ? 'Yes' : '是'}}
                        </el-button>
                        <el-button
                            type="info"
                            size="small"
                            round
                            @click="denyAverage">
                            {{this.$t('localization.type') === 'English' ? 'No' : '否'}}
                        </el-button>
                    </span>
                </div>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
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
      inputComplete: 0, // 当前完成步骤数
      activities: {
        list: [{
          labelName: '1',
          indexNum: 1,
          activityName: 'A',
          atomName: 'a',
          number: 1,
        }, {
          labelName: '2',
          indexNum: 2,
          activityName: 'B',
          atomName: 'b',
          number: 1,
        }],
      },
      components: {
        list: [{
          labelName: '1',
          indexNum: 1,
          componentName: 'P',
          componentCal: 'A;B',
        }, {
          labelName: '2',
          indexNum: 2,
          componentName: 'Q',
          componentCal: 'B;A',
        }],
      },
      architecture: {
        calculate: 'P||1Q',
      },
      requiredRules: {
        required: true,
        message: 'Please input system architecture',
        trigger: 'blur',
      },
      requiredRulesChinese: {
        required: true,
        message: '请输入活动名称',
        trigger: 'blur',
      },
      isSubmitting: false, // 提交状态
      result: [], // 最终结果
      average: 0, // 平均值
      confirmAverage: true,
      redFont: 'red-font',
    };
  },
  methods: {
    /**
     * 提交表单
     */
    onSubmit() {
      this.inputComplete = 3;
      this.isSubmitting = true;
      // 数据重置
      this.result = [];
      this.average = 0;
      this.confirmAverage = true;
      let code = '';
      if (this.activities.list.length < 1
        || this.architecture.calculate < 1) {
        this.$message({
          message: this.$t('localization.type') === 'English' ?
            'Please confirm that the activities and schema definition are not empty!' :
            '警告，请确认活动及架构定义不为空',
          type: 'warning',
        });
        this.isSubmitting = false;
        return;
      }
      this.activities.list.forEach((item, index) => {
        const activityCal = `${item.activityName}=[${item.atomName},${item.number}]`;
        if (index === 0) {
          code = `${activityCal}`;
        } else {
          code = `${code}\n${activityCal}`;
        }
      });
      this.components.list.forEach((item) => {
        const componentCal = `${item.componentName}=${item.componentCal}`;
        code = `${code}\n${componentCal}`;
      });
      code = `${code}\n${this.architecture.calculate}\n`;
      this.getResult(code);
    },
    /**
     * 数据上传，获取结果
     */
    getResult(inputCode) {
      axios
        .post('Servlet', qs.stringify({
          code: inputCode,
        }))
        .then((response) => {
          this.result = response.data.data.result;
          this.average = response.data.data.average;
          this.inputComplete = 4;
          this.isSubmitting = false;
          console.log('结果', this.result);
        })
        .catch((response) => {
          this.$message.error(this.$t('localization.type') === 'English' ?
            'Calculation error, please confirm that the input is correct.' :
            '计算出错，请确认输入是否正确');
          this.isSubmitting = false;
          console.log(response);
        });
    },
    /**
     * 死锁行高亮处理
     */
    tableRowClassName({ row }) {
      if (row.split('=')[1].trim() === '-1.0') {
        return 'error-row';
      }
      return '';
    },
    /**
     * 修改步骤数
     * @param num
     */
    changeInputComplete(num) {
      this.inputComplete = num;
    },
    /**
     * 计算平均值（展示）
     */
    calculateAverage() {
      const average = `average = ${this.average}`;
      this.result.push(average);
      this.confirmAverage = false;
    },
    /**
     * 不展示平均值
     */
    denyAverage() {
      this.confirmAverage = false;
    },
  },
};
</script>

<style scoped lang="less">
    .manual-loader {
        position: relative;
        height: 100%;
    }

    .manual-loader-header {
        width: 100%;
        position: absolute;
        top: 0;
    }

    /*输入面板固定*/
    .manual-loader-container {
        width: 100%;
        position: absolute;
        top: 120px;
        bottom: 0;
        overflow: auto;
        padding: 1px 15px 1px 1px;
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

    .manual-result {
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
        white-space: pre-line;
    }

    .average {
      margin-top: 18px;
      font-size: 14px;
    }

    .input-wrapper {
        .line {
            text-align: center;
            white-space: pre-wrap;
        }
    }

    .error-row {
        background: #F56C6C!important;
    }

    .tag-font {
      color: #333333;
      font-size: 16px;
      font-weight: bold;
      &.red-font {
        color: #F56C6C;
      }
    }

    .name-wrapper {
      font-size: 16px;
      font-weight: bold;
      .red-font {
        color: #F56C6C;
      }
    }
</style>
