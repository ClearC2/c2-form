"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "formHOC", {
  enumerable: true,
  get: function get() {
    return _formHOC["default"];
  }
});
Object.defineProperty(exports, "reducer", {
  enumerable: true,
  get: function get() {
    return _reducer["default"];
  }
});
Object.defineProperty(exports, "form", {
  enumerable: true,
  get: function get() {
    return _selector["default"];
  }
});
Object.defineProperty(exports, "withForm", {
  enumerable: true,
  get: function get() {
    return _withForm["default"];
  }
});
Object.defineProperty(exports, "useForm", {
  enumerable: true,
  get: function get() {
    return _useForm["default"];
  }
});
exports.actions = void 0;

var actions = _interopRequireWildcard(require("./actions"));

exports.actions = actions;

var _formHOC = _interopRequireDefault(require("./formHOC"));

var _reducer = _interopRequireDefault(require("./reducer"));

var _selector = _interopRequireDefault(require("./selector"));

var _withForm = _interopRequireDefault(require("./withForm"));

var _useForm = _interopRequireDefault(require("./useForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }