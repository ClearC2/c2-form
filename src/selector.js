import {Map} from 'immutable'
import reducer from './reducer'

const {key} = reducer

const emptyMap = Map()

const form = (state, {formName}) => {
  const initialValues = state.getIn([key, formName, 'initialValues']) || emptyMap
  const currentValues = state.getIn([key, formName, 'currentValues']) || emptyMap
  const isDirty = !initialValues.equals(currentValues)
  return {
    initialValues,
    currentValues,
    isDirty,
    isClean: !isDirty
  }
}

export default form
