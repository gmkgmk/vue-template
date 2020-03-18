import componentList from './components';
import _ from 'lodash';

export default {
  name: 'formGeneratorGroup',
  components: { ...componentList },
  props: {
    field: {
      type: Object,
      validator: function(value) {
        if (!_.isObject(value)) {
          Error('filed show be a object');
          return false;
        }
        return !!value.type;
      }
    },
    modelData: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getFieldType({ type } = {}) {
      if (!type) {
        throw '请确认组件类型';
      }
      return `field-${type}`;
    },
    onModelUpdated(newVal, schema) {
      this.$emit('model-updated', newVal, schema);
    }
  },
  render() {
    const { getFieldType } = this;
    const { field } = this;
    const component = getFieldType(field);

    /*eslint no-unused-vars: 0*/
    // 过滤无用属性
    const { type, label, formItemOption, ...restProps } = field;

    return (
      <el-form-item
        class="el-generator-field-wrap"
        label={label}
        props={formItemOption}
      >
        <component
          schema={restProps}
          modelData={this.modelData}
          on-model-updated={this.onModelUpdated}
        />
      </el-form-item>
    );
  }
};
