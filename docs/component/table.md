## 表格渲染器

用于页面中展示重要的提示信息。

### 快速开始

方法一:

```js
node ./scripts/table/index.js 文件名 参数(可省略)
```

方法二:

```js
npm run table 文件名 参数(可省略)
```

### build 模式

**直接新增/修改 el-table 内容**

需要修改的文件下建立同名`.js` 文件作为配置文件

比如:

```
.
├─ example
   ├─ table.vue
   └─ table.js
```

`table.vue`

```js
export default {
  name: 'table-example-component',
  data() {
    return {
      tableData: []
    };
  },
  methods: {},

  render() {
    return (
      <div class="vue-wrapper">
        <div class="content-wrapper">
          <el-table data={this.tableData} stripe border fit highlight-current-row></el-table>
        </div>
      </div>
    );
  }
};
```

`table.js`

```js
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
    prop: 'local'
  }
];
```

使用 `npm run table table.vue`

```js
export default {
  name: 'table-example-component',
  data() {
    return {
      tableData: []
    };
  },
  methods: {},

  render() {
    return (
      <div class="vue-wrapper">
        <div class="content-wrapper">
          <el-table data={this.tableData} stripe border fit highlight-current-row>
            <el-table-column label="姓名" prop="name" />
            <el-table-column label="性别" prop="sex" />
            <el-table-column label="年龄" prop="age" />
            <el-table-column label="地区" prop="local" />
          </el-table>
        </div>
      </div>
    );
  }
};
```

### create 模式

**单独渲染 el-table-column**

```
npm run table  .\form.js create
```

`form.js`

```js
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
    prop: 'local'
  }
];
```

`output` -> `result.js`

```
<el-table-column label="姓名" prop="name"></el-table-column>
<el-table-column label="性别" prop="sex"></el-table-column>
<el-table-column label="年龄" prop="age"></el-table-column>
<el-table-column label="地区" prop="local"></el-table-column>
```

### 参数

| 参数名称 | 说明                                                    | 参数     |
| -------- | ------------------------------------------------------- | -------- |
| label    | el-table-column label 属性                              | String   |
| prop     | el-table-column prop 属性(修改时根据 prop 进行新旧对比) | string   |
| type     | 仅支持数字模式                                          | 'number' |
| option   | 其他配置                                                | Object   |

`option`

| 参数名称  | 说明                                              | 参数   |
| --------- | ------------------------------------------------- | ------ |
| thisErp   | this 的名称,一般情况下为 this(有可能为 parent 等) | String |
| decimal   | 保留小数位数                                      | number |
| funcName  | 调用的方法名称                                    | String |
| propsName | props 名称                                        | String |
