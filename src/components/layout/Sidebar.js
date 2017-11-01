import React from 'react'

import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'

const Sidebar = () => (
  <div className="Sidebar">
    <div className="logo" />
    <Menu theme="dark" mode="inline">
      <Menu.Item key="1">
        <Link to="/">
          <Icon type="appstore-o" />
          <span>Dashboard</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/users">
          <Icon type="user" />
          <span>Users</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/profile/edit">
          <Icon type="solution" />
          <span>Edit Profile</span>
        </Link>
      </Menu.Item>
    </Menu>
  </div>
)

export default Sidebar
