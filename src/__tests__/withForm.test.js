/* eslint-disable react/prop-types */
import React from 'react'
import Component from '@reactions/component'
import {render, fireEvent, cleanup} from 'react-testing-library'
import withForm from '../withForm'

function renderTest (sut) {
  const result = render(sut)
  return {
    ...result,
    getInitialValues: () => result.getByTestId('initial-values').innerHTML,
    getCurrentValues: () => result.getByTestId('current-values').innerHTML,
    clickButton: () => fireEvent.click(result.container.querySelector('button'))
  }
}

describe('withForm', () => {
  afterEach(cleanup)

  it('should render base component', () => {
    const Test = () => <span>Foobar</span>
    const WithFormFoobar = withForm(Test)
    const {getByText} = renderTest(<WithFormFoobar />)
    getByText('Foobar')
  })

  it('should set initial and current values', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = ({initialValues, currentValues, setInitialValues}) => (
      <Component didMount={() => setInitialValues(values)}>
        <div data-testid='initial-values'>
          {JSON.stringify(initialValues)}
        </div>
        <div data-testid='current-values'>
          {JSON.stringify(currentValues)}
        </div>
      </Component>
    )
    const WithFormFoobar = withForm(Test)
    const {getInitialValues, getCurrentValues} = renderTest(<WithFormFoobar />)
    expect(getInitialValues()).toBe(JSON.stringify(values))
    expect(getCurrentValues()).toBe(JSON.stringify(values))
  })

  it('should only set current value', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = ({initialValues, currentValues, setInitialValues, setValue}) => (
      <Component didMount={() => setInitialValues(values)}>
        <div data-testid='initial-values'>
          {JSON.stringify(initialValues)}
        </div>
        <div data-testid='current-values'>
          {JSON.stringify(currentValues)}
        </div>
        <button onClick={() => setValue('bar', 'BAR')}>
          Click
        </button>
      </Component>
    )
    const WithFormFoobar = withForm(Test)
    const {clickButton, getCurrentValues, getInitialValues} = renderTest(<WithFormFoobar />)
    clickButton()
    expect(getInitialValues()).toBe(JSON.stringify(values))
    expect(getCurrentValues()).toBe(JSON.stringify({...values, bar: 'BAR'}))
  })

  it('should delete field', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = ({currentValues, setInitialValues, deleteField}) => (
      <Component didMount={() => setInitialValues(values)}>
        <div data-testid='current-values'>
          {JSON.stringify(currentValues)}
        </div>
        <button onClick={() => deleteField('foo')}>
          Click
        </button>
      </Component>
    )
    const WithFormFoobar = withForm(Test)
    const {clickButton, getCurrentValues} = renderTest(<WithFormFoobar />)
    clickButton()
    expect(getCurrentValues()).toBe(JSON.stringify({bar: 'bar'}))
  })

  it('should pass isDirty flag', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = ({setInitialValues, setValue, isDirty}) => (
      <Component didMount={() => setInitialValues(values)}>
        <div>{isDirty ? 'DIRTY' : 'NOTDIRTY'}</div>
        <button onClick={() => setValue('foo', 'FOO')}>
          Click
        </button>
      </Component>
    )
    const WithFormFoobar = withForm(Test)
    const {clickButton, getByText} = renderTest(<WithFormFoobar />)
    getByText('NOTDIRTY')
    clickButton()
    getByText('DIRTY')
  })

  it('should reset', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = ({initialValues, currentValues, setInitialValues, setValue, reset}) => (
      <Component didMount={() => setInitialValues(values)}>
        <div data-testid='initial-values'>
          {JSON.stringify(initialValues)}
        </div>
        <div data-testid='current-values'>
          {JSON.stringify(currentValues)}
        </div>
        <button data-testid='set-value' onClick={() => setValue('foo', 'FOO')}>
          set
        </button>
        <button data-testid='reset' onClick={reset}>
          reset
        </button>
      </Component>
    )
    const WithFormFoobar = withForm(Test)
    const {getByTestId, getCurrentValues, getInitialValues} = renderTest(<WithFormFoobar />)
    fireEvent.click(getByTestId('set-value'))
    expect(getCurrentValues()).not.toBe(getInitialValues())
    fireEvent.click(getByTestId('reset'))
    expect(getCurrentValues()).toBe(getInitialValues())
  })
})
