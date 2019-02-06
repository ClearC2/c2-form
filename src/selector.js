import {Map} from 'immutable'
import reducer from './reducer'

const {key} = reducer

const emptyMap = Map()

const form = (state, {formName}) => {
  const initialValues = state.getIn([key, formName, 'initialValues']) || emptyMap
  const currentValues = state.getIn([key, formName, 'currentValues']) || emptyMap
  return {
    initialValues,
    currentValues,
    isDirty: !initialValues.equals(currentValues)
  }
}

export default form
