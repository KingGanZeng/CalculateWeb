<template>
    <div>
        <el-form class="input-item"
                 ref="form"
                 :model="components"
                 size="mini">
            <el-form-item label-width="60px"
                          :label="item.labelName"
                          inline
                          v-for="item in components.list"
                          :key="item.indexNum">
                <el-col :span="8">
                    <el-col :span="5">
                        <el-input v-model="item.componentName"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">=</el-col>
                    <el-col :span="15">
                        <el-input v-model="item.componentCal" clearable></el-input>
                    </el-col>
                    <el-col class="line" :span="2"></el-col>
                </el-col>
            </el-form-item>
        </el-form>
        <div class="plus-button">
            <i class="el-icon-circle-plus-outline" @click="addComponent"></i>
        </div>
        <el-button type="primary"
                   size="small"
                   round
                   @click="componentsSubmit">下一步</el-button>
        <el-button
                size="small"
                round>重置</el-button>
    </div>
</template>

<script>
export default {
  name: 'ComponentForm',
  props: {
    components: {
      type: Object,
    },
  },
  data() {
    return {
    };
  },
  mounted() {},
  methods: {
    componentsSubmit() {},
    addComponent() {
      const index = this.components.list.length + 1;
      this.components.list.push({
        labelName: `构件${index}`,
        indexNum: index,
        componentName: '',
        componentCal: '',
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
