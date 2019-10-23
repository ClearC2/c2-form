"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = require("immutable");

var _reducer = _interopRequireDefault(require("./reducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var key = _reducer["default"].key;
var emptyMap = (0, _immutable.Map)();

var form = function form(state, _ref) {
  var formName = _ref.formName;
  var initialValues = state.getIn([key, formName, 'initialValues']) || emptyMap;
  var currentValues = state.getIn([key, formName, 'currentValues']) || emptyMap;
  return {
    initialValues: initialValues,
    currentValues: currentValues,
    isDirty: !initialValues.equals(currentValues)
  };
};

var _default = form;
exports["default"] = _default;