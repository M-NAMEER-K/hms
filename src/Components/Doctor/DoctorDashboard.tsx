


import { useEffect, useState } from "react";

import { getAllAppointmentsByDoctorServiceAPI, getAppointmentReasonsByPatientServiceAPI } from "../../Services/AppointmentServiceOps";
import { useSelector } from "react-redux";
import type { RootState } from "../../reducer/Store/store";
import Loader from "../Common/Loader";



const DoctorDashboard = () => {


    const [reasons,setReasons] = useState<any[]>([]);
    const [appointments,setAppointments] = useState<any[]>([]);
    const [patients,setPatients] = useState<any[]>([]);
    const [pageLoading, setPageLoading] = useState(true);

   const user = useSelector((state: RootState) => state.user);


    const patientId = user.id;


useEffect(() => {
    const loadDashboard = async () => {
        setPageLoading(true);

        try {
            const reasonData =
                await getAppointmentReasonsByPatientServiceAPI(patientId);

            setReasons(reasonData);

            const appointmentData =
                await getAllAppointmentsByDoctorServiceAPI(user.profileId);

            setAppointments(appointmentData);

            const uniquePatients = appointmentData.filter(
                (patient: any, index: number, self: any[]) =>
                    index ===
                    self.findIndex(
                        (p: any) => p.patientId === patient.patientId
                    )
            );

            setPatients(uniquePatients);
        } catch (err) {
            console.log(err);
        } finally {
            setPageLoading(false);
        }
    };

    loadDashboard();
}, []);

if (pageLoading) {
    return <Loader />;
}

return(
<div className="w-screen h-screen p-3 ">


<div className="w-full rounded-lg p-4 bg-blue-100">

<p className="text-xl">
Welcome Back
<span className="text-blue-700 font-bold ml-2">
{user.name}!
</span>
</p>
<div className="w-[50%] flex gap-x-3">
<div className="w-[50%] rounded-lg bg-purple-200 p-2 ">
    <p>Appointments</p>
    <p className="text-purple-700 font-medium">{appointments.length}+</p>
</div>

<div className="w-[50%] rounded-lg bg-orange-200 p-2">
    <p>Patients</p>
    <p className="text-orange-700 font-medium">{patients.length}+</p>
</div>
</div>


</div>



<div className="w-full flex justify-between p-2">


{/* PIE CHART */}






{/* APPOINTMENTS */}


<div className="w-[45%] bg-blue-100 rounded-lg p-2 flex flex-col h-[400px]">

<h2 className="font-semibold text-lg">
Appointments
</h2>
<div className="flex-1 overflow-y-auto mt-3 flex flex-col gap-3 pr-2">
        
<div className="flex flex-col gap-3 mt-3">

{
appointments.map((item,index)=>(

<div
key={index}
className="border-l-blue-500 border-l-4 bg-blue-200 rounded-lg p-2"
>

<div className="flex items-center justify-between">
<p>
<span className="font-medium">
{" "}
{item.patientName}
</span>
</p>

<p>
{
new Date(item.appointmentTime)
.toLocaleDateString()
}
</p>

</div>

 
<div className="flex items-center justify-between">


<p>
{item.reason}
</p>





<p>
{
new Date(item.appointmentTime)
.toLocaleTimeString()
}
</p>

</div>



</div>


))
}


    </div>

</div>


</div>





{/* MEDICINES */}

{/* PATIENTS */}

<div 
className="w-[45%] rounded-lg p-2 bg-orange-100 flex flex-col h-[400px]"
>

<h2 className="font-semibold text-lg">
Patients
</h2>


<div className="flex-1 overflow-y-auto mt-3 flex flex-col gap-3 pr-2">


{
patients.map((patient,index)=>(

<div
key={index}
className="border-l-4 border-l-orange-500 bg-yellow-100 rounded-lg p-3"
>


<p className="font-medium">
{patient.patientName}
</p>


<p>
{patient.patientPhone}
</p>


<p className="text-sm">
{patient.patientEmail}
</p>


</div>

))
}


</div>


</div>


</div>


</div>

)


}


export default DoctorDashboard;