import React, {useEffect, useState} from 'react'
import { listEmployees, deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(()=>{
        getAllEmployees();

    }, [])

    function getAllEmployees(){
        listEmployees().then((response)=>{
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee (){
        navigator('/add-employee')
    }

    function updateEmployee (id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee (id){
        if (confirm()){
            console.log(id);
            deleteEmployee(id).then((response) => {
                getAllEmployees();
            }).catch(error => {
                console.error(error);
            })

        }
        
        
    }

  return (

    <div className='container'>
        <h2 className='text-center'>ListEmployee</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <div>
            <table className='table table-striped table-bordered '>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee => 
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Обновить</button>
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                        style={{marginLeft:'10px'}}
                                    >Удалить</button>
                                
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListEmployeeComponent