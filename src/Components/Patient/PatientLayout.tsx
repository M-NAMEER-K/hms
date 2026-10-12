import { Outlet } from "react-router";



const PatientLayout=()=>{
   return(
    <div className="w-screen h-screen flex justify-center p-2">
         <Outlet/>
    </div>
   )
}

export default PatientLayout;

