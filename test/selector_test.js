import {fromJS} from 'immutable'
import {reducer, form} from '../src/index'
import {expect} from 'chai'

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
    expect(fromJS(props)).to.equal(fromJS({
      initialValues: values,
      currentValues: values,
      isDirty: false
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
    expect(fromJS(props)).to.equal(fromJS({
      initialValues: initialValues,
      currentValues: currentValues,
      isDirty: true
    }))
  })
})
