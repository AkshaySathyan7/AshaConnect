import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLog from '../pages/admin/App'



const AdminRoutes = () => {
  return (
    <Routes>
    <Route path='admin/*' element={<AdminLog/>} />



</Routes>
  )
}

export default AdminRoutes