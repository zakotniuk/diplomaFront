
import React from 'react';
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';
import QrCodeImage from './components/QrComponent';
import CompanyMainPage from './components/CompanyMainPage';
import CompanyClientAccountsList from './components/CompanyClientAccountsList';
import CompanyGroupsList from './components/CompanyGroupsList.jsx';
import CompanyTransactionsList from './components/CompanyTransactionsList.jsx';
import ClientMainPage from './components/clients/ClientMainPage.jsx';

function App() {
  
//const qrCodeBase64 = "iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQAAAACFI5MzAAABfElEQVR4Xu2WQW6DMBBFP2LhJUfgJuRiSEHKxchNcgSWXqBM/3cq6iTtsp9WYiQs47cZeeb/MeKnwOvBFgc5iOJvkBuA9pYiVqCJiX+dm/C7KJ2pzyft7naS0V1uMQN92WHYh6Qrd7yi/Qia5RzEu5BQfdK94zJ375UzkNKjeWCCXN679/fJI9J1aeNxWMJJWBpWJWJpS5Hq+rhIBtgcxSkUTzo1kaZyCi6NfqxEyXw6RbMAqepeE1F7SqJqE52dttxcJN1xfjhFqFFj3nIzkZBXBYpOeTt9pVMX4XWsPQYmyCJx0RVZCedEkagqdVpG+EkpCBsVI/KAsVKJi7BH6Q8cFit1SpU8da+FKFapc+3TrAT9RNOaw4KWiRJ+otAVtUG9cIB8qcREuOVhkkD0cijvKDMJvV2yxErf5O+85eYim1fxCcU8a5UYiaoy9cWr6pnlJBwWZ/om/XoHEnq98074aJBXvXSIg6hH9WqbkLWrnNxEvo+DHETxP8kHCG5hRkt3CNMAAAAASUVORK5CYII=";
//<Route path='/' element= {<QrCodeImage qrCodeBase64={qrCodeBase64} />}></Route>
  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
      
        <Routes>
          {/* // http://localhost:3000 */}
            <Route path='/' element= {<ListEmployeeComponent/>}></Route>
            {/* // http://localhost:3000/employees */}
            <Route path='/employees' element= {<ListEmployeeComponent/>}></Route>
            
            {/* // http://localhost:3000/add-employee */}
            <Route path='/add-employee' element={<EmployeeComponent/>}></Route>

            {/* // http://localhost:3000/edit-employee */}
            <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
            
            {/* // добавляю сюда все страницы компании с их наполнением, затем добавлю роутинг и модалки  */}
            <Route path='company/:id/info' element= {<CompanyMainPage/>}></Route>
            <Route path='company/:id/all-client-accounts' element= {<CompanyClientAccountsList/>}></Route>
            <Route path='company/:id/all-groups' element= {<CompanyGroupsList/>}></Route>
            <Route path='company/:id/transactions' element= {<CompanyTransactionsList/>}></Route>
            
          
            {/* // добавляю сюда все страницы клиента с их наполнением, затем добавлю роутинг и модалки   */}
            <Route path='client/:id/info' element= {<ClientMainPage/>}></Route>
            
            
            

        </Routes>
      
      <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App
