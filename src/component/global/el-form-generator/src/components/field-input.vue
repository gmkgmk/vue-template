<script>
  export default {
    name: 'field-input',
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
      const { inputType, defaultValue, model, ...restSchema } = this.schema;

      return createElement('el-input', {
        props: {
          value: this.value,
          type: inputType,
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
