import React from 'react'
import _ from 'lodash'
import { selectPluginConfigs } from 'rdx/selectors'

import { compose } from 'recompose'
import { connect } from 'react-redux'

import ContentWrapper from 'components/layout/ContentWrapper'
import PluginsGrid from 'components/plugins/PluginsGrid'

const PluginSearchPage = ({ plugins }) => {
  return (
    <div className="PluginSearchPage">
      <ContentWrapper>
        <h1>Search Plugins</h1>
        <div className="p">
          <hr/>
        </div>
        <PluginsGrid plugins={plugins} />
      </ContentWrapper>
    </div>
  )
}

export default compose(
  connect(
    state => ({
      plugins: _.values(selectPluginConfigs(state).byId).map(def => ({ def }))
    })
  )
)(PluginSearchPage)
