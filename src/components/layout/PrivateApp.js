import React from 'react'
import { selectSidebarCollapsed } from 'rdx/selectors'

import { compose } from 'recompose'
import { connect } from 'react-redux'

import Sidebar from './Sidebar'
import Footer from './Footer'
import { Layout } from 'antd';
import PrivateHeader from './PrivateHeader'
import { PrivateRoutes } from 'router'

const { Content, Sider } = Layout;

const PrivateApp = ({ collapsed, toggle }) => (
  <div className="PrivateApp">
    <Layout className="layout container-fluid">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Sidebar />
      </Sider>
      <Layout>
        <PrivateHeader />
        <Content style={{ padding: '2em 4em 0 4em' }}>
          <PrivateRoutes />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  </div>
)

export default compose(
  connect(
    state => ({ collapsed: selectSidebarCollapsed(state) })
  )
)(PrivateApp)
