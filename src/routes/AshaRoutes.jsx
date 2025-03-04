import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AshaLog from '../pages/ashaworker/App'
import AshaMain from '../pages/ashaworker/main/main'



const AshaRoutes = () => {
  return (
    <Routes>
   <Route path='/' element={<AshaMain/>} />  
    <Route path='asha/*' element={<AshaLog/>} />



</Routes>
  )
}

export default AshaRoutes