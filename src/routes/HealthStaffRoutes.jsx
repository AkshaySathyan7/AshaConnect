import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HealthLog from '../pages/healthstaff/App'
import HealthMain from '../pages/healthstaff/main/main'
import StaffProfile from '../pages/healthstaff/profile/staffprofile'
import EmergencyRequests from '../pages/healthstaff/emergency/emergency'
import HealthReportView from '../pages/healthstaff/healthreportview/healthreportview'



const HealthRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<HealthMain/>} />  
    <Route path='staff/*' element={<HealthLog/>} />
    <Route path='StaffProfile' element={<StaffProfile/>} />
    <Route path='EmergencyRequests' element={<EmergencyRequests/>} />

    <Route path='HealthReportView' element={<HealthReportView/>} />




</Routes>
  )
}

export default HealthRoutes