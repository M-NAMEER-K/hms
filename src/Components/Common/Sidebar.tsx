import type { RootState } from "../../reducer/Store/store";
import { useSelector } from "react-redux";
import type { IconType } from "react-icons";
import { Link } from "react-router";
import { RxDashboard } from "react-icons/rx";
import { LuUserRound } from "react-icons/lu";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { LuCalendarCheck2 } from "react-icons/lu";

import { FaUserDoctor } from "react-icons/fa6";
import { RiUserHeartLine } from "react-icons/ri";
import { FaMedkit } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";

interface SidebarProps{
     open:boolean;
     closeSidebar:()=> void;
}
interface IMenu{
     title:string;
     path:string;
     icon:IconType;
}
const Sidebar=({open , closeSidebar}:SidebarProps)=>{
    
    const user=useSelector((state:RootState)=>state.user);
  
    const adminSidebar=[
                        {title:"Dashboard",path:"/admin" ,icon:RxDashboard },
                        {title:"Doctors",path:"/admin/doctors",icon:FaUserDoctor },
                        {title:"Patients",path:"/admin/patients",icon:RiUserHeartLine },
                        {title:"Medicine",path:"/admin/medicine",icon:FaMedkit},
                        {title:"Inventory",path:"/admin/inventory",icon:BsFillBoxSeamFill},
                        {title:"Sales",path:"/admin/sales",icon:FaChartBar}];
    const doctorSidebar=[
                        {title:"Dashboard",path:"/doctor",icon:RxDashboard },
                        {title:"Appointments",path:"/doctor/appointments",icon:LuCalendarCheck2 },
                        {title:"profile",path:"/doctor/profile",icon:LuUserRound }];
    const patientSidebar=[
                        {title:"Dashboard",path:"/patient",icon:RxDashboard },
                        {title:"Appointments",path:"/patient/appointments",icon:LuCalendarCheck2 },
                        {title:"Profile",path:"/patient/profile",icon:LuUserRound }];

    let menus:IMenu[]=[];
     switch(user.role){
        case "ADMIN":{
               menus=adminSidebar;
             break;
            }
        case "DOCTOR":{
              menus=doctorSidebar;
              break;
            }
        case "PATIENT":{
              menus=patientSidebar;
              break;
        }
     }
    return(
        <div className="w-full  text-white ">
                     { open && (
                         
                              <div onClick={closeSidebar} ></div>    )}
                              <div className={` fixed top-0 right-0 h-screen w-[70%] sm:w-[50%] md:w-[30%] bg-gray-900  shadow-md z-50 transition-transform duration-300 ease-in-out ${open?"translate-x-0":"translate-x-full"}`}>
                                    <div className="w-full flex justify-end items-center p-2">
                                
                        <button onClick={closeSidebar} className="text-white bg-red-500 hover:bg-red-300 px-2  rounded-md">
                           X 
                        </button>
                           
                     </div>
                     <div className="w-full flex flex-col py-4 items-center">
                                    <p >{user.name}</p>
                                    <p className="text-sm text-gray-400">{user.role}</p>
                                </div>
                      
                      <div className="w-full flex flex-col">
                        {  
                           menus.map((item) => {
                           const Icon = item.icon;

                          return (
                              <div className="w-full" key={item.title}>
                                    <Link to={item.path} onClick={closeSidebar}
                           className="w-full flex items-center gap-3 px-5 py-3 hover:bg-green-400">
                                           <Icon className="text-xl" />
                                           <span>{item.title}</span>
                                          </Link>
                                         </div>
                                         );
                                         })
                        }
                     </div>
                              </div>
                     
                         </div>
                        
                 
                    
        
    )

}
export default Sidebar;