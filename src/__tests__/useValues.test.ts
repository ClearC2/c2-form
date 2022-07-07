import {act, renderHook} from '@testing-library/react';
import useValues from '../useValues';

type Person = {
  firstName: string,
  lastName: string,
  middleName?: string,
  age: number,
  active: boolean
}

const validPerson: Person = {
  active: true,
  age: 30,
  firstName: 'Clark',
  lastName: 'Kent',
  middleName: 'Superman'
}

describe('useValues', function () {
  it('should set initial and current values', () => {
    const {result} = renderHook(() => useValues<Person>(validPerson))
    expect(result.current.currentValues).toEqual(validPerson)
    expect(result.current.initialValues).toEqual(validPerson)
  })

  it('should only set currentValue', () => {
    const {result} = renderHook(() => useValues<Person>(validPerson))
    act(() => {
      result.current.setValue('age', 21)
    })
    expect(result.current.initialValues).toEqual(validPerson)
    expect(result.current.currentValues).toEqual({...validPerson, age: 21})
  })

  it('should set multiple current values', () => {
    const {result} = renderHook(() => useValues<Person>(validPerson))
    const values = {active: false, age: 100}
    act(() => {
      result.current.setValues(values)
    })
    expect(result.current.currentValues).toEqual({...validPerson, ...values})
  })

  it('should delete field', () => {
    const {result} = renderHook(() => useValues<Person>(validPerson))
    act(() => {
      result.current.deleteField('middleName')
    })
    const {middleName, ...values} = validPerson
    expect(result.current.currentValues).toEqual(values)
  })

  it('should delete fields', () => {
    const {result} = renderHook(() => useValues({foo: 'foo', bar: 'bar', baz: 'baz'}))
    act(() => {
      result.current.deleteFields(['foo', 'bar'])
    })
    expect(result.current.currentValues).toEqual({baz: 'baz'})
  })

  it('should return isDirty/isClean booleans', () => {
    const {result} = renderHook(() => useValues<Person>(validPerson))
    act(() => {
      result.current.setValue('age', 21)
    })
    expect(result.current.isDirty).toBe(true)
    expect(result.current.isClean).toBe(false)
  })

  it('should reset', () => {
    const {result} = renderHook(() => useValues<Person>(validPerson))
    act(() => {
      result.current.setValue('age', 21)
      result.current.reset()
    })
    expect(result.current.currentValues).toEqual(validPerson)
    expect(result.current.initialValues).toEqual(validPerson)
    expect(result.current.isDirty).toBe(false)
    expect(result.current.isClean).toBe(true)
  })

  it('should init with initial and current values', () => {
    const currentPerson: Person = {
      active: true,
      age: 29,
      firstName: 'Wonder',
      lastName: 'Woman'
    }
    const {result} = renderHook(() => useValues<Person>(validPerson, currentPerson))
    expect(result.current.initialValues).toEqual(validPerson)
    expect(result.current.currentValues).toEqual(currentPerson)
  })

  it('should set initial and current values', () => {
    const currentPerson: Person = {
      active: true,
      age: 29,
      firstName: 'Wonder',
      lastName: 'Woman'
    }
    const {result} = renderHook(() => useValues<Person>({active: false, age: 0, firstName: '', lastName: ''}))
    act(() => {
      result.current.setInitialValues(validPerson, currentPerson)
    })
    expect(result.current.initialValues).toEqual(validPerson)
    expect(result.current.currentValues).toEqual(currentPerson)
  })

  it('should handle functional setValues', () => {
    const {result} = renderHook(() => useValues<Person>(validPerson))
    act(() => {
      result.current.setValues(person => {
        return {...person, firstName: 'Test'}
      })
    })
    expect(result.current.currentValues).toEqual({...validPerson, firstName: 'Test'})
  })
});

export {}
