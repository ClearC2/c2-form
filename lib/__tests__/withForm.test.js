'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable react/prop-types */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _component = require('@reactions/component');

var _component2 = _interopRequireDefault(_component);

var _reactTestingLibrary = require('react-testing-library');

var _withForm = require('../withForm');

var _withForm2 = _interopRequireDefault(_withForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderTest(sut) {
  var result = (0, _reactTestingLibrary.render)(sut);
  return _extends({}, result, {
    getInitialValues: function getInitialValues() {
      return result.getByTestId('initial-values').innerHTML;
    },
    getCurrentValues: function getCurrentValues() {
      return result.getByTestId('current-values').innerHTML;
    },
    clickButton: function clickButton() {
      return _reactTestingLibrary.fireEvent.click(result.container.querySelector('button'));
    }
  });
}

describe('withForm', function () {
  afterEach(_reactTestingLibrary.cleanup);

  it('should render base component', function () {
    var Test = function Test() {
      return _react2.default.createElement(
        'span',
        null,
        'Foobar'
      );
    };
    var WithFormFoobar = (0, _withForm2.default)(Test);

    var _renderTest = renderTest(_react2.default.createElement(WithFormFoobar, null)),
        getByText = _renderTest.getByText;

    getByText('Foobar');
  });

  it('should set initial and current values', function () {
    var values = { foo: 'foo', bar: 'bar' };
    var Test = function Test(_ref) {
      var initialValues = _ref.initialValues,
          currentValues = _ref.currentValues,
          setInitialValues = _ref.setInitialValues;
      return _react2.default.createElement(
        _component2.default,
        { didMount: function didMount() {
            return setInitialValues(values);
          } },
        _react2.default.createElement(
          'div',
          { 'data-testid': 'initial-values' },
          JSON.stringify(initialValues)
        ),
        _react2.default.createElement(
          'div',
          { 'data-testid': 'current-values' },
          JSON.stringify(currentValues)
        )
      );
    };
    var WithFormFoobar = (0, _withForm2.default)(Test);

    var _renderTest2 = renderTest(_react2.default.createElement(WithFormFoobar, null)),
        getInitialValues = _renderTest2.getInitialValues,
        getCurrentValues = _renderTest2.getCurrentValues;

    expect(getInitialValues()).toBe(JSON.stringify(values));
    expect(getCurrentValues()).toBe(JSON.stringify(values));
  });

  it('should only set current value', function () {
    var values = { foo: 'foo', bar: 'bar' };
    var Test = function Test(_ref2) {
      var initialValues = _ref2.initialValues,
          currentValues = _ref2.currentValues,
          setInitialValues = _ref2.setInitialValues,
          setValue = _ref2.setValue;
      return _react2.default.createElement(
        _component2.default,
        { didMount: function didMount() {
            return setInitialValues(values);
          } },
        _react2.default.createElement(
          'div',
          { 'data-testid': 'initial-values' },
          JSON.stringify(initialValues)
        ),
        _react2.default.createElement(
          'div',
          { 'data-testid': 'current-values' },
          JSON.stringify(currentValues)
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return setValue('bar', 'BAR');
            } },
          'Click'
        )
      );
    };
    var WithFormFoobar = (0, _withForm2.default)(Test);

    var _renderTest3 = renderTest(_react2.default.createElement(WithFormFoobar, null)),
        clickButton = _renderTest3.clickButton,
        getCurrentValues = _renderTest3.getCurrentValues,
        getInitialValues = _renderTest3.getInitialValues;

    clickButton();
    expect(getInitialValues()).toBe(JSON.stringify(values));
    expect(getCurrentValues()).toBe(JSON.stringify(_extends({}, values, { bar: 'BAR' })));
  });

  it('should delete field', function () {
    var values = { foo: 'foo', bar: 'bar' };
    var Test = function Test(_ref3) {
      var currentValues = _ref3.currentValues,
          setInitialValues = _ref3.setInitialValues,
          deleteField = _ref3.deleteField;
      return _react2.default.createElement(
        _component2.default,
        { didMount: function didMount() {
            return setInitialValues(values);
          } },
        _react2.default.createElement(
          'div',
          { 'data-testid': 'current-values' },
          JSON.stringify(currentValues)
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return deleteField('foo');
            } },
          'Click'
        )
      );
    };
    var WithFormFoobar = (0, _withForm2.default)(Test);

    var _renderTest4 = renderTest(_react2.default.createElement(WithFormFoobar, null)),
        clickButton = _renderTest4.clickButton,
        getCurrentValues = _renderTest4.getCurrentValues;

    clickButton();
    expect(getCurrentValues()).toBe(JSON.stringify({ bar: 'bar' }));
  });

  it('should pass isDirty flag', function () {
    var values = { foo: 'foo', bar: 'bar' };
    var Test = function Test(_ref4) {
      var setInitialValues = _ref4.setInitialValues,
          setValue = _ref4.setValue,
          isDirty = _ref4.isDirty;
      return _react2.default.createElement(
        _component2.default,
        { didMount: function didMount() {
            return setInitialValues(values);
          } },
        _react2.default.createElement(
          'div',
          null,
          isDirty ? 'DIRTY' : 'NOTDIRTY'
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return setValue('foo', 'FOO');
            } },
          'Click'
        )
      );
    };
    var WithFormFoobar = (0, _withForm2.default)(Test);

    var _renderTest5 = renderTest(_react2.default.createElement(WithFormFoobar, null)),
        clickButton = _renderTest5.clickButton,
        getByText = _renderTest5.getByText;

    getByText('NOTDIRTY');
    clickButton();
    getByText('DIRTY');
  });

  it('should reset', function () {
    var values = { foo: 'foo', bar: 'bar' };
    var Test = function Test(_ref5) {
      var initialValues = _ref5.initialValues,
          currentValues = _ref5.currentValues,
          setInitialValues = _ref5.setInitialValues,
          setValue = _ref5.setValue,
          reset = _ref5.reset;
      return _react2.default.createElement(
        _component2.default,
        { didMount: function didMount() {
            return setInitialValues(values);
          } },
        _react2.default.createElement(
          'div',
          { 'data-testid': 'initial-values' },
          JSON.stringify(initialValues)
        ),
        _react2.default.createElement(
          'div',
          { 'data-testid': 'current-values' },
          JSON.stringify(currentValues)
        ),
        _react2.default.createElement(
          'button',
          { 'data-testid': 'set-value', onClick: function onClick() {
              return setValue('foo', 'FOO');
            } },
          'set'
        ),
        _react2.default.createElement(
          'button',
          { 'data-testid': 'reset', onClick: reset },
          'reset'
        )
      );
    };
    var WithFormFoobar = (0, _withForm2.default)(Test);

    var _renderTest6 = renderTest(_react2.default.createElement(WithFormFoobar, null)),
        getByTestId = _renderTest6.getByTestId,
        getCurrentValues = _renderTest6.getCurrentValues,
        getInitialValues = _renderTest6.getInitialValues;

    _reactTestingLibrary.fireEvent.click(getByTestId('set-value'));
    expect(getCurrentValues()).not.toBe(getInitialValues());
    _reactTestingLibrary.fireEvent.click(getByTestId('reset'));
    expect(getCurrentValues()).toBe(getInitialValues());
  });
});