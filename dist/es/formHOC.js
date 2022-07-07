function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import selector from "./selector";
import { setInitialValues, setValue, setValues, deleteField, deleteFields, deleteForm, reset } from "./actions";
import formPropTypes from "./prop-types";
var actions = {
  setInitialValues: setInitialValues,
  setValue: setValue,
  setValues: setValues,
  deleteField: deleteField,
  deleteFields: deleteFields,
  deleteForm: deleteForm,
  reset: reset
};

var toJS = function toJS(value) {
  return value && value.toJS ? value.toJS() : value;
};

export default function (BaseComponent) {
  var _class;

  return connect(selector, actions)((_class = /*#__PURE__*/function (_Component) {
    _inherits(FormHOC, _Component);

    var _super = _createSuper(FormHOC);

    function FormHOC() {
      var _this;

      _classCallCheck(this, FormHOC);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "setInitialValues", function (initialValues, currentValues) {
        _this.props.setInitialValues(_this.props.formName, toJS(initialValues), toJS(currentValues));
      });

      _defineProperty(_assertThisInitialized(_this), "setValue", function (field, value) {
        return _this.props.setValue(_this.props.formName, field, toJS(value));
      });

      _defineProperty(_assertThisInitialized(_this), "setValues", function (values) {
        return _this.props.setValues(_this.props.formName, toJS(values));
      });

      _defineProperty(_assertThisInitialized(_this), "deleteField", function (field) {
        return _this.props.deleteField(_this.props.formName, field);
      });

      _defineProperty(_assertThisInitialized(_this), "deleteFields", function (fields) {
        return _this.props.deleteFields(_this.props.formName, fields);
      });

      _defineProperty(_assertThisInitialized(_this), "deleteForm", function () {
        return _this.props.deleteForm(_this.props.formName);
      });

      _defineProperty(_assertThisInitialized(_this), "reset", function () {
        return _this.props.reset(_this.props.formName);
      });

      return _this;
    }

    _createClass(FormHOC, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement(BaseComponent, _extends({}, this.props, {
          setInitialValues: this.setInitialValues,
          setValue: this.setValue,
          setValues: this.setValues,
          deleteField: this.deleteField,
          deleteFields: this.deleteFields,
          deleteForm: this.deleteForm,
          reset: this.reset
        }));
      }
    }]);

    return FormHOC;
  }(Component), _defineProperty(_class, "propTypes", formPropTypes), _class));
}