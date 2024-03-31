import React, { Fragment } from 'react'
import Routing from './Components/Routing';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import { MyContextProvider } from './myContext.js';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login.jsx';
import PagenotFound from './Components/PagenotFound.jsx';

function App() {
  return (
   <Fragment> 
      <MyContextProvider>
       <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/error-404' element={<PagenotFound/>}></Route>
       </Routes>
      </MyContextProvider>
   </Fragment>
  )
}

export default App
