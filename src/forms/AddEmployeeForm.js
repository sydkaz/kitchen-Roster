import React, { useState } from 'react'
import { Button } from 'react-materialize';
const AddEmployeeForm = props => {
	const initialFormState = { id: null, name: '', timesSkipped: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				console.log( props.editing);

				event.preventDefault()
				if (!user.name || (!user.timesSkipped && props.editing) ) return

				props.addUser(user)
				setUser(initialFormState)
			}}
		>
			<label>Name</label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} />
			<label>Times Done</label>
			<input type="text" name="timesSkipped" value={user.timesSkipped} onChange={handleInputChange}  disabled = {(!props.editing)? "disabled" : ""} placeholder=  {(!props.editing)? "This will be set to max number of work for new employees" : ""} />
			<Button>Add new Employee</Button>
		</form>
	)
}

export default AddEmployeeForm
