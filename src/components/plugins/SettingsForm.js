import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { compose, withHandlers } from 'recompose'

import { Button, Input } from 'antd'
import AuthForm from './auth/AuthForm'

const SettingsForm = ({ config, setTitle, onSave }) => {
  return (
    <div className="SettingsForm">
      <div style={{ display: 'flex' }}>
        <div className="p" style={{ width: '200px'}}>
          <img className="rwd-img-st" src={config.def.thumbnail} alt=""/>
        </div>
        <div className="p" style={{ flexGrow: 1 }}>
          <h1>{config.def.name}</h1>
          <div className="form-group">
            <label>Title</label>
            <Input size="large" placeholder="Title" value={config.title} onChange={e=>setTitle(e.target.value)} />
          </div>
        </div>
      </div>
      {
        _.isNil(config.def.authentication) ? '' : (
          <div className="p">
            <AuthForm plugin={config} />
          </div>
        )
      }
      <div className="p">
        <hr />
      </div>
      <div className="p ta-r">
        <Button type="primary" onClick={()=>onSave(config)}>Save</Button>
      </div>
    </div>
  )
}

SettingsForm.propTypes = {
  config: PropTypes.shape({
    auth: PropTypes.object,
    def: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      authentication: PropTypes.shape({
        strategy: PropTypes.string.isRequired,
      }),
    }).isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default compose(
  withHandlers({
    setTitle: ({ onChange, config }) => newTitle => onChange(_.set(config, 'title', newTitle)),
    setAuth: ({ onChange, config }) => newAuth => onChange(_.set(config, 'auth', newAuth)),
  })
)(SettingsForm)
