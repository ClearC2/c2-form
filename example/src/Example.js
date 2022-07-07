import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formHOC} from '../../src'

class Example extends Component {
  componentDidMount = () => {
    this.props.setInitialValues({
      foo: '123',
      bar: 'abc',
      baz: false
    })
  }

  onSubmit = () => {
    this.props.setInitialValues(this.props.currentValues.toJS())
  }

  render () {
    const {currentValues, setValue} = this.props
    const values = currentValues.toJS()
    return (
      <div className='row'>
        <div className='col-xs-3 col-xs-offset-4'>
          <form
            style={{marginTop: 200}}
            onSubmit={e => {
              e.preventDefault()
              this.onSubmit()
            }}
          >
            <div className='form-group'>
              <label>Foo</label>
              <input
                className='form-control'
                value={values.foo || ''}
                onChange={e => setValue('foo', e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Bar</label>
              <input
                className='form-control'
                value={values.bar || ''}
                onChange={e => setValue('bar', e.target.value)}
              />
            </div>
            <div className='checkbox'>
              <label>
                <input
                  type='checkbox'
                  checked={values.baz || false}
                  onChange={() => setValue('baz', !(values.baz || false))}
                /> Baz
              </label>
            </div>
            <div className='text-right'>
              <button
                type='button'
                className='btn btn-default'
                onClick={this.props.reset}
                disabled={!this.props.isDirty}
              >
                Reset
              </button> &nbsp;
              <button
                type='submit'
                className='btn btn-primary'
                disabled={!this.props.isDirty}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const props = () => ({formName: 'test-form'})

export default connect(props)(formHOC(Example))
