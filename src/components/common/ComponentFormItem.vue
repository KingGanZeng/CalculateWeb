<template>
    <el-form-item label-width="60px"
                  :label="title"
                  inline>
        <el-col :span="8">
            <el-col :span="5">
                <el-input :v-model="componentName"></el-input>
            </el-col>
            <el-col class="line" :span="2">=</el-col>
            <el-col :span="15">
                <el-input :v-model="componentCal" clearable></el-input>
            </el-col>
            <el-col class="line" :span="2"></el-col>
        </el-col>
    </el-form-item>
</template>

<script>
export default {
  name: 'ComponentFormItem',
  props: {
    indexNum: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      title: `构件${this.indexNum}`,
      componentName: `components.list[${this.indexNum}].componentName`,
      componentCal: `components.list[${this.indexNum}].componentCal`,
    };
  },
  mounted() {
    console.log(this.indexNum);
  },
};
</script>

<style scoped>
    .line {
        text-align: center;
        white-space: pre-wrap;
    }
</style>
