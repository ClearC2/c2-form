'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (BaseComponent) {
  var _class, _temp2;

  return (0, _reactRedux.connect)(_selector2.default, actions)((_temp2 = _class = function (_Component) {
    _inherits(FormHOC, _Component);

    function FormHOC() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, FormHOC);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormHOC.__proto__ || Object.getPrototypeOf(FormHOC)).call.apply(_ref, [this].concat(args))), _this), _this.setInitialValues = function (values) {
        return _this.props.setInitialValues(_this.props.formName, toJS(values));
      }, _this.setValue = function (field, value) {
        return _this.props.setValue(_this.props.formName, field, toJS(value));
      }, _this.setValues = function (values) {
        return _this.props.setValues(_this.props.formName, toJS(values));
      }, _this.deleteField = function (field) {
        return _this.props.deleteField(_this.props.formName, field);
      }, _this.deleteFields = function (fields) {
        return _this.props.deleteFields(_this.props.formName, fields);
      }, _this.deleteForm = function () {
        return _this.props.deleteForm(_this.props.formName);
      }, _this.reset = function () {
        return _this.props.reset(_this.props.formName);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FormHOC, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(BaseComponent, _extends({}, this.props, {
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
  }(_react.Component), _class.propTypes = _propTypes2.default, _temp2));
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var _actions = require('./actions');

var _propTypes = require('./prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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