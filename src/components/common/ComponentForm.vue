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
      <div class="plus-and-remove-button">
        <i class="el-icon-circle-plus-outline"
           @click="addComponent"></i>
        <i class="el-icon-remove-outline"
           @click="removeComponent"></i>
      </div>
        <el-button type="primary"
                   size="small"
                   round
                   @click="componentsSubmit">下一步</el-button>
        <el-button
                size="small"
                round
                @click="resetComponents">重置</el-button>
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
  methods: {
    /**
     * 更新步骤数
     */
    componentsSubmit() {
      this.$emit('changeInputComplete', 2);
    },
    /**
     * 添加构件
     */
    addComponent() {
      const index = this.components.list.length + 1;
      this.components.list.push({
        labelName: `构件${index}`,
        indexNum: index,
        componentName: '',
        componentCal: '',
      });
    },
    /**
     * 移除构件
     */
    removeComponent() {
      this.components.list.pop();
    },
    /**
     * 重置表单
     */
    resetComponents() {
      this.components = {
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
