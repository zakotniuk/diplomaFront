import React, {useEffect, useState} from 'react'
import { getCompanyTransactionsList } from '../services/CompanyService'
import { useNavigate, useParams } from 'react-router-dom'

const CompanyTransactionsList = () => {

    const [transactions, setTransactions] = useState([])

    const navigator = useNavigate();
    const {id} = useParams();
    
    useEffect(()=>{
      
        getCompanyTransactionsList(id).then((response)=>{
            setTransactions(response.data);
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
        <h2 className='text-center mt-5'>Список операций с баллами по компании {id}</h2>
       
        <div>
            <table className='table table-striped table-bordered mt-5'>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Номер счета клиента</th>
                        
                        <th>Событие</th>
                        <th>Сумма</th>
                        {/* <th>Всего потрачено денег</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map(transactions => 
                            <tr key={transactions.id}>
                                <td>{new Date(transactions.createDate).toLocaleString() }</td>
                                <td>{transactions.clientAccountId}</td>
                                <td>{transactions.action == 'WRITEON' ? 'Начисление' : 'Списание'}</td>
                                <td>{transactions.sum}</td>
                   
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default CompanyTransactionsList