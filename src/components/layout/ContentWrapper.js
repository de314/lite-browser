import React from 'react'

const ContentWrapper = ({ children }) => (
  <div className="ContentWrapper" style={{ background: '#fff', padding: 24, minHeight: '86vh' }}>
    {children}
  </div>
)

export default ContentWrapper
