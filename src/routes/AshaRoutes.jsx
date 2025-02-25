import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AshaLog from '../pages/ashaworker/App'



const AshaRoutes = () => {
  return (
    <Routes>
    <Route path='asha/*' element={<AshaLog/>} />



</Routes>
  )
}

export default AshaRoutes