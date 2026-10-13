import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { appointmentReasons } from "../../Utils/constants/Appointment";
import { getDoctorDropdownsServiceAPI } from "../../Services/ProfileServiceOps";
import { cancelAppointmentServiceAPI, getAllAppointmentsByPatientServiceAPI, scheduleAppointmentServiceAPI, updateAppointmentServiceAPI } from "../../Services/AppointmentServiceOps";
import { useSelector } from "react-redux";
import type { RootState } from "../../reducer/Store/store";
import { validateAppointment, type AppointmentErrors } from "../../Utils/Validators/appointmentValidators";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Loader from "../Common/Loader";


const PatientAppointment=()=>{
    interface Doctor {
    id: number;
    name: string;
}

    const [editingId, setEditingId] = useState<number | null>(null);
    const [errors, setErrors] =useState<AppointmentErrors>({});
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [appointmentTime, setAppointmentTime] = useState("");
    const [reason, setReason] = useState("");
    const [notes, setNotes] = useState("");
    const [loading,setLoading]=useState(false);
    const [pageLoading,setPageLoading] = useState(false); // initial page loader
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const user=useSelector((state:RootState)=>state.user);
   
 useEffect(() => {
    if (!showForm) return;

    const fetchDoctors = async () => {
        try {
            const data = await getDoctorDropdownsServiceAPI();
            console.log("doctordropdowns",data);
            setDoctors(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setDoctors([]);
        }
    };

    fetchDoctors();
}, [showForm]);

useEffect(() => {
  loadAppointments();
}, []);


const handleEdit = (appointment: any) => {

    setEditingId(appointment.id);

    setSelectedDoctorId(appointment.doctorId);
    setAppointmentTime(
        appointment.appointmentTime.slice(0,16)
    );

    setReason(appointment.reason);
    setNotes(appointment.notes);

    setShowForm(true);
};

const confirmDelete = async () => {
    if (!deleteId) return;

    await cancelAppointmentServiceAPI(deleteId);

    setDeleteId(null);
    setShowDeleteModal(false);

    loadAppointments();
};
const cancelDelete = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
};
const loadAppointments = async () => {
  setPageLoading(true);

  try {
    const data = await getAllAppointmentsByPatientServiceAPI(user.id);

    setAppointments(Array.isArray(data) ? data : []);

  } catch (e) {
    console.error(e);
    setAppointments([]);
  } finally {
    setPageLoading(false);
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();



  const validationErrors = validateAppointment({
    doctorId: selectedDoctorId,
    appointmentTime,
    reason,
    notes,
});

setErrors(validationErrors);

if (Object.keys(validationErrors).length > 0) {
    return;
}

  if (editingId) {

    await updateAppointmentServiceAPI({
        id: editingId,
        patientId: user.id,
        doctorId: selectedDoctorId,
        appointmentTime,
        reason,
        notes,
    });

} else {

    await scheduleAppointmentServiceAPI({
        patientId: user.id,
        doctorId: selectedDoctorId,
        appointmentTime,
        reason,
        notes,
    });

}

  setShowForm(false);

  loadAppointments(); // refresh table
};

if(pageLoading){
    return <Loader/>;
}
     return(
        <div className="w-[90%] h-screen  ">
                
                  
                <div className=" ">
                  <button  onClick={() => setShowForm(true)} className="bg-green-500 flex items-center text-white rounded-lg p-2 gap-x-2"> <FiPlusCircle /> Schedule Appointment</button>
                </div>

            { showForm && (
               <div className="fixed inset-0 z-50 flex items-center justify-center ">
               <div className="w-[90%] sm:w-[95%] md:w-[80%] lg:w-[60%] border rounded-lg  border-green-500 p-2 bg-gray-100 ">   
                   <div className="flex justify-between items-center">
                   <p className="text-green-500 font-medium " > {editingId? "Edit Appointment": "Schedule Appointment"}</p>
                 
                 <button onClick={() => setShowForm(false)} className=" bg-red-500 hover:bg-red-300 text-white px-2 py-1 rounded-lg"> X </button>
               </div>
                     <form    onSubmit={handleSubmit} className="  flex flex-col gap-y-3 " >
              
              

                 <div className="w-full flex flex-col ">
                  <label className="font-medium">Doctor</label>
                <select
value={selectedDoctorId ?? ""}
onChange={(e)=>{
    const value = Number(e.target.value);

    setSelectedDoctorId(value);

    if(value){
        setErrors(prev=>({
            ...prev,
            doctorId:undefined
        }));
    }
}}
 className=" outline-none rounded-lg border border-gray-500 p-2"
>
    <option value="">Select Doctor</option>

    {doctors.map((doctor) => (
        <option key={doctor.id} value={doctor.id}>
            {doctor.name}
        </option>
    ))}
</select>
                 </div>
                 {errors.doctorId && (
<p className="text-red-500 text-xs mt-1">
    {errors.doctorId}
</p>
)}
                  <div className="w-full flex flex-col ">
                     <label className="font-medium">Appointment Time</label>
                     <input type="datetime-local"
value={appointmentTime}
onChange={(e)=>{

    const value=e.target.value;

    setAppointmentTime(value);

    if(value){
        setErrors(prev=>({
            ...prev,
            appointmentTime:undefined
        }));
    }

}}
  placeholder="Enter time" className=" outline-none rounded-lg border border-gray-500 p-2"/>
                  </div>
                  {errors.appointmentTime && (
<p className="text-red-500 text-xs mt-1">
    {errors.appointmentTime}
</p>
)}

                  <div className="w-full flex flex-col ">
                     <label className="font-medium">Reason for Appointment</label>
                  <select 
value={reason}
onChange={(e)=>{

    const value=e.target.value;

    setReason(value);

    if(value){
        setErrors(prev=>({
            ...prev,
            reason:undefined
        }));
    }

}}

   className="outline-none rounded-lg border border-gray-500 p-2">
  <option value="">Select Reason</option>
  {appointmentReasons.map((reason) => ( <option key={reason} value={reason}>
      {reason}
    </option>))}
</select>
</div>
{errors.reason && (
<p className="text-red-500 text-xs mt-1">
    {errors.reason}
</p>
)}

                   <div className="w-full flex flex-col ">
                     <label className="font-medium">Additional Notes</label>
                     <input  value={notes}
onChange={(e)=>{

    const value=e.target.value;

    setNotes(value);

    if(value.length<=300){
        setErrors(prev=>({
            ...prev,
            notes:undefined
        }));
    }

}}
                     placeholder="Enter additional notes" className=" outline-none rounded-lg border border-gray-500 p-2"/>
                   </div>
                   {errors.notes && (
<p className="text-red-500 text-xs mt-1">
    {errors.notes}
</p>
)}
                   <div className="flex justify-center items-center">
<button
type="submit"
disabled={loading}
className={`rounded-lg p-2 text-white transition ${
loading
? "bg-green-300 cursor-not-allowed"
: "bg-green-500 hover:bg-green-600"
}`}
>
 {loading? editingId? "Updating...": "Scheduling..." : editingId? "Update Appointment": "Schedule Appointment"}
</button>
                   </div>
            </form>
               </div>
                 </div> 
            )}


    {appointments.length === 0 ? (
    <div className="flex justify-center items-center py-10 text-gray-500 font-medium">
        No appointments for now.
    </div>
) : (
     
    <div>

    <div className="lg:hidden ">
    {appointments.map((appointment) => (
        <div
            key={appointment.id}
            className="border flex flex-col gap-y-2 rounded-lg p-2 shadow bg-white my-2"
        >
            <div className="">
                <p className="text-xs text-gray-500 font-semibold">
                    Doctor
                </p>
                <p>{appointment.doctorName}</p>
            </div>

            <div className="">
                <p className="text-xs text-gray-500 font-semibold">
                    Appointment Time
                </p>
                <p>{appointment.appointmentTime}</p>
            </div>

            <div className="">
                <p className="text-xs text-gray-500 font-semibold">
                    Reason
                </p>
                <p>{appointment.reason}</p>
            </div>

            <div className="">
                <p className="text-xs text-gray-500 font-semibold">
                    Status
                </p>

                <span
                    className={`inline-block px-3 py-1 rounded-full text-white
                    ${
                        appointment.status === "SCHEDULED"
                            ? "bg-blue-500"
                            : appointment.status === "COMPLETED"
                            ? "bg-green-500"
                            : "bg-red-500"
                    }`}
                >
                    {appointment.status}
                </span>
            </div>

           
        </div>
    ))}
</div>


    <div className="hidden lg:block">
    <div className="w-full mt-5 border rounded-lg overflow-hidden">
           
           
    
        
    {/* Fixed Header */}
    <div className="w-full flex  bg-green-500 text-white font-semibold p-1">
        <div className="w-[30%] flex items-center p-1">
            Doctor
        </div>

        <div className="w-[20%] flex items-center p-1">
            Appointment Time
        </div>

        <div className="w-[30%] flex items-center p-1">
            Reason
        </div>

        <div className="w-[10%] flex items-center p-1">
            Status
        </div>

        <div className="w-[10%] p-1"></div>
    </div>


    {/* Scrollable Rows */}
    <div className="max-h-[50vh] overflow-y-auto">

        {appointments.map((appointment)=>(
            <div
                key={appointment.id}
                className="w-full flex   p-1 border-t hover:bg-gray-100"
            >

                <div className="w-[30%] flex items-center p-1 break-words">
                    {appointment.doctorName}
                </div>

                <div className="w-[20%] flex items-center p-1 break-words">
                    {appointment.appointmentTime}
                </div>

                <div className="w-[30%] flex items-center p-1 break-words">
                    {appointment.reason}
                </div>

                <div
                className={`w-[10%] flex justify-center items-center rounded-lg text-white font-semibold
                ${
                appointment.status==="SCHEDULED"
                ?"bg-blue-300"
                :appointment.status==="COMPLETED"
                ?"bg-green-300"
                :appointment.status==="CANCELLED"
                ?"bg-red-300"
                :"bg-gray-300"
                }`}
                >
                    {appointment.status}
                </div>


                <div className="w-[10%] flex justify-evenly items-center">

                    {appointment.status==="SCHEDULED" && (
                        <>
                        <button
                        onClick={()=>handleEdit(appointment)}
                        className="p-1 rounded bg-yellow-400 text-white"
                        >
                            <FaRegEdit size={20}/>
                        </button>


                        <button
                        onClick={()=>{
                            setDeleteId(appointment.id);
                            setShowDeleteModal(true);
                        }}
                        className="p-1 rounded bg-red-400 text-white"
                        >
                            <MdDeleteForever size={20}/>
                        </button>
                        </>
                    )}

                </div>


            </div>
        ))}

    </div>

</div>
</div>
</div>
)}


{showDeleteModal && (
<div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="  w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%]  bg-white rounded-lg  p-5">

        <h2 className="text-xl font-semibold">
            Cancel Appointment
        </h2>

        <p className="mt-3 text-gray-600">
            Are you sure you want to cancel this appointment?
        </p>

        <div className="flex justify-end gap-3 mt-6">
            <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
                No
            </button>

            <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
                Yes, Cancel
            </button>
        </div>

    </div>
</div>
)}
        </div>
     )
}

export default PatientAppointment;