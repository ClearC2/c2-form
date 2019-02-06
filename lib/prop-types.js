'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formPropTypes = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formPropTypes = exports.formPropTypes = {
  formName: _propTypes2.default.string.isRequired,
  initialValues: _propTypes2.default.object.isRequired,
  currentValues: _propTypes2.default.object.isRequired,
  setInitialValues: _propTypes2.default.func.isRequired,
  setValue: _propTypes2.default.func.isRequired,
  setValues: _propTypes2.default.func.isRequired,
  deleteField: _propTypes2.default.func.isRequired,
  deleteForm: _propTypes2.default.func.isRequired,
  reset: _propTypes2.default.func.isRequired
};

exports.default = formPropTypes;