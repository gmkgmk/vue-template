export function setOptionToSchema(modelName, optionData) {
  const fieldIndex = this.schema.fields.findIndex(el => el.model === modelName);
  if (fieldIndex === -1) {
    console.error(
      `错误：setOptionToSchema函数发生错误，modelName的值${modelName}与schemaEl model值不同，请确认！ `
    );
  }
  this.$set(this.schema.fields[fieldIndex], 'options', optionData);
}

export function findSchemaIndex(modelName) {
  const fieldIndex = this.schema.fields.findIndex(el => el.model === modelName);
  if (fieldIndex === -1) {
    console.error(
      `错误：setOptionToSchema函数发生错误，modelName的值${modelName}与schemaEl model值不同，请确认！ `
    );
  }
  return fieldIndex;
}
