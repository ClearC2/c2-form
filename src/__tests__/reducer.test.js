import {fromJS} from 'immutable'
import {actions, reducer} from '../index'

describe('reducer', () => {
  it('handles setInitialValues', () => {
    const formName = 'ticket'
    const initialValues = {foo: 'bar', baz: false}
    const action = actions.setInitialValues(formName, initialValues)
    const nextState = reducer(undefined, action)

    expect(nextState).toEqual(fromJS({
      [action.formName]: {
        initialValues,
        currentValues: initialValues
      }
    }))
  })

  it('handles setValue', () => {
    const formName = 'ticket'
    const field = 'baz'
    const value = true
    const action = actions.setValue(formName, field, value)
    const currentState = fromJS({
      [action.formName]: {
        initialValues: {
          foo: 'bar',
          baz: false
        },
        currentValues: {
          foo: 'bar',
          baz: false
        }
      }
    })
    const nextState = reducer(currentState, action)

    expect(nextState).toEqual(fromJS({
      [action.formName]: {
        initialValues: {
          foo: 'bar',
          baz: false
        },
        currentValues: {
          foo: 'bar',
          baz: true
        }
      }
    }))
  })

  it('handles setValues', () => {
    const formName = 'ticket'
    const values = {
      foo: 'test',
      bar: true,
      baz: 123
    }
    const action = actions.setValues(formName, values)
    const currentState = fromJS({
      [action.formName]: {
        initialValues: {
          foo: 'bar',
          baz: false
        },
        currentValues: {
          foo: 'bar',
          baz: false
        }
      }
    })
    const nextState = reducer(currentState, action)
    expect(nextState).toEqual(fromJS({
      [action.formName]: {
        initialValues: {
          foo: 'bar',
          baz: false
        },
        currentValues: values
      }
    }))
  })

  it('handles reset', () => {
    const formName = 'ticket'
    const action = actions.reset(formName)
    const currentState = fromJS({
      [action.formName]: {
        initialValues: {
          foo: 'bar',
          baz: false
        },
        currentValues: {
          foo: '123',
          baz: true,
          bar: true
        }
      }
    })
    const nextState = reducer(currentState, action)

    expect(nextState).toEqual(fromJS({
      [action.formName]: {
        initialValues: {
          foo: 'bar',
          baz: false
        },
        currentValues: {
          foo: 'bar',
          baz: false
        }
      }
    }))
  })

  it('handles deleteField', () => {
    const formName = 'ticket'
    const field = 'baz'
    const action = actions.deleteField(formName, field)
    const currentState = fromJS({
      [action.formName]: {
        initialValues: {
          foo: 'bar',
          baz: false
        },
        currentValues: {
          foo: 'bar',
          baz: false
        }
      }
    })
    const nextState = reducer(currentState, action)

    expect(nextState).toEqual(fromJS({
      [action.formName]: {
        initialValues: {
          foo: 'bar',
          baz: false
        },
        currentValues: {foo: 'bar'}
      }
    }))
  })
})
