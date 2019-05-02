'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withForm = function withForm(BaseComponent) {
  return function (_Component) {
    _inherits(_class2, _Component);

    function _class2() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, _class2);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || Object.getPrototypeOf(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        initialValues: (0, _immutable.Map)(),
        currentValues: (0, _immutable.Map)()
      }, _this.setInitialValues = function (initialValues, currentValues) {
        initialValues = (0, _immutable.fromJS)(initialValues);
        _this.setState({
          initialValues: initialValues,
          currentValues: currentValues ? (0, _immutable.fromJS)(currentValues) : initialValues
        });
      }, _this.setValue = function (field, value) {
        _this.setState({
          currentValues: _this.state.currentValues.set(field, (0, _immutable.fromJS)(value))
        });
      }, _this.setValues = function (values) {
        _this.setState({
          currentValues: _this.state.currentValues.merge((0, _immutable.fromJS)(values))
        });
      }, _this.deleteField = function (field) {
        _this.setState({
          currentValues: _this.state.currentValues.delete(field)
        });
      }, _this.deleteFields = function (fields) {
        var currentValues = _this.state.currentValues;
        fields.forEach(function (field) {
          currentValues = currentValues.delete(field);
        });
        _this.setState({ currentValues: currentValues });
      }, _this.reset = function () {
        _this.setState({
          currentValues: _this.state.initialValues
        });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class2, [{
      key: 'render',
      value: function render() {
        var _state = this.state,
            initialValues = _state.initialValues,
            currentValues = _state.currentValues;

        return _react2.default.createElement(BaseComponent, _extends({}, this.props, {
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

    return _class2;
  }(_react.Component);
};

exports.default = withForm;