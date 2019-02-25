<template>
    <el-form-item label-width="60px"
                  :label="title"
                  inline>
        <el-col :span="8">
            <el-col :span="5">
                <el-input :v-model="activityName"></el-input>
            </el-col>
            <el-col class="line" :span="2">=  [</el-col>
            <el-col :span="5">
                <el-input :v-model="atomName"></el-input>
            </el-col>
            <el-col class="line" :span="2">,</el-col>
            <el-col :span="5">
                <el-input :v-model="number"></el-input>
            </el-col>
            <el-col class="line" :span="2">]</el-col>
        </el-col>
    </el-form-item>
</template>

<script>
export default {
  name: 'ActivityFormItem',
  props: {
    indexNum: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      title: `活动${this.indexNum}`,
      activityName: `activities.list[${this.indexNum}].activityName`,
      atomName: `activities.list[${this.indexNum}].atomName`,
      number: `activities.list[${this.indexNum}].number`,
    };
  },
  mounted() {
    console.log(this.activityName);
  },
};
</script>

<style scoped>
    .line {
        text-align: center;
        white-space: pre-wrap;
    }
</style>
