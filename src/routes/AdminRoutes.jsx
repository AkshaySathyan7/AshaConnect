import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLog from '../pages/admin/App'
import AdminAshaworker from '../pages/admin/ashaworker/ashaworker'
import AdminDashboardMain from '../pages/admin/main/main'



const AdminRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<AdminDashboardMain/>} />  
    <Route path='admin/*' element={<AdminLog/>} />
    <Route path='/AdminAshaworker' element={<AdminAshaworker/>} />




</Routes>
  )
}

export default AdminRoutes