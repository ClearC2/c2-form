# @clearc2/c2-form [![CircleCI](https://circleci.com/gh/ClearC2/c2-form.svg?style=svg)](https://circleci.com/gh/ClearC2/c2-form)

Flexible forms that use ImmutableJS and can be integrated with redux.

## Install

```
yarn add @clearc2/c2-form
```

## Usage
The easiest way to get started is using the `useForm` hook.

```js
import React from 'react'
import {useForm} from '@clearc2/c2-form'

function NewsletterSignUpForm () {
  const form = useForm({name: '', email: ''}) // pass initial values
  const values = form.currentValues
  return (
    <form>
      <label>Name</label>
      <input
      	type='text'
        value={values.get('name')}
        onChange={(e) => form.setValue('name', e.target.value)}
      />
      <label>Email</label>
      <input
      	type='text'
        value={values.get('email')}
        onChange={(e) => form.setValue('email', e.target.value)}
      />
      <button type='submit' disabled={!form.isDirty}>
        Submit
      </button>
    </form>
  )
}

```

See `props` below to see all properties of `form`


## Redux support
To use the redux HOC, `formHOC`, add the reducer to your main application's reducer using the required key.

```js
import {combineReducers} from 'redux-immutable'
import {reducer as formReducer} from '@clearc2/c2-form'

const reducer = combineReducers({
  // ...other reducers
  [formReducer.key]: formReducer
})
```

## Redux usage
```js
import {connect} from 'react-redux'
import {formHOC} from '@clearc2/c2-form'
import SiteForm from './SiteForm'

const props = {siteId} => ({formName: `site-form-${siteId}`})

export default connect(props)(formHOC(SiteForm))
```

The `formHOC` gives your component props and connected actions scoped to this specific form based on the `formName`.

[See the working example.](example/src/Example.js)

## Redux-less HOC
There is also a redux-less HOC that uses component state. You do not need to pass in a `formName`.
The passed down props are exactly the same except for `deleteForm`. This is not passed down because `deleteForm` is only relevant
for the redux enabled `formHOC` HOC.


```js
import {withForm} from '@clearc2/c2-form'
import SiteForm from './SiteForm'

export default withForm(SiteForm)
```

## Props
#### `initialValues: object`
The initial values of the form. Defaults to `Map()`.

#### `currentValues: object`
The current values of the form. Defaults to `Map()`.

#### `isDirty: boolean`
`true` if the `initialValues` do not equal the `currentValues`. Defaults to `false`.

#### `isClean: boolean`
`true` if the `initialValues` equal the `currentValues`. Defaults to `true`.

#### `setInitialValues(initialValues: object, currentValues: ?object): func`
Initialize your form in the `componentDidMount` lifecycle method with this action and pass in an object of field/value pairs.
If a second argument is passed, it will set the current values equal to that argument. Needing to send `currentValues` should be very rare. 
#### `setValue(field: string, value: any): func`
Set a value in the form. Use this in an `input`'s `onChange` callback.

#### `setValues(values: object): func`
Set multiple values in the form at once. The `values` object should be field/value pairs.

#### `deleteField(field: string): func`
Delete a form field.

#### `deleteFields(fields: array): func`
Delete multiple form fields.

#### `reset(): func`
Sets the `currentValues` back to the `initialValues`.

#### `deleteForm(): func`
Deletes the `formName` key and data from redux.


## `useValues<T>()`
This is a version of `useForm` that does _not_ convert the underlying data to immutable-js. It also supports a type generic so type safety is enforced.

<img alt="useValues" src="https://user-images.githubusercontent.com/881986/177864825-83bc8f7d-8774-4e45-aa39-32f2f82ed787.png">


## Tips


## Default values
 Always ensure a non-null default in your inputs. React will complain about the input changing from an uncontrolled to a controlled input if the value goes from null to something non-null while having an `onChange` defined.

 ```jsx
<input
  value={this.props.currentValues.get('foobar') || ''}
  onChange={e => this.props.setValue('foobar', e.target.value)}
/>
 ```

## Updating child objects

It is a common requirement to be able to update child objects. This can be done with `setValue`.

```jsx
const lineItems = this.props.currentValues.get('lineItems') || List()

{lineItems.map((lineItem, i) => (
  <div key={i}>
    <input
      value={lineItem.get('name') || ''}
      onChange={e => {
        const updatedItems = lineItems.update(i, item => item.set('name', e.target.value))
        this.props.setValue('lineItems', updatedItems)
      }}
    />
  </div>
))}
```
