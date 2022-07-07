import { Map } from 'immutable';
import reducer from "./reducer";
var key = reducer.key;
var emptyMap = Map();

var form = function form(state, _ref) {
  var formName = _ref.formName;
  var initialValues = state.getIn([key, formName, 'initialValues']) || emptyMap;
  var currentValues = state.getIn([key, formName, 'currentValues']) || emptyMap;
  var isDirty = !initialValues.equals(currentValues);
  return {
    initialValues: initialValues,
    currentValues: currentValues,
    isDirty: isDirty,
    isClean: !isDirty
  };
};

export default form;