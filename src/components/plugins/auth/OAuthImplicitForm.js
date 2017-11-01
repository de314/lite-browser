import React from 'react'
import PropTypes from 'prop-types'
import OAuthService from 'services/OAuthService'
import moment from 'moment'

import { Button } from 'antd'

const OAuthImplicitForm = ({ plugin }) => {
  const validation = OAuthService.checkValid(plugin)
  return (
    <div className="OAuthImplicitForm">
      <p>
        In order to provide plugin functionality, you need to grant this
        application the ability to act on your behalf.
      </p>
      <div className="ta-c p">
        <h3>Your {plugin.def.name} token {validation.valid ? 'expires' : 'expired'} {moment(validation.expiresAt).fromNow()}.</h3>
        <a href={OAuthService.buildUrlForPlugin(plugin)}>
          <Button type={validation.valid ? 'dashed' : 'primary'}>Grant Plugin Access to {plugin.def.name}</Button>
        </a>
      </div>
    </div>
  )
}

OAuthImplicitForm.propTypes = {
  plugin: PropTypes.shape({
    def: PropTypes.shape({
      authentication: PropTypes.shape({
        authorizationUrl: PropTypes.string.isRequired,
        enrich: PropTypes.func,
        params: PropTypes.object,
        strategy: PropTypes.oneOf(['OAUTH_IMPLICIT']).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default OAuthImplicitForm
