import { useEffect, useState } from "react";
import { getAllPatientsAPI } from "../../Services/ProfileServiceOps";
import { FaRegEye } from "react-icons/fa";
import Loader from "../Common/Loader";


interface Patient {
    id: number;
    name: string;
    email: string;
    phone: string;
    dob: string;
    address: string;
    aadharNumber: string;
    bloodGroup: string;
    allergies: string[];
    chronicDisease: string[];
    profilePictureId: number | null;
}


const Patient=()=>{

    const [patients, setPatients] = useState<Patient[]>([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [showModal, setShowModal] = useState(false);

   useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        setPageLoading(true);

        try {
            const data = await getAllPatientsAPI();
            console.log(data);

            setPatients(Array.isArray(data) ? data : []);
        } catch (e) {
            console.log(e);
            setPatients([]);
        } finally {
            setPageLoading(false);
        }
    };


    if(pageLoading){
         return <Loader/>;
    }


   
         return (
        <div className="w-screen h-screen px-2">
              
            <p className="text-xl font-medium text-green-500">
                Patients
            </p>

            {
        patients.length === 0 ? (
                <div className="flex justify-center items-center py-10 text-gray-500 font-medium">
                    No Patients Found.
                </div>
            ) : (
                <div>
                    <div className="md:hidden ">
    {patients.map((patient) => (
        <div
            key={patient.id}
            className="border rounded-lg shadow bg-white p-2 my-2 flex flex-col gap-y-1"
        >
            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Name
                </p>
                <p>{patient.name}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Email
                </p>
                <p className="break-all">{patient.email}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">
                    Phone Number
                </p>
                <p>{patient.phone}</p>
            </div>

            <div className="flex justify-end mt-2">
                <button
                    onClick={() => {
                        setSelectedPatient(patient);
                        setShowModal(true);
                    }}
                    className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                    <FaRegEye />
                </button>
            </div>
        </div>
    ))}
</div>
                <div className="hidden md:block">

                <div className="w-full mt-5 border rounded-lg overflow-hidden">

                    {/* Header */}

                    <div className="w-full flex bg-green-500 text-white font-semibold p-2">
                        <div className="w-[30%]">Name</div>
                        <div className="w-[30%]">Email</div>
                        <div className="w-[20%]">Phone Number</div>
                        <div className="w-[20%]"> </div>
                    </div>

                    {/* Rows */}

                    {patients.map((patient) => (
                        <div
                            key={patient.id}
                            className="w-full flex border-t p-2 hover:bg-gray-100"
                        >
                            <div className="w-[30%] break-words">
                                {patient.name}
                            </div>

                            <div className="w-[30%] break-words">
                                {patient.email}
                            </div>

                            <div className="w-[20%] break-words">
                                {patient.phone}
                            </div>
                           <div className="w-[20%] flex justify-center items-center">
                   <FaRegEye size={20} className="text-blue-500 hover:text-blue-300 cursor-pointer"
        onClick={() => {
            setSelectedPatient(patient);
            setShowModal(true);
        }}
    />
</div>
                        </div>
                    ))}

                </div>
                </div>
                </div>

            )}




            {showModal && selectedPatient && (
    <div className="w-full fixed inset-0 bg-black/40 px-2 flex justify-center items-center z-50">

        <div className="bg-white rounded-lg shadow-lg w-full p-6">

            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold text-green-600">
                    Patient Details
                </h2>

                <button
                    onClick={() => setShowModal(false)}
                    className="text-red-500 text-xl font-bold"
                >
                    ✕
                </button>
            </div>

            <div className="">

                <p><b>Name:</b> {selectedPatient.name}</p>

                <p><b>Email:</b> {selectedPatient.email}</p>

                <p><b>Phone:</b> {selectedPatient.phone}</p>

                <p><b>DOB:</b> {selectedPatient.dob}</p>

                <p><b>Blood Group:</b> {selectedPatient.bloodGroup}</p>

                <p><b>Aadhar Number:</b> {selectedPatient.aadharNumber}</p>

                <p><b>Address:</b> {selectedPatient.address}</p>

                <div className="flex items-center gap-x-1">
                    <b>Allergies:</b>

                    <div className="flex flex-wrap gap-2 mt-1">
                        {selectedPatient.allergies.map((item) => (
                            <span
                                key={item}
                                className="bg-red-100 text-red-600 px-2 py-1 rounded"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-x-1">
                    <b>Chronic Diseases:</b>

                    <div className="flex flex-wrap gap-2 mt-1">
                        {selectedPatient.chronicDisease.map((item) => (
                            <span
                                key={item}
                                className="bg-blue-100 text-blue-600 px-2 py-1 rounded"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

            </div>

           

        </div>

    </div>
)}

        </div>
    );
};



export default Patient;