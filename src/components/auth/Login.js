import React from 'react'
import PropTypes from 'prop-types'
import OAuthService from 'services/OAuthService'

import { Spin, Button } from 'antd'

const Login = ({ isLoggingIn }) => (
  <div className="Login">
    <Spin spinning={isLoggingIn} >
      <h1>Hello, Login!</h1>
      <p>{isLoggingIn + ''}</p>
      <a href={OAuthService.getImgurAuthUrl()}>
        <Button className="oauth-btn oauth-btn-imgur">Login with Imgur</Button>
      </a>
      <a href={OAuthService.getRedditAuthUrl()}>
        <Button className="oauth-btn oauth-btn-reddit">Login with Reddit</Button>
      </a>
      <a href={OAuthService.getGoogleAuthUrl()}>
        <Button className="oauth-btn oauth-btn-google">Login with Google</Button>
      </a>
    </Spin>
  </div>
)

Login.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
}

export default Login
