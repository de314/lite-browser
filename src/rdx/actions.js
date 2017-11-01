const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type }
  argNames.forEach((arg, index) => action[argNames[index]] = args[index])
  return action
}

/* <<<<<<< AUTH >>>>>>>> */

export const LOGIN_USER_EVENT = 'LOGIN_USER_EVENT'
export const loginUserEvent = makeActionCreator(LOGIN_USER_EVENT)

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const loginUserSuccess = makeActionCreator(LOGIN_USER_SUCCESS, 'user')

export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const loginUserFailure = makeActionCreator(LOGIN_USER_FAILURE, 'error')

export const LOGOUT_USER_EVENT = 'LOGOUT_USER_EVENT';
export const logoutUserEvent = makeActionCreator(LOGOUT_USER_EVENT)

export const AUTH_PLUGIN_SUCCESS = 'AUTH_PLUGIN_SUCCESS'
export const authPluginSuccess = makeActionCreator(AUTH_PLUGIN_SUCCESS, 'plugin', 'params')

export const AUTH_PLUGIN_FAILURE = 'AUTH_PLUGIN_FAILURE'
export const authPluginFailure = makeActionCreator(AUTH_PLUGIN_FAILURE, 'plugin', 'params')

/* <<<<<<< APP/UI >>>>>>>> */

export const SET_SIDEBAR_COLLAPSE = 'SET_SIDEBAR_COLLAPSE'
export const setSidebarCollapse = makeActionCreator(SET_SIDEBAR_COLLAPSE, 'collapsed')

/* <<<<<<< LOCAL/PLUGINS >>>>>>>> */

export const UPDATE_LOCAL_PLUGIN = 'UPDATE_LOCAL_PLUGIN'
export const updateLocalPlugin = makeActionCreator(UPDATE_LOCAL_PLUGIN, 'plugin')

export const SAVE_LOCAL_PLUGIN = 'SAVE_LOCAL_PLUGIN'
export const saveLocalPlugin = makeActionCreator(SAVE_LOCAL_PLUGIN, 'plugin')

export const DELETE_LOCAL_PLUGIN = 'DELETE_LOCAL_PLUGIN'
export const deleteLocalPlugin = makeActionCreator(DELETE_LOCAL_PLUGIN, 'pluginId')
