import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import AddFood from './pages/AddFood/AddFood';
import ListFood from './pages/ListFood/ListFood.jsx';
import Orders from './pages/Orders/Orders';
import Sidebar from './components/Sidebar/Sidebar';
import Menubar from './components/Menubar/Menubar';
import { ToastContainer } from 'react-toastify';

const App = () => {

  const [sidebar,setSidebar] = useState(true);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  }
  return (
    <div className="d-flex" id="wrapper">
          
            <Sidebar sidebar={sidebar} />
          
            <div id="page-content-wrapper">
              
                <Menubar toggleSidebar={toggleSidebar} />
                <ToastContainer/>
            
                <div className="container-fluid">
                    <Routes>
                      <Route path='/add' element={<AddFood />}/>
                      <Route path='/list' element={<ListFood />}/>
                      <Route path='/orders' element={<Orders/>}/>
                      <Route path='/' element={<ListFood />}/>
                    </Routes>
                </div>
            </div>
        </div>
  )
}

export default App