import { useState } from 'react'

import './App.css'
import { Routes,Route } from 'react-router'
import Login from './Components/Pages/Login'
import Register from './Components/Pages/Register'
import Navbar from './Components/Common/Navbar'

import PublicRoute from './Routes/PublicRoute'
import ProtectedRoute from './Routes/ProtectedRoute'
import AdminLayout from './Components/Admin/AdminLayout'
import DoctorLayout from './Components/Doctor/DoctorLayout'
import PatientLayout from './Components/Patient/PatientLayout'
import DoctorDashboard from './Components/Doctor/DoctorDashboard'
import AdminDashboard from './Components/Admin/AdminDashboard'
import PatientDashboard from './Components/Patient/PatientDashboard'
import NotFound from './Components/Pages/NotFound'
import PatientProfile from './Components/Patient/PatientProfile'
import DoctorProfile from './Components/Doctor/DoctorProfile'
import PatientAppointment from './Components/Patient/PatientAppointment'
import AppointmentDetails from './Components/Doctor/AppointmentDetails/AppointmentDetails'
import DoctorAppointment from './Components/Doctor/DoctorAppointment'
import Medicine from './Components/Admin/Medicine'
import MedicineInventory from './Components/Admin/MedicineInventory'
import Sales from './Components/Admin/Sales'
import Patient from './Components/Admin/Patient'
import Doctor from './Components/Admin/Doctor'
import ForgotPassword from './Components/Common/ForgotPassword'
import ResetPassword from './Components/Common/ResetPassword'
import VerifyOtp from './Components/Common/VerifyOtp'



function App() {



  return (
    <div className="h-screen w-screen flex flex-col items-center overflow-x-hidden ">
             <Navbar/>
          
           
<Routes>

    <Route element={<PublicRoute/>}>
     <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/verify-otp" element={<VerifyOtp/>}/>
       <Route path="/forgot-password" element={<ForgotPassword/>}/>
       <Route path="/reset-password/:token" element={<ResetPassword/>}/>
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["ADMIN"]}/>}>
       <Route path="/admin" element={<AdminLayout/> } >
        <Route index  element={<AdminDashboard/>}/> 
        <Route path="medicine" element={<Medicine/>}/>
        <Route path="inventory" element={<MedicineInventory/>}/> 
        <Route path="sales" element={<Sales/>}/>
        <Route path="patients" element={<Patient/>}/>
        <Route path="doctors" element={<Doctor/>}/>
       </Route>
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["DOCTOR"]}/>}>
       <Route path="/doctor" element={<DoctorLayout/> } >
     <Route index element={<DoctorDashboard/>}/>  
     <Route path="profile" element={<DoctorProfile/>} />
     <Route path="appointments" element={<DoctorAppointment/>}/>
     <Route path="appointments/:id" element={<AppointmentDetails/>}/>
       </Route>
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["PATIENT"]}/>}>
       <Route path="/patient" element={<PatientLayout/> } >
         <Route index element={<PatientDashboard/>}/> 
         <Route path="profile" element={<PatientProfile/>} />
         <Route path="appointments" element={<PatientAppointment/>}/>
       </Route>
    </Route>
     
     <Route path="*" element={<NotFound/>}/>
</Routes>
    </div>
  )
}

export default App
