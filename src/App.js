import React, { useState, Fragment } from 'react'
import AddEmployeeForm from './forms/AddEmployeeForm'
import EmployeeForm from './forms/EmployeeForm'
import EmployeeTable from './tables/EmployeeTable'
import { Button, Card, Row, Col } from 'react-materialize';
import {Employee,EMPLOYEE_TYPE} from './classes/AllClasses';
const App = () => {


    const skippedData = [];
    const initialFormState = { id: null, name: '', timesSkipped: 0 }

	// Setting state
	const [ users, setUsers ] = useState(() => initUserData())
    const [ employee, setNext ] = useState(initialFormState)
    const [ currentUser, setCurrentUser ] = useState(initialFormState)
    const [ cycle, setCycle ] = useState(0);
    const [ skippedEmployees, setSkippedEmployees ] = useState(skippedData);
	const [ editing, setEditing ] = useState(false)
	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
        user.timesSkipped = 0;
        setUsers([ ...users, user ])
	}

	const deleteUser = id => {
		setEditing(false)
		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)
		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)
		setCurrentUser({ id: user.id, name: user.name, timesSkipped: user.timesSkipped })
	}
    const skipTurn = (updatedUser)=>{
		console.log(updatedUser)
		var tempUser = {...updatedUser};
		tempUser.timesSkipped++;
        setUsers(users.map(user => (user.id === updatedUser.id ? tempUser : user)))
        setSkippedEmployees([...skippedEmployees,updatedUser]);
        setNext(initialFormState);
	}

    const doneTurn = (updatedUser)=>{
        console.log(updatedUser)
        var tempUser = {...updatedUser};
        if(tempUser.timesSkipped > 0)
        tempUser.timesSkipped--;
        setSkippedEmployees([...skippedEmployees,tempUser]);
        setUsers(users.map(user => (user.id === updatedUser.id ? tempUser : user)))
        setNext(initialFormState)
    }

    const whosNext = ()=>{
        setNext(getMin());
	}
	/*function resetTick(){
        for (var i in users) {
        	users[i].timesSkipped = 0;
		}
	}*/
	function getFilteredArray(){
        return  users.filter(({ name: id1 }) => !skippedEmployees.some(({ name: id2 }) => id2 === id1));
	}

    function getMin(arr=users) {
        var min ;

        /*var tempArray = users.filter(obj => skippedEmployees.filter(
            val => {
                return obj['name'].indexOf(val.name) == -1
            }
        ));*/

       	var tempArray = getFilteredArray();


		if(tempArray.length !== 0)
            min = tempArray[0];
		else
           { tempArray = users; min = users[0]; setCycle(cycle+1);setSkippedEmployees([]);}

        for (var i=0 ; i<tempArray.length ; i++ ) {
            if ( parseInt(tempArray[i].timesSkipped) > parseInt(min.timesSkipped))
			{min = tempArray[i];}
        }
        return min;
    }
  /*  function getMax(arr=users) {
        var max;
        for (var i=0 ; i<arr.length ; i++) {
            if (!max || parseInt(arr[i].timesSkipped) <= parseInt(max.timesSkipped))
            {max = arr[i];}
        }
        return max;
    }*/
    function  initUserData() {
        const usersData = [];
        usersData.push(new Employee(0,"Tania",0,EMPLOYEE_TYPE.DEV));
        usersData.push(new Employee(1,"Craig",0,EMPLOYEE_TYPE.DEV));
        usersData.push(new Employee(2,"Ben",5,EMPLOYEE_TYPE.DEV));
        usersData.push(new Employee(3,"Sammy",0,EMPLOYEE_TYPE.DEV));
        return usersData;
    }
	return (
		<div className="container">
            <div className="card-panel">
				<h1 className="header">Kitchen Roster</h1>
			</div>
			<Row>
				<Col className="s12 m12 l12">
					{editing ? (
                        <Fragment>
                            <Card className="white lighten-4">
                                <div className="card-content">
									<h2 className="card-title">Edit Employee</h2>
									<EmployeeForm
										editing={editing}
										setEditing={setEditing}
										currentUser={currentUser}
										updateUser={updateUser}
									/>
								</div>
							</Card>
						</Fragment>

					) : (
						<Fragment>
                            <Card className="white lighten-4">
                                <div className="card-content">
                                    <h2 className="card-title">Add Employee</h2>
										<AddEmployeeForm addUser={addUser} editing={editing} />
								</div>
							</Card>
						</Fragment>
					)}
				</Col>
				<Col className="s12 m12 l12">
                    <Card className="white lighten-4">
                        <div className="card-content">
							<h2  className="card-title">View Emloyee</h2>
							<EmployeeTable users={users} editRow={editRow} deleteUser={deleteUser} />
						</div>
					</Card>
				</Col>

			</Row>

			<Row >
				<Col className="s12 m12 l12">
					<div className="flex-large clear-fix" >
                        <Card className=" blue-grey darken-1">
                            <div className="card-content white-text">
								<span className="card-title">Click Next To Find whose turn it is to do the duties</span>

									<div className="flex-row is-clearfix">
										<Button onClick={whosNext}>Find Next Turn</Button>
									</div>

									{ 	(employee.name) ? (
										<div>
											<div className="card-title">Its {employee.name} turn!</div>
											<Button onClick={skipTurn.bind(this, employee)}  className="waves-effect waves-light btn-large red"><i className="material-icons left">close</i>{employee.name} skipping turn ?</Button>
											<Button onClick={doneTurn.bind(this, employee)}  className="waves-effect waves-light btn-large"><i className="material-icons left">check_circle</i>{employee.name} doing turn ?</Button>
										</div>): <div></div>
									}
							</div>
						</Card>
					</div>
				</Col>
			</Row>
			<h1>Cycle number : {cycle}</h1>
		</div>

	)
}

export default App
