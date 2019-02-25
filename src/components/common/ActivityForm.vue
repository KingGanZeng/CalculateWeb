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
                        <el-input v-model="item.activityName"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">=  [</el-col>
                    <el-col :span="5">
                        <el-input v-model="item.atomName"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">,</el-col>
                    <el-col :span="5">
                        <el-input v-model="item.number"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">]</el-col>
                </el-col>
            </el-form-item>
        </el-form>
        <div class="plus-button">
            <i class="el-icon-circle-plus-outline"
               @click="addActivity"></i>
        </div>
        <el-button type="primary"
                   size="small"
                   round
                   @click="activitiesSubmit">下一步</el-button>
        <el-button
                size="small"
                round>重置</el-button>
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
    activitiesSubmit() {},
    addActivity() {
      const index = this.activities.list.length + 1;
      this.activities.list.push({
        labelName: `活动${index}`,
        indexNum: index,
        activityName: '',
        atomName: '',
      });
    },
  },
};
</script>

<style scoped lang="less">
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

    .line {
        text-align: center;
        white-space: pre-wrap;
    }
</style>
