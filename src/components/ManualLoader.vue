<template>
    <el-container class="manual-loader">
        <el-row class="manual-loader-header">
            <el-col>
                <el-steps :active="inputComplete" align-center>
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
                    :activities="activities"
                    @changeInputComplete="changeInputComplete">
                </div>
            </el-col>
            <el-col class="manual-components border-shadow">
                <div class="title">构件定义</div>
                <div class="example">例如：P=A;(B||2C)</div>
                <div class="input-wrapper"
                     is="component-form"
                     :components="components"
                     @changeInputComplete="changeInputComplete">
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
                        <el-form-item prop="calculate"
                            :rules="{
                                required: true, message: '请输入软件架构', trigger: 'blur'
                            }">
                            <el-col :span="8">
                                <el-input v-model="architecture.calculate" clearable></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"
                                size="small"
                                round
                                @click="onSubmit"
                                 :loading="isSubmitting">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col class="manual-result border-shadow">
                <div class="title">结果输出</div>
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
                            label="路径">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{
                                        scope.row.split('=')[0].trim()
                                    }}</el-tag>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="结果">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    <div>{{
                                        scope.row.split('=')[1].trim() === '-1.0' ?
                                        '死锁' : scope.row.split('=')[1].trim()
                                    }}</div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="average" v-if="confirmAverage">
                    是否计算平均值?
                    <span style="display: inline-block;margin-left: 10px;" >
                        <el-button
                            type="primary"
                            size="mini"
                            round
                            @click="calculateAverage">是</el-button>
                        <el-button
                            type="info"
                            size="mini"
                            round
                            @click="denyAverage">否</el-button>
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
          labelName: '活动1',
          indexNum: 1,
          activityName: 'A',
          atomName: 'a',
          number: 1,
        }, {
          labelName: '活动2',
          indexNum: 2,
          activityName: 'B',
          atomName: 'b',
          number: 1,
        }],
      },
      components: {
        list: [{
          labelName: '构件1',
          indexNum: 1,
          componentName: 'P',
          componentCal: 'A;B',
        }, {
          labelName: '构件2',
          indexNum: 2,
          componentName: 'Q',
          componentCal: 'B;A',
        }],
      },
      architecture: {
        calculate: 'P||1Q',
      },
      isSubmitting: false, // 提交状态
      result: [], // 最终结果
      average: 0, // 平均值
      confirmAverage: true,
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
          message: '警告，请确认活动及架构定义不为空',
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
        .post('http://localhost:8080/javaWeb/Servlet', qs.stringify({
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
          this.$message.error('计算出错，请确认输入是否正确');
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
    calculateAverage() {
      const average = `average = ${this.average}`;
      this.result.push(average);
      this.confirmAverage = false;
    },
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
</style>
