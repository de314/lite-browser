import React from 'react'
import _ from 'lodash'
import OAuthService from 'services/OAuthService'
import {
  loginUserSuccess, loginUserFailure,
  authPluginSuccess, authPluginFailure
} from 'rdx/actions'
import { selectPlugin } from 'rdx/selectors'

import { withRouter } from 'react-router-dom'
import { compose, lifecycle, withProps } from 'recompose'
import { connect } from 'react-redux'

import FloatingContentWrapper from 'components/layout/FloatingContentWrapper'
import { Spin } from 'antd'

let OAuthHandler = ({ params }) => (
  <div className="OAuthHandler">
    <FloatingContentWrapper>
      <Spin spinning={true}>
        <h1>Processing Login...</h1>
      </Spin>
    </FloatingContentWrapper>
  </div>
);

export default compose(
  withRouter,
  withProps(
    props => ({ params: OAuthService.parseQueryParams(props.location) })
  ),
  connect(
    (state, { params }) => ({
      plugin: selectPlugin(state, params.state.id),
    }),
    (dispatch, props) => ({
      onLogin: (user) => {
        props.history.push('/')
        dispatch(loginUserSuccess(user))
      },
      onLoginError: (error) => dispatch(loginUserFailure()),
      onAuthPluginSuccess: (plugin, params) => {
        dispatch(authPluginSuccess(plugin, params))
        props.history.push(`/plugins/settings/${plugin.id}`)
      },
      onAuthPluginFailure: (plugin, params) => {
        dispatch(authPluginFailure(plugin, params))
        props.history.push(`/plugins/settings/${plugin.id}`)
      },
    })
  ),
  lifecycle({
    componentWillMount() {
      const { plugin, params } = this.props
      switch (params.state.type) {

        case 'authentication': {
          const { onAuthPluginSuccess, onAuthPluginFailure } = this.props
          if (_.isNil(params.error)) {
            onAuthPluginSuccess(plugin, params)
          } else {
            onAuthPluginFailure(plugin, params)
          }

          break;
        }

        case 'identity': {
          const { onLogin, onLoginError } = this.props
          OAuthService.getUser(params, plugin)
              .then(onLogin)
              .catch(onLoginError)
          break;
        }

        default:
      }

    },
  }),
)(OAuthHandler)
