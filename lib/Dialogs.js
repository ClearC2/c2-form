var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeDialog, dialogs } from './redux';
import Dialog from './Dialog';

var Dialogs = function (_React$Component) {
  _inherits(Dialogs, _React$Component);

  function Dialogs() {
    _classCallCheck(this, Dialogs);

    return _possibleConstructorReturn(this, (Dialogs.__proto__ || Object.getPrototypeOf(Dialogs)).apply(this, arguments));
  }

  _createClass(Dialogs, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          dialogs = _props.dialogs,
          components = _props.components,
          dialogProps = _objectWithoutProperties(_props, ['dialogs', 'components']);

      return React.createElement(
        'div',
        { style: { height: 0 } },
        dialogs.map(function (dialog, i) {
          var Component = components[dialog.get('component')];
          var componentProps = (dialog.get('props') || Map()).toJS();
          if (!Component) {
            console.error('Invalid dialog component: ' + dialog.get('component'));
            return React.createElement('div', { key: 'invalid-' + i });
          }
          return React.createElement(
            Dialog,
            _extends({
              key: dialog.get('id')
            }, dialogProps),
            Component ? React.createElement(Component, _extends({}, componentProps, {
              close: function close() {
                return _this2.props.closeDialog(dialog.get('id'));
              }
            })) : null
          );
        })
      );
    }
  }]);

  return Dialogs;
}(React.Component);

Dialogs.propTypes = {
  dialogs: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
  components: PropTypes.object.isRequired
};


function props(state, props) {
  return { dialogs: dialogs(state, props) };
}

export default connect(props, { closeDialog: closeDialog })(Dialogs);