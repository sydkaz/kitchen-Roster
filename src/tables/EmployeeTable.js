import React from 'react'
import { Button } from 'react-materialize';
const EmployeeTable = props => (
  <table className="striped">
    <thead>
      <tr>
        <th>Name</th>
         <th>Times Skipped</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.timesSkipped}</td>
            <td>
              <Button
                onClick={() => {
                  props.editRow(user)
                }}
                className="waves-effect waves-light btn-smal"
              >
                Edit
              </Button>
              <Button
                onClick={() => props.deleteUser(user.id)}
                className="waves-effect waves-light btn-smal"
              >
                Delete
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default EmployeeTable
