"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useValues;

var _react = require("react");

var _reactFastCompare = _interopRequireDefault(require("react-fast-compare"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Kind;

(function (Kind) {
  Kind[Kind["init"] = 0] = "init";
  Kind[Kind["reset"] = 1] = "reset";
  Kind[Kind["setValue"] = 2] = "setValue";
  Kind[Kind["setValues"] = 3] = "setValues";
  Kind[Kind["deleteField"] = 4] = "deleteField";
  Kind[Kind["deleteFields"] = 5] = "deleteFields";
})(Kind || (Kind = {}));

function reducer(state, action) {
  switch (action.type) {
    case Kind.init:
      return {
        initialValues: _objectSpread({}, action.initialValues),
        currentValues: action.currentValues ? _objectSpread({}, action.currentValues) : _objectSpread({}, action.initialValues)
      };

    case Kind.reset:
      return {
        initialValues: state.initialValues,
        currentValues: state.initialValues
      };

    case Kind.setValue:
      return _objectSpread(_objectSpread({}, state), {}, {
        currentValues: _objectSpread(_objectSpread({}, state.currentValues), {}, _defineProperty({}, action.field, action.value))
      });

    case Kind.setValues:
      var _values = typeof action.values === "function" ? action.values(state.currentValues) : action.values;

      return _objectSpread(_objectSpread({}, state), {}, {
        currentValues: _objectSpread(_objectSpread({}, state.currentValues), _values)
      });

    case Kind.deleteField:
      {
        var newValues = _objectSpread({}, state.currentValues);

        delete newValues[action.field];
        return _objectSpread(_objectSpread({}, state), {}, {
          currentValues: newValues
        });
      }

    case Kind.deleteFields:
      {
        var _newValues = _objectSpread({}, state.currentValues);

        var _iterator = _createForOfIteratorHelper(action.fields),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var field = _step.value;
            delete _newValues[field];
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return _objectSpread(_objectSpread({}, state), {}, {
          currentValues: _newValues
        });
      }

    default:
      return state;
  }
}

function useValues(initValues, curValues) {
  var _useReducer = (0, _react.useReducer)(reducer, {
    initialValues: _objectSpread({}, initValues),
    currentValues: curValues ? _objectSpread({}, curValues) : _objectSpread({}, initValues)
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var setValue = (0, _react.useCallback)(function (field, value) {
    dispatch({
      type: Kind.setValue,
      field: field,
      value: value
    });
  }, []);
  var setValues = (0, _react.useCallback)(function (values) {
    dispatch({
      type: Kind.setValues,
      values: values
    });
  }, []);
  var deleteField = (0, _react.useCallback)(function (field) {
    dispatch({
      type: Kind.deleteField,
      field: field
    });
  }, []);
  var deleteFields = (0, _react.useCallback)(function (fields) {
    dispatch({
      type: Kind.deleteFields,
      fields: fields
    });
  }, []);
  var setInitialValues = (0, _react.useCallback)(function (initialValues, currentValues) {
    dispatch({
      type: Kind.init,
      initialValues: initialValues,
      currentValues: currentValues
    });
  }, []);
  var reset = (0, _react.useCallback)(function () {
    return dispatch({
      type: Kind.reset
    });
  }, []);
  var initialValues = state.initialValues,
      currentValues = state.currentValues;
  var isClean = (0, _react.useMemo)(function () {
    return (0, _reactFastCompare["default"])(initialValues, currentValues);
  }, [initialValues, currentValues]);
  return {
    initialValues: initialValues,
    currentValues: currentValues,
    setInitialValues: setInitialValues,
    setValue: setValue,
    setValues: setValues,
    deleteField: deleteField,
    reset: reset,
    deleteFields: deleteFields,
    isClean: isClean,
    isDirty: !isClean
  };
}