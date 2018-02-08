import {Map} from 'immutable'
import reducer from './reducer'

const {key} = reducer

const form = (state, {formName}) => {
  const initialValues = state.getIn([key, formName, 'initialValues']) || Map()
  const currentValues = state.getIn([key, formName, 'currentValues']) || Map()
  return {
    initialValues,
    currentValues,
    isDirty: !initialValues.equals(currentValues)
  }
}

export default form
