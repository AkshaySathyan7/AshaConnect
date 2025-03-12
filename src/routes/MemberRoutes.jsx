import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MemberLog from '../pages/member/App'
import MemberMain from '../pages/member/main/main'
import HealthReport from '../pages/member/healthreport/healthreport'
import UpdateMember from '../pages/member/updateprofile/updatemember'
import FamilyMem from '../pages/member/family/family'
import ChatSingle from '../pages/member/chatsingle/chatsingle'



const MemberRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<MemberMain/>} />  
    <Route path='/member/*' element={<MemberLog/>} />
    <Route path='HealthReport' element={<HealthReport/>} />
    <Route path='UpdateMember' element={<UpdateMember/>} />
    <Route path='FamilyMem' element={<FamilyMem/>} />
    <Route path='ChatSingle' element={<ChatSingle/>} />







</Routes>
  )
}

export default MemberRoutes;