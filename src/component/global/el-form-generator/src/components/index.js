import FieldInput from './field-input.vue';
import FieldSelect from './field-select.vue';
import FieldDatePicker from './field-datePicker.vue';
import fieldMixin from './fieldMixin';

const componentList = {
  FieldInput,
  FieldSelect,
  FieldDatePicker
};
for (let i in componentList) {
  const item = componentList[i];
  !item.mixins && (item.mixins = []);
  item.mixins.push(fieldMixin);
  item.name = `${item.name}`;
}

export default componentList;
