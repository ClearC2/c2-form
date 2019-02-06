import React, {Component} from 'react'
import {Map, fromJS} from 'immutable'

const withForm = (BaseComponent) => {
  return class extends Component {
    state = {
      initialValues: Map(),
      currentValues: Map()
    }
    setInitialValues = (values) => {
      values = fromJS(values)
      this.setState({
        initialValues: values,
        currentValues: values
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
          reset={this.reset}
          isDirty={!initialValues.equals(currentValues)}
        />
      )
    }
  }
}

export default withForm
