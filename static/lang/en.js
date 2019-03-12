module.exports = {
  localization: {
    selectLanguage: 'Language',
    type: 'English',
    title: 'Software Component Complexity Calculation Tool',
    navBar: {
      mainPage: 'Home',
      useWay: 'Use Way',
      chooseWay: 'Please select input mode',
      fileImport: 'File Import',
      manuallyEnter: 'Manually Enter',
      docs: 'Docs',
    },
    indexTitle: 'This System calculates software complexity in terms of software activities based on cognitive complexity.\n' +
      'You can choose between file import and manual input.',
    stepDes: {
      stepOne: 'Enter the activity definition',
      stepTwo: 'Enter the component definition',
      stepThree: 'Please enter the system architecture',
      stepFour: 'Confirm the input and wait for the result',
    },
    activityDefine: 'Activities',
    componentDefine: 'Components',
    systemArchitect: 'System Architect',
    result: 'Result',
    trace: 'Trace',
    value: 'Value',
    stepFileDes: {
      stepOne: 'Select one file',
      stepTwo: 'Local file parsing',
      stepThree: 'Confirm file content',
      stepFour: 'Confirm the input and wait for the result',
    },
    confirmDelete: 'Really Delete ',
    confirmTitle: 'Warning',
    confirm: 'confirm',
    cancel: 'cancel',
    intro: 'Introduction',
    symbol: 'Symbol',
    desc: 'Description',
    symbolType: 'Type',
    needParam: 'Need Param',
    example: 'Example',
    noRepeat: 'naming is not repeatable',
    activityDes: 'This tool uses activity which is represented by lowercase letters like a-z as the minimum calculation unit.\n' +
      'The cognitive complexity of each activity is represented by numbers.\n' +
      'The definition of the activity is wrapped in brackets, like: [a, 3], and then named in uppercase letters.\n' +
      'Input format: A = [a, 3], ',
    componentDes: 'A component consists of one or more activities, allowing activities to be repeated in the same component, for example: P = A; A.\n' +
      'The component supports priority calculations, and parentheses can be used to indicate the portion of the priority calculation, for example: P = A; (B #2 C).\n' +
      'Component ',
    systemArchitectDes: 'The architecture of the software can include artifacts and activities,\n' +
      'and will be sent to the background for calculation as a calculation.\n' +
      'For example: A ; B (( C @2 D) ||2 (E #2 F)) ; H',
  },
};
