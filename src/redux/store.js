import { createStore, combineReducers, applyMiddleware } from 'redux'
import currencyReducer from './currency-reducer'
import thunkMiddleware from 'redux-thunk';


const reducers = combineReducers({
	currency: currencyReducer
})


const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store