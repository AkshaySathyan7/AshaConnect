import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AshaLog from '../pages/ashaworker/App'
import AshaMain from '../pages/ashaworker/main/main'
import MembersView from '../pages/ashaworker/members/members'
import UpdateAsha from '../pages/ashaworker/updateprofile/updateprofile'
import Logout from '../pages/logout/logout'
import HealthReportDisplay from '../pages/ashaworker/healthreport/healthreport'



const AshaRoutes = () => {
  return (
    <Routes>
   <Route path='/' element={<AshaMain/>} />  
    <Route path='/asha/*' element={<AshaLog/>} />
    <Route path='MembersView' element={<MembersView/>} />
    <Route path='UpdateAsha' element={<UpdateAsha/>} />
    <Route path='Logout' element={<Logout/>} />
    <Route path='HealthReportDisplay' element={<HealthReportDisplay/>} />




</Routes>
  )
}

export default AshaRoutes