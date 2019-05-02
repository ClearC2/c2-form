import React, {Component} from 'react'
import {connect} from 'react-redux'
import selector from './selector'
import {
  setInitialValues,
  setValue,
  setValues,
  deleteField,
  deleteFields,
  deleteForm,
  reset
} from './actions'
import formPropTypes from './prop-types'

const actions = {
  setInitialValues,
  setValue,
  setValues,
  deleteField,
  deleteFields,
  deleteForm,
  reset
}

const toJS = value => value && value.toJS ? value.toJS() : value

export default function (BaseComponent) {
  return connect(selector, actions)(class FormHOC extends Component {
    static propTypes = formPropTypes
    setInitialValues = (initialValues, currentValues) => {
      this.props.setInitialValues(this.props.formName, toJS(initialValues), toJS(currentValues))
    }
    setValue = (field, value) => this.props.setValue(this.props.formName, field, toJS(value))
    setValues = (values) => this.props.setValues(this.props.formName, toJS(values))
    deleteField = (field) => this.props.deleteField(this.props.formName, field)
    deleteFields = (fields) => this.props.deleteFields(this.props.formName, fields)
    deleteForm = () => this.props.deleteForm(this.props.formName)
    reset = () => this.props.reset(this.props.formName)
    render () {
      return (
        <BaseComponent
          {...this.props}
          setInitialValues={this.setInitialValues}
          setValue={this.setValue}
          setValues={this.setValues}
          deleteField={this.deleteField}
          deleteFields={this.deleteFields}
          deleteForm={this.deleteForm}
          reset={this.reset}
        />
      )
    }
  })
}
