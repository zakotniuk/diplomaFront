import React, {useEffect, useState} from 'react'
import { getClient, getClientAccountsList } from '../../services/ClientService'
import QrCodeImage from '../QrComponent';
import Modal from "react-modal";


        

import { useNavigate } from 'react-router-dom'
import { useParams} from "react-router-dom"

const ClientMainPage = () => {

    const [clientInfo, setClientInfo] = useState('');
    const [clientAccountsList, setClientAccountsInfo] = useState([]);
    

    const navigator = useNavigate();
    const {id} = useParams();
    
    useEffect(()=>{
        if(id){
            getClient(id).then((response)=>{
                    setClientInfo(response.data)
            }).catch(error => {
                    console.error(error);
            })    
        }
    }, [id])

    useEffect(()=>{
        if(id){
            getClientAccountsList(id).then((response)=>{
                    setClientAccountsInfo(response.data)
            }).catch(error => {
                    console.error(error);
            })    
        }
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

    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        fetch(`data:image/png;base64,${clientAccountsList.qrLink}`)
        .then(res => res.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            setImgSrc(blobUrl);
        });
    }, [clientAccountsList.qrLink]);

   
   
  return (
    
    <div className='container' id="myApp">
       
        <h2 className='text-center'>Кабинет Клиента</h2>
        <div>
        
                    {/* {companyInfo.id} */}
            <h3>{clientInfo.clientName}</h3>     
            <p>Описание: {clientInfo.email}</p>
            <p> Контакты: {clientInfo.birthday} +{clientInfo.phone}</p>      
        </div>
        <div className='row row-cols-1'>
           

        </div>
        <div>
            <table className='table table-striped table-bordered mt-5'>
                <thead>
                    <tr>
                        <th>Компания</th>
                        <th>Группа</th>
                        <th>Баланс</th>
                        <th>Всего потрачено баллов</th>
                        <th>QR код</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientAccountsList.map(account => 
                            <tr key={account.id}>
                                <td>{account.companyId}</td>
                                <td>{account.groupId}</td>
                                <td>{account.balance}</td>
                                <td>{account.totalMoneySpend}</td>
                                <td>
                                <div className='row row-cols-1'>
                                    <div>
                                        <QrCodeImage qrCodeBase64={account.qrLink}/> 
                                    </div>
                                    <a href={imgSrc} download={account.companyId+'.QR-код.png'}>
                                        <button className='btn btn-info'>Скачать QR</button>
                                    </a>

                                    </div>
                                </td>
                   
                            </tr>)
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default ClientMainPage