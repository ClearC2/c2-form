/* eslint-disable react/prop-types */
import React, {Fragment} from 'react'
import Component from '@reactions/component'
import {Provider} from 'react-redux'
import {render, fireEvent, cleanup} from '@testing-library/react'
import {withForm, formHOC, useForm} from '..'
import store from '../../example/src/store'

const Values = ({initial, current}) => (
  <Fragment>
    <div data-testid='initial-values'>
      {JSON.stringify(initial)}
    </div>
    <div data-testid='current-values'>
      {JSON.stringify(current)}
    </div>
  </Fragment>
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

// redux hoc
const formHOCWrapper = (TestClass) => () => {
  TestClass = formHOC(TestClass)
  return (
    <Provider store={store}>
      <TestClass formName='test-form' />
    </Provider>
  )
}
formHOCWrapper.toString = () => 'formHOC'

// redux-less hoc
const withFormWrapper = (TestClass) => withForm(TestClass)
withFormWrapper.toString = () => 'withForm'

const hookWrapper = (TestClass) => () => {
  const form = useForm({foo: 'bar'})
  return <TestClass {...form} />
}

hookWrapper.toString = () => 'useForm'

const hocs = [
  formHOCWrapper,
  withFormWrapper,
  hookWrapper
]

// test both redux and redux-less HOC's
describe.each(hocs)('%s', (hoc) => {
  afterEach(cleanup)

  it('should render base component', () => {
    const Test = hoc(() => <span>Foobar</span>)
    const {getByText} = renderTest(<Test />)
    getByText('Foobar')
  })

  it('should set initial and current values', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = hoc(({initialValues, currentValues, setInitialValues}) => (
      <Component didMount={() => setInitialValues(values)}>
        <Values initial={initialValues} current={currentValues} />
      </Component>
    ))
    const {getInitialValues, getCurrentValues} = renderTest(<Test />)
    expect(getInitialValues()).toBe(JSON.stringify(values))
    expect(getCurrentValues()).toBe(JSON.stringify(values))
  })

  it('should only set current value', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = hoc(({initialValues, currentValues, setInitialValues, setValue}) => (
      <Component didMount={() => setInitialValues(values)}>
        <Values initial={initialValues} current={currentValues} />
        <button onClick={() => setValue('bar', 'BAR')} />
      </Component>
    ))
    const {clickButton, getCurrentValues, getInitialValues} = renderTest(<Test />)
    clickButton()
    expect(getInitialValues()).toBe(JSON.stringify(values))
    expect(getCurrentValues()).toBe(JSON.stringify({foo: 'foo', bar: 'BAR'}))
  })

  it('should set multiple current values', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = hoc(({initialValues, currentValues, setInitialValues, setValues}) => (
      <Component didMount={() => setInitialValues(values)}>
        <Values initial={initialValues} current={currentValues} />
        <button onClick={() => setValues({foo: 'FOO', bar: 'BAR', baz: 'BAZ'})} />
      </Component>
    ))
    const {clickButton, getCurrentValues, getInitialValues} = renderTest(<Test />)
    clickButton()
    expect(getInitialValues()).toBe(JSON.stringify(values))
    expect(getCurrentValues()).toBe(JSON.stringify({foo: 'FOO', bar: 'BAR', baz: 'BAZ'}))
  })

  it('should delete field', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = hoc(({currentValues, setInitialValues, deleteField}) => (
      <Component didMount={() => setInitialValues(values)}>
        <Values current={currentValues} />
        <button onClick={() => deleteField('foo')} />
      </Component>
    ))
    const {clickButton, getCurrentValues} = renderTest(<Test />)
    clickButton()
    expect(getCurrentValues()).toBe(JSON.stringify({bar: 'bar'}))
  })

  it('should delete fields', () => {
    const values = {foo: 'foo', bar: 'bar', baz: 'baz'}
    const Test = hoc(({currentValues, setInitialValues, deleteFields}) => (
      <Component didMount={() => setInitialValues(values)}>
        <Values current={currentValues} />
        <button onClick={() => deleteFields(['foo', 'baz'])} />
      </Component>
    ))
    const {clickButton, getCurrentValues} = renderTest(<Test />)
    clickButton()
    expect(getCurrentValues()).toBe(JSON.stringify({bar: 'bar'}))
  })

  it('should pass isDirty/isClean flag', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = hoc(({setInitialValues, setValue, isDirty, isClean}) => (
      <Component didMount={() => setInitialValues(values)}>
        <div>{isDirty ? 'DIRTY' : 'NOTDIRTY'}</div>
        <div>{isClean ? 'CLEAN' : 'NOTCLEAN'}</div>
        <button onClick={() => setValue('foo', 'FOO')} />
      </Component>
    ))
    const {clickButton, getByText} = renderTest(<Test />)
    getByText('NOTDIRTY')
    getByText('CLEAN')
    clickButton()
    getByText('DIRTY')
    getByText('NOTCLEAN')
  })

  it('should reset', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = hoc(({initialValues, currentValues, setInitialValues, setValue, reset}) => (
      <Component didMount={() => setInitialValues(values)}>
        <Values initial={initialValues} current={currentValues} />
        <button data-testid='set-value' onClick={() => setValue('foo', 'FOO')} />
        <button data-testid='reset' onClick={reset} />
      </Component>
    ))
    const {getByTestId, getCurrentValues, getInitialValues} = renderTest(<Test />)
    fireEvent.click(getByTestId('set-value'))
    expect(getCurrentValues()).not.toBe(getInitialValues())
    fireEvent.click(getByTestId('reset'))
    expect(getCurrentValues()).toBe(getInitialValues())
  })

  it('should set initial and current values if present', () => {
    const iValues = {foo: 'foo', bar: 'bar'}
    const cValues = {foo: 'foo1', bar: 'bar2'}
    const Test = hoc(({initialValues, currentValues, setInitialValues}) => (
      <Component didMount={() => setInitialValues(iValues, cValues)}>
        <Values initial={initialValues} current={currentValues} />
      </Component>
    ))
    const {getCurrentValues, getInitialValues} = renderTest(<Test />)
    expect(getInitialValues()).toBe(JSON.stringify(iValues))
    expect(getCurrentValues()).toBe(JSON.stringify(cValues))
  })

  it('should handle functional setValues', () => {
    const iValues = {foo: 1, bar: 2, blah: true}
    const Test = hoc(({initialValues, currentValues, setInitialValues, setValues}) => (
      <Component didMount={() => setInitialValues(iValues)}>
        <Values initial={initialValues} current={currentValues} />
        <button
          data-testid='replace-values'
          onClick={() => {
            setValues(values => values.set('baz', values.get('bar') * 3).delete('blah'))
          }}
        />
      </Component>
    ))
    const {getByTestId, getCurrentValues, getInitialValues} = renderTest(<Test />)
    expect(getInitialValues()).toBe(JSON.stringify(iValues))
    fireEvent.click(getByTestId('replace-values'))
    const expected = {foo: 1, bar: 2, baz: 6}
    expect(getCurrentValues()).toBe(JSON.stringify(expected))
  })
})

describe('formHOC redux specific', () => {
  it('should delete form from redux', () => {
    const values = {foo: 'foo', bar: 'bar'}
    const Test = formHOCWrapper(({initialValues, currentValues, setInitialValues, deleteForm}) => (
      <Component didMount={() => setInitialValues(values)}>
        <Values initial={initialValues} current={currentValues} />
        <button data-testid='delete' onClick={deleteForm} />
      </Component>
    ))
    const {getByTestId, getCurrentValues, getInitialValues} = renderTest(<Test />)
    expect(getCurrentValues()).toBe(getInitialValues())
    expect(store.getState().getIn(['c2-form', 'test-form', 'initialValues']).toJS()).toEqual(values)
    fireEvent.click(getByTestId('delete'))
    expect(store.getState().get('c2-form').toJS()).toEqual({})
  })
})
