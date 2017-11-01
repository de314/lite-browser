import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'antd'
import PluginTile from './PluginTile'

const PluginsGrid = ({ plugins, onDelete }) => {
  return (
    <div className="PluginsGrid">
      <Row gutter={16}>
        {plugins.map((plugin, i) => (
          <Col md={12} lg={6} xl={4} key={i}>
            <PluginTile plugin={plugin} onDelete={onDelete} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

PluginsGrid.propTypes = {
  plugins: PropTypes.arrayOf(PluginTile.propTypes.plugin).isRequired,
  onDelete: PropTypes.func,
}

export default PluginsGrid
