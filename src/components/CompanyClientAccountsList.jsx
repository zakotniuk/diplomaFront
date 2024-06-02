import React, {useEffect, useState} from 'react'
import { getCompanyClientAccountsList } from '../services/CompanyService'
import { useNavigate, useParams } from 'react-router-dom'

const CompanyClientAccountsList = () => {

    const [accounts, setAccounts] = useState([])

    const navigator = useNavigate();
    const {id} = useParams();
    
    useEffect(()=>{
      
        getCompanyClientAccountsList(id).then((response)=>{
            setAccounts(response.data);
        }).catch(error => {
            console.error(error);
        })
    
    
    }, [id])


    // function addNewEmployee (){
    //     navigator('/add-employee')
    // }

    // function updateEmployee (id){
    //     navigator(`/edit-employee/${id}`)
    // }

    // function removeEmployee (id){
    //     if (confirm()){
    //         console.log(id);
    //         deleteEmployee(id).then((response) => {
    //             getAllEmployees();
    //         }).catch(error => {
    //             console.error(error);
    //         })

    //     }
        
        
    // }

  return (

    <div className='container'>
        <h2 className='text-center'>Список счетов по компании {id}</h2>
       
        <div>
            <table className='table table-striped table-bordered '>
                <thead>
                    <tr>
                        <th>Номер счета</th>
                        <th>Группа</th>
                        <th>Клиент</th>
                        <th>Баланс</th>
                        <th>Всего потрачено денег</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts.map(accounts => 
                            <tr key={accounts.id}>
                                <td>{accounts.id}</td>
                                <td>{accounts.groupId}</td>
                                <td>{accounts.clientId}</td>
                                <td>{accounts.balance}</td>
                                <td>{accounts.totalMoneySpend}</td>
                                

                                
                                
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default CompanyClientAccountsList