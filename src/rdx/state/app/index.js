import { combineReducers } from 'redux'
import plugins from './plugins'
import ui from './ui'

export default combineReducers({
  plugins,
  ui,
})

export * from './plugins'
export * from './ui'
