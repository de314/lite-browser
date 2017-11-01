import React from 'react'
import { selectIsLoggingIn } from 'rdx/selectors'

import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'

import FloatingContentWrapper from 'components/layout/FloatingContentWrapper'
import Login from 'components/auth/Login'

let LoginPage = ({ isLoggingIn }) => (
  <div className="LoginPage">
    <FloatingContentWrapper>
      <Login isLoggingIn={isLoggingIn} />
    </FloatingContentWrapper>
  </div>
)

export default compose(
  connect(
    state => ({
      isLoggingIn: selectIsLoggingIn(state)
    })
  ),
  withProps(props => ({}))
)(LoginPage)
