import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLog from '../pages/admin/App'
import AdminAshaworker from '../pages/admin/ashaworker/ashaworker'
import AdminDashboardMain from '../pages/admin/main/main'
import Adminhealthstaff from '../pages/admin/healthstaff/healthstaff'
import Addasha from '../pages/admin/ashaworker/addasha/addasha'



const AdminRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<AdminDashboardMain/>} />  
    <Route path='/admin' element={<AdminLog/>} />
    <Route path='AdminAshaworker' element={<AdminAshaworker/>} />
    <Route path='Adminhealthstaff' element={<Adminhealthstaff/>} />
    <Route path='Addasha' element={<Addasha/>} />






</Routes>
  )
}

export default AdminRoutes