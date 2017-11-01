import React from 'react'

import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'

const Sidebar = () => (
  <div className="Sidebar">
    <div className="logo" />
    <Menu theme="dark" mode="inline">
      <Menu.Item key="1">
        <Link to="/">
          <Icon type="solution" />
          <span>Temp</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/plugins">
          <Icon type="api" />
          <span>Plugins</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/plugins/install">
          <Icon type="plus" />
          <span>Install</span>
        </Link>
      </Menu.Item>
    </Menu>
  </div>
)

export default Sidebar
