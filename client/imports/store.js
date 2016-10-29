import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './reducers'

const createStoreWithMiddlewares = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)

export default createStoreWithMiddlewares(reducer)
