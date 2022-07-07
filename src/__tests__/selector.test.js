import {fromJS} from 'immutable'
import {reducer, form} from '../index'

describe('selector', () => {
  it('selectors correct props for clean form', () => {
    const formName = 'test-form'
    const values = {
      foo: 123,
      bar: 'test'
    }
    const state = fromJS({
      [reducer.key]: {
        [formName]: {
          initialValues: values,
          currentValues: values
        }
      }
    })
    const props = form(state, {formName})
    expect(fromJS(props)).toEqual(fromJS({
      initialValues: values,
      currentValues: values,
      isDirty: false,
      isClean: true
    }))
  })

  it('selectors correct props for dirty form', () => {
    const formName = 'test-form'
    const initialValues = {
      foo: 123,
      bar: 'test'
    }
    const currentValues = {
      foo: 124,
      bar: 'test',
      test: 'foobar'
    }
    const state = fromJS({
      [reducer.key]: {
        [formName]: {
          initialValues,
          currentValues
        }
      }
    })
    const props = form(state, {formName})
    expect(fromJS(props)).toEqual(fromJS({
      initialValues: initialValues,
      currentValues: currentValues,
      isDirty: true,
      isClean: false
    }))
  })
})
