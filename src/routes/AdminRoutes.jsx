import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLog from '../pages/admin/App'
import AdminAshaworker from '../pages/admin/ashaworker/ashaworker'



const AdminRoutes = () => {
  return (
    <Routes>
    <Route path='admin/*' element={<AdminLog/>} />
    <Route path='/AdminAshaworker' element={<AdminAshaworker/>} />




</Routes>
  )
}

export default AdminRoutes