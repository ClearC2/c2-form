import React, {Component} from 'react'
import {connect} from 'react-redux'
import selector from './selector'
import {
  setInitialValues,
  setValue,
  setValues,
  deleteField,
  deleteCurrentForm,
  deleteTargetForm,
  reset
} from './actions'
import formPropTypes from './prop-types'

const actions = {
  setInitialValues,
  setValue,
  setValues,
  deleteField,
  deleteCurrentForm,
  deleteTargetForm,
  reset
}

const toJS = value => value && value.toJS ? value.toJS() : value

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
          deleteCurrentForm={() => this.props.deleteCurrentForm(formName)}
          deleteTargetForm={targetForm => this.props.deleteTargetForm(targetForm)}
          reset={() => this.props.reset(formName)}
        />
      )
    }
  })
}
