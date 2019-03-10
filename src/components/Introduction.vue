<template>
  <el-row class="introduction">
    <el-col :span="16" class="introduction-title">
      <ul>
        <li class="half-border-bottom" style="padding: 10px 0;">
          <el-row type="flex">
            <el-col :span="3">
              <el-tag>活动定义</el-tag>
            </el-col>
            <el-col style="font-size: 14px;line-height: 25px;padding-top: 4px;" :span="16">
              本工具以活动为最小计算单元，活动用小写字母(a-z)表示，
              每个活动的 <a href="https://www.testwo.com/article/1210" target="_blank">认知复杂度</a> 用数字表示。<br>
              活动的定义用中括号包裹，例如 [a, 3]，然后用大写字母(A-Z)来命名。 <br>
              输入格式： A = [a, 3]，命名不可重复。
            </el-col>
          </el-row>
        </li>
        <li class="half-border-bottom" style="padding: 10px 0;">
          <el-row type="flex">
            <el-col :span="3">
              <el-tag type="warning">构件定义</el-tag>
            </el-col>
            <el-col style="font-size: 14px;line-height: 25px;padding-top: 4px;" :span="16">
              构件由一个或多个活动构成，允许活动重复出现在同一构件中，例如：P = A ; A。<br>
              构件支持优先级计算，可用括号表示优先计算的部分，例如：P = A ; ( B #2 C)。<br>
              构件命名不可重复。
            </el-col>
          </el-row>
        </li>
        <li style="padding: 10px 0 0;">
          <el-row type="flex">
            <el-col :span="3">
              <el-tag type="danger">架构输入</el-tag>
            </el-col>
            <el-col style="font-size: 14px;line-height: 25px;padding-top: 4px;" :span="16">
              软件的架构可包含构件和活动，并作为计算式发送给后台进行计算，<br>
              例如： A ; B (( C @2 D) ||2 (E #2 F)) ; H
            </el-col>
          </el-row>
        </li>
      </ul>
    </el-col>
    <el-col :span="16" class="character-title">
      <el-table
              :data="characterArr"
      >
        <el-table-column
                prop="character"
                label="符号">
        </el-table-column>
        <el-table-column
                prop="intro"
                label="说明">
        </el-table-column>
        <el-table-column
                prop="type"
                label="类型">
        </el-table-column>
        <el-table-column
                label="需要参数">
          <template slot-scope="scope">
            <div slot="reference" class="needParam-wrapper">
              {{ scope.row.needParam === true ? '是' : '否' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
                prop="example"
                label="示例">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Introduction',
  data() {
    return {
      characterArr: [
        { character: '*', intro: '乘法计算', type: 'Multiplication', needParam: false, example: 'P=3*A' },
        { character: ';', intro: '顺序计算', type: 'Sequential', needParam: false, example: 'P=A;B' },
        { character: '#', intro: '选择计算', type: 'Choice', needParam: true, example: 'P=A#2B' },
        { character: '@', intro: '调用计算', type: 'Call', needParam: true, example: 'P=A@2B' },
        { character: '||', intro: '并发计算', type: 'Parallel', needParam: true, example: 'P=A||2B' },
      ],
    };
  },
};
</script>

<style scoped lang="less">
  .same-title {
    border: 1px solid #999999;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 40px 20px;
    margin-top: 10px;
    position: relative;
    &:before {
      position: absolute;
      top: -20px;
      background-color: #ffffff;
      font-size: 28px;
      padding: 0 5px;
    }
  }

  .introduction-title {
    .same-title();
    &:before {
      content: '使用说明';
    }
  }

  .character-title {
    .same-title();
    &:before {
      content: '符号说明';
    }
  }
</style>
