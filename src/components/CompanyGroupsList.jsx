import React, {useEffect, useState} from 'react'
import { getCompanyGroupsList, createGroup, deleteGroup, updateGroup } from '../services/CompanyService'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from 'react-modal';


const CompanyGroupsList = () => {

    const [groups, setGroups] = useState([])

    const navigator = useNavigate();
    const {id} = useParams();
    //const companyId = useParams();
    
    useEffect(()=>{
      
        getCompanyGroupsList(id).then((response)=>{
            setGroups(response.data);
        }).catch(error => {
            console.error(error);
        })
    
    
    }, [id])


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalTask, setModalTask] = useState('');
    const [groupId, setGroupId] = useState();
   // const [groupName, setGroupName] = useState('');
   // const [condition, setCondition] = useState('');
   // const [discount, setDiscount] = useState('');
   // const [availablePart, setAvailablePart] = useState('');

    const [currentGroup, setCurrentGroup] = useState({
        groupName: '', 
        condition: '',
        discount: '',
        availablePart: ''
    });

 
    function openModal(groups){
        
        if (groups == null) {setModalTask('add'); setModalIsOpen(true);}
        else if (groups) {
            setModalTask('update'); 
            setGroupId(groups.id); 
            setCurrentGroup(groups);
            setModalIsOpen(true);
            setCurrentGroup(groups);

        }
        else setModalIsOpen(false); 
        console.log(groups);
    };
    
    const closeModal = () => {setModalIsOpen(false);};
  
    const handleInputChangeName = (event) => {
        const value = event.target.value;
        if (value.trim() !== '' && value !== null) { // проверка, что значение не пустое
            //setGroupName(value);
            setCurrentGroup({...currentGroup, groupName: value});
        } else {
            alert('Название группы не может быть пустым');
        }
        //setGroupName(event.target.value);
    };
    const handleInputChangeCondition = (event) => {
        const value = event.target.value;
        if (!isNaN(value) ) { // проверка, что значение является числом
            //setCondition(value);
            setCurrentGroup({...currentGroup, condition: value});
        } else {
            alert('Условие для перехода в группу должно быть числом');
        }
        
    };
    const handleInputChangeDiscount = (event) => {
        const value = event.target.value;
        if (!isNaN(value) ) { // проверка, что значение является числом
            //setDiscount(value);
            setCurrentGroup({...currentGroup, discount: value});
        } else {
            alert('Доля с покупки должна быть числом');
        }
    };
    const handleInputChangeAvailablePart = (event) => { 
        const value = event.target.value;
        if (!isNaN(value) ) { // проверка, что значение является числом
            //setAvailablePart(value);
            setCurrentGroup({...currentGroup, availablePart: value});
        } else {
            alert('Доля покупки, которую можно оплатить баллами должна быть числом');
        }
    };
    
    

    const handleSubmit = (event) => {
       
        let fail = false;
        //базовая валидация
        if (currentGroup.groupName.trim() == '') {alert('Название должно быть заполнено'); fail = true;}
        else if (currentGroup.condition < 1 ) alert('Условие для перехода в группу должно быть больше 1 балла');
        else if (currentGroup.discount < 1 || currentGroup.discount > 100) alert('Доля с покупки должна быть числом от 1 до 100');
        else if (currentGroup.availablePart < 1 || currentGroup.availablePart > 100) alert('Доля покупки, которую можно оплатить баллами должна быть числом от 1 до 100');
        else { console.log(currentGroup);}
       
        //считаем что проверки прошли, создаем объект группа
        //const group = {groupName, condition, discount, availablePart};
        if (!fail){
                //проверяем состояние модального окна
            if (modalTask==='add'){
                //отпраляем запрос на создание
                createGroup(id, currentGroup).then((response) => {
                    console.log( response.data);
                }).catch(error=>{
                    console.error(error);
                }) 
            }else if (modalTask==='update'){
                //отправляем запрос на обновление
                updateGroup(id, groupId , currentGroup).then((response) => {
                    console.log(response.data);
                }).catch(error=>{
                    console.error(error);
                }) 
            }

        }
        
        
       

      };
  
   
    function removeGroup (groupId){
        if(confirm()){
            console.log(groupId);
            deleteGroup(id, groupId).then((response) => {
                getCompanyGroupsList();
            }).catch(error => {
                console.error(error);
            })
        }
    }

   


  return (

    <div className='container'>
        <div>
            <h2 className='text-center'>Список групп по компании {id}</h2>
        
            <div>
                <table className='table table-striped table-bordered '>
                    <thead>
                        <tr>
                            
                            <th>Название</th>
                            <th>Потратить баллов для перехода в группу</th>
                            <th>Доля с покупки</th>
                            <th>Доля покупки, которую можно оплатить баллами</th>
                            <th>Группа по умолчанию</th>
                            <th colSpan={2}>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            groups.map(groups => 
                                <tr key={groups.id}>
                                    <td>{groups.groupName}</td>
                                    <td>{groups.condition}</td>
                                    <td>{groups.discount + '%'}</td>
                                    <td>{groups.availablePart + '%'}</td>
                                    <td>{groups.isDefault == true ? 'да' : 'нет'}</td>
                                    

                                    <td>
                                        <button className='btn btn-danger' onClick={() => removeGroup(groups.id)} style={{marginLeft:'10px'}}>Удалить</button>
                                    </td>
                                    <td>
                                        <button className='btn btn-info' onClick={()=>openModal(groups)} style={{marginLeft:'10px'}}>Изменить</button>
                                    </td>
                                </tr>)
                                
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <div>
                
                <button className='btn btn-success' onClick={()=>openModal(null)}>Создать группу</button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Создание группы"
                    ariaHideApp={false}
                    
                >
                    <h2 className='text-center'>{modalTask=="add"? 'Добавить' : 'Изменить'}</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Название группы:</label>
                        <input className="form-control" type="text" value={currentGroup?.groupName} onChange={handleInputChangeName} />
                    </div>
                    <div className="mb-3">
                        <label>Потратить баллов для перехода в группу: </label>
                        <input className="form-control" type="text" value={currentGroup?.condition} onChange={handleInputChangeCondition} />
                        <div id="conditionHelp" className="form-text">Условие для перехода в группу должно быть больше 1 балла</div>
                    </div>
                    <div>
                        <label className="form-label">Доля с покупки в %:</label>
                        <input className="form-control" type="text" value={currentGroup?.discount} onChange={handleInputChangeDiscount} />
                        <div id="discountHelp" className="form-text">Доля с покупки должна быть числом от 1 до 100</div>
                        
                    </div>
                    <div> 
                        <label className="form-label">Доля покупки, которую можно оплатить баллами:</label>
                        <input className="form-control" type="text" value={currentGroup?.availablePart} onChange={handleInputChangeAvailablePart} />
                        <div id="avaiblePartHelp" className="form-text">Доля покупки, которую можно оплатить баллами должна быть числом от 1 до 100</div>
                        
                    </div>  
                    
                    <button className='btn btn-success' type="submit" onClick={() => handleSubmit}>Создать</button>
                    
                    <button className='btn btn-danger' onClick={ closeModal}>Отмена</button>
                    </form>
                </Modal>
    
            </div>
    </div>
  )
}

export default CompanyGroupsList;