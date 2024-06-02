import React, {useEffect, useState} from 'react'
import { getCompany } from '../services/CompanyService'
import QrCodeImage from './QrComponent';


        

import { useNavigate } from 'react-router-dom'
import { useParams} from "react-router-dom"

const CompanyMainPage = () => {

    const [companyInfo, setCompanyInfo] = useState('');
    

    const navigator = useNavigate();
    const {id} = useParams();
    
    useEffect(()=>{
        if(id){
            getCompany(id).then((response)=>{
                    setCompanyInfo(response.data)
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

  return (
    
    <div className='container'>
       
        <h2 className='text-center'>CompanyInfo</h2>
        <div>
            
                <p>
                    {companyInfo.id}
                    {companyInfo.companyName}
                    {companyInfo.description}
                    {companyInfo.email}
                    {companyInfo.phone}
                   
                    <QrCodeImage qrCodeBase64={companyInfo.qrLink} />
                </p>
            
        </div>
    </div>
  )
}

export default CompanyMainPage