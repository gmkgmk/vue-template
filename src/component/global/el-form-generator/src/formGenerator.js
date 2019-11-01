import GeneratorGroup from './formGeneratorGroup';
import _ from 'lodash';
const getComponentIndex = value => {
  if (!value.data.attrs) return;
  return value.data.attrs.componentIndex;
};
export default {
  name: 'VueFormGenerator',
  props: {
    schema: {
      type: Object,
      default: () => ({
        fields: []
      })
    },
    modelData: {
      type: Object,
      default: () => ({})
    },
    formOptions: {
      type: Object,
      default: () => ({})
    },
    // 是否自动更新组件
    autoUpdateModel: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onModelUpdated(schema, newVal) {
      if (this.autoUpdateModel) {
        const $parent = this.findParent();
        $parent.$set($parent.modelData, schema, newVal);
      }
      this.$emit('model-updated', schema, newVal);
    },
    findParent() {
      let $parent = this.$parent;
      while (!$parent.modelData) {
        $parent = $parent.$parent;
      }
      return $parent;
    },
    // 格式化 fields数据和 slots
    createFields(slots = [], fields = []) {
      const localFields = fields.slice();
      // 查看slots是否有排序
      const { slotSortList = [], slotsList = [] } = _.groupBy(slots, value => {
        if (getComponentIndex(value)) {
          return 'slotSortList';
        } else {
          return 'slotsList';
        }
      });
      // 处理有排序的slot
      if (slotSortList.length > 0) {
        _.sortBy(slotSortList, 'componentIndex').forEach(el => {
          const index = getComponentIndex(el);
          el.isSlot = true;
          localFields.splice(index, 0, el);
        });
      }

      return {
        localFields,
        slotSortList,
        slotsList
      };
    }
  },
  render() {
    const { $slots, schema, formOptions } = this;
    // form props
    const defaultFormOptions = {
      inline: true,
      ...formOptions
    };
    // fields  and slotList
    const { localFields, slotsList } = this.createFields($slots.default, schema.fields);
    return (
      <el-form class="el-generator-field-list-wrap" props={defaultFormOptions}>
        {localFields.map((field, index) => {
          if (field.isSlot) {
            return field;
          }
          return (
            <GeneratorGroup
              key={`field-${index}`}
              field={field}
              modelData={this.modelData}
              on-model-updated={this.onModelUpdated}
            />
          );
        })}
        {slotsList}
      </el-form>
    );
  }
};
