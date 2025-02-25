import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../Landing/App'
import LoginPage from '../pages/Login/LoginPage'
import AdminLog from '../pages/admin/App'
import AshaLog from '../pages/ashaworker/App'
import MemberLog from '../pages/member/App'
import HealthLog from '../pages/healthstaff/App'



const MainRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<LandingPage/>} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/admin/*" element={<AdminLog />} />
    <Route path="/asha" element={<AshaLog />} />
    <Route path="/member" element={<MemberLog />} />
    <Route path="/staff" element={<HealthLog />} />



</Routes>
  )
}

export default MainRoutes