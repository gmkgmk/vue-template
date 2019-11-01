<script>
import _ from 'lodash';
export default {
  name: 'field-select',
  props: {
    schema: {
      type: Object,
      default: () => ({}),
      require: true
    },
    modelData: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    changeHandle(value) {
      const { model } = this.schema;
      if (!model) {

      }
      this.value = value;
    }
  },
  render(createElement) {

    /*eslint no-unused-vars: 0*/
    const { defaultValue, model, options, optionName, ...restSchema } = this.schema;
    // 自定义Key,value名称
    const { keyName: key, valueName: value } = {
      keyName: 'key',
      valueName: 'value',
      ...optionName
    };
    return createElement(
      'el-select',
      {
        props: {
          value: _.isNumber(this.value) ? this.value.toString() : this.value,
          ...restSchema
        },
        on: {
          change: value => {
            this.changeHandle(value);
          }
        }
      },
      [
        options &&
          options.map(el =>
            createElement('el-option', {
              props: {
                value: el[key],
                label: el[value] || el[key],
                disabled: el.disabled
              }
            })
          )
      ]
    );
  }
};
</script>
