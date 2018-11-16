'use strict';

var _immutable = require('immutable');

var _index = require('../index');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('reducer', function () {
  it('handles setInitialValues', function () {
    var formName = 'ticket';
    var initialValues = { foo: 'bar', baz: false };
    var action = _index.actions.setInitialValues(formName, initialValues);
    var nextState = (0, _index.reducer)(undefined, action);

    expect(nextState).toEqual((0, _immutable.fromJS)(_defineProperty({}, action.formName, {
      initialValues: initialValues,
      currentValues: initialValues
    })));
  });

  it('handles setValue', function () {
    var formName = 'ticket';
    var field = 'baz';
    var value = true;
    var action = _index.actions.setValue(formName, field, value);
    var currentState = (0, _immutable.fromJS)(_defineProperty({}, action.formName, {
      initialValues: {
        foo: 'bar',
        baz: false
      },
      currentValues: {
        foo: 'bar',
        baz: false
      }
    }));
    var nextState = (0, _index.reducer)(currentState, action);

    expect(nextState).toEqual((0, _immutable.fromJS)(_defineProperty({}, action.formName, {
      initialValues: {
        foo: 'bar',
        baz: false
      },
      currentValues: {
        foo: 'bar',
        baz: true
      }
    })));
  });

  it('handles setValues', function () {
    var formName = 'ticket';
    var values = {
      foo: 'test',
      bar: true,
      baz: 123
    };
    var action = _index.actions.setValues(formName, values);
    var currentState = (0, _immutable.fromJS)(_defineProperty({}, action.formName, {
      initialValues: {
        foo: 'bar',
        baz: false
      },
      currentValues: {
        foo: 'bar',
        baz: false
      }
    }));
    var nextState = (0, _index.reducer)(currentState, action);
    expect(nextState).toEqual((0, _immutable.fromJS)(_defineProperty({}, action.formName, {
      initialValues: {
        foo: 'bar',
        baz: false
      },
      currentValues: values
    })));
  });

  it('handles reset', function () {
    var formName = 'ticket';
    var action = _index.actions.reset(formName);
    var currentState = (0, _immutable.fromJS)(_defineProperty({}, action.formName, {
      initialValues: {
        foo: 'bar',
        baz: false
      },
      currentValues: {
        foo: '123',
        baz: true,
        bar: true
      }
    }));
    var nextState = (0, _index.reducer)(currentState, action);

    expect(nextState).toEqual((0, _immutable.fromJS)(_defineProperty({}, action.formName, {
      initialValues: {
        foo: 'bar',
        baz: false
      },
      currentValues: {
        foo: 'bar',
        baz: false
      }
    })));
  });

  it('handles deleteField', function () {
    var formName = 'ticket';
    var field = 'baz';
    var action = _index.actions.deleteField(formName, field);
    var currentState = (0, _immutable.fromJS)(_defineProperty({}, action.formName, {
      initialValues: {
        foo: 'bar',
        baz: false
      },
      currentValues: {
        foo: 'bar',
        baz: false
      }
    }));
    var nextState = (0, _index.reducer)(currentState, action);

    expect(nextState).toEqual((0, _immutable.fromJS)(_defineProperty({}, action.formName, {
      initialValues: {
        foo: 'bar',
        baz: false
      },
      currentValues: { foo: 'bar' }
    })));
  });
});