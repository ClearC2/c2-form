import {Map} from 'immutable'
import {createStore, compose} from 'redux'
import {combineReducers} from 'redux-immutable'
import {reducer as formReducer} from '../../src/index'

const reducer = combineReducers({
  [formReducer.key]: formReducer
})

const store = createStore(
  reducer,
  Map(),
  compose(
    window && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
