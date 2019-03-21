'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emptyMap = (0, _immutable.Map)();

function init() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  values = (0, _immutable.fromJS)(values);
  return (0, _immutable.fromJS)({
    initialValues: values,
    currentValues: values
  });
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_INITIAL_VALUES':
      return init(action.values);
    case 'SET_VALUE':
      return state.setIn(['currentValues', action.field], (0, _immutable.fromJS)(action.value));
    case 'SET_VALUES':
      return state.mergeIn(['currentValues'], (0, _immutable.fromJS)(action.values));
    case 'DELETE_FIELD':
      return state.deleteIn(['currentValues', action.field]);
    case 'DELETE_FIELDS':
      var currentValues = state.get('currentValues') || emptyMap;
      action.fields.forEach(function (field) {
        currentValues = currentValues.delete(field);
      });
      return state.set('currentValues', currentValues);
    case 'RESET':
      return init(state.get('initialValues'));
    default:
      return state;
  }
}

function useForm() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _React$useReducer = _react2.default.useReducer(reducer, values, init),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      state = _React$useReducer2[0],
      dispatch = _React$useReducer2[1];

  var setInitialValues = _react2.default.useCallback(function (values) {
    return dispatch({ type: 'SET_INITIAL_VALUES', values: values });
  }, [dispatch]);
  var setValue = _react2.default.useCallback(function (field, value) {
    return dispatch({ type: 'SET_VALUE', field: field, value: value });
  }, [dispatch]);
  var setValues = _react2.default.useCallback(function (values) {
    return dispatch({ type: 'SET_VALUES', values: values });
  }, [dispatch]);
  var reset = _react2.default.useCallback(function () {
    return dispatch({ type: 'RESET' });
  }, [dispatch]);
  var deleteField = _react2.default.useCallback(function (field) {
    return dispatch({ type: 'DELETE_FIELD', field: field });
  }, [dispatch]);
  var deleteFields = _react2.default.useCallback(function (fields) {
    return dispatch({ type: 'DELETE_FIELDS', fields: fields });
  }, [dispatch]);
  var initialValues = state.get('initialValues') || emptyMap;
  var currentValues = state.get('currentValues') || emptyMap;
  var isDirty = _react2.default.useMemo(function () {
    return !initialValues.equals(currentValues);
  }, [initialValues, currentValues]);
  return {
    initialValues: initialValues,
    currentValues: currentValues,
    setInitialValues: setInitialValues,
    setValue: setValue,
    setValues: setValues,
    deleteField: deleteField,
    deleteFields: deleteFields,
    reset: reset,
    isDirty: isDirty
  };
}

exports.default = useForm;