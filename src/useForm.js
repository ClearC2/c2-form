import React from 'react'
import {fromJS, Map} from 'immutable'

const emptyMap = Map()

function init (initialValues = {}, currentValues) {
  initialValues = fromJS(initialValues)
  return fromJS({
    initialValues,
    currentValues: currentValues ? fromJS(currentValues) : initialValues
  })
}

function reducer (state, action) {
  switch (action.type) {
    case 'SET_INITIAL_VALUES':
      return init(action.initialValues, action.currentValues)
    case 'SET_VALUE':
      return state.setIn(['currentValues', action.field], fromJS(action.value))
    case 'SET_VALUES': {
      if (typeof action.values === 'function') {
        const currentValues = state.get('currentValues') || emptyMap
        const values = action.values(currentValues)
        return state.set('currentValues', fromJS(values))
      }
      return state.mergeIn(['currentValues'], fromJS(action.values))
    }
    case 'DELETE_FIELD':
      return state.deleteIn(['currentValues', action.field])
    case 'DELETE_FIELDS':
      let currentValues = state.get('currentValues') || emptyMap
      action.fields.forEach(field => {
        currentValues = currentValues.delete(field)
      })
      return state.set('currentValues', currentValues)
    case 'RESET':
      return init(state.get('initialValues'))
    default:
      return state
  }
}

function useForm (values = {}) {
  const [state, dispatch] = React.useReducer(reducer, values, init)
  const setInitialValues = React.useCallback((initialValues, currentValues) => {
    dispatch({type: 'SET_INITIAL_VALUES', initialValues, currentValues})
  }, [dispatch])
  const setValue = React.useCallback((field, value) => dispatch({type: 'SET_VALUE', field, value}), [dispatch])
  const setValues = React.useCallback((values) => dispatch({type: 'SET_VALUES', values}), [dispatch])
  const reset = React.useCallback(() => dispatch({type: 'RESET'}), [dispatch])
  const deleteField = React.useCallback((field) => dispatch({type: 'DELETE_FIELD', field}), [dispatch])
  const deleteFields = React.useCallback((fields) => dispatch({type: 'DELETE_FIELDS', fields}), [dispatch])
  const initialValues = state.get('initialValues') || emptyMap
  const currentValues = state.get('currentValues') || emptyMap
  const isDirty = React.useMemo(() => {
    return !initialValues.equals(currentValues)
  }, [initialValues, currentValues])
  return {
    initialValues,
    currentValues,
    setInitialValues,
    setValue,
    setValues,
    deleteField,
    deleteFields,
    reset,
    isDirty
  }
}

export default useForm
