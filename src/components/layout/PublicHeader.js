import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'

const { Header } = Layout;

const PublicHeader = () => (
  <div className="PublicHeader">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/about">About</Link>
        </Menu.Item>
      </Menu>
    </Header>
  </div>
)

export default PublicHeader
