import React from 'react'
import PropTypes from 'prop-types'

import OAuthImplicitForm from './OAuthImplicitForm'

const AuthForm = ({ plugin }) => {
  let content = ''
  switch (plugin.def.authentication.strategy) {
    case 'OAUTH_IMPLICIT':
      content = (<OAuthImplicitForm plugin={plugin} />)
      break;
    default:
  }
  return (
    <div className="AuthForm">
      {content}
    </div>
  )
}

AuthForm.propTypes = {
  plugin: PropTypes.shape({
    def: PropTypes.shape({
      authentication: PropTypes.shape({
        strategy: PropTypes.oneOf(['OAUTH_IMPLICIT']).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default AuthForm
