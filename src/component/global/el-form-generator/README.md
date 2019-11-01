# el-form-generator

简化https://github.com/vue-generators/vue-form-generator的elementUi版本

重复造轮子很开心

在使用 vue-form-generator 时发现 ui 风格不搭,所以加入 el 做了一个简化版本,代码简单,简要阅读后可根据自身需要修改

modelData:model 数据,修改后会自动更改组件 modelData 的值,可以通过 autoUpdateModel 关闭,也可以通过自定义事件'model-updated'获取更新数据

schema.fields form 数据管理,所有数据直接加入 el 组件当中

使用方法

```js
// main.js
import generator from './el-generator';
Vue.use(generator);

// 业务组件
<vue-form-generator schema={this.schema} modelData={this.modelData}></vue-form-generator>

data:{
  schema:{
    fields:[{
              type: 'input',
              inputType: 'text',
              label: 'ID',
              readonly: true,
              disabled: true,
              formItemOption: {
                'label-width': '300',
                size: 'mini'
              }
            }]
  },
  modelData:{
          id: 1,
  }
}
```
