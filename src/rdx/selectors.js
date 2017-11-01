import _ from 'lodash'
import { selectPluginConfigByKey, selectLocalPluginState, selectLocalPluginsForManagement, selectPluginConfigs } from './state'

export const selectPlugin = (state, id) => {
  const localPlugin = _.defaultTo(selectLocalPluginState(state, id), {})
  if (_.isNil(localPlugin) || _.isNil(localPlugin.pluginId)) {
    return localPlugin
  }
  return {
    ...localPlugin,
    def: selectPluginConfigByKey(state, localPlugin.pluginId)
  }
}

export const selectPluginsForManagement = (state) => selectLocalPluginsForManagement(state)
    .map(p => p.id)
    .map(localPluginId => selectPlugin(state, localPluginId))

export const selectPluginsForIdentity = (state) => _.values(selectPluginConfigs(state).byId)
    .filter(p => !_.isNil(p.identity))
    .map(p => ({ def: p }))

export * from './state'
