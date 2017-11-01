import React from 'react'
import _ from 'lodash'
import { selectPluginConfigByKey, selectLocalPluginForInstall } from 'rdx/selectors'
import { updateLocalPlugin, saveLocalPlugin } from 'rdx/actions'

import { withRouter } from 'react-router-dom'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'

import ContentWrapper from 'components/layout/ContentWrapper'
import SettingsForm from 'components/plugins/SettingsForm'

const InstallPage = ({ config, onChange, onSave }) => (
  <div className="InstallPage">
    <ContentWrapper>
      <SettingsForm config={config} onChange={onChange} onSave={onSave} />
    </ContentWrapper>
  </div>
)

export default compose(
  withRouter,
  withProps(({ match: { params: { pluginId }}}) => ({
    pluginId,
  })),
  connect(
    (state, { pluginId, history }) => ({
      config: {
        history,
        def: selectPluginConfigByKey(state, pluginId),
        ...selectLocalPluginForInstall(state, pluginId)
      },
    }),
    (dispatch, { history }) => ({
      onChange: (config) => dispatch(updateLocalPlugin(_.omit(config, ['def']))),
      onSave: (config) => {
        dispatch(saveLocalPlugin(_.omit(config, ['def'])))
        history.push('/plugins')
      },
    })
  ),
)(InstallPage)
