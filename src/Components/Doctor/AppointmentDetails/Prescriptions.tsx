import { useEffect, useState } from "react";
import { getAppointmentDetailsServiceAPI, getPatientPrescriptionsServiceAPI } from "../../../Services/AppointmentServiceOps";
import { FaRegEye } from "react-icons/fa";
import { BsCapsule } from "react-icons/bs";
import Loader from "../../Common/Loader";

interface PrescriptionProps {
    appointment: any;
    onAppointmentSelect: (appointment: any) => void;
}
const Prescriptions=({appointment ,  onAppointmentSelect}:PrescriptionProps)=>{
   
const [pageLoading, setPageLoading] = useState(true);
const [prescriptions, setPrescriptions] = useState<any>(null);
const [showMedicines, setShowMedicines] = useState(false);
const [selectedMedicines, setSelectedMedicines] = useState<any[]>([]);
const [selectedDate, setSelectedDate] = useState("");

const fetchPrescriptions = async () => {
    setPageLoading(true);

    try {
        const data = await getPatientPrescriptionsServiceAPI(
            appointment.patientId
        );

        setPrescriptions(Array.isArray(data) ? data : []);
    } catch (error) {
        console.log(error);
    } finally {
        setPageLoading(false);
    }
};

useEffect(() => {
    if (appointment?.patientId) {
        fetchPrescriptions();
    }
}, [appointment]);


const handleView = async (appointmentId: number) => {
    const data = await getAppointmentDetailsServiceAPI(appointmentId);

    onAppointmentSelect(data);
};

if (pageLoading) {
    return <Loader />;
}

return (
  <div className="w-full flex justify-center">
    <div className="w-[95%]">
      <p className="text-xl font-medium text-green-500">
        Prescription
      </p>

     {!prescriptions ? (
    <div className="flex justify-center items-center py-10 text-gray-500 font-medium">
        No Prescription Available.
    </div>
) : (
    <div>

        {/* Mobile View */}
        <div className="md:hidden ">
            {prescriptions.map((prescription: any) => (
                <div
                    key={prescription.id}
                    className="border rounded-lg shadow p-2 bg-white my-3 flex flex-col gap-y-1"
                >
                    <div>
                        <p className="text-xs font-semibold text-gray-500">
                            Doctor
                        </p>
                        <p>{appointment.doctorName}</p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-500">
                            Prescription Date
                        </p>
                        <p>{prescription.prescriptionDate}</p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-500">
                            Medicines
                        </p>
                        <p>{prescription.medicines.length}</p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-500">
                            Notes
                        </p>
                        <p>{prescription.notes}</p>
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        <button
                            onClick={() =>
                                handleView(prescription.appointmentId)
                            }
                            className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                        >
                            <FaRegEye />
                        </button>

                        <button
                            onClick={() => {
                                setSelectedMedicines(prescription.medicines);
                                setSelectedDate(
                                    prescription.prescriptionDate
                                );
                                setShowMedicines(true);
                            }}
                            className="p-2 rounded bg-green-500 text-white hover:bg-green-600"
                        >
                            <BsCapsule />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
            <div className="w-full mt-5 border rounded-lg overflow-hidden">

                {/* Header */}
                <div className="w-full flex bg-green-500 text-white font-semibold p-1">
                    <div className="w-[25%] p-2">Doctor Name</div>
                    <div className="w-[20%] p-2">Prescription Date</div>
                    <div className="w-[15%] p-2">Medicines</div>
                    <div className="w-[30%] p-2">Notes</div>
                    <div className="w-[10%] p-2"></div>
                </div>

                {prescriptions.map((prescription: any) => (
                    <div
                        key={prescription.id}
                        className="w-full flex border-t hover:bg-gray-100"
                    >
                        <div className="w-[25%] p-2">
                            {appointment.doctorName}
                        </div>

                        <div className="w-[20%] p-2">
                            {prescription.prescriptionDate}
                        </div>

                        <div className="w-[15%] p-2">
                            {prescription.medicines.length}
                        </div>

                        <div className="w-[30%] p-2">
                            {prescription.notes}
                        </div>

                        <div className="w-[10%] flex justify-center items-center gap-2">
                            <FaRegEye
                                size={20}
                                className="cursor-pointer hover:text-blue-600"
                                onClick={() =>
                                    handleView(
                                        prescription.appointmentId
                                    )
                                }
                            />

                            <BsCapsule
                                size={20}
                                className="cursor-pointer hover:text-blue-600"
                                onClick={() => {
                                    setSelectedMedicines(
                                        prescription.medicines
                                    );
                                    setSelectedDate(
                                        prescription.prescriptionDate
                                    );
                                    setShowMedicines(true);
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>

    </div>
)}
    </div>





    {showMedicines && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-[90%] overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center px-5 py-3 border-b">
                <h2 className="text-xl font-semibold text-green-600">
                    Medicines
                </h2>

                <button
                    onClick={() => setShowMedicines(false)}
                    className="text-red-500 text-xl font-bold hover:text-red-700"
                >
                    ✕
                </button>
            </div>

            {/* Body */}
            <div className="w-full p-4 overflow-y-auto ">

                {selectedMedicines.map((medicine, index) => (
                    <div
                        key={index}
                        className="w-full border rounded-lg p-4 mb-4 shadow-sm"
                    >
                         <div  className="flex items-center justify-between">
                                 <p className="w-[50%]"><span className="font-semibold">Medicine:</span> {medicine.name}</p>
                                 <p className="w-[50%]"><span className="font-semibold">Date:</span> {selectedDate}</p>
                         </div>
                    
                          <div className="flex items-center justify-between">
                           <p className="w-[50%]"><span className="font-semibold">Dosage:</span> {medicine.dosage}</p>

                             <p className="w-[50%]"><span className="font-semibold">Frequency:</span> {medicine.frequency}</p>
                          </div>
                        
                          <div className="flex items-center justify-between">
                                  <p className="w-[50%]"><span className="font-semibold">Duration:</span> {medicine.duration} days</p>
                           

                                <p className="w-[50%]"><span className="font-semibold">Route:</span> {medicine.route}</p>
                          </div>
                       
                 <div className="flex items-center justify-between">
                          <p className="w-[50%]"><span className="font-semibold">Type:</span> {medicine.type}</p>

                        <p className="w-[50%]"><span className="font-semibold">Instructions:</span> {medicine.instructions}</p>
                 </div>
                   

                      
                    </div>
                ))}

            </div>
        </div>
    </div>
)}
  </div>
);
}
export default Prescriptions;