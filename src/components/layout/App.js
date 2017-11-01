import React from 'react'
import { selectIsAnon, selectIsLoggingIn } from 'rdx/selectors'

import { branch, compose, renderComponent } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PrivateApp from './PrivateApp'
import PublicApp from './PublicApp'

const AuthAwareContent = compose(
  withRouter,
  connect(
    state => ({
      isAnon: selectIsAnon(state),
      isLoggingIn: selectIsLoggingIn(state),
    })
  ),
  branch(
    ({ isAnon }) => !isAnon,
    renderComponent(PrivateApp)
  ),
)(PublicApp)

const App = () => (
  <div className="App">
    <AuthAwareContent />
  </div>
)

export default App
