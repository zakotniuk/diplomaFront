import React from 'react'
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";


const CompanyHeaderComponent = () => {

  const { company } = useContext(UserContext);

  return (company && (
    <>
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark '>
          <Link to={`/company/${company}/info`}>Главная</Link>
          <Link to={`/company/${company}/all-client-accounts`}>Счета клиентов</Link>
          <Link to={`/company/${company}/all-groups`}>Группы клиентов</Link>
          <Link to={`/company/${company}/transactions`}>История операций</Link>
          
        </nav>
      </div>
    </>
  )

  
    // <div>
    //     <header>
    //         <nav className='navbar navbar-expand-lg navbar-dark bg-dark '>
    //           <div class="container-fluid">
    //             <div class="container-fluid">
    //               <a class="navbar-brand" href="#">
    //                 <img src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top"/>
    //                 Bootstrap
    //               </a>
    //             </div>
    //             <a className="navbar-brand" href="https://ya.ru">Loyality Service</a>
    //             <a className="navbar-brand" href="https://ya.ru">Настройки</a>
    //             <a className="navbar-brand" href="https://ya.ru">CRM</a>
    //             <a className="navbar-brand" href="https://ya.ru">Аналитика</a>
    //           </div>
    //         </nav>
            

    //     </header>

    // </div>
  )
}

export default CompanyHeaderComponent