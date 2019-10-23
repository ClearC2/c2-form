export var SET_INITIAL_VALUES = 'c2-form/SET_INITIAL_VALUES';
export var setInitialValues = function setInitialValues(formName, initialValues, currentValues) {
  return {
    type: SET_INITIAL_VALUES,
    formName: formName,
    initialValues: initialValues,
    currentValues: currentValues
  };
};
export var SET_VALUE = 'c2-form/SET_VALUE';
export var setValue = function setValue(formName, field, value) {
  return {
    type: SET_VALUE,
    formName: formName,
    field: field,
    value: value
  };
};
export var SET_VALUES = 'c2-form/SET_VALUES';
export var setValues = function setValues(formName, values) {
  return {
    type: SET_VALUES,
    formName: formName,
    values: values
  };
};
export var RESET = 'c2-form/RESET';
export var reset = function reset(formName) {
  return {
    type: RESET,
    formName: formName
  };
};
export var DELETE_FIELD = 'c2-form/DELETE_FIELD';
export var deleteField = function deleteField(formName, field) {
  return {
    type: DELETE_FIELD,
    formName: formName,
    field: field
  };
};
export var DELETE_FIELDS = 'c2-form/DELETE_FIELDS';
export var deleteFields = function deleteFields(formName, fields) {
  return {
    type: DELETE_FIELDS,
    formName: formName,
    fields: fields
  };
};
export var DELETE_FORM = 'c2-form/DELETE_FORM';
export var deleteForm = function deleteForm(formName) {
  return {
    type: DELETE_FORM,
    formName: formName
  };
};