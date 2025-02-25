import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MemberLog from '../pages/member/App'



const MemberRoutes = () => {
  return (
    <Routes>
    <Route path='member/*' element={<MemberLog/>} />



</Routes>
  )
}

export default MemberRoutes