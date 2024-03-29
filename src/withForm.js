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
      this.setState((state) => ({
        ...state,
        initialValues,
        currentValues: currentValues ? fromJS(currentValues) : initialValues
      }))
    }
    setValue = (field, value) => {
      this.setState((state) => ({
        ...state,
        currentValues: state.currentValues.set(field, fromJS(value))
      }))
    }
    setValues = (values) => {
      if (typeof values === 'function') {
        this.setState((state) => {
          values = values(state.currentValues)
          return {
            ...state,
            currentValues: fromJS(values)
          }
        })
        return
      }
      this.setState((state) => ({
        ...state,
        currentValues: state.currentValues.merge(fromJS(values))
      }))
    }
    deleteField = (field) => {
      this.setState((state) => ({
        ...state,
        currentValues: state.currentValues.delete(field)
      }))
    }
    deleteFields = (fields) => {
      this.setState((state) => {
        let currentValues = state.currentValues
        fields.forEach(field => {
          currentValues = currentValues.delete(field)
        })
        return {...state, currentValues}
      })
    }
    reset = () => {
      this.setState((state) => ({
        ...state,
        currentValues: state.initialValues
      }))
    }
    render () {
      const {initialValues, currentValues} = this.state
      const isDirty = !initialValues.equals(currentValues)
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
          isDirty={isDirty}
          isClean={!isDirty}
        />
      )
    }
  }
}

export default withForm
