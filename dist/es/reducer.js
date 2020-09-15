import { fromJS, Map } from 'immutable';
import { SET_INITIAL_VALUES, SET_VALUE, SET_VALUES, RESET, DELETE_FIELD, DELETE_FIELDS, DELETE_FORM } from "./actions";
var emptyMap = Map();

function form() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Map();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_INITIAL_VALUES:
      return state.set(action.formName, fromJS({
        initialValues: action.initialValues,
        currentValues: action.currentValues || action.initialValues
      }));

    case SET_VALUE:
      return state.setIn([action.formName, 'currentValues', action.field], fromJS(action.value));

    case SET_VALUES:
      if (typeof action.values === 'function') {
        var _currentValues = state.getIn([action.formName, 'currentValues']) || emptyMap;

        var values = action.values(_currentValues);
        return state.setIn([action.formName, 'currentValues'], fromJS(values));
      }

      return state.mergeIn([action.formName, 'currentValues'], fromJS(action.values));

    case RESET:
      return state.setIn([action.formName, 'currentValues'], state.getIn([action.formName, 'initialValues']) || emptyMap);

    case DELETE_FIELD:
      return state.deleteIn([action.formName, 'currentValues', action.field]);

    case DELETE_FIELDS:
      var currentValues = state.getIn([action.formName, 'currentValues']) || emptyMap;
      action.fields.forEach(function (field) {
        currentValues = currentValues["delete"](field);
      });
      return state.setIn([action.formName, 'currentValues'], currentValues);

    case DELETE_FORM:
      return state["delete"](action.formName);

    default:
      return state;
  }
}

form.key = 'c2-form';
export default form;