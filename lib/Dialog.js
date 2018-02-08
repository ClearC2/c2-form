var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';
import { Portal } from 'react-portal';
import $ from 'jquery';

var zIndex = 2000;
var portalNode = null;
export function setPortalNode(node) {
  portalNode = node;
}

var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _initialiseProps.call(_this);

    var defaultProps = props.default || {};
    _this.state = _extends({}, defaultProps, {
      dragged: false
    });
    return _this;
  }

  _createClass(Dialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateZIndex();
      $(window).resize(this.onResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      $(window).off('resize', this.onResize);
    }
  }, {
    key: 'render',
    value: function render() {
      var center = this.props.center;

      var width = this.props.default.width;
      var x = center && width ? window.innerWidth / 2 - width / 2 : this.props.default.x;
      var defaultProps = _extends({}, this.props.default, { x: x });
      var rnd = this.renderRnd(defaultProps);
      if (this.props.inline) return rnd;

      return React.createElement(
        Portal,
        { node: this.props.node || portalNode },
        this.props.backdropStyle ? React.createElement(
          'div',
          { style: this.props.backdropStyle },
          rnd
        ) : rnd
      );
    }
  }]);

  return Dialog;
}(Component);

Dialog.propTypes = {
  default: PropTypes.object,
  center: PropTypes.bool,
  inline: PropTypes.bool,
  backdropStyle: PropTypes.object,
  node: PropTypes.object
};
Dialog.defaultProps = {
  default: {},
  center: false,
  backdropStyle: null,
  inline: false,
  node: null
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onResize = function () {
    return _this2.center();
  };

  this.center = function (width) {
    if (_this2.props.center && !_this2.state.dragged) {
      width = width || _this2.state.width;
      var x = window.innerWidth / 2 - width / 2;
      _this2.rnd.updatePosition({ x: x });
    }
  };

  this.updateZIndex = function () {
    _this2.rnd.updateZIndex(++zIndex);
  };

  this.renderRnd = function (defaultProps) {
    return React.createElement(Rnd, _extends({}, _this2.props, {
      'default': defaultProps,
      ref: function ref(rnd) {
        _this2.rnd = rnd;
      },
      onDrag: function () {
        var _props;

        this.updateZIndex();
        this.setState({ dragged: true });
        if (this.props.onDrag) (_props = this.props).onDrag.apply(_props, arguments);
      }.bind(_this2),
      onDragStop: function () {
        var _props2;

        this.updateZIndex();
        this.setState({ dragged: true });
        if (this.props.onDragStop) (_props2 = this.props).onDragStop.apply(_props2, arguments);
      }.bind(_this2),
      onResizeStop: function (a, b, c, delta) {
        var _props3;

        this.updateZIndex();
        var width = this.state.width + delta.width;
        this.setState({ width: width });
        this.center(width);
        if (this.props.onResizeStop) (_props3 = this.props).onResizeStop.apply(_props3, arguments);
      }.bind(_this2)
    }));
  };
};

export default Dialog;