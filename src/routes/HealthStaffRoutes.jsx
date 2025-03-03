import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HealthLog from '../pages/healthstaff/App'
import HealthMain from '../pages/healthstaff/main/main'



const HealthRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<HealthMain/>} />  
    <Route path='staff/*' element={<HealthLog/>} />



</Routes>
  )
}

export default HealthRoutes