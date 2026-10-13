import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import type { RootState } from "../../reducer/Store/store";
import { getAllAppointmentsByDoctorServiceAPI } from "../../Services/AppointmentServiceOps";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import Loader from "../Common/Loader";


const DoctorAppointment=()=>{
 

    const navigate=useNavigate();
  
    const [appointments, setAppointments] = useState<any[]>([]);
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const user=useSelector((state:RootState)=>state.user);
  

useEffect(() => {
  loadAppointments();
  
}, []);


const loadAppointments = async () => {
  setPageLoading(true);
  try {
    
    const data = await getAllAppointmentsByDoctorServiceAPI(user.profileId);
            console.log(data);
    setAppointments(Array.isArray(data) ? data : []);

  } catch (e) {
    console.error(e);
    setAppointments([]);
  }finally{
    setPageLoading(false);
}
};

if (pageLoading) {
    return <Loader />;
}


     return(
        <div className="w-[90%] h-screen  ">
                
               <p className="text-xl font-medium text-green-500">Appointments</p>   
                
    {appointments.length === 0 ? (
    <div className="flex justify-center items-center py-10 text-gray-500 font-medium">
        No appointments for now.
    </div>
) : (  
      <div>
        <div className="lg:hidden">
    {appointments.map((appointment) => (
        <div
            key={appointment.id}
            className="border flex flex-col gap-y-2 rounded-lg shadow p-2 my-3 bg-white"
        >
            <div >
                <p className="text-xs font-semibold text-gray-500">
                    Patient
                </p>
                <p>{appointment.patientName}</p>
            </div>

            <div >
                <p className="text-xs font-semibold text-gray-500">
                    Appointment Time
                </p>
                <p>{appointment.appointmentTime}</p>
            </div>

            <div >
                <p className="text-xs font-semibold text-gray-500">
                    Reason
                </p>
                <p>{appointment.reason}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Status
                </p>
           
           <div className="flex justify-between">
                     <span
                    className={`inline-block px-3 py-1 rounded-full text-white
                    ${
                        appointment.status === "SCHEDULED"
                            ? "bg-blue-500"
                            : appointment.status === "COMPLETED"
                            ? "bg-green-500"
                            : appointment.status === "CANCELLED"
                            ? "bg-red-500"
                            : "bg-gray-500"
                    }`}
                >
                    {appointment.status}
                </span>
                 <div className="flex justify-end">
                <button
                    onClick={() =>
                        navigate(`/doctor/appointments/${appointment.id}`)
                    }
                    className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                    <FaExternalLinkAlt />
                </button>
            </div>
           </div>
              
            </div>

           
        </div>
    ))}
</div>
    <div className="hidden lg:block">
   <div className="w-full mt-5 border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="w-full flex  bg-green-500 text-white font-semibold p-1">
            <div className="w-[30%] items-center flex justify-start  p-1 break-words whitespace-normal">Patient</div>
            <div className="w-[20%] items-centerr flex justify-start p-1 break-words whitespace-normal">Appointment Time</div>
            <div className="w-[30%] items-center flex justify-start p-1 break-words whitespace-normal">Reason</div>
          
            <div className="w-[10%] items-center flex justify-start p-1 break-words whitespace-normal">Status</div>
            <div className="w-[10%] p-1 flex justify-start  items-center"></div>
            
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
                     

                      {/* Rows */}
        {appointments.map((appointment) => (
            <div
                key={appointment.id}
                className="w-full flex p-1 border-t hover:bg-gray-100"
            >
                <div className="w-[30%]  flex justify-start items-center p-1 break-words whitespace-normal">{appointment.patientName}</div>
                <div className="w-[20%]  flex justify-start items-center p-1 break-words whitespace-normal">{appointment.appointmentTime}</div>
                <div className="w-[30%]  flex justify-start items-center p-1 break-words whitespace-normal">{appointment.reason}</div>
               
               <div className={`w-[10%]  flex justify-center items-center p-1 text-white rounded-lg break-words whitespace-normal  font-semibold ${ appointment.status === "SCHEDULED"
      ? "bg-blue-300"
      : appointment.status === "COMPLETED"
      ? "bg-green-300"
      : appointment.status === "CANCELLED"
      ? "bg-red-300"
      : "bg-gray-300"
  }`}
>
  {appointment.status}
</div>
<div onClick={() => navigate(`/doctor/appointments/${appointment.id}`)} className="w-[10%] flex items-center justify-evenly p-1">
    
           <FaExternalLinkAlt size={20} className="text-blue-500 hover:text-blue-300" />
        
</div>
            </div>
        ))}
                </div>

       
    </div>
</div>
      </div>
    
)}


        </div>
     )
}

export default DoctorAppointment;