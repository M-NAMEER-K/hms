import { useEffect, useState } from "react";
import { getAllDoctorsAPI } from "../../../Services/ProfileServiceOps";
import { getProfileImageAPI } from "../../../Services/MediaServiceOps";
import Loader from "../../Common/Loader";
import Filter from "../../Common/Filter";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import Pagination from "../../Common/Pagination";
import { doctorFilterConfig } from "../../../Utils/filters/doctorFilterConfig";
import { scheduleAppointmentServiceAPI } from "../../../Services/AppointmentServiceOps";
import { validateAppointment, type AppointmentErrors } from "../../../Utils/Validators/appointmentValidators";
import { useSelector } from "react-redux";
import type { RootState } from "../../../reducer/Store/store";
import { FiPlusCircle } from "react-icons/fi";
import { appointmentReasons } from "../../../Utils/constants/Appointment";
import type { ApiError } from "../../Common/ErrorModal";
import ErrorModal from "../../Common/ErrorModal";
import { createOrderAPI, verifyPaymentAPI } from "../../../Services/PaymentServiceOps";
import {type RazorpayOptions, type RazorpayResponse} from "../../../Utils/types/razorpay"

declare global {

    interface Window {
        Razorpay: any;
    }

}
interface Availability {
   day:string;
   startTime:string;
   endTime:string;
}


interface Doctor {
   id:number;
   name:string;
   email:string;
   phone:string;
   dob:string;
   address:string;
   department:string;
   specialization:string;
   licenseNumber:string;
   totalExp:number;
   profilePictureId:number|null;

   consultationFees:number;
   currency:string;
   availability:Availability[];
}


const DoctorList=()=>{

    const [appointmentTime,setAppointmentTime] = useState("");
const [reason,setReason] = useState("");
const [notes,setNotes] = useState("");

const [loading,setLoading] = useState(false);
const [apiErrors,setApiErrors] = useState<ApiError[]>([]);
const [errors,setErrors] = useState<AppointmentErrors>({});

const [showAppointmentForm,setShowAppointmentForm] = useState(false);



    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [pageLoading, setPageLoading] = useState(true);
   const [doctorImages, setDoctorImages] = useState<Record<number,string>>({});
const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
  const [bookingId,setBookingId] = useState("");
    const [selectedDoctorForAppointment,setSelectedDoctorForAppointment] = 
useState<Doctor | null>(null);

const user = useSelector((state:RootState)=>state.user);


    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 5;
    const [filters, setFilters] = useState({
    departments: [],
    specializations: [],
    sortBy: "name",
    sortDirection: "ASC"
    }); 

  useEffect(() => {
    loadDoctors(currentPage, filters);
}, [currentPage, filters]);

const openAppointmentForm = (doctor:Doctor)=>{

    setSelectedDoctorForAppointment(doctor);

    setAppointmentTime("");
    setReason("");
    setNotes("");
    setErrors({});

    setShowAppointmentForm(true);
};
const isDoctorAvailable = (value:string)=>{

    if(!selectedDoctorForAppointment){
        return false;
    }


    const selectedDate = new Date(value);

    const today = new Date();

    today.setHours(0,0,0,0);
    selectedDate.setHours(0,0,0,0);


    // Only today's appointments allowed
    if(selectedDate.getTime() !== today.getTime()){
        return false;
    }


    const selectedDay = selectedDate.toLocaleDateString(
        "en-US",
        {
            weekday:"long"
        }
    );


    const selectedTime = new Date(value)
        .toTimeString()
        .slice(0,5);



    return selectedDoctorForAppointment.availability.some(
        (slot)=>{

            return (
                slot.day.toLowerCase() === selectedDay.toLowerCase()
                &&
                selectedTime >= slot.startTime
                &&
                selectedTime <= slot.endTime
            );

        }
    );

};

const handleApiError = (err:any)=>{

setApiErrors(prev=>[
    ...prev,
    {
        id:Date.now(),
        status:err.response?.status,
        message:
        err.response?.data?.errorMessage ||
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
    }
]);

};

const handlePayment = async()=>{

return new Promise(async(resolve,reject)=>{

try{
const id = crypto.randomUUID();


const orderResponse = await createOrderAPI({

referenceId:id,
referenceType:"APPOINTMENT",
amount:selectedDoctorForAppointment?.consultationFees

});


const options = {

key: import.meta.env.VITE_RAZORPAY_KEY_ID,

amount: orderResponse.amount * 100,

currency: orderResponse.currency,

name:"Pulse HMS",

description:"Doctor Consultation Payment",

order_id:orderResponse.razorpayOrderId,


handler:async function(response:RazorpayResponse){

try{

const verifyResponse = await verifyPaymentAPI({

razorpayOrderId:
response.razorpay_order_id,

razorpayPaymentId:
response.razorpay_payment_id,

razorpaySignature:
response.razorpay_signature

});


console.log(verifyResponse);


resolve({
    ...verifyResponse,
    referenceId:id
});


}
catch(error){

reject(error);

}

}


};


const razorpay = new window.Razorpay(options);


razorpay.on(
"payment.failed",
function(response:any){

console.log(response);



reject(response);

});


razorpay.open();


}
catch(error){

reject(error);

}


});

}
const handleScheduleAppointment = async(e:React.FormEvent)=>{

e.preventDefault();


const validationErrors = validateAppointment({

doctorId:selectedDoctorForAppointment?.id || null,
appointmentTime,
reason,
notes,


});


setErrors(validationErrors);


if(Object.keys(validationErrors).length>0){
    return;
}


setLoading(true);

try{


console.log("payment start");
const paymentResponse:any = await handlePayment();


await scheduleAppointmentServiceAPI({

patientId:user.id,
doctorId:selectedDoctorForAppointment?.id,
appointmentTime,
reason,
notes,
referenceId:paymentResponse.referenceId
});

setAppointmentTime("");
setReason("");
setNotes("");
setErrors({});
setSelectedDoctorForAppointment(null);

setShowAppointmentForm(false);


}
catch(error:any){

handleApiError(error);

}
finally{

setLoading(false);

}

};

   const loadDoctors = async (page: number,appliedFilters = filters) => {
        setPageLoading(true);

        try {
            const data = await getAllDoctorsAPI( page, pageSize, appliedFilters );
            setDoctors(data.content || []);
            const doctorsWithImages = data.content || [];

const imageMap: Record<number,string> = {};

await Promise.all(
    doctorsWithImages.map(async (doctor:Doctor)=>{

        if(doctor.profilePictureId){

            try{

                const url = await getProfileImageAPI(
                    doctor.profilePictureId
                );

                imageMap[doctor.id] = url;

            }
            catch(err){

                console.log(err);

            }

        }

    })
);


            setDoctorImages(imageMap);
            setCurrentPage(data.number);
            setTotalPages(data.totalPages);

            console.log(data);

        
              }
     catch(err:any){
           console.log(err.response.data);
  

}
finally{

    setPageLoading(false);


}
    };

 if (pageLoading) {
        return <Loader />;
    } 

   
         return (
        <div className="w-[98%]  px-2">
                  
                  <ErrorModal errors={apiErrors} onClose={()=>setApiErrors([])} />

            <p className="text-xl font-medium text-green-500">
                Doctors
            </p>
            <div className="w-full flex justify-end"> 
                       <Filter
    config={doctorFilterConfig}
    initialFilters={filters}
    onApplyFilter={(newFilters)=>{
        setFilters(newFilters);
        setCurrentPage(0);
    }}
/>

            </div>
       

           
            {doctors.length === 0 ? (
                <div className="flex justify-center items-center py-10 text-gray-500 font-medium">
                    No Doctors Found.
                </div>
            ) : (
                <div>

                    <div className="md:hidden ">
    {doctors.map((doctor) => (
        <div
            key={doctor.id}
            className="border rounded-lg shadow bg-white p-2 my-2 flex flex-col gap-y-1"
        >
             <div >
                              
{
doctorImages[doctor.id] ?

<img
src={doctorImages[doctor.id]}
alt="doctor"
onClick={()=>setPreviewImage(doctorImages[doctor.id])}
className="w-10 h-10 rounded-full object-cover cursor-pointer"
/>

:

<FaRegCircleUser
size={35}
/>

}

                              </div>
            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Name
                </p>
                <p>{doctor.name}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Email
                </p>
                <p className="break-all">{doctor.email}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Phone Number
                </p>
                <p>{doctor.phone}</p>
            </div>

          <div className="flex justify-end mt-2 gap-2 ">

<button
onClick={()=>{
setSelectedDoctor(doctor);
setShowModal(true);
}}
className="p-2 rounded bg-blue-500 text-white"
>
<FaRegEye/>
</button>


<button
onClick={()=>openAppointmentForm(doctor)}
className="p-2 rounded bg-green-500 text-white"
>
<FiPlusCircle/>
</button>

</div>
        </div>
    ))}
</div>
                       <div className="hidden md:block">
                <div className="w-full mt-5 border rounded-lg overflow-hidden">

                    {/* Header */}

                    <div className="w-full flex bg-green-500 text-white font-semibold p-2">
                        <div className="w-[10%]"></div>
                        <div className="w-[30%]">Name</div>
                        <div className="w-[30%]">Email</div>
                        <div className="w-[20%]">Phone Number</div>
                        <div className="w-[10%]"> </div>
                    </div>

                    {/* Rows */}

                    {doctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="w-full flex border-t p-2 hover:bg-gray-100"
                        >
                              <div className="w-[10%]">
                              
{
doctorImages[doctor.id] ?

<img
src={doctorImages[doctor.id]}
alt="doctor"
onClick={()=>setPreviewImage(doctorImages[doctor.id])}
className="w-10 h-10 rounded-full object-cover cursor-pointer"
/>

:

<FaRegCircleUser 
size={35}
/>

}

                              </div>
                            <div className="w-[30%] break-words">
                                {doctor.name}
                            </div>

                            <div className="w-[30%] break-words">
                                {doctor.email}
                            </div>

                            <div className="w-[20%] break-words">
                                {doctor.phone}
                            </div>
                                <div className="flex justify-end mt-2 gap-2 ">

<button
onClick={()=>{
setSelectedDoctor(doctor);
setShowModal(true);
}}
className="p-2 rounded bg-blue-500 text-white"
>
<FaRegEye/>
</button>


<button
onClick={()=>openAppointmentForm(doctor)}
className="p-2 rounded bg-green-500 text-white"
>
<FiPlusCircle/>
</button>

</div>
                        </div>
                    ))}

                </div>
                </div>
             </div>
            )}




            {showModal && selectedDoctor && (
    <div className="w-full fixed inset-0 bg-black/40 px-2 flex justify-center items-center z-50">

        <div className="bg-white rounded-lg shadow-lg w-full p-6">

            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold text-green-600">
                    Doctor Details
                </h2>

                <button
                    onClick={() => setShowModal(false)}
                    className="text-red-500 text-xl font-bold"
                >
                    ✕
                </button>
            </div>

            <div className="">

    <p><b>Name:</b> {selectedDoctor.name}</p>

    <p><b>Email:</b> {selectedDoctor.email}</p>

    <p><b>Phone:</b> {selectedDoctor.phone}</p>

    <p><b>Date of Birth:</b> {selectedDoctor.dob}</p>

    <p><b>Department:</b> {selectedDoctor.department}</p>

    <p><b>Specialization:</b> {selectedDoctor.specialization}</p>

    <p><b>Experience:</b> {selectedDoctor.totalExp} Years</p>

    <p><b>License Number:</b> {selectedDoctor.licenseNumber}</p>

    <p><b>Address:</b> {selectedDoctor.address}</p>
    <p>
<b>Consultation Fees:</b> 
{selectedDoctor.consultationFees} {selectedDoctor.currency}
</p>


<p>
<b>Availability:</b>
</p>


<div className="ml-4">
{
selectedDoctor.availability?.map((slot,index)=>(
<div key={index} className="border p-2 rounded my-1 flex flex-col md:flex-row w-full md:w-[50%] justify-evenly">

<p>
<b>Day:</b> {slot.day}
</p>

<p>
<b>Time:</b> {slot.startTime} - {slot.endTime}
</p>

</div>
))
}
</div>

    

</div>

           

        </div>

    </div>
)}
     <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={(page)=>setCurrentPage(page)}
/>

{
previewImage && (

<div className="fixed inset-0 bg-black/30 backdrop-blur flex items-center justify-center z-50">


<div className="relative">


<button
onClick={()=>setPreviewImage(null)}
className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-8 h-8 text-xl"
>
×
</button>


<img
src={previewImage}
className="max-w-[80vw] max-h-[90vh] rounded-xl object-contain"
/>


</div>


</div>

)
}

{showAppointmentForm && selectedDoctorForAppointment && (

<div className="fixed inset-0 bg-black/40 overflow-y-auto flex justify-center items-center z-50">


<div  className="w-[90%] sm:w-[95%] md:w-[80%] lg:w-[60%] max-h-[90vh] overflow-y-auto border rounded-lg  border-green-500 p-2 bg-gray-100">


<div className="flex justify-between">

<h2 className="text-xl font-semibold text-green-600">
Schedule Appointment
</h2>


<button
onClick={()=>setShowAppointmentForm(false)}
className="text-red-500 text-xl"
>
✕
</button>


</div>



<form 
onSubmit={handleScheduleAppointment}
className="flex flex-col gap-2 mt-5"
>


<label className="font-medium">
Doctor
</label>

<p  className=" outline-none rounded-lg border border-gray-500 p-2">
{selectedDoctorForAppointment.name}
</p>



<label className="font-medium">
Appointment Time
</label>

<input
type="datetime-local"
value={appointmentTime}
onChange={(e)=>{

const value=e.target.value;


if(!isDoctorAvailable(value)){

const selected = new Date(value);
const today = new Date();

selected.setHours(0,0,0,0);
today.setHours(0,0,0,0);


setErrors(prev=>({
...prev,
appointmentTime:
selected.getTime() !== today.getTime()
?
"Only today's appointments are allowed"
:
"Doctor is not available at selected time"
}));

setAppointmentTime("");

return;

}


setAppointmentTime(value);


setErrors(prev=>({
...prev,
appointmentTime:undefined
}));

}}
className="outline-none rounded-lg border border-gray-500 p-2"
/>

{
errors.appointmentTime &&

<p className="text-red-500 text-xs">
{errors.appointmentTime}
</p>

}



<label className="font-medium">
Reason
</label>


<select
value={reason}
onChange={(e)=>{

setReason(e.target.value);

if(e.target.value){
setErrors(prev=>({
...prev,
reason:undefined
}));
}

}}  className=" outline-none rounded-lg border border-gray-500 p-2">

<option value="">
Select Reason
</option>


{
appointmentReasons.map((item)=>(
<option key={item}>
{item}
</option>
))
}


</select>
{
errors.reason &&

<p className="text-red-500 text-xs">
{errors.reason}
</p>

}


<label className="font-medium">
Notes
</label>


<input  className=" outline-none rounded-lg border border-gray-500 p-2"
value={notes}
onChange={(e)=>{

setNotes(e.target.value);

if(e.target.value.length<=300){
setErrors(prev=>({
...prev,
notes:undefined
}));
}

}}/>
{
errors.notes &&

<p className="text-red-500 text-xs">
{errors.notes}
</p>

}
<label className="font-medium">
Consultation Fees
</label>

<p className="border border-gray-500 rounded-lg p-2 ">

{
selectedDoctorForAppointment.consultationFees
}
{" "}
{
selectedDoctorForAppointment.currency
}

</p>

<label className="font-medium">
Available Slots
</label>


<div className="flex flex-wrap gap-2">

{
selectedDoctorForAppointment.availability.map(
(slot,index)=>(

<div
key={index}
className="border rounded-lg p-2 bg-green-100"
>

<p>
{slot.day}
</p>

<p>
{slot.startTime} - {slot.endTime}
</p>


</div>

))
}

</div>

<div className="flex justify-center">
<button
disabled={loading}
className="bg-green-500 text-white rounded-lg p-2"
>

{
loading?
"Scheduling..."
:
"Schedule Appointment"
}

</button>
</div>




</form>


</div>


</div>

)}
        </div>
    );
};



export default DoctorList;