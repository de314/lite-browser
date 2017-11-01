import React from 'react'
import PropTypes from 'prop-types'

import { Spin, Row, Col } from 'antd'
import LoginTile from './LoginTile'

const Login = ({ isLoggingIn, plugins }) => (
  <div className="Login">
    <Spin spinning={isLoggingIn} >
      <div className="p">
        <h1>Welcome</h1>
      </div>
      <div className="p">
        <hr/>
      </div>
      <Row type="flex" justify="space-around">
        {plugins.map((plugin, i) => (
          <Col md={12} lg={6} xl={4} key={i}>
            <LoginTile plugin={plugin} />
          </Col>
        ))}
      </Row>
      <div className="p">
        <hr/>
      </div>
    </Spin>
  </div>
)

Login.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
}

export default Login
