import React, {useEffect, useState} from 'react'
import { getAccountInfo, patchAccountInfoAction } from '../services/CompanyService'

import { useNavigate } from 'react-router-dom'
import { useParams} from "react-router-dom"
import { useLocation } from 'react-router-dom';


const ImitCassaPage = () => {

    const [accInfo, setAccInfo] = useState('');
    
 
    
    const navigator = useNavigate();
    const {companyId, accountId} = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sum = queryParams.get('sum');

    
    useEffect(()=>{
        if(companyId){
            getAccountInfo(companyId, accountId, sum).then((response)=>{
                    setAccInfo(response.data)
            }).catch(error => {
                    console.error(error);
            })    
        }
    }, [companyId, sum])

    function pushBonuses(action){
        if (action == 'WRITEON'){
            //setAction('WRITEON');
            //setDateTime(Date.now());
            //const uD = updateDate.toISOString();

            patchAccountInfoAction(companyId, accountId, sum, action).then((response)=>{
                setAccInfo(response.data);
                alert('Успешно начислили!' );
            }).catch(error => {
                    console.error(error);
            }) 
        }else if (action == 'WRITEOFF'){
            patchAccountInfoAction(companyId, accountId, sum, action).then((response)=>{
                setAccInfo(response.data);
                alert('Успешно списали!');
            }).catch(error => {
                    console.error(error);
            }) 
        }else{

        }
    }



  return (
    
    <div className='container'>
       
        <h2 className='text-center'>Процесс работы Кассы с Клиентом</h2>
        <div>
            <p>1. Кассир пробил весь товар...</p>
            <p>2. Клиент показал QR код...</p>
            <p>3. Отправился запрос на получение данных о бонусном счете клиента...</p>
            <p>4. Пришел ответ с информацией о бонусном счете клиента...</p>

            <div className=' border border-3 p-2'>
            <h3>Информация о счете № {accInfo.id} </h3>
            <h5>Баланс: {accInfo.balance}</h5>
            <h5>Всего потрачено средств: {accInfo.totalMoneySpend}</h5>
            <h5>Можно начислить: {accInfo.bonusSumWriteOn}</h5>
            <h5>Можно списать: {accInfo.bonusSumWriteOff}</h5>
            </div>
            <p>5. В зависимости от выбора клиента отправляется запрос (после проведения оплаты)...</p>
            <button className='btn btn-success' onClick={()=>pushBonuses('WRITEON')}>Начислить</button>
            <button className='btn btn-danger' onClick={()=>pushBonuses('WRITEOFF')}>Списать</button>

        </div>
        <div className='row row-cols-1'>
           

        </div>
    </div>
  )
}

export default ImitCassaPage