"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = require("immutable");

var _actions = require("./actions");

var emptyMap = (0, _immutable.Map)();

function form() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.SET_INITIAL_VALUES:
      return state.set(action.formName, (0, _immutable.fromJS)({
        initialValues: action.initialValues,
        currentValues: action.currentValues || action.initialValues
      }));

    case _actions.SET_VALUE:
      return state.setIn([action.formName, 'currentValues', action.field], (0, _immutable.fromJS)(action.value));

    case _actions.SET_VALUES:
      if (typeof action.values === 'function') {
        var _currentValues = state.getIn([action.formName, 'currentValues']) || emptyMap;

        var values = action.values(_currentValues);
        return state.setIn([action.formName, 'currentValues'], (0, _immutable.fromJS)(values));
      }

      return state.mergeIn([action.formName, 'currentValues'], (0, _immutable.fromJS)(action.values));

    case _actions.RESET:
      return state.setIn([action.formName, 'currentValues'], state.getIn([action.formName, 'initialValues']) || emptyMap);

    case _actions.DELETE_FIELD:
      return state.deleteIn([action.formName, 'currentValues', action.field]);

    case _actions.DELETE_FIELDS:
      var currentValues = state.getIn([action.formName, 'currentValues']) || emptyMap;
      action.fields.forEach(function (field) {
        currentValues = currentValues["delete"](field);
      });
      return state.setIn([action.formName, 'currentValues'], currentValues);

    case _actions.DELETE_FORM:
      return state["delete"](action.formName);

    default:
      return state;
  }
}

form.key = 'c2-form';
var _default = form;
exports["default"] = _default;