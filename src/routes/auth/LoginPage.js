import React from 'react'
import { selectIsLoggingIn, selectPluginsForIdentity } from 'rdx/selectors'

import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'

import FloatingContentWrapper from 'components/layout/FloatingContentWrapper'
import Login from 'components/auth/Login'

let LoginPage = ({ plugins, isLoggingIn }) => (
  <div className="LoginPage">
    <FloatingContentWrapper>
      <Login isLoggingIn={isLoggingIn} plugins={plugins} />
    </FloatingContentWrapper>
  </div>
)

export default compose(
  connect(
    state => ({
      plugins: selectPluginsForIdentity(state),
      isLoggingIn: selectIsLoggingIn(state)
    })
  ),
  withProps(props => ({}))
)(LoginPage)
