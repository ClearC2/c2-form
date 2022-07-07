"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setValues = exports.setValue = exports.setInitialValues = exports.reset = exports.deleteForm = exports.deleteFields = exports.deleteField = exports.SET_VALUES = exports.SET_VALUE = exports.SET_INITIAL_VALUES = exports.RESET = exports.DELETE_FORM = exports.DELETE_FIELDS = exports.DELETE_FIELD = void 0;
var SET_INITIAL_VALUES = 'c2-form/SET_INITIAL_VALUES';
exports.SET_INITIAL_VALUES = SET_INITIAL_VALUES;

var setInitialValues = function setInitialValues(formName, initialValues, currentValues) {
  return {
    type: SET_INITIAL_VALUES,
    formName: formName,
    initialValues: initialValues,
    currentValues: currentValues
  };
};

exports.setInitialValues = setInitialValues;
var SET_VALUE = 'c2-form/SET_VALUE';
exports.SET_VALUE = SET_VALUE;

var setValue = function setValue(formName, field, value) {
  return {
    type: SET_VALUE,
    formName: formName,
    field: field,
    value: value
  };
};

exports.setValue = setValue;
var SET_VALUES = 'c2-form/SET_VALUES';
exports.SET_VALUES = SET_VALUES;

var setValues = function setValues(formName, values) {
  return {
    type: SET_VALUES,
    formName: formName,
    values: values
  };
};

exports.setValues = setValues;
var RESET = 'c2-form/RESET';
exports.RESET = RESET;

var reset = function reset(formName) {
  return {
    type: RESET,
    formName: formName
  };
};

exports.reset = reset;
var DELETE_FIELD = 'c2-form/DELETE_FIELD';
exports.DELETE_FIELD = DELETE_FIELD;

var deleteField = function deleteField(formName, field) {
  return {
    type: DELETE_FIELD,
    formName: formName,
    field: field
  };
};

exports.deleteField = deleteField;
var DELETE_FIELDS = 'c2-form/DELETE_FIELDS';
exports.DELETE_FIELDS = DELETE_FIELDS;

var deleteFields = function deleteFields(formName, fields) {
  return {
    type: DELETE_FIELDS,
    formName: formName,
    fields: fields
  };
};

exports.deleteFields = deleteFields;
var DELETE_FORM = 'c2-form/DELETE_FORM';
exports.DELETE_FORM = DELETE_FORM;

var deleteForm = function deleteForm(formName) {
  return {
    type: DELETE_FORM,
    formName: formName
  };
};

exports.deleteForm = deleteForm;