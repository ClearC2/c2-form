import {Map} from 'immutable'
import {createStore, compose} from 'redux'
import {combineReducers} from 'redux-immutable'
import {reducer as formReducer} from '../../src'

const reducer = combineReducers({
  [formReducer.key]: formReducer
})

const store = createStore(
  reducer,
  Map(),
  compose(
    window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

export default store
