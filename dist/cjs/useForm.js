"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _immutable = require("immutable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var emptyMap = (0, _immutable.Map)();

function init() {
  var initialValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var currentValues = arguments.length > 1 ? arguments[1] : undefined;
  initialValues = (0, _immutable.fromJS)(initialValues);
  return (0, _immutable.fromJS)({
    initialValues: initialValues,
    currentValues: currentValues ? (0, _immutable.fromJS)(currentValues) : initialValues
  });
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_INITIAL_VALUES':
      return init(action.initialValues, action.currentValues);

    case 'SET_VALUE':
      return state.setIn(['currentValues', action.field], (0, _immutable.fromJS)(action.value));

    case 'SET_VALUES':
      {
        if (typeof action.values === 'function') {
          var _currentValues = state.get('currentValues') || emptyMap;

          var values = action.values(_currentValues);
          return state.set('currentValues', (0, _immutable.fromJS)(values));
        }

        return state.mergeIn(['currentValues'], (0, _immutable.fromJS)(action.values));
      }

    case 'DELETE_FIELD':
      return state.deleteIn(['currentValues', action.field]);

    case 'DELETE_FIELDS':
      var currentValues = state.get('currentValues') || emptyMap;
      action.fields.forEach(function (field) {
        currentValues = currentValues["delete"](field);
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

  var _React$useReducer = _react["default"].useReducer(reducer, values, init),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      state = _React$useReducer2[0],
      dispatch = _React$useReducer2[1];

  var setInitialValues = _react["default"].useCallback(function (initialValues, currentValues) {
    dispatch({
      type: 'SET_INITIAL_VALUES',
      initialValues: initialValues,
      currentValues: currentValues
    });
  }, [dispatch]);

  var setValue = _react["default"].useCallback(function (field, value) {
    return dispatch({
      type: 'SET_VALUE',
      field: field,
      value: value
    });
  }, [dispatch]);

  var setValues = _react["default"].useCallback(function (values) {
    return dispatch({
      type: 'SET_VALUES',
      values: values
    });
  }, [dispatch]);

  var reset = _react["default"].useCallback(function () {
    return dispatch({
      type: 'RESET'
    });
  }, [dispatch]);

  var deleteField = _react["default"].useCallback(function (field) {
    return dispatch({
      type: 'DELETE_FIELD',
      field: field
    });
  }, [dispatch]);

  var deleteFields = _react["default"].useCallback(function (fields) {
    return dispatch({
      type: 'DELETE_FIELDS',
      fields: fields
    });
  }, [dispatch]);

  var initialValues = state.get('initialValues') || emptyMap;
  var currentValues = state.get('currentValues') || emptyMap;

  var isDirty = _react["default"].useMemo(function () {
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

var _default = useForm;
exports["default"] = _default;