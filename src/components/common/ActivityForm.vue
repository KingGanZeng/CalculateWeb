<template>
    <div>
        <el-form class="input-item"
                 ref="form"
                 :model="activities"
                 size="mini">
            <el-form-item label-width="60px"
                          :label='item.labelName'
                          inline
                          v-for="item in activities.list"
                          :key="item.indexNum">
                <el-col :span="8">
                    <el-col :span="5">
                        <el-input v-model="item.activityName"
                            placeholder="A"
                            maxlength="1"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">=  [</el-col>
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
            <i class="el-icon-circle-plus-outline"
                @click="addActivity"></i>
            <i class="el-icon-remove-outline"
                @click="removeActivity"></i>
        </div>
        <el-button type="primary"
                   size="small"
                   round
                   @click="activitiesSubmit">下一步</el-button>
        <el-button
                size="small"
                round
                @click="resetActivities">重置</el-button>
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
  data() {
    return {
    };
  },
  mounted() {},
  methods: {
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
        labelName: `活动${index}`,
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
          labelName: '活动1',
          indexNum: 1,
          activityName: 'A',
          atomName: 'a',
          number: 1,
        }],
      };
    },
  },
};
</script>

<style scoped lang="less">
    .plus-and-remove-button {
        width: 60px;
        margin-bottom: 18px;
        text-align: center;
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
</style>
