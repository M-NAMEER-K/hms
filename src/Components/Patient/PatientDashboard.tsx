import { useEffect, useState } from "react";

import { getAllAppointmentsByPatientServiceAPI, getAppointmentReasonsByPatientServiceAPI, getPatientPrescriptionsServiceAPI } from "../../Services/AppointmentServiceOps";
import PieChartComponent from "../Common/PieChartComponent";
import { useSelector } from "react-redux";
import type { RootState } from "../../reducer/Store/store";
import Loader from "../Common/Loader";



const PatientDashboard = () => {


    const [reasons,setReasons] = useState<any[]>([]);
    const [appointments,setAppointments] = useState<any[]>([]);
    const [medicines,setMedicines] = useState<any[]>([]);
    const [pageLoading, setPageLoading] = useState<boolean>(true);
      const [currentPage, setCurrentPage] = useState(0);
        const [totalPages, setTotalPages] = useState(0);
        const pageSize = 2;
        const [filters,setFilters] = useState({
    
    status:[],
    fromDate:"",
    toDate:"",
    sortBy:"appointmentTime",
    sortDirection:"DESC"
    
    });

    const [medicineFilter,setMedicineFilter]=useState( {
            sortBy:"prescriptionDate",
            sortDirection:"DESC"
        });

   const user = useSelector((state: RootState) => state.user);


    const patientId = user.id;


useEffect(()=>{

    const loadDashboard = async (page:number,appliedFilters=filters)=>{

        setPageLoading(true);

        try{

            const reasonData =
            await getAppointmentReasonsByPatientServiceAPI(patientId);

            setReasons(reasonData);


            const data = await getAllAppointmentsByPatientServiceAPI(user.id , page , pageSize ,  appliedFilters);

        setAppointments(data.content || []);
    

    setTotalPages(data.totalPages);



            const prescriptionData =
            await getPatientPrescriptionsServiceAPI(user.id , page , pageSize ,  medicineFilter);


         const prescriptions = prescriptionData.content || [];

const allMedicines = prescriptions.flatMap(
    (item:any)=>item.medicines
);

setMedicines(allMedicines);

            


        }
        catch(err){
            console.log(err);
        }
        finally{
            setPageLoading(false);
        }

    }


   loadDashboard(currentPage);


},[patientId,currentPage,medicineFilter]);

 if(pageLoading){
    return <Loader />;
}

return(
<div className="w-screen min-h-screen p-2 ">


<div className="w-full rounded-lg p-4 bg-blue-100">

<p className="text-xl">
Welcome Back
<span className="text-blue-700 font-bold ml-2">
{user.name}!
</span>
</p>
<div className="w-[90%] sm:w-[80%] md:w-[70%] flex gap-x-3">
<div className="w-[50%] rounded-lg bg-purple-200 p-2 ">
    <p>Visits</p>
    <p className="text-purple-700 font-medium">{appointments.length}+</p>
</div>

<div className="w-[50%] rounded-lg bg-orange-200 p-2">
    <p>Medicines</p>
    <p className="text-orange-700 font-medium">{medicines.length}+</p>
</div>
</div>


</div>



<div className="w-full flex flex-col items-center gap-y-3 md:flex-row md:justify-between p-2">


{/* PIE CHART */}

<div className="w-[90%] sm:w-[80%] md:w-[33%] bg-blue-100 rounded-lg p-2 flex flex-col h-[400px]">

<h2 className="font-semibold text-lg">
Appointment Reasons
</h2>

<div className="flex-1">
    <PieChartComponent data={reasons}/>
</div>


</div>




{/* APPOINTMENTS */}


<div className="w-[90%] sm:w-[80%] md:w-[33%] bg-blue-100 rounded-lg p-2 flex flex-col h-[400px]">

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
{item.doctorName}
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


<div className="w-[90%] sm:w-[80%] md:w-[33%] rounded-lg p-2 bg-orange-100 flex flex-col h-[400px]">


<h2 className="font-semibold text-lg">
Medicines
</h2>

<div className="flex-1 overflow-y-auto mt-3 flex flex-col gap-3 pr-2">
<div className="flex flex-col gap-3 mt-3 ">


{
medicines.map((medicine,index)=>(

<div
key={index}
className="flex justify-between border-l-4 border-l-orange-400 bg-yellow-100 rounded-lg p-2"
>


<p>

<span className="font-medium">
{" "}
{medicine.name}
</span>
</p>


<p>

{medicine.dosage}
</p>




</div>


))
}



</div>
</div>




</div>


</div>


</div>

)


}


export default PatientDashboard;