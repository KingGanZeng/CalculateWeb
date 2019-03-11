<template>
    <el-container class="file-loader">
        <el-row class="file-loader-header">
            <el-col>
                <el-steps :active="inputComplete" align-center>
                    <el-step :title="this.$t('localization.type')==='English'? 'Step 1' : '步骤1'"
                             :description="this.$t('localization.stepFileDes.stepOne')"
                    ></el-step>
                    <el-step :title="this.$t('localization.type')==='English'? 'Step 2' : '步骤2'"
                             :description="this.$t('localization.stepFileDes.stepTwo')"
                    ></el-step>
                    <el-step :title="this.$t('localization.type')==='English'? 'Step 3' : '步骤3'"
                             :description="this.$t('localization.stepFileDes.stepThree')"
                    ></el-step>
                    <el-step :title="this.$t('localization.type')==='English'? 'Step 4' : '步骤4'"
                             :description="this.$t('localization.stepFileDes.stepFour')"
                    ></el-step>
                </el-steps>
            </el-col>
        </el-row>
        <el-row class="file-loader-container">
            <el-col class="file-upload">
                <div style="width: 400px; margin: auto;">
                    <el-upload
                            class="upload-demo"
                            action="/"
                            drag
                            :auto-upload="false"
                            multiple
                            :on-change="handleChange"
                            :before-remove="beforeRemove"
                            v-loading="loading"
                            :file-list="fileList">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            {{this.$t('localization.type') === 'English' ?
                            'Drag files here, or' :
                            '将文件拖到此处，或'}}
                            <em>{{this.$t('localization.type') === 'English' ?
                                'click to select' :
                                '点击选择'}}</em>
                        </div>
                        <div class="el-upload__tip" slot="tip">
                            {{this.$t('localization.type') === 'English' ?
                            'Only text files can be uploaded and no more than 1M' :
                            '只能上传文本文件，且不超过1M'}}
                        </div>
                    </el-upload>
                    <div style="display:inline-block; margin-top: 18px;">
                        <el-button type="primary"
                                round
                                size="medium"
                                @click="fileConfirmed">
                            {{this.$t('localization.type') === 'English' ?
                            'Submit' :
                            '上传'}}
                        </el-button>
                    </div>
                </div>
            </el-col>
            <el-col class="code-wrapper"
                    v-if="fileUploadComplete"
                    v-loading="isSubmitting">
                <div class="border-shadow" style="width: 65%; margin: 0 auto 18px;">
                    <codemirror v-model="code"
                                :options="cmOption"></codemirror>
                </div>
                <div style="text-align: center;">
                    <el-button round
                            type="primary"
                            size="medium"
                            @click="uploadConfirmed">
                        {{this.$t('localization.type') === 'English' ?
                        'Confirm' :
                        '确认'}}
                    </el-button>
                </div>
            </el-col>
            <el-col class="file-result border-shadow" v-if="result.length > 0">
                <div class="title">
                    {{this.$t('localization.result')}}
                </div>
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
                                label="this.$t('localization.trace')"
                        >
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{
                                        scope.row.split('=')[0].trim()
                                        }}</el-tag>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                :label="this.$t('localization.value')"
                        >
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    <div>{{
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
import { codemirror } from 'vue-codemirror-lite';

require('codemirror/mode/python/python');
require('codemirror/mode/vue/vue');
require('codemirror/addon/selection/active-line.js');
require('codemirror/addon/edit/closebrackets.js');
require('codemirror/mode/clike/clike.js');
require('codemirror/addon/edit/matchbrackets.js');
require('codemirror/addon/comment/comment.js');
require('codemirror/addon/dialog/dialog.js');
require('codemirror/addon/dialog/dialog.css');
require('codemirror/addon/search/searchcursor.js');
require('codemirror/addon/search/search.js');
require('codemirror/keymap/emacs.js');

export default {
  name: 'FileLoader',
  components: {
    codemirror,
  },
  data() {
    return {
      inputComplete: 0,
      fileList: [], // 上传文件
      loading: false, // 加载状态
      fileUploadComplete: false, // 上传文件是否成功
      code: '', // 文件内容
      cmOption: { // codemirror配置项
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/x-python',
        theme: 'base16-light',
        keyMap: 'emacs',
      },
      result: [], // 最终结果
      average: 0, // 平均值
      confirmAverage: true,
      isSubmitting: false, // 远端请求状态
    };
  },
  methods: {
    /**
     * 删除前确认
     * @param file
     * @returns {Promise<MessageBoxData> | *}
     */
    beforeRemove(file) {
      return this.$confirm(`${this.$t('localization.confirmDelete')} ${file.name}？`,
        this.$t('localization.confirmTitle'),
        {
          confirmButtonText: this.$t('localization.confirm'),
          cancelButtonText: this.$t('localization.cancel'),
          type: 'warning',
        });
    },
    /**
     * 文件发生变更时，保持只有一个文件
     * @param file
     * @param fileList
     */
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
    },
    /**
     * 文件上传本地确认
     */
    fileConfirmed() {
      this.loading = true;
      this.inputComplete = 1;
      // 数据重置
      this.result = [];
      this.average = 0;
      this.confirmAverage = true;
      if (this.fileList && this.fileList.length > 0) {
        for (let i = 0; i < this.fileList.length; i += 1) {
          const file = this.fileList[i];
          if (!file) {
            this.$message({
              type: 'warning',
              message: '请确认上传文件正确',
            });
            return;
          }
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const document = e.target.result;
              setTimeout(() => {
                this.loading = false;
                this.fileUploadComplete = true;
                this.inputComplete = 2;
              }, 500);
              this.code = document;
            } catch (err) {
              console.log(`文件加载错误${err.message}`);
              this.$message.error(`文件加载错误${err.message}`);
            }
          };
          reader.readAsText(file.raw);
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请先上传文件',
        });
        this.loading = false;
        this.inputComplete = 0;
      }
    },
    /**
     * 文件上传远端确认
     */
    uploadConfirmed() {
      this.inputComplete = 3;
      this.isSubmitting = true;
      axios
        .post('Servlet', qs.stringify({
          code: this.code,
        }))
        .then((response) => {
          this.average = response.data.data.average;
          setTimeout(() => {
            this.result = response.data.data.result;
            this.inputComplete = 4;
            this.isSubmitting = false;
          }, 500);
          console.log('结果', this.result);
        })
        .catch((response) => {
          this.$message.error('计算出错，请确认输入是否正确');
          this.isSubmitting = false;
          console.log(response);
        });
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

<style scoped>
    .file-loader {
        position: relative;
        height: 100%;
    }

    .file-loader-header {
        width: 100%;
        position: absolute;
        top: 0;
    }

    .file-loader-container {
        width: 100%;
        position: absolute;
        top: 120px;
    }

    .file-upload {
        text-align: center;
    }

    .code-wrapper {
        margin-top: 18px;
    }

    .file-result {
        margin: 18px 0;
        padding: 15px;
    }

    .title {
        padding-bottom: 10px;
        border-bottom: 1px solid #E3E3E3;
        font-weight: bold;
    }

    .average {
        margin-top: 18px;
        font-size: 14px;
    }
</style>
