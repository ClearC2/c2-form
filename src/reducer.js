import {fromJS, Map} from 'immutable'
import {
  SET_INITIAL_VALUES,
  SET_VALUE,
  SET_VALUES,
  RESET,
  DELETE_FIELD,
  DELETE_FIELDS,
  DELETE_FORM
} from './actions'

const emptyMap = Map()

function form (state = Map(), action) {
  switch (action.type) {
    case SET_INITIAL_VALUES:
      return state.set(action.formName, fromJS({
        initialValues: action.values,
        currentValues: action.values
      }))
    case SET_VALUE:
      return state.setIn([action.formName, 'currentValues', action.field], fromJS(action.value))
    case SET_VALUES:
      return state.mergeIn([action.formName, 'currentValues'], fromJS(action.values))
    case RESET:
      return state.setIn(
        [action.formName, 'currentValues'],
        state.getIn([action.formName, 'initialValues']) || emptyMap
      )
    case DELETE_FIELD:
      return state.deleteIn([action.formName, 'currentValues', action.field])
    case DELETE_FIELDS:
      let currentValues = state.getIn([action.formName, 'currentValues']) || emptyMap
      action.fields.forEach(field => {
        currentValues = currentValues.delete(field)
      })
      return state.setIn([action.formName, 'currentValues'], currentValues)
    case DELETE_FORM:
      return state.delete(action.formName)
    default:
      return state
  }
}

form.key = 'c2-form'

export default form
