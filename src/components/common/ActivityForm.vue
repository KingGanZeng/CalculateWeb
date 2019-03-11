<template>
    <div>
        <el-form class="input-item"
                 ref="form"
                 :model="activities"
                 size="medium">
            <el-form-item :label='formatLabelName(item.labelName)'
                          inline
                          v-for="item in activities.list"
                          class="form-wrapper"
                          :key="item.indexNum">
                <el-col :span="8">
                    <el-col :span="5">
                        <el-input v-model="item.activityName"
                            placeholder="A"
                            maxlength="1"></el-input>
                    </el-col>
                    <el-col class="line" :span="3">=  [</el-col>
                    <el-col :span="5">
                        <el-input v-model="item.atomName"
                            placeholder="a"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">,</el-col>
                    <el-col :span="5">
                        <el-input v-model="item.number"
                            placeholder="1"
                            maxlength="1"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">]</el-col>
                </el-col>
            </el-form-item>
        </el-form>
        <div class="plus-and-remove-button">
            <i class="el-icon-circle-plus-outline el-icon-padding"
                @click="addActivity"></i>
            <i class="el-icon-remove-outline el-icon-padding"
                @click="removeActivity"></i>
        </div>
        <el-button type="primary"
                   size="medium"
                   round
                   @click="activitiesSubmit"
        >
            {{this.$t('localization.type') === 'English' ? 'Next' : '下一步'}}
        </el-button>
        <el-button
                size="medium"
                round
                @click="resetActivities"
                icon="el-icon-refresh"
        >
            {{this.$t('localization.type') === 'English' ? 'Reset' : '重置'}}
        </el-button>
    </div>
</template>

<script>
export default {
  name: 'ActivityForm',
  props: {
    activities: {
      type: Object,
    },
  },
  methods: {
    /**
     * 用于切换中英文
     */
    formatLabelName(labelName) {
      return this.$t('localization.type') === 'English' ? `activity ${labelName}` : `活动 ${labelName}`;
    },
    /**
     * 更新步骤数
     */
    activitiesSubmit() {
      this.$emit('changeInputComplete', 1);
    },
    /**
     * 添加活动
     */
    addActivity() {
      const index = this.activities.list.length + 1;
      this.activities.list.push({
        labelName: index,
        indexNum: index,
        activityName: '',
        atomName: '',
      });
    },
    /**
     * 删除最后一个活动
     */
    removeActivity() {
      this.activities.list.pop();
    },
    /**
     * 重置表单
     */
    resetActivities() {
      this.activities = {
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
      };
    },
  },
};
</script>

<style scoped lang="less">
    .plus-and-remove-button {
        margin-bottom: 18px;
        text-align: left;
        &:hover {
            cursor: pointer;
        }
        i {
            font-size: 20px;
            transition-property: color;
            transition-duration: .3s;
            transition-timing-function: ease-out;
            &:nth-child(2n+1):hover {
                color: #0aa8f4;
            }
            &:nth-child(2n):hover {
                color: #F56C6C;
            }
        }
    }

    .line {
        text-align: center;
        white-space: pre-wrap;
    }

    .el-icon-padding {
        padding: 10px;
    }
</style>
