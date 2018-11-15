import React, {Component} from 'react'
import {Map} from 'immutable'

const withForm = (BaseComponent) => {
  return class extends Component {
    state = {
      initialValues: Map(),
      currentValues: Map()
    }
    render () {
      const {initialValues, currentValues} = this.state
      return (
        <BaseComponent
          {...this.props}
          isDirty={initialValues.equals(currentValues)}
        />
      )
    }
  }
}

export default withForm
