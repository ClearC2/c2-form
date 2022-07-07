"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _immutable = require("immutable");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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

var withForm = function withForm(BaseComponent) {
  return /*#__PURE__*/function (_Component) {
    _inherits(_class2, _Component);

    var _super = _createSuper(_class2);

    function _class2() {
      var _this;

      _classCallCheck(this, _class2);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "state", {
        initialValues: (0, _immutable.Map)(),
        currentValues: (0, _immutable.Map)()
      });

      _defineProperty(_assertThisInitialized(_this), "setInitialValues", function (initialValues, currentValues) {
        initialValues = (0, _immutable.fromJS)(initialValues);

        _this.setState(function (state) {
          return _objectSpread(_objectSpread({}, state), {}, {
            initialValues: initialValues,
            currentValues: currentValues ? (0, _immutable.fromJS)(currentValues) : initialValues
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setValue", function (field, value) {
        _this.setState(function (state) {
          return _objectSpread(_objectSpread({}, state), {}, {
            currentValues: state.currentValues.set(field, (0, _immutable.fromJS)(value))
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setValues", function (values) {
        if (typeof values === 'function') {
          _this.setState(function (state) {
            values = values(state.currentValues);
            return _objectSpread(_objectSpread({}, state), {}, {
              currentValues: (0, _immutable.fromJS)(values)
            });
          });

          return;
        }

        _this.setState(function (state) {
          return _objectSpread(_objectSpread({}, state), {}, {
            currentValues: state.currentValues.merge((0, _immutable.fromJS)(values))
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "deleteField", function (field) {
        _this.setState(function (state) {
          return _objectSpread(_objectSpread({}, state), {}, {
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
          return _objectSpread(_objectSpread({}, state), {}, {
            currentValues: currentValues
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "reset", function () {
        _this.setState(function (state) {
          return _objectSpread(_objectSpread({}, state), {}, {
            currentValues: state.initialValues
          });
        });
      });

      return _this;
    }

    _createClass(_class2, [{
      key: "render",
      value: function render() {
        var _this$state = this.state,
            initialValues = _this$state.initialValues,
            currentValues = _this$state.currentValues;
        var isDirty = !initialValues.equals(currentValues);
        return /*#__PURE__*/_react["default"].createElement(BaseComponent, _extends({}, this.props, {
          initialValues: this.state.initialValues,
          currentValues: this.state.currentValues,
          setInitialValues: this.setInitialValues,
          setValue: this.setValue,
          setValues: this.setValues,
          deleteField: this.deleteField,
          deleteFields: this.deleteFields,
          reset: this.reset,
          isDirty: isDirty,
          isClean: !isDirty
        }));
      }
    }]);

    return _class2;
  }(_react.Component);
};

var _default = withForm;
exports["default"] = _default;