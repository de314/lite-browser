import React from 'react'
import _ from 'lodash'
import { selectPluginsForManagement } from 'rdx/selectors'
import { deleteLocalPlugin } from 'rdx/actions'

import { compose } from 'recompose'
import { connect } from 'react-redux'

import ContentWrapper from 'components/layout/ContentWrapper'
import PluginsGrid from 'components/plugins/PluginsGrid'

const PluginsPage = ({ plugins, onDelete }) => {
  return (
    <div className="PluginsPage">
      <ContentWrapper>
        <h1>Installed Plugins</h1>
        <div className="p">
          <hr/>
        </div>
        <PluginsGrid plugins={plugins} onDelete={onDelete} />
      </ContentWrapper>
    </div>
  )
}

export default compose(
  connect(
    state => ({
      plugins: _.values(selectPluginsForManagement(state))
    }),
    dispatch => ({
      onDelete: (pluginId) => dispatch(deleteLocalPlugin(pluginId))
    })
  )
)(PluginsPage)
