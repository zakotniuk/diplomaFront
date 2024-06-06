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
    
    <div className='container col-8 '>
       
        <h2 className='text-center'>Информация о компании</h2>
        <div>
        
                    {/* {companyInfo.id} */}
            <h3>{companyInfo.companyName}</h3>     
            <p>Описание: {companyInfo.description}</p>
            <p> Контакты: {companyInfo.email} +{companyInfo.phone}</p>      
        </div>
        <div className='row row-cols-1'>
            <h3>QR-код для регистрации клиентов</h3>  
            Разместите QR-код возле кассы, столиков, на входе в заведение.
            <div>
                <QrCodeImage qrCodeBase64={companyInfo.qrLink} /> 
            </div>
            <a href={imgSrc} download='QR-код Компании.png'>
                <button className='btn btn-info'>Скачать QR</button>
            </a>

        </div>
        <div className='row row-cols-1'>
            
            <h5 className='mt-5'>Документация для подключения КУ</h5>
            <img src="" alt="DOCX" />
            <a href={''} download='Документация.docx'>
                <button className='btn btn-info'>Скачать Документацию</button>
            </a>
            <ul>Возможности интеграции
                <li>просмотр информации о счете клиента</li>
                <li>списание и начисление баллов по QR-коду</li>
            </ul>
           
            



        </div>
    </div>
  )
}

export default CompanyMainPage