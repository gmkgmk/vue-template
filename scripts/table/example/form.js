module.exports = [
  {
    label: '姓名',
    prop: 'name'
  },
  {
    label: '性别',
    prop: 'sex'
  },
  {
    label: '年龄',
    prop: 'age'
  },
  {
    label: '地区',
    prop: 'local',
    type: 'number',
    option: {
      thisErp: 'father',
      decimal: 4,
      funcName: 'toNumber'
    }
  }
];
//npm run table  .\form.js create
