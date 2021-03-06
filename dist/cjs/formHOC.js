"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _selector = _interopRequireDefault(require("./selector"));

var _actions = require("./actions");

var _propTypes = _interopRequireDefault(require("./prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actions = {
  setInitialValues: _actions.setInitialValues,
  setValue: _actions.setValue,
  setValues: _actions.setValues,
  deleteField: _actions.deleteField,
  deleteFields: _actions.deleteFields,
  deleteForm: _actions.deleteForm,
  reset: _actions.reset
};

var toJS = function toJS(value) {
  return value && value.toJS ? value.toJS() : value;
};

function _default(BaseComponent) {
  var _class, _temp;

  return (0, _reactRedux.connect)(_selector["default"], actions)((_temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(FormHOC, _Component);

    function FormHOC() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, FormHOC);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FormHOC)).call.apply(_getPrototypeOf2, [this].concat(args)));

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
        return _react["default"].createElement(BaseComponent, _extends({}, this.props, {
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
  }(_react.Component), _defineProperty(_class, "propTypes", _propTypes["default"]), _temp));
}