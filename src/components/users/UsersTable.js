import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Table } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: val => (<a href={`mailto:${val}`}>{val}</a>)
  }, {
    title: 'Registration Date',
    dataIndex: 'regDate',
    key: 'regDate',
    render: val => {
      const m = moment(val)
      return (<span>{m.format('LL')} ({m.fromNow()})</span>)
    }
  }
];

const UsersTable = ({ users }) => {
  return (
    <div className="UsersTable">
      <Table columns={columns} dataSource={users} />
    </div>
  )
}

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    regDate: PropTypes.number.isRequired,
  })).isRequired,
}

export default UsersTable
