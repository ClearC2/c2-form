import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import selector from './selector'
import {
  setInitialValues,
  setValue,
  setValues,
  deleteField,
  reset
} from './actions'

export const formPropTypes = {
  formName: PropTypes.string,
  initialValues: PropTypes.object,
  currentValues: PropTypes.object,
  setInitialValues: PropTypes.func,
  setValue: PropTypes.func,
  setValues: PropTypes.func,
  deleteField: PropTypes.func,
  reset: PropTypes.func
}

const actions = {
  setInitialValues,
  setValue,
  setValues,
  deleteField,
  reset
}

const toJS = value => value.toJS ? value.toJS() : value

export default function (BaseComponent) {
  return connect(selector, actions)(class FormHOC extends Component {
    static propTypes = formPropTypes
    render () {
      const {formName} = this.props
      return (
        <BaseComponent
          {...this.props}
          setInitialValues={values => this.props.setInitialValues(formName, toJS(values))}
          setValue={(field, value) => this.props.setValue(formName, field, toJS(value))}
          setValues={values => this.props.setValues(formName, toJS(values))}
          deleteField={field => this.props.deleteField(formName, field)}
          reset={() => this.props.reset(formName)}
        />
      )
    }
  })
}
