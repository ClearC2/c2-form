'use strict';

var _immutable = require('immutable');

var _index = require('../index');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('selector', function () {
  it('selectors correct props for clean form', function () {
    var formName = 'test-form';
    var values = {
      foo: 123,
      bar: 'test'
    };
    var state = (0, _immutable.fromJS)(_defineProperty({}, _index.reducer.key, _defineProperty({}, formName, {
      initialValues: values,
      currentValues: values
    })));
    var props = (0, _index.form)(state, { formName: formName });
    expect((0, _immutable.fromJS)(props)).toEqual((0, _immutable.fromJS)({
      initialValues: values,
      currentValues: values,
      isDirty: false
    }));
  });

  it('selectors correct props for dirty form', function () {
    var formName = 'test-form';
    var initialValues = {
      foo: 123,
      bar: 'test'
    };
    var currentValues = {
      foo: 124,
      bar: 'test',
      test: 'foobar'
    };
    var state = (0, _immutable.fromJS)(_defineProperty({}, _index.reducer.key, _defineProperty({}, formName, {
      initialValues: initialValues,
      currentValues: currentValues
    })));
    var props = (0, _index.form)(state, { formName: formName });
    expect((0, _immutable.fromJS)(props)).toEqual((0, _immutable.fromJS)({
      initialValues: initialValues,
      currentValues: currentValues,
      isDirty: true
    }));
  });
});