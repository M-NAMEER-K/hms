import { useState } from "react";
import DoctorList from "./DoctorList";
import PatientAppointment from "./PatientAppointment";


const AppointmentLayout = () => {

    const [activePage, setActivePage] = useState("doctors");


    return (
        <div className="w-full min-h-screen  px-1">


            <div className="flex justify-center gap-x-5">

                <button
                    onClick={() => setActivePage("doctors")}
                    className="bg-green-500 hover:bg-green-300 text-white px-4 py-2 rounded-lg"
                >
                    Doctor List
                </button>


                <button
                    onClick={() => setActivePage("appointments")}
                    className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded-lg"
                >
                    My Appointments
                </button>

            </div>


            {
                activePage === "doctors"
                &&
                <DoctorList/>
            }


            {
                activePage === "appointments"
                &&
                <PatientAppointment/>
            }


        </div>
    )
}


export default AppointmentLayout;