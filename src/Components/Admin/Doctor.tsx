import { useEffect, useState } from "react";
import { getAllDoctorsAPI } from "../../Services/ProfileServiceOps";
import { FaRegEye } from "react-icons/fa";
import Loader from "../Common/Loader";



interface Doctor {
    id: number;
    name: string;
    email: string;
    phone: string;
    dob: string;
    address: string;
    department: string;
    specialization: string;
    licenseNumber: string;
    totalExp: number;
    profilePictureId: number | null;
}


const Doctor=()=>{

    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [pageLoading, setPageLoading] = useState(true);
   
    const [showModal, setShowModal] = useState(false);

   useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        setPageLoading(true);

        try {
            const data = await getAllDoctorsAPI();
            console.log(data);

            setDoctors(Array.isArray(data) ? data : []);
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
        <div className="w-screen h-screen px-2">
                
            <p className="text-xl font-medium text-green-500">
                Doctors
            </p>

           
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

            <div className="flex justify-end mt-2">
                <button
                    onClick={() => {
                        setSelectedDoctor(doctor);
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

                    {doctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="w-full flex border-t p-2 hover:bg-gray-100"
                        >
                            <div className="w-[30%] break-words">
                                {doctor.name}
                            </div>

                            <div className="w-[30%] break-words">
                                {doctor.email}
                            </div>

                            <div className="w-[20%] break-words">
                                {doctor.phone}
                            </div>
                           <div className="w-[20%] flex justify-center items-center">
                   <FaRegEye size={20} className="text-blue-500 hover:text-blue-300 cursor-pointer"
        onClick={() => {
            setSelectedDoctor(doctor);
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

</div>

           

        </div>

    </div>
)}

        </div>
    );
};



export default Doctor;