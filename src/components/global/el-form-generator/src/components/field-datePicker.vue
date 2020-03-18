<script>
  export default {
    name: 'field-datePicker',
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
      inputHandle(value) {
        const { model } = this.schema;
        if (!model) {
          console.error('错误:model 为空!');
        }
        this.value = value;
      }
    },
    render(createElement) {
      /*eslint no-unused-vars: 0*/
      const { dateType, defaultValue, model, ...restSchema } = this.schema;
      return createElement('el-date-picker', {
        props: {
          value: this.value,
          type: dateType,
          'range-separator': '~',
          'start-placeholder': '开始日期',
          'end-placeholder': '结束日期',
          'value-format': 'yyyy-MM-dd',
          ...restSchema
        },
        on: {
          input: $event => {
            this.inputHandle($event);
          }
        }
      });
    }
  };
</script>
