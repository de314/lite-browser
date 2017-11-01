import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import app from './app'
import auth from './auth'
import local from './local'

export default combineReducers({
  app,
  auth,
  form,
  local,
})

export * from './app'
export * from './auth'
export * from './local'
