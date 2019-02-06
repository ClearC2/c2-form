'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (BaseComponent) {
  var _class, _temp;

  return (0, _reactRedux.connect)(_selector2.default, actions)((_temp = _class = function (_Component) {
    _inherits(FormHOC, _Component);

    function FormHOC() {
      _classCallCheck(this, FormHOC);

      return _possibleConstructorReturn(this, (FormHOC.__proto__ || Object.getPrototypeOf(FormHOC)).apply(this, arguments));
    }

    _createClass(FormHOC, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var formName = this.props.formName;

        return _react2.default.createElement(BaseComponent, _extends({}, this.props, {
          setInitialValues: function setInitialValues(values) {
            return _this2.props.setInitialValues(formName, toJS(values));
          },
          setValue: function setValue(field, value) {
            return _this2.props.setValue(formName, field, toJS(value));
          },
          setValues: function setValues(values) {
            return _this2.props.setValues(formName, toJS(values));
          },
          deleteField: function deleteField(field) {
            return _this2.props.deleteField(formName, field);
          },
          deleteCurrentForm: function deleteCurrentForm() {
            return _this2.props.deleteCurrentForm(formName);
          },
          deleteTargetForm: function deleteTargetForm(targetForm) {
            return _this2.props.deleteTargetForm(targetForm);
          },
          reset: function reset() {
            return _this2.props.reset(formName);
          }
        }));
      }
    }]);

    return FormHOC;
  }(_react.Component), _class.propTypes = _propTypes2.default, _temp));
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
  deleteCurrentForm: _actions.deleteCurrentForm,
  deleteTargetForm: _actions.deleteTargetForm,
  reset: _actions.reset
};

var toJS = function toJS(value) {
  return value && value.toJS ? value.toJS() : value;
};