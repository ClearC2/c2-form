function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import { fromJS, Map } from 'immutable';
var emptyMap = Map();

function init() {
  var initialValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var currentValues = arguments.length > 1 ? arguments[1] : undefined;
  initialValues = fromJS(initialValues);
  return fromJS({
    initialValues: initialValues,
    currentValues: currentValues ? fromJS(currentValues) : initialValues
  });
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_INITIAL_VALUES':
      return init(action.initialValues, action.currentValues);

    case 'SET_VALUE':
      return state.setIn(['currentValues', action.field], fromJS(action.value));

    case 'SET_VALUES':
      {
        if (typeof action.values === 'function') {
          var _currentValues = state.get('currentValues') || emptyMap;

          var values = action.values(_currentValues);
          return state.set('currentValues', fromJS(values));
        }

        return state.mergeIn(['currentValues'], fromJS(action.values));
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

  var _React$useReducer = React.useReducer(reducer, values, init),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      state = _React$useReducer2[0],
      dispatch = _React$useReducer2[1];

  var setInitialValues = React.useCallback(function (initialValues, currentValues) {
    dispatch({
      type: 'SET_INITIAL_VALUES',
      initialValues: initialValues,
      currentValues: currentValues
    });
  }, [dispatch]);
  var setValue = React.useCallback(function (field, value) {
    return dispatch({
      type: 'SET_VALUE',
      field: field,
      value: value
    });
  }, [dispatch]);
  var setValues = React.useCallback(function (values) {
    return dispatch({
      type: 'SET_VALUES',
      values: values
    });
  }, [dispatch]);
  var reset = React.useCallback(function () {
    return dispatch({
      type: 'RESET'
    });
  }, [dispatch]);
  var deleteField = React.useCallback(function (field) {
    return dispatch({
      type: 'DELETE_FIELD',
      field: field
    });
  }, [dispatch]);
  var deleteFields = React.useCallback(function (fields) {
    return dispatch({
      type: 'DELETE_FIELDS',
      fields: fields
    });
  }, [dispatch]);
  var initialValues = state.get('initialValues') || emptyMap;
  var currentValues = state.get('currentValues') || emptyMap;
  var isDirty = React.useMemo(function () {
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
    isDirty: isDirty,
    isClean: !isDirty
  };
}

export default useForm;