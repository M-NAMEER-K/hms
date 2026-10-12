import { Outlet } from "react-router";


const DoctorLayout=()=>{
      return (<div className="w-screen h-screen flex justify-center p-2">
            <Outlet/>
      </div>)
}

export default DoctorLayout;