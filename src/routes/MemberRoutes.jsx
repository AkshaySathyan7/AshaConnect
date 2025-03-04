import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MemberLog from '../pages/member/App'
import MemberMain from '../pages/member/main/main'



const MemberRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<MemberMain/>} />  
    <Route path='member/*' element={<MemberLog/>} />



</Routes>
  )
}

export default MemberRoutes;