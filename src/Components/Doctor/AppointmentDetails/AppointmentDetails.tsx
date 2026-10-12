import { useEffect, useState } from "react";

import Prescriptions from "./Prescriptions";
import Reports from "./Reports";
import { LuClipboardPlus } from "react-icons/lu";
import { TfiPencil } from "react-icons/tfi";

import { useParams } from "react-router-dom";
import { getAppointmentDetailsServiceAPI, getAppointmentReportByAppointmentIdServiceAPI } from "../../../Services/AppointmentServiceOps";
import Loader from "../../Common/Loader";

const AppointmentDetails=()=>{
   const [activeTab, setActiveTab] = useState<string>("prescriptions");
   const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
 const params = useParams();

console.log(params);
console.log(params.id);
const [appointment, setAppointment] = useState<any>(null);
const [report, setReport] = useState<any>(null);
const [pageLoading, setPageLoading] = useState<boolean>(true);

useEffect(() => {
    const loadData = async () => {
        setPageLoading(true);

        await Promise.all([
            loadAppointment(),
            loadReport()
        ]);

        setPageLoading(false);
    };

    loadData();
}, [params.id]);

const loadReport = async () => {
    if (!params.id) return;

    try {
        const data =
            await getAppointmentReportByAppointmentIdServiceAPI(
                Number(params.id)
            );

        setReport(data);
    } catch {
        setReport(null);
    }
};

const loadAppointment = async () => {
    if (!params.id) return;

    const data =
        await getAppointmentDetailsServiceAPI(Number(params.id));

    setAppointment(data);
    setSelectedAppointment(data);
};
if (pageLoading) {
    return <Loader />;
}

      return(
        <div className="w-screen h-screen flex flex-col items-center">
            <div className="w-full flex justify-center  ">
                    <div className="w-[95%] flex flex-col gap-y-1 p-2 rounded-lg shadow-md my-2 ">
                      <div className="flex items-center justify-between">
                         <div className="font-medium text-xl">{selectedAppointment?.patientName}</div>
                        <div
  className={`px-3 py-1 rounded-full font-medium 
    ${
      selectedAppointment?.status === "SCHEDULED"
        ? "text-blue-500 bg-blue-100"
        : selectedAppointment?.status === "COMPLETED"
        ? "text-green-500 bg-green-100"
        : selectedAppointment?.status === "CANCELLED"
        ? "text-red-500 bg-red-100"
        : "text-gray-500 bg-gray-100"
    }`}
>{selectedAppointment?.status}</div>
                      </div>
            
<div className="flex flex-col md:flex-row gap-x-2"><span className="font-medium">Email : </span>{selectedAppointment?.patientEmail}</div>
<div className="flex flex-col md:flex-row gap-x-2"><span className="font-medium">Phone :</span> {selectedAppointment?.patientPhone}</div>
<div className="flex flex-col md:flex-row gap-x-2"><span className="font-medium">Appointment Time : </span>{selectedAppointment?.appointmentTime}</div>
<div className="flex flex-col md:flex-row gap-x-2"><span className="font-medium">Reason : </span>{selectedAppointment?.reason}</div>
<div className="flex flex-col md:flex-row gap-x-2"><span className="font-medium">Notes :</span> {selectedAppointment?.notes}</div>

             </div>
            </div>

            <div className=" w-[90%] md:w-[50%] flex justify-evenly gap-x-6  p-2  border-2 rounded-full border-green-600 my-2">
       

        <button onClick={() => setActiveTab("prescriptions")}
          className={`flex items-center gap-x-2 p-2 rounded ${activeTab === "prescriptions"? "bg-green-500 hover:bg-green-400 text-white": "hover:bg-gray-300 bg-gray-200"}`}>
          <LuClipboardPlus /> Prescription
        </button>

        <button
          onClick={() => setActiveTab("reports")}
          className={`flex items-center gap-x-2 p-2  rounded ${activeTab === "reports"? "bg-green-500 hover:bg-green-400 text-white": "hover:bg-gray-300 bg-gray-200"}`}>
          <TfiPencil />  Report
        </button>
      </div>

      
      <div className="w-full">
       
        {activeTab === "prescriptions" && <Prescriptions  appointment={appointment}    onAppointmentSelect={setSelectedAppointment}/>}
        {activeTab === "reports" && <Reports  report={report} appointment={appointment}/>}
      </div>
             
        </div>
      )
}
export default AppointmentDetails;