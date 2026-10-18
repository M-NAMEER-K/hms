import { useEffect, useState } from "react";
import { getAllDoctorsAPI, getAllPatientsAPI } from "../../Services/ProfileServiceOps";
import { useSelector } from "react-redux";
import type { RootState } from "../../reducer/Store/store";
import { getAllMedicinesAPI } from "../../Services/AdminServiceOps";
import Loader from "../Common/Loader";







const AdminDashboard=()=>{

const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 5;

const [doctors,setDoctors] = useState<any[]>([]);
const [patients,setPatients] = useState<any[]>([]);

const [medicines,setMedicines] = useState<any[]>([]);
const [pageLoading, setPageLoading] = useState(true);
  const [filters, setFilters] = useState({
    departments: [],
    specializations: [],
    sortBy: "name",
    sortDirection: "ASC"
    }); 
   const user = useSelector((state: RootState) => state.user);


useEffect(()=>{


const loadDashboard = async()=>{
setPageLoading(true);
try{


const doctorData =
await getAllDoctorsAPI(currentPage,pageSize,filters);

setDoctors(doctorData.content || []);



const patientData =
await getAllPatientsAPI(currentPage,pageSize);

setPatients(patientData.content || []);


const medicineData=await getAllMedicinesAPI(currentPage,pageSize);


setMedicines(medicineData.content || []);
setTotalPages(medicineData.totalPages || 0);




}
  catch (err) {
        console.log(err);
    } finally {
        setPageLoading(false);
    }


}


loadDashboard();


},[]);

if (pageLoading) {
    return <Loader />;
}

    return(
        <div className="w-screen h-screen p-2">
           
<div className="w-full rounded-lg p-4 bg-blue-100">

<p className="text-xl">
Welcome Back
<span className="text-blue-700 font-bold ml-2">
{user.name}!
</span>
</p>
<div className="w-full flex gap-x-3">
<div className="w-full md:w-[25%] rounded-lg bg-purple-200 p-2 ">
    <p>Doctors</p>
    <p className="text-purple-700 font-medium">{doctors.length}+</p>
</div>

<div className="w-full md:w-[25%] rounded-lg bg-orange-200 p-2">
    <p>Patients</p>
    <p className="text-orange-700 font-medium">{patients.length}+</p>
</div>
<div className="w-full md:w-[25%] rounded-lg bg-orange-200 p-2">
    <p>Medicines</p>
    <p className="text-orange-700 font-medium">{medicines.length}+</p>
</div>

</div>



</div>

<div className="w-full flex flex-col md:flex-row gap-4 mt-5">


{/* DOCTORS LIST */}

<div className="w-full md:w-[50%] bg-purple-100 rounded-lg p-3 h-[400px] flex flex-col">

<h2 className="text-lg font-semibold">
Doctors
</h2>


<div className="flex-1 overflow-y-auto mt-3 flex flex-col gap-3">


{
doctors.map((doctor,index)=>(


<div
key={index}
className="bg-purple-200 border-l-4 border-purple-600 rounded-lg p-3"
>


<p className="font-medium">
{doctor.name}
</p>


<p>
{doctor.email}
</p>


<p>
{doctor.phone}
</p>


<p >
{doctor.specialization}
</p>


</div>


))
}


</div>


</div>





{/* PATIENTS LIST */}


<div className="w-full md:w-[50%] bg-orange-100 rounded-lg p-3 h-[400px] flex flex-col">


<h2 className="text-lg font-semibold">
Patients
</h2>



<div className="flex-1 overflow-y-auto mt-3 flex flex-col gap-3">


{
patients.map((patient,index)=>(


<div
key={index}
className="bg-orange-200 border-l-4 border-orange-600 rounded-lg p-3"
>


<p className="font-medium">
{patient.name}
</p>


<p>
{patient.email}
</p>


<p>
{patient.phone}
</p>





</div>


))
}


</div>


</div>



</div>

<div className="w-full flex gap-4 mt-5">
    {/* MEDICINES LIST */}

<div className="w-full md:w-[50%] bg-green-100 rounded-lg p-3 h-[400px] flex flex-col mt-5">


<h2 className="text-lg font-semibold">
Medicines
</h2>


<div className="flex-1 overflow-y-auto mt-3 flex flex-col gap-3">


{
medicines.map((medicine,index)=>(


<div
key={index}
className="bg-green-200 border-l-4 border-green-600 rounded-lg p-3"
>


<div className="flex justify-between">

<p className="font-medium">
{medicine.name}
</p>


<p>
₹ {medicine.unitPrice}
</p>

</div>



<p>
Dosage: {medicine.dosage}
</p>


<p>
Company: {medicine.manufacturer}
</p>


<p>
Category: {medicine.category}
</p>


<p>
Type: {medicine.type}
</p>


<p>
Stock: {medicine.stock}
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

export default AdminDashboard;