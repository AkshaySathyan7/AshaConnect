
import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import MemberRoutes from '../../routes/MemberRoutes'
import MemberSidebar from '../../components/membersidebar/MemberSidebar'




const MemberLog = () => {
  return (
    <div>
   <Navbar/>
   <MemberSidebar/>
   <MemberRoutes/>

   <Footer/>

   </div>
  )
}

export default MemberLog





