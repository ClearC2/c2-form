import {fromJS, Map} from 'immutable'

import {
  SET_INITIAL_VALUES,
  SET_VALUE,
  SET_VALUES,
  RESET,
  DELETE_FIELD
} from './actions'

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
      return state.setIn([action.formName, 'currentValues'], state.getIn([action.formName, 'initialValues']) || Map())
    case DELETE_FIELD:
      return state.deleteIn([action.formName, 'currentValues', action.field])
    default:
      return state
  }
}

form.key = 'c2-form'

export default form
