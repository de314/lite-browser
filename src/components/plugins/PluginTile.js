import React from 'react'
import PropTypes from 'prop-types'
import OAuthService from 'services/OAuthService'
import classnames from 'classnames'

import { Button, Card, Dropdown, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

const OrphanedMenu = ({ plugin }) => (
  <div className="TileActionButtonMenu">
    <Menu onClick={()=>{}}>
      <Menu.Item key="1">
        <a href={plugin.def.url} target="_blank">
          <Button icon="info-circle">Info</Button>
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/plugins/install/${plugin.def.id}`}>
          <Button type="primary" icon="plus-circle">Install</Button>
        </Link>
      </Menu.Item>
    </Menu>
  </div>
);

const InstalledMenu = ({ plugin, onDelete }) => (
  <div className="TileActionButtonMenu">
    <Menu onClick={()=>{}}>
      <Menu.Item key="1">
        <a href={plugin.def.url} target="_blank">
          <Button icon="info-circle">Info</Button>
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/plugins/settings/${plugin.id}`}>
          <Button type="primary" icon="tool">Settings</Button>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Button type="danger" icon="delete" onClick={()=>onDelete(plugin.id)}>Delete</Button>
      </Menu.Item>
    </Menu>
  </div>
);

const TileActionButton = ({ plugin, validation: { installed }, onDelete }) => {
  const overlay = installed
      ? (<InstalledMenu plugin={plugin} onDelete={onDelete} />)
      : (<OrphanedMenu plugin={plugin} />)
  return (
    <div className="TileActionButton">
      <Dropdown overlay={overlay}>
        <Button>
          Actions ({installed ? 3 : 2}) <Icon type="down" />
        </Button>
      </Dropdown>
    </div>
  )
};

const PluginTile = ({ plugin, onDelete }) => {
  return (
    <div className={classnames('PluginTile', OAuthService.checkValid(plugin))}>
      <Card style={{ padding: 0 }}>
        <div className="custom-image">
          <img alt="" width="100%" src={plugin.def.thumbnail} />
        </div>
        <div className="custom-card">
          <h3>{plugin.def.name}{ !plugin.title ? '' : ` :: ${plugin.title}`}</h3>
          <TileActionButton plugin={plugin} validation={OAuthService.checkValid(plugin)} onDelete={onDelete} />
        </div>
      </Card>
    </div>
  )
}

PluginTile.propTypes = {
  plugin: PropTypes.shape({
    def: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      url: PropTypes.string,
    }).isRequired,
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  onDelete: PropTypes.func,
}

export default PluginTile
