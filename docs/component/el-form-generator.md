## 表单渲染

用于页面中展示重要的提示信息。

### 快速开始

    npm i el-form-generator -S

    ##### 快速使用
    ```
    main>js
        import Vue from 'vue';
        import ElementUI from 'element-ui';
        import ElFormGenerator from 'el-form-generator';
        Vue.use(ElementUI);
        Vue.use(ElFormGenerator);
    ```

### 基本用法

基础的表单渲染用法。

render 部分

```jsx
data(){
    return(){
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: '姓名',
            model: 'poNo'
          },
        ]
      },
      modelData: {
          name:null,
      }
    }
}
render(){
    return(
        <el-form-generator schema={this.schema} model-data={this.modelData}/>
    )
}
```

:::

### 带有时间选择期

带有时间选择器

render 部分

```jsx
data(){
    return(){
      schema: {
        fields: [
             {
            type: 'datePicker',
            dateType: 'daterange',
            'range-separator': '~',
            'start-placeholder': '开始日期',
            label: '时间选择',
            model: 'timeRange'
          }
        ]
      },
      modelData: {
          timeRange:[],
      }
    }
}

render(){
    return(
        <el-form-generator schema={this.schema} model-data={this.modelData}/>
    )
}

```

:::

### 带下拉框

下拉框

```jsx
data(){
    return(){
      schema: {
        fields: [
           {
            type: 'select',
            label: 'Skills',
            model: 'skills',
            options: [
              {
                key: '0',
                value: 'Javascript',
                label: '123'
              },
              { key: '1', value: 'VueJS' },
              {
                key: '2',
                value: 'CSS3'
              },
              {
                key: '4',
                value: 'HTML5'
              }
            ]
          },
        ]
      },
      modelData: {
          skills:null,
      }
    }
}
render(){
    return(
        <el-form-generator schema={this.schema} model-data={this.modelData}/>
    )
}
```

:::

### 自定义位置

```jsx
data(){
    return(){
      schema: {
        fields: [
             {
                type: 'input',
                inputType: 'text',
                label: '姓名',
                model: 'name'
            },
            {
                type: 'input',
                inputType: 'text',
                label: '年龄',
                model: 'age'
            },
            {
                type: 'input',
                inputType: 'text',
                label: 'ID',
                model: 'id'
            },

        ]
      },
      modelData: {
          number:null,
          age:null,
          id:null,
          name:null,
      }
    }
}
render(){
    return(
        <el-form-generator schema={this.schema} model-data={this.modelData}>
            <el-form-item label="中间数据" componentIndex={2}>
              <el-input  v-model={this.model.number} />
            </el-form-item>
        </el-form-generator>
    )
}
```

:::

### setOptionToSchema 使用方法

```jsx
import { setOptionToSchema } from 'el-form-generator';
data(){
    return(){
      schema: {
        fields: {
            type: 'select',
            label: 'Skills',
            model: 'skills',
            options: []
          },
      },
      modelData: {
          skills:null,
      }
    }
}

render(){
    return(
        <el-form-generator schema={this.schema} model-data={this.modelData}/>
    )
}


mounted(){
    const optionData= [
            {key: '0',value: 'Javascript',},
            {key: '1', value: 'VueJS' },
            {key: '2',value: 'CSS3'},
            {key: '4',value: 'HTML5'}
        ]
      setOptionToSchema.call(this, 'skills', optionData);
}
```

### findSchemaIndex 使用方法

```jsx
import { findSchemaIndex } from 'el-form-generator';
data(){
    return(){
      schema: {
        fields: [
            {
                type: 'select',
                label: 'Skills',
                model: 'skills',
                options:[
                    {key: '0',value: 'Javascript',},
                    {key: '1', value: 'VueJS' },
                    {key: '2',value: 'CSS3'},
                    {key: '4',value: 'HTML5'}
                ]
          },
        ]
      },
      modelData: {
          skills:null,
      }
    }
}

render(){
    return(
        <el-form-generator schema={this.schema} model-data={this.modelData}/>
    )
}

mounted(){
    const schemaIndex =  findSchemaIndex.call(this, 'skills');
    this.$set(this.schema.fields[schemaIndex], 'disabled', true);
}
```

### Attributes

| 参数            | 说明                                                                                                                           | 类型               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| schema          | 渲染表单的数据                                                                                                                 | Object             |
| model-data      | 表单控制的 model                                                                                                               | Object             |
| autoUpdateModel | 是否自动更新组件:表单数据修改后会自动更改 组件的 modelData 属性 ,false 表示不自动更新(可以通过 model-updated 事件获取监听属性) | Boolean(默认 true) |
| formOptions     | el-form 的配置选项,见配置 https://element.eleme.io/#/zh-CN/component/form#form-item-methods                                    | Object             |
| 其他属性        | 其他属性全部会付托在对应的组件上,比如 el-input 的属性                                                                          | Object             |

formOptions 实现如下

```jsx
  <el-form props={formOptions}><el-form/>
```

### Select Attributes

| 参数           | 说明                                                                                            | 类型   |
| -------------- | ----------------------------------------------------------------------------------------------- | ------ |
| formItemOption | el-form-item 的配置选项,见 https://element.eleme.io/#/zh-CN/component/form#form-item-attributes | Object |
| optionName     | key,value 键名                                                                                  |
| Object         |

optionName 实现如下

```jsx
  <el-select props={formItemOption}><el-select/>
```

```js
{
    type: 'select',
    label: '类型',
    model: 'type',
    formItemOption: {
        required: true,
    },
    optionName: {
        keyName: 'key',
        valueName: 'value'
    },
    options: []
},
```

### helper

| 事件名称          | 说明                                  | 参数                 |
| ----------------- | ------------------------------------- | -------------------- |
| setOptionToSchema | 设置属性到 options 类型的 Option 属性 | modalName,optionList |
| findSchemaIndex   | 获取属性的 Index 值                   | modalName            |
