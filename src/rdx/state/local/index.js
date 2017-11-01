import { combineReducers } from 'redux'
import plugins from './plugins'

export default combineReducers({
  plugins,
})

export * from './plugins'
