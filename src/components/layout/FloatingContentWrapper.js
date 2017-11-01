import React from 'react'

import { Row, Col } from 'antd'

const FloatingContentWrapper = ({ children }) => (
  <div className="FloatingContentWrapper">
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '86vh' }}>
      <Col span={4} style={{ background: '#fff', padding: 24, minHeight: 300, minWidth: '50vw' }}>
        {children}
      </Col>
    </Row>
  </div>
)

export default FloatingContentWrapper
