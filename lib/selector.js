'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = _reducer2.default.key;


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

exports.default = form;