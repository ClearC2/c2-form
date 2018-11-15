import React from 'react'
import withForm from '../withForm'
import {render} from 'react-testing-library'

describe('withForm', () => {
  it('should render base component', () => {
    const FooBar = () => <span>Foobar</span>
    const WithFormFoobar = withForm(FooBar)
    const {getByText} = render(<WithFormFoobar />)
    getByText('Foobar')
  })
})
