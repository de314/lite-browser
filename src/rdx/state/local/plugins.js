import _ from 'lodash'
import uuid from 'uuid'
import { UPDATE_LOCAL_PLUGIN, SAVE_LOCAL_PLUGIN, DELETE_LOCAL_PLUGIN,
  AUTH_PLUGIN_SUCCESS, AUTH_PLUGIN_FAILURE } from 'rdx/actions'

const selectSlice = (state) => _.get(state, 'local.plugins')

export const selectLocalPluginsState = (state) => selectSlice(state)
export const selectLocalPluginState = (state, key) => selectLocalPluginsState(state)[key]

export const selectLocalPluginForInstall = (state, pluginId) => {
  return _.defaultTo(
    _.find(_.values(selectLocalPluginsState(state)), { pluginId, initialized: false }),
    getInitPluginState(pluginId)
  )
}

export const selectLocalPluginsForManagement = (state) => _.filter(selectLocalPluginsState(state), 'initialized')

const getInitPluginState = (pluginId, id = uuid()) => ({
  id,
  pluginId,
  initialized: false,
  title: 'New Plugin',
  auth: {},
})

const defaultState = {
};

export default (state = defaultState, action) => {
  switch (action.type) {

    case UPDATE_LOCAL_PLUGIN: {
      const { plugin } = action
      const { id } = plugin
      return {
        ...state,
        [id]: {
          ...state[id],
          ...plugin,
        }
      }
    }

    case SAVE_LOCAL_PLUGIN: {
      const { plugin } = action
      const { id } = plugin
      return {
        ...state,
        [id]: {
          ...state[id],
          ...plugin,
          initialized: true,
        }
      }
    }

    case DELETE_LOCAL_PLUGIN: {
      const newState = { ...state }
      delete newState[action.pluginId]
      return newState
    }

    case AUTH_PLUGIN_SUCCESS:
    case AUTH_PLUGIN_FAILURE: {
      const { plugin, params } = action
      const { id } = plugin
      return {
        ...state,
        [id]: {
          ...state[id],
          ...plugin,
          auth: {
            ...params,
          }
        }
      }
    }

    default:
  }
  return state;
}
