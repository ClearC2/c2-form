import React, {Component} from 'react'
import {Map, fromJS} from 'immutable'

const withForm = (BaseComponent) => {
  return class extends Component {
    state = {
      initialValues: Map(),
      currentValues: Map()
    }
    setInitialValues = (initialValues, currentValues) => {
      initialValues = fromJS(initialValues)
      this.setState({
        initialValues,
        currentValues: currentValues ? fromJS(currentValues) : initialValues
      })
    }
    setValue = (field, value) => {
      this.setState({
        currentValues: this.state.currentValues.set(field, fromJS(value))
      })
    }
    setValues = (values) => {
      this.setState({
        currentValues: this.state.currentValues.merge(fromJS(values))
      })
    }
    deleteField = (field) => {
      this.setState({
        currentValues: this.state.currentValues.delete(field)
      })
    }
    deleteFields = (fields) => {
      let currentValues = this.state.currentValues
      fields.forEach(field => {
        currentValues = currentValues.delete(field)
      })
      this.setState({currentValues})
    }
    reset = () => {
      this.setState({
        currentValues: this.state.initialValues
      })
    }
    render () {
      const {initialValues, currentValues} = this.state
      return (
        <BaseComponent
          {...this.props}
          initialValues={this.state.initialValues}
          currentValues={this.state.currentValues}
          setInitialValues={this.setInitialValues}
          setValue={this.setValue}
          setValues={this.setValues}
          deleteField={this.deleteField}
          deleteFields={this.deleteFields}
          reset={this.reset}
          isDirty={!initialValues.equals(currentValues)}
        />
      )
    }
  }
}

export default withForm
