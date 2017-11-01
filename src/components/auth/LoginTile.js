import React from 'react'
import PropTypes from 'prop-types'
import OAuthService from 'services/OAuthService'

import { Card } from 'antd'

const LoginTile = ({ plugin }) => {
  return (
    <div className="LoginTile">
      <a href={OAuthService.buildUrlForLogin(plugin)}>
        <Card style={{ padding: 0 }}>
          <div className="custom-image">
            <img alt="" width="100%" src={plugin.def.thumbnail} />
          </div>
          <div className="custom-card ta-c">
            <h3>Login with {plugin.def.name}</h3>
          </div>
        </Card>
      </a>
    </div>
  )
}

LoginTile.propTypes = {
  plugin: PropTypes.shape({
    def: PropTypes.object.isRequired,
  }).isRequired,
}

export default LoginTile
