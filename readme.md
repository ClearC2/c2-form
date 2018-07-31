# C2 Form

## Install

```
yarn add ClearC2/c2-form#^1.0.0
```

Now add the reducer to your main application's reducer using the required key.

```js
import {combineReducers} from 'redux-immutable'
import {reducer as formReducer} from 'c2-form'

const reducer = combineReducers({
  // ...other reducers
  [formReducer.key]: formReducer
})
```

## Usage
```js
import {connect} from 'react-redux'
import {formHOC} from 'c2-form'

const props = {siteId} => ({formName: `site-form-${siteId}`})

export default connect(props)(formHOC(SiteForm))
```

The `formHOC` gives your component props and connected actions scoped to this specific form based on the `formName`.

[See the working example.](example/src/Example.js)

## Props
#### `initialValues: object`
The initial values of the form. Defaults to `Map()`.

#### `currentValues: object`
The current values of the form. Defaults to `Map()`.

#### `isDirty: boolean`
`true` if the `initialValues` do not equal the `currentValues`. Defaults to `false`.

#### `setInitialValues(values: object): func`
Initialize your form in the `componentDidMount` lifecycle method with this action and pass in an object of field/value pairs.

#### `setValue(field: string, value: any): func`
Set a value in the form. Use this in an `input`'s `onChange` callback.

#### `setValues(values: object): func`
Set multiple values in the form at once. The `values` object should be field/value pairs.

#### `deleteField(field: string): func`
Delete a form field.

#### `reset(): func`
Sets the `currentValues` back to the `initialValues`.

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
