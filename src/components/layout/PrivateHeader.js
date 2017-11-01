import React from 'react'
import { selectSidebarCollapsed } from 'rdx/selectors'
import { setSidebarCollapse } from 'rdx/actions'

import { compose } from 'recompose'
import { connect } from 'react-redux'

import { Layout, Menu, Icon, Row, Col } from 'antd';
import { Link } from 'react-router-dom'

const { Header } = Layout;

const PrivateHeader = ({ collapsed, setCollpased }) => (
  <div className="PrivateHeader">
    <Header style={{ background: '#fff', padding: 0 }}>
      <Row type="flex" justify="space-between">
        <Col>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={()=>setCollpased(!collapsed)}
          />
        </Col>
        <Col>
          <Menu
            theme="light"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/profile">
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/logout">
                <i className="fa fa-sign-out mr-3"></i>
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  </div>
)

export default compose(
  connect(
    state => ({ collapsed: selectSidebarCollapsed(state) }),
    dispatch => ({
      setCollpased: (collapsed) => dispatch(setSidebarCollapse(collapsed))
    })
  )
)(PrivateHeader)
