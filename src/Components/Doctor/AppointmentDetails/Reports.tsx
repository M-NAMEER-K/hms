import { useEffect, useState } from "react";
import { validateReport, type Medicine, type ReportErrors } from "../../../Utils/Validators/ReportValidators";
import { symptomsList } from "../../../Utils/constants/DoctorProfile";
import { testsList } from "../../../Utils/constants/DoctorProfile";
import Select from "react-select";
import { medicineFrequencies, medicineRoutes } from "../../../Utils/constants/Reports";
import { FaRegTrashCan } from "react-icons/fa6";
import { createAppointmentReportServiceAPI } from "../../../Services/AppointmentServiceOps";
import { getAllMedicinesAPI } from "../../../Services/AdminServiceOps";
import Loader from "../../Common/Loader";
import { useNavigate } from "react-router-dom";

interface ReportsProps{
    appointment:any;
    report : any;
}


const Reports=({appointment , report}:ReportsProps)=>{
console.log("rrr",report);


    const emptyMedicine :Medicine= {
    medicine: "",
    dosage: "",
    frequency: "",
    duration: "",
    route: "",
    type: "",
    instructions: ""
};
const navigate=useNavigate();
   const reportExists = report != null;
    const [symptoms, setSymptoms] = useState<string[]>([]);
const [tests, setTests] = useState<string[]>([]);
const [diagnosis, setDiagnosis] = useState<string>("");
const [referral, setReferral] = useState<string>("");
const [notes, setNotes] = useState<string>("");
const [allMedicines, setAllMedicines] = useState<any[]>([]);

const [medicines, setMedicines] = useState<Medicine[]>([emptyMedicine]);
const [currentPage,setCurrentPage] = useState(0);
const [totalPages,setTotalPages] = useState(0);
const [showReportPopup, setShowReportPopup] = useState(false);
const pageSize = 5;

const [errors, setErrors] = useState<ReportErrors>({});
const [loading , setLoading]=useState<boolean>(false);
const [pageLoading, setPageLoading] = useState(true);


const symptomOptions = symptomsList.map(item => ({
    value: item,
    label: item
}));

const testOptions = testsList.map(item => ({
    value: item,
    label: item
}));


useEffect(() => {
    fetchMedicines(currentPage);
}, [currentPage]);


const addMedicine = () => {
    setMedicines(prev => [...prev, emptyMedicine]);
};

const removeMedicine = (index: number) => {
  const temp = [...medicines];
  temp.splice(index, 1);
  setMedicines(temp);
};


const handleCancel=()=>{

setSymptoms([]);
setTests([]);
setDiagnosis("");
setReferral("");
setNotes("");

setMedicines([emptyMedicine]);

setErrors({});



};

  const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
const request = {
    patientId: appointment.patientId,
    doctorId: appointment.doctorId,
    appointmentId: appointment.id,

    symptoms,
    diagnosis,
    tests,
    notes,
    referral,
    followUpdate: "",

    prescription: {
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        appointmentId: appointment.id,
        prescriptionDate: new Date().toISOString().split("T")[0],
        notes,

        medicines: medicines.map(item => ({
            name: item.medicine,
            dosage: item.dosage,
            frequency: item.frequency,
            duration: Number(item.duration),
            route: item.route,
            type: item.type,
            instructions: item.instructions
        }))
    }
};

   const validationErrors = validateReport({
  symptoms,
  tests,
  diagnosis,
  referral,
  notes,
  medicines
});

setErrors(validationErrors);

if (Object.keys(validationErrors).length > 0) {
    return;
}

    
       setLoading(true);
      try{
             await createAppointmentReportServiceAPI(request);
              handleCancel();
               navigate("/doctor/appointments");
       } finally {
        setLoading(false);
    }
};
    
const fetchMedicines = async (page:number) => {
    setPageLoading(true);

    try {
   
     const data = await getAllMedicinesAPI(   page,   pageSize  );
    
        setAllMedicines(data.content || []);

        setTotalPages(data.totalPages || 0);
    } catch (error) {
        console.log(error);
    } finally {
        setPageLoading(false);
    }
};

const selectedMedicineNames = medicines
    .map((item) => item.medicine)
    .filter((name) => name !== "");

    if (pageLoading) {
    return <Loader />;
}

    return(
        <div className="w-full flex justify-center">
            {!reportExists && (
              <div className="w-[95%] rounded-lg shadow-md p-2">
                <p className="font-medium text-xl text-green-500">Personal Information</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
                    <div className="flex flex-col gap-y-2">
                        <label className="font-medium">Symptoms</label>
                       <Select placeholder="Enter Symptoms"
    isMulti
    options={symptomOptions}
    value={symptomOptions.filter(option =>
        symptoms.includes(option.value)
    )}
    onChange={(selected) => {

        let values = selected.map(option => option.value);

        if (values.includes("None") && values.length > 1) {
            values = values.filter(item => item !== "None");
        }

        setSymptoms(values);

        if (values.length > 0) {
            setErrors(prev => ({
                ...prev,
                symptoms: undefined
            }));
        }
    }}
/>
                    </div>
                      {errors.symptoms && ( <p className="text-red-500 text-xs"> {errors.symptoms} </p>)}
                    <div  className="flex flex-col gap-y-2">
                        <label className="font-medium">Tests</label>
                        <Select placeholder="Enter Tests"
    isMulti
    options={testOptions}
    value={testOptions.filter(option =>
        tests.includes(option.value)
    )}
    onChange={(selected) => {

        let values = selected.map(option => option.value);

        if (values.includes("None") && values.length > 1) {
            values = values.filter(item => item !== "None");
        }

        setTests(values);

        if (values.length > 0) {
            setErrors(prev => ({
                ...prev,
                tests: undefined
            }));
        }
    }}
/>
                    </div>
                      {errors.tests && ( <p className="text-red-500 text-xs"> {errors.tests} </p>)}
                    <div  className="flex flex-col gap-y-2">
                        <label className="font-medium">Diagnosis</label>
                        <input type="text" value={diagnosis} placeholder="Enter Diagnosis"  onChange={(e) => {
        const value = e.target.value;
        setDiagnosis(value);

        if (value.trim()) {
            setErrors(prev => ({
                ...prev,
                diagnosis: undefined
            }));
        }
    }} className="rounded-lg outline-none border border-gray-300 p-2"/>
                    </div>
                     {errors.diagnosis && ( <p className="text-red-500 text-xs"> {errors.diagnosis} </p>)}
                    <div  className="flex flex-col gap-y-2">
                        <label className="font-medium">Referral</label>
                        <input type="text" value={referral} placeholder="Enter Referral" onChange={(e) => {
        const value = e.target.value;
        setReferral(value);

        if (value.trim()) {
            setErrors(prev => ({
                ...prev,
                referral: undefined
            }));
        }
    }} className="rounded-lg outline-none border border-gray-300 p-2" />
                    </div>
                      {errors.referral && ( <p className="text-red-500 text-xs"> {errors.referral} </p>)}
                    <div className="flex flex-col gap-y-2">
                        <label className="font-medium">Notes</label>
                        <input type="text" value={notes}  placeholder="Enter Notes" onChange={(e) => {
        const value = e.target.value;
        setNotes(value);

        if (value.trim()) {
            setErrors(prev => ({
                ...prev,
                notes: undefined
            }));
        }
    }} className="rounded-lg outline-none border border-gray-300 p-2" />
                    </div>
                    {errors.notes && ( <p className="text-red-500 text-xs"> {errors.notes} </p>)}

                 

                    <div className="w-full rounded-lg my-2 p-2">
                        <p className="font-medium text-xl text-green-500 py-2">Prescription</p>
                       <div className="w-full flex flex-col gap-y-2 p-2 border rounded-lg border-gray-400">
                        {medicines.map((medicine, index) => (
                     
  <div key={index} className=" w-full flex flex-col my-3">
    <div className="font-medium flex gap-x-2 items-center">
         <p  className="text-green-500 font-medium">Medicine {index + 1}</p>
     <FaRegTrashCan onClick={() => removeMedicine(index)}  className="text-red-500 hover:text-red-300"/>
    </div>
   
        <div className="w-full flex flex-col md:flex-row gap-x-2">
             <div className="w-full md:w-[80%] flex flex-col gap-y-2">
                                <label className="font-medium">Medicine</label>
<select
    value={medicine.medicine}
  onChange={(e) => {
    const selectedName = e.target.value;

    const selectedMedicine = allMedicines.find(
        (m) => m.name === selectedName
    );

    setMedicines(prev =>
        prev.map((item, i) =>
            i === index
                ? {
                    ...item,
                    medicine: selectedName,
                    dosage: selectedMedicine ? selectedMedicine.dosage : "",
                    type: selectedMedicine ? selectedMedicine.type : ""
                }
                : item
        )
    );
}}
    className="rounded-lg outline-none border border-gray-300 p-2"
>
    <option value="">Select Medicine</option>

    {allMedicines
        .filter(
            (m) =>
                !selectedMedicineNames.includes(m.name) ||
                m.name === medicine.medicine
        )
        .map((m) => (
            <option key={m.id} value={m.name}>
                {m.name} ({m.dosage}) - {m.manufacturer}
            </option>
        ))}
</select>
                             
    {errors.medicines?.[index]?.medicine && (
    <p className="text-red-500 text-xs">
        {errors.medicines[index].medicine}
    </p>
)}           
 </div>      
     <div className="w-full md:w-[20%] flex flex-col gap-y-2">
                                <label className="font-medium">Dosage</label>
                                <input type="text" placeholder="Enter Dosage"  readOnly value={medicine.dosage}
  className="rounded-lg outline-none border border-gray-300 p-2"/>
       
         
   {errors.medicines?.[index]?.dosage && (
    <p className="text-red-500 text-xs">
        {errors.medicines[index].dosage}
    </p>
)}
</div>
            </div>
           
                              <div className="flex md:flex-row flex-col justify-between  gap-2  my-2 w-full"> 
                                <div className="w-full md:w-[50%] flex flex-col gap-y-2 ">
                                <label className="font-medium">Frequency</label>
                                <select
 value={medicine.frequency}
  onChange={(e) => {
    const temp = [...medicines];
    temp[index].frequency = e.target.value;
    setMedicines(temp);
  }}
  className="rounded-lg outline-none border border-gray-300 p-2"
>
  <option value="" disabled>
    Select Frequency
  </option>

  {medicineFrequencies.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>
                              
{errors.medicines?.[index]?.frequency && (
    <p className="text-red-500 text-xs">
        {errors.medicines[index].frequency}
    </p>
)}
</div>
                              <div className="w-full md:w-[50%] flex flex-col gap-y-2">
                                <label className="font-medium">Duration (in days)</label>
                                <input type="number" min="1" max="100"   value={medicine.duration}
 onChange={(e) => {
    const temp = [...medicines];

    temp[index].duration =
        e.target.value === "" ? "" : Number(e.target.value);

    setMedicines(temp);
}}
  placeholder="Select Duration in days" className="rounded-lg outline-none border border-gray-300 p-2"/>
                              
 {errors.medicines?.[index]?.duration && (
    <p className="text-red-500 text-xs">
        {errors.medicines[index].duration}
    </p>
)}
</div>
                               </div>
                                                      

                                                      <div className="flex flex-col md:flex-row justify-between  gap-2"> 
                                <div className="w-full md:w-[50%] flex flex-col gap-y-2">
                                <label className="font-medium">Route</label>
                               <select
  value={medicine.route}
  onChange={(e) => {
    const temp = [...medicines];
    temp[index].route = e.target.value;
    setMedicines(temp);
  }}
  className="rounded-lg outline-none border border-gray-300 p-2"
>
  <option value="" disabled>Select Route</option>

  {medicineRoutes.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>
         {errors.medicines?.[index]?.route && (
    <p className="text-red-500 text-xs">
        {errors.medicines[index].route}
    </p>
)}
                              </div>
                     

                              <div className="w-full md:w-[50%] flex flex-col gap-y-2">
                                <label className="font-medium">Type</label>
                               <input
        type="text"
        value={medicine.type}
        readOnly
        placeholder="Medicine Type"
        className="rounded-lg outline-none border p-2 border-gray-300"
    />
{errors.medicines?.[index]?.type && (
    <p className="text-red-500 text-xs">
        {errors.medicines[index].type}
    </p>
)}
                              </div>

                               </div>

          <div className="flex flex-col gap-y-2 my-2">
                                <label className="font-medium">Instructions</label>
                                <input type="text" placeholder="Enter Instructions"  value={medicine.instructions}
  onChange={(e) => {
    const temp = [...medicines];
    temp[index].instructions = e.target.value;
    setMedicines(temp);
  }} className="rounded-lg outline-none border border-gray-300 p-2"/>
                              </div>
            {errors.medicines?.[index]?.instructions && (
    <p className="text-red-500 text-xs">
        {errors.medicines[index].instructions}
    </p>
)}                   
    
  </div>
))}
                        
                            

                          
                             

                            
                           

                               
                              
                              
                             
                            
                       </div>
                    </div>
                      <button
type="button"
onClick={addMedicine}
className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2"
>
Add Medicine
</button>

    <div  className="flex justify-center gap-3">
        <button
        type="submit"
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
    >
        {loading ? "Submitting..." : "Submit"}
    </button>

    <button
type="button"
onClick={handleCancel}
className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
>
Cancel
</button>
    </div>
  


  
                    
                </form>
               
                 
              </div> )}

               {reportExists && (
    <div className="flex justify-center mt-4">
        <button
            type="button"
            onClick={() => setShowReportPopup(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
            View Report
        </button>
    </div>
)}

              {showReportPopup && report && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

        <div className="bg-white w-[90%] md:w-[70%] max-h-[85vh] rounded-lg shadow-xl">

            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold text-green-600">
                    Medical Report
                </h2>

                <button
                    onClick={() => setShowReportPopup(false)}
                    className="text-red-500 font-bold text-xl"
                >
                    ✕
                </button>
            </div>


            {/* Scrollable Body */}
            <div className="p-5 overflow-y-auto max-h-[70vh] space-y-4">


                <div>
                    <p className="font-semibold">
                        Symptoms
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {report.symptoms?.map((item:string,index:number)=>(
                            <span
                                key={index}
                                className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>



                <div>
                    <p className="font-semibold">
                        Tests
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {report.tests?.map((item:string,index:number)=>(
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>



                <div>
                    <p className="font-semibold">
                        Diagnosis
                    </p>

                    <p className="border p-2 rounded">
                        {report.diagnosis}
                    </p>
                </div>



                <div>
                    <p className="font-semibold">
                        Referral
                    </p>

                    <p className="border p-2 rounded">
                        {report.referral || "N/A"}
                    </p>
                </div>



                <div>
                    <p className="font-semibold">
                        Notes
                    </p>

                    <p className="border p-2 rounded">
                        {report.notes}
                    </p>
                </div>



                <div>
                    <p className="font-semibold text-lg text-green-600">
                        Prescription
                    </p>


                    {report.prescription?.medicines?.map(
                        (medicine:any,index:number)=>(
                        
                        <div
                            key={index}
                            className="border rounded-lg p-3 my-2"
                        >

                            <p>
                                <b>Name:</b> {medicine.name}
                            </p>

                            <p>
                                <b>Dosage:</b> {medicine.dosage}
                            </p>

                            <p>
                                <b>Frequency:</b> {medicine.frequency}
                            </p>

                            <p>
                                <b>Duration:</b> {medicine.duration} days
                            </p>

                            <p>
                                <b>Route:</b> {medicine.route}
                            </p>

                            <p>
                                <b>Type:</b> {medicine.type}
                            </p>

                            <p>
                                <b>Instructions:</b> {medicine.instructions}
                            </p>

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
export default Reports;