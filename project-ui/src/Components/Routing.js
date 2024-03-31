import React, { Fragment, Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import Loader from '../commonComponents/fullscreenLoader.jsx';

function Routing() {
  return (
   <Fragment>
  <Suspense fallback={<Loader/>}>
  <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
     </Routes>
  </Suspense>
   </Fragment>
  )
}

export default Routing
