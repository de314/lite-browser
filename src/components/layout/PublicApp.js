import React from 'react'

import Footer from './Footer'
import { Layout } from 'antd';
import PublicHeader from './PublicHeader'
import { PublicRoutes } from 'router'

const { Content } = Layout;

const PublicApp = () => (
  <div className="PublicApp">
    <Layout className="layout container-fluid">
      <PublicHeader />
      <Content style={{ padding: '2em 4em 0 4em' }}>
        <PublicRoutes />
      </Content>
      <Footer />
    </Layout>
  </div>
)

export default PublicApp
