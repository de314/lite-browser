import React from 'react'
import OAuthService from 'services/OAuthService'
import { loginUserEvent, loginUserSuccess, loginUserFailure } from 'rdx/actions'

import { withRouter } from 'react-router-dom'
import { compose, lifecycle, withProps } from 'recompose'
import { connect } from 'react-redux'

import FloatingContentWrapper from 'components/layout/FloatingContentWrapper'
import { Spin } from 'antd'

// const OAuthError = ({ qp: { error } }) => (
//   <div className="OAuthError">
//     <FloatingContentWrapper>
//       <h1 className="danger">{error} :(</h1>
//       <p>Try again later...</p>
//     </FloatingContentWrapper>
//   </div>
// );

let OAuthHandler = () => (
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
    props => ({ userPromise: OAuthService.getUser(props.location) })
  ),
  connect(
    () => ({}),
    (dispatch, props) => ({
      initLogin: () => dispatch(loginUserEvent()),
      onLogin: (user) => {
        props.history.push('/')
        dispatch(loginUserSuccess(user))
      },
      onLoginError: (error) => dispatch(loginUserFailure())
    })
  ),
  lifecycle({
    componentWillMount() {
      const { userPromise, onLogin, onLoginError } = this.props
      userPromise.then(onLogin)
          .catch(onLoginError)
    },
  }),
)(OAuthHandler)
