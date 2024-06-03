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

  

    
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        fetch(`data:image/png;base64,${companyInfo.qrLink}`)
        .then(res => res.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            setImgSrc(blobUrl);
        });
    }, [companyInfo.qrLink]);


  return (
    
    <div className='container'>
       
        <h2 className='text-center'>CompanyInfo</h2>
        <div>
        
                    {/* {companyInfo.id} */}
            <h3>{companyInfo.companyName}</h3>     
            <p>Описание: {companyInfo.description}</p>
            <p> Контакты: {companyInfo.email} +{companyInfo.phone}</p>      
        </div>
        <div className='row row-cols-1'>
            <div>
                <QrCodeImage qrCodeBase64={companyInfo.qrLink} /> 
            </div>
            <a href={imgSrc} download='QR-код Компании.png'>
                <button className='btn btn-info'>Скачать QR</button>
            </a>

        </div>
    </div>
  )
}

export default CompanyMainPage