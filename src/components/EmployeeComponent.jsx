import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'


const EmployeeComponent = () => {
  
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const {id} = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        email:'',
        phone:''
    })

    const navigator = useNavigate();

    useEffect(()=>{
        if(id){
            getEmployee(id).then((response)=>{
                setFirstName(response.data.firstName);
                setEmail(response.data.email);
                setPhone(response.data.phone);

            }).catch(error =>{
                console.error(error);
            })
        }
    }, [id])

    function handleEmail(e){setEmail(e.target.value);}
    function handlePhone(e){setPhone(e.target.value);}

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){

            //создаем объект сотрудник
            const employee = {firstName, email, phone};
            console.log(employee);

            if(id){
                updateEmployee(id, employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error=>{
                    console.error(error);
                })
            }else{
                //вызываем сервисный метод для отправки запроса на создание
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error=>{
                    console.error(error);
                })
            }
            
            
            
        }
    }

    function validateForm(){
        let valid = true;

        const errorCopy = {... errors}

        if(firstName.trim()){
            errorCopy.firstName='';
        }else{
            errorCopy.firstName='Введите имя';
            valid = false;
        }

        if(email.trim()){
            errorCopy.email='';
        }else{
            errorCopy.email='Введите email';
            valid=false;
        }

        setErrors(errorCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Редактировать сотрудника</h2>
        }else{
            return <h2 className='text-center'>Добавить сотрудника</h2>
        }
    }

    return (
    <div className='container'>
       <div className='raw mt-2'>
           <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className="card-body">
                    <form action="">
                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">First Name:</label>
                            <input 
                                type="text" 
                                placeholder='Enter First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${ errors.firstName ? 'is-invalid': ''}`}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName}</div>   }
                        </div>

                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">Email:</label>
                            <input 
                                type="text" 
                                placeholder='Enter email'
                                name='email'
                                value={email}
                                className='form-control'
                                onChange={handleEmail}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">Phone:</label>
                            <input 
                                type="text" 
                                placeholder='Enter phone'
                                name='phone'
                                value={phone}
                                className='form-control'
                                onChange={handlePhone}
                            />
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}> Add </button>

                    </form>
                </div>
            </div>
       </div>
        
    </div>
  )
}

export default EmployeeComponent