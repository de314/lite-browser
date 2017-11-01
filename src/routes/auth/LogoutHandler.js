import React from 'react'
import { logoutUserEvent } from 'rdx/actions'

import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'

import FloatingContentWrapper from 'components/layout/FloatingContentWrapper'
import { Spin } from 'antd'

let LogoutHandler = () => (
  <div className="LogoutHandler">
    <FloatingContentWrapper>
      <div>
        <h1>Logging out...</h1>
      </div>
      <Spin />
    </FloatingContentWrapper>
  </div>
)

export default compose(
  withRouter,
  connect(
    state => ({}),
    dispatch => ({
      onLogout: () => dispatch(logoutUserEvent())
    })
  ),
  lifecycle({
    componentWillMount() {
      const { history, onLogout } = this.props
      onLogout()
      history.push('/login')
    },
  })
)(LogoutHandler)
