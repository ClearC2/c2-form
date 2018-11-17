/* eslint-disable react/prop-types */
import React from 'react'
import Component from '@reactions/component'
import {Provider} from 'react-redux'
import {render, fireEvent, cleanup} from 'react-testing-library'
import {withForm, formHOC} from '..'
import store from '../../example/src/store'

const CurrentValues = ({children}) => (
  <div data-testid='current-values'>
    {JSON.stringify(children)}
  </div>
)

const InitialValues = ({children}) => (
  <div data-testid='initial-values'>
    {JSON.stringify(children)}
  </div>
)

function renderTest (sut) {
  const result = render(sut)
  return {
    ...result,
    getInitialValues: () => result.getByTestId('initial-values').innerHTML,
    getCurrentValues: () => result.getByTestId('current-values').innerHTML,
    clickButton: () => fireEvent.click(result.container.querySelector('button'))
  }
}

// redux wrapper
const formHOCWrapper = (TestClass) => () => {
  TestClass = formHOC(TestClass)
  return (
    <Provider store={store}>
      <TestClass formName='test-form' />
    </Provider>
  )
}
formHOCWrapper.toString = () => 'formHOC'

// redux-less wrapper
const withFormWrapper = (TestClass) => withForm(TestClass)
withFormWrapper.toString = () => 'withForm'

const wrappers = [
  formHOCWrapper,
  withFormWrapper
]

// test both redux and redux-less HOC's
describe.each(wrappers)('%s', (wrapper) => {
  afterEach(cleanup)

  it('should render base component', () => {
    const Test = () => <span>Foobar</span>
    const WithFormTest = wrapper(Test)
    const {getByText} = renderTest(<WithFormTest />)
    getByText('Foobar')
  })

  it('should set initial and current values', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = ({initialValues, currentValues, setInitialValues}) => (
      <Component didMount={() => setInitialValues(values)}>
        <InitialValues>{initialValues}</InitialValues>
        <CurrentValues>{currentValues}</CurrentValues>
      </Component>
    )
    const WithFormTest = wrapper(Test)
    const {getInitialValues, getCurrentValues} = renderTest(<WithFormTest />)
    expect(getInitialValues()).toBe(JSON.stringify(values))
    expect(getCurrentValues()).toBe(JSON.stringify(values))
  })

  it('should only set current value', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = ({initialValues, currentValues, setInitialValues, setValue}) => (
      <Component didMount={() => setInitialValues(values)}>
        <InitialValues>{initialValues}</InitialValues>
        <CurrentValues>{currentValues}</CurrentValues>
        <button onClick={() => setValue('bar', 'BAR')} />
      </Component>
    )
    const WithFormTest = wrapper(Test)
    const {clickButton, getCurrentValues, getInitialValues} = renderTest(<WithFormTest />)
    clickButton()
    expect(getInitialValues()).toBe(JSON.stringify(values))
    expect(getCurrentValues()).toBe(JSON.stringify({...values, bar: 'BAR'}))
  })

  it('should set multiple current values', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = ({initialValues, currentValues, setInitialValues, setValues}) => (
      <Component didMount={() => setInitialValues(values)}>
        <InitialValues>{initialValues}</InitialValues>
        <CurrentValues>{currentValues}</CurrentValues>
        <button onClick={() => setValues({foo: 'FOO', bar: 'BAR', baz: 'BAZ'})} />
      </Component>
    )
    const WithFormTest = wrapper(Test)
    const {clickButton, getCurrentValues, getInitialValues} = renderTest(<WithFormTest />)
    clickButton()
    expect(getInitialValues()).toBe(JSON.stringify(values))
    expect(getCurrentValues()).toBe(JSON.stringify({foo: 'FOO', bar: 'BAR', baz: 'BAZ'}))
  })

  it('should delete field', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = ({currentValues, setInitialValues, deleteField}) => (
      <Component didMount={() => setInitialValues(values)}>
        <CurrentValues>{currentValues}</CurrentValues>
        <button onClick={() => deleteField('foo')} />
      </Component>
    )
    const WithFormTest = wrapper(Test)
    const {clickButton, getCurrentValues} = renderTest(<WithFormTest />)
    clickButton()
    expect(getCurrentValues()).toBe(JSON.stringify({bar: 'bar'}))
  })

  it('should pass isDirty flag', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = ({setInitialValues, setValue, isDirty}) => (
      <Component didMount={() => setInitialValues(values)}>
        <div>{isDirty ? 'DIRTY' : 'NOTDIRTY'}</div>
        <button onClick={() => setValue('foo', 'FOO')} />
      </Component>
    )
    const WithFormTest = wrapper(Test)
    const {clickButton, getByText} = renderTest(<WithFormTest />)
    getByText('NOTDIRTY')
    clickButton()
    getByText('DIRTY')
  })

  it('should reset', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = ({initialValues, currentValues, setInitialValues, setValue, reset}) => (
      <Component didMount={() => setInitialValues(values)}>
        <InitialValues>{initialValues}</InitialValues>
        <CurrentValues>{currentValues}</CurrentValues>
        <button data-testid='set-value' onClick={() => setValue('foo', 'FOO')} />
        <button data-testid='reset' onClick={reset} />
      </Component>
    )
    const WithFormTest = wrapper(Test)
    const {getByTestId, getCurrentValues, getInitialValues} = renderTest(<WithFormTest />)
    fireEvent.click(getByTestId('set-value'))
    expect(getCurrentValues()).not.toBe(getInitialValues())
    fireEvent.click(getByTestId('reset'))
    expect(getCurrentValues()).toBe(getInitialValues())
  })
})
