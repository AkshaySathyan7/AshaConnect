import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HealthLog from '../pages/healthstaff/App'



const HealthRoutes = () => {
  return (
    <Routes>
    <Route path='staff/*' element={<HealthLog/>} />



</Routes>
  )
}

export default HealthRoutes