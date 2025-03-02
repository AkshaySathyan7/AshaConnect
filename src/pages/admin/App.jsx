import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import AdminRoutes from '../../routes/AdminRoutes'
import Sidebar from '../../components/sidebar/sidebar'
import AdminDashboardMain from './main/main'




const AdminLog = () => {
  return (
    <div>
   <Navbar/>
   <Sidebar/>
   <Footer/>

   <AdminRoutes/>


   </div>
  )
}

export default AdminLog









