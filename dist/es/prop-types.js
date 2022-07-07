import PropTypes from 'prop-types';
export var formPropTypes = {
  formName: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  currentValues: PropTypes.object.isRequired,
  setInitialValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  deleteField: PropTypes.func.isRequired,
  deleteFields: PropTypes.func.isRequired,
  deleteForm: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  isDirty: PropTypes.bool.isRequired,
  isClean: PropTypes.bool.isRequired
};
export default formPropTypes;