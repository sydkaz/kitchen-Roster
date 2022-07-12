import React, { useState, useEffect } from 'react'
import { Button } from 'react-materialize';
const EmployeeForm = props => {
const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target
console.log(user, name, value)
    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateUser(user.id, user)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Times done</label>
      <input type="text" name="timesSkipped" value={user.timesSkipped} onChange={handleInputChange} />
      <Button className="waves-effect waves-light btn-small">Update</Button>
      <Button onClick={() => props.setEditing(false)} className="Button muted-Button">
        Cancel
      </Button>
    </form>
  )
}

export default EmployeeForm
