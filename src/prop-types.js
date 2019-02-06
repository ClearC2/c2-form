import PropTypes from 'prop-types'

export const formPropTypes = {
  formName: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  currentValues: PropTypes.object.isRequired,
  setInitialValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  deleteField: PropTypes.func.isRequired,
  deleteForm: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

export default formPropTypes
