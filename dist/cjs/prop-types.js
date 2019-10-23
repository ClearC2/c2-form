"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.formPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var formPropTypes = {
  formName: _propTypes["default"].string.isRequired,
  initialValues: _propTypes["default"].object.isRequired,
  currentValues: _propTypes["default"].object.isRequired,
  setInitialValues: _propTypes["default"].func.isRequired,
  setValue: _propTypes["default"].func.isRequired,
  setValues: _propTypes["default"].func.isRequired,
  deleteField: _propTypes["default"].func.isRequired,
  deleteFields: _propTypes["default"].func.isRequired,
  deleteForm: _propTypes["default"].func.isRequired,
  reset: _propTypes["default"].func.isRequired
};
exports.formPropTypes = formPropTypes;
var _default = formPropTypes;
exports["default"] = _default;