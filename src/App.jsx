
import React from 'react';
import './App.css'
import CompanyHeaderComponent from './components/CompanyHeaderComponent.jsx';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QrCodeImage from './components/QrComponent';
import CompanyMainPage from './components/CompanyMainPage';
import CompanyClientAccountsList from './components/CompanyClientAccountsList';
import CompanyGroupsList from './components/CompanyGroupsList.jsx';
import CompanyTransactionsList from './components/CompanyTransactionsList.jsx';
import ClientMainPage from './components/clients/ClientMainPage.jsx';
import ImitCassaPage from  './components/ImitCassaPage.jsx';
import { useState, createContext } from "react";


export const UserContext = React.createContext();

 
function App() {
  const [company, setcompany] = useState('25');

  return (
    <>
    <UserContext.Provider value={{ company, setcompany }}>

      
      <BrowserRouter>
        <CompanyHeaderComponent/>
        
          {/* highOderComponent */}

        
          <Routes>
            {/* // http://localhost:3000 */}
              <Route path='/' element= {''}></Route>
              
              {/* // добавляю сюда все страницы компании с их наполнением, затем добавлю роутинг и модалки  */}
              <Route path='company/:id/info' element= {<CompanyMainPage/>}></Route>
              <Route path='company/:id/all-client-accounts' element= {<CompanyClientAccountsList/>}></Route>
              <Route path='company/:id/all-groups' element= {<CompanyGroupsList/>}></Route>
              <Route path='company/:id/transactions' element= {<CompanyTransactionsList/>}></Route>

            {/* // добавляю сюда все страницы клиента с их наполнением, затем добавлю роутинг и модалки   */}
            <Route path='client/:id/info' element= {<ClientMainPage/>}></Route>

            <Route path='/company/:companyId/client-account-info/:accountId' element= {<ImitCassaPage/>}></Route>


         </Routes>
      
      
      </BrowserRouter>
    </UserContext.Provider>

    </>
  )
}

export default App
