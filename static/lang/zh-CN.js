module.exports = {
  localization: {
    selectLanguage: '选择语言',
    type: '简体中文',
    title: '软件构件复杂度计算工具',
    navBar: {
      mainPage: '首页',
      useWay: '工具使用',
      chooseWay: '请选择输入方式',
      fileImport: '文件导入',
      manuallyEnter: '手动输入',
      docs: '使用说明',
    },
    indexTitle: '本工具主要基于认知复杂度，以软件活动为单位进行复杂度计算\n' +
      '提供两种输入方式：文件导入和手动输入',
    stepDes: {
      stepOne: '请输入活动定义',
      stepTwo: '请输入构件定义',
      stepThree: '请输入软件架构',
      stepFour: '确认输入，等待计算结果',
    },
    activityDefine: '活动定义',
    componentDefine: '构件定义',
    systemArchitect: '软件架构',
    result: '结果输出',
    trace: '路径',
    value: '结果',
    stepFileDes: {
      stepOne: '选择文件',
      stepTwo: '本地文件解析',
      stepThree: '确认文件内容',
      stepFour: '确认输入，等待计算结果',
    },
    confirmDelete: '确认移除 ',
    confirmTitle: '提示',
    confirm: '确认',
    cancel: '取消',
    intro: '说明',
    symbol: '操作符',
    desc: '描述',
    symbolType: '类型',
    needParam: '是否需要参数',
    example: '样例',
    noRepeat: '命名不可重复',
    activityDes: '本工具以活动为最小计算单元，活动用小写字母(a-z)表示，\n ' +
      '每个活动的认知复杂度用数字表示。\n' +
      '活动的定义用中括号包裹，例如 [a, 3]，然后用大写字母(A-Z)来命名。\n' +
      '输入格式： A = [a, 3]，',
    componentDes: '构件由一个或多个活动构成，允许活动重复出现在同一构件中，例如：P = A ; A。\n' +
      '构件支持优先级计算，可用括号表示优先计算的部分，例如：P = A ; ( B #2 C)。\n' +
      '构件',
    systemArchitectDes: '软件的架构可包含构件和活动，并作为计算式发送给后台进行计算，\n' +
      '例如： A ; B (( C @2 D) ||2 (E #2 F)) ; H',
  },
};
