'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _actions = require('./actions');

function form() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)();
  var action = arguments[1];

  switch (action.type) {
    case _actions.SET_INITIAL_VALUES:
      return state.set(action.formName, (0, _immutable.fromJS)({
        initialValues: action.values,
        currentValues: action.values
      }));
    case _actions.SET_VALUE:
      return state.setIn([action.formName, 'currentValues', action.field], (0, _immutable.fromJS)(action.value));
    case _actions.SET_VALUES:
      return state.mergeIn([action.formName, 'currentValues'], (0, _immutable.fromJS)(action.values));
    case _actions.RESET:
      return state.setIn([action.formName, 'currentValues'], state.getIn([action.formName, 'initialValues']) || (0, _immutable.Map)());
    case _actions.DELETE_FIELD:
      return state.deleteIn([action.formName, 'currentValues', action.field]);
    case _actions.DELETE_CURRENT_FORM:
      return state.delete(action.formName);
    case _actions.DELETE_TARGET_FORM:
      return state.delete(action.targetForm);
    default:
      return state;
  }
}

form.key = 'c2-form';

exports.default = form;