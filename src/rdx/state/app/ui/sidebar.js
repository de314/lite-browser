import _ from 'lodash'
import { SET_SIDEBAR_COLLAPSE } from 'rdx/actions'

const selectSlice = (state) => _.get(state, 'app.ui.sidebar')

export const selectSidebar = (state) => selectSlice(state)

export const selectSidebarCollapsed = (state) => selectSlice(state).collapsed

const defaultState = {
  collapsed: false
};

export default (state = defaultState, action) => {
  switch (action.type) {

    case SET_SIDEBAR_COLLAPSE: {
     return {
       ...state,
       collapsed: action.collapsed,
     }
    }

    default:
  }
  return state;
}
