import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import app from './app'
import auth from './auth'

export default combineReducers({
  app,
  auth,
  form,
})

export * from './app'
export * from './auth'
