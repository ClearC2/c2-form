function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { Map, fromJS } from 'immutable';

var withForm = function withForm(BaseComponent) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_Component) {
    _inherits(_temp, _Component);

    function _temp() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, _temp);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_temp)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "state", {
        initialValues: Map(),
        currentValues: Map()
      });

      _defineProperty(_assertThisInitialized(_this), "setInitialValues", function (initialValues, currentValues) {
        initialValues = fromJS(initialValues);

        _this.setState(function (state) {
          return _objectSpread({}, state, {
            initialValues: initialValues,
            currentValues: currentValues ? fromJS(currentValues) : initialValues
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setValue", function (field, value) {
        _this.setState(function (state) {
          return _objectSpread({}, state, {
            currentValues: state.currentValues.set(field, fromJS(value))
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setValues", function (values) {
        if (typeof values === 'function') {
          _this.setState(function (state) {
            values = values(state.currentValues);
            return _objectSpread({}, state, {
              currentValues: fromJS(values)
            });
          });

          return;
        }

        _this.setState(function (state) {
          return _objectSpread({}, state, {
            currentValues: state.currentValues.merge(fromJS(values))
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "deleteField", function (field) {
        _this.setState(function (state) {
          return _objectSpread({}, state, {
            currentValues: state.currentValues["delete"](field)
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "deleteFields", function (fields) {
        _this.setState(function (state) {
          var currentValues = state.currentValues;
          fields.forEach(function (field) {
            currentValues = currentValues["delete"](field);
          });
          return _objectSpread({}, state, {
            currentValues: currentValues
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "reset", function () {
        _this.setState(function (state) {
          return _objectSpread({}, state, {
            currentValues: state.initialValues
          });
        });
      });

      return _this;
    }

    _createClass(_temp, [{
      key: "render",
      value: function render() {
        var _this$state = this.state,
            initialValues = _this$state.initialValues,
            currentValues = _this$state.currentValues;
        return React.createElement(BaseComponent, _extends({}, this.props, {
          initialValues: this.state.initialValues,
          currentValues: this.state.currentValues,
          setInitialValues: this.setInitialValues,
          setValue: this.setValue,
          setValues: this.setValues,
          deleteField: this.deleteField,
          deleteFields: this.deleteFields,
          reset: this.reset,
          isDirty: !initialValues.equals(currentValues)
        }));
      }
    }]);

    return _temp;
  }(Component), _temp;
};

export default withForm;