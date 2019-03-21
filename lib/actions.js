'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_INITIAL_VALUES = exports.SET_INITIAL_VALUES = 'c2-form/SET_INITIAL_VALUES';
var setInitialValues = exports.setInitialValues = function setInitialValues(formName, values) {
  return { type: SET_INITIAL_VALUES, formName: formName, values: values };
};

var SET_VALUE = exports.SET_VALUE = 'c2-form/SET_VALUE';
var setValue = exports.setValue = function setValue(formName, field, value) {
  return { type: SET_VALUE, formName: formName, field: field, value: value };
};

var SET_VALUES = exports.SET_VALUES = 'c2-form/SET_VALUES';
var setValues = exports.setValues = function setValues(formName, values) {
  return { type: SET_VALUES, formName: formName, values: values };
};

var RESET = exports.RESET = 'c2-form/RESET';
var reset = exports.reset = function reset(formName) {
  return { type: RESET, formName: formName };
};

var DELETE_FIELD = exports.DELETE_FIELD = 'c2-form/DELETE_FIELD';
var deleteField = exports.deleteField = function deleteField(formName, field) {
  return { type: DELETE_FIELD, formName: formName, field: field };
};

var DELETE_FIELDS = exports.DELETE_FIELDS = 'c2-form/DELETE_FIELDS';
var deleteFields = exports.deleteFields = function deleteFields(formName, fields) {
  return { type: DELETE_FIELDS, formName: formName, fields: fields };
};

var DELETE_FORM = exports.DELETE_FORM = 'c2-form/DELETE_FORM';
var deleteForm = exports.deleteForm = function deleteForm(formName) {
  return { type: DELETE_FORM, formName: formName };
};