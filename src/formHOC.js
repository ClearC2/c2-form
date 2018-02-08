import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import form from './selector'
import {
  setInitialValues,
  setValue,
  reset,
  setValues,
  deleteField
} from './actions'

export const formPropTypes = {
  formName: PropTypes.string,
  setInitialValues: PropTypes.func,
  setValue: PropTypes.func,
  setValues: PropTypes.func,
  reset: PropTypes.func,
  deleteField: PropTypes.func,
  initialValues: PropTypes.object,
  currentValues: PropTypes.object
}

export default function (BaseComponent) {
  const actions = {
    setInitialValues,
    setValue,
    setValues,
    deleteField,
    reset
  }
  return connect(form, actions)(class FormHOC extends Component {
    static propTypes = formPropTypes
    render () {
      const {formName} = this.props
      return (
        <BaseComponent
          {...this.props}
          setInitialValues={values => this.props.setInitialValues(formName, values.toJS ? values.toJS() : values)}
          setValue={(field, value) => this.props.setValue(formName, field, value.toJS ? value.toJS() : value)}
          setValues={values => this.props.setValues(formName, values.toJS ? values.toJS() : values)}
          deleteField={field => this.props.deleteField(formName, field)}
          reset={() => this.props.reset(formName)}
        />
      )
    }
  })
}
