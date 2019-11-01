import  objGet  from 'lodash/get';
// import { get as objGet } from 'lodash';
import isFunction from 'lodash/isFunction'
export default {
  mounted() {
    if (this.schema.defaultValue) {
      this.inputValue = this.schema.defaultValue;
    }
  },
  methods: {
    updateModelData(value) {
      this.$emit('model-updated', this.schema.model, value);
    }
  },
  computed: {
    value: {
      get() {
        let val;
        if (isFunction(objGet(this.schema, 'get'))) {
          val = this.schema.get(this.modelData);
        } else {
          val = objGet(this.modelData, this.schema.model);
        }
        return val;
      },

      set(newValue) {
        const oldValue = this.value;
        if (isFunction(newValue)) {
          newValue(newValue, oldValue);
        } else {
          this.updateModelData(newValue);
        }
      }
    }
  }
};
