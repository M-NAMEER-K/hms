import type { RootState } from "../../reducer/Store/store"; 
import { useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

import { countryCodes } from "../../Utils/constants/CountryCodes";
import { validateDoctorProfile, type DoctorProfileErrors } from "../../Utils/Validators/doctorValidators";
import { specializationDepartments, specializations } from "../../Utils/constants/DoctorProfile";
import { getDoctorProfileServiceAPI, updateDoctorProfilePictureAPI, updateDoctorProfileServiceAPI } from "../../Services/ProfileServiceOps";
import { deleteProfileImageAPI, getProfileImageAPI, uploadProfileImageAPI } from "../../Services/MediaServiceOps";
import { FaRegCircleUser } from "react-icons/fa6";
import Loader from "../Common/Loader";



const DoctorProfile=()=>{
   const [isEditing,setIsEditing]=useState<boolean>(false);
   const [profilePicId,setProfilePicId]=useState<number|null>(null);
const [profilePicUrl,setProfilePicUrl]=useState<string|null>(null);
const [showImagePreview,setShowImagePreview]=useState(false);
   const [errors, setErrors] = useState<DoctorProfileErrors>({});
  const [dob, setDob] = useState<string>("");
const [phone, setPhone] = useState<string>("");
const [address, setAddress] = useState<string>("");
const [licenseNumber, setLicenseNumber] = useState("");
const [specialization, setSpecialization] = useState("");
const [department, setDepartment] = useState("");
const [totalExp, setTotalExp] = useState<number | "">("");
const [country, setCountry] = useState("India");
const [pageLoading, setPageLoading] = useState(true);
const [loading, setLoading] = useState(false);
const [countryCode, setCountryCode] = useState("+91");   
const user=useSelector((state:RootState)=>state.user);
 

const handleCancel = () => {
  setDob("");
  setPhone("");
  setAddress("");
  setLicenseNumber("");
  setSpecialization("");
  setDepartment("");
  setTotalExp("");
  setCountry("India");
  setCountryCode("+91");
  setErrors({});
  setLoading(false);
  setIsEditing(false);
};
const handleImageUpload=async(
 e:React.ChangeEvent<HTMLInputElement>
)=>{

const file=e.target.files?.[0];

if(!file)
return;


const response=await uploadProfileImageAPI(file);


const mediaId=response.id;


setProfilePicId(mediaId);


const imageUrl=await getProfileImageAPI(mediaId);

setProfilePicUrl(imageUrl);



await updateDoctorProfilePictureAPI(
    user.profileId,
    mediaId
);


}
const handleRemoveImage=async()=>{


if(!profilePicId)
return;



await updateDoctorProfilePictureAPI(
    user.profileId,
    null
);



await deleteProfileImageAPI(profilePicId);



setProfilePicId(null);
setProfilePicUrl(null);


}
useEffect(() => {
    const loadProfile = async () => {
        if (!user.profileId) {
            setPageLoading(false);
            return;
        }

        setPageLoading(true);

        try {
            const data = await getDoctorProfileServiceAPI(user.profileId);

            if (data) {
                setProfilePicId(data.profilePictureId ?? null);

                if (data.profilePictureId) {
                    const imageUrl = await getProfileImageAPI(
                        data.profilePictureId
                    );
                    setProfilePicUrl(imageUrl);
                }

                setDob(data.dob ?? "");

                if (data.phone) {
                    const parts = data.phone.split("-");
                    if (parts.length === 2) {
                        setCountryCode(parts[0]);
                        setPhone(parts[1]);
                    } else {
                        setPhone(data.phone);
                    }
                }

                setAddress(data.address ?? "");
                setLicenseNumber(data.licenseNumber ?? "");
                setSpecialization(data.specialization ?? "");
                setDepartment(data.department ?? "");
                setTotalExp(data.totalExp ?? "");
            }
        } finally {
            setPageLoading(false);
        }
    };

    loadProfile();
}, [user.profileId]);

const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
      const formData = {
         id: user.profileId,
    name: user.name,
    email: user.email,
    dob,
    
    phone: `${countryCode}-${phone}`,
    address,
    licenseNumber,
    specialization,
    department,
    totalExp
};
    const validationErrors = validateDoctorProfile(formData);
     
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
        return;
    }

    setLoading(true);

    try {
        await updateDoctorProfileServiceAPI(formData);

        console.log(formData);

        setIsEditing(false);
    } finally {
        setLoading(false);
    }

};

if (pageLoading) {
    return <Loader />;
}


  return( 
    <div className="w-[90%] flex flex-col items-center h-screen  ">
             <div className="w-[95%] flex flex-col gap-y-3" >
                 <p className="text-3xl  underline">Profile</p>
                   <div className="flex flex-col gap-y-3 py-2 w-full ">
                                      <div className="flex gap-x-3 ">
                                                          <div className=" flex items-center gap-2  ">
                  
                  <div className=" flex items-center justify-center rounded-full">
                  
                  <div className="flex items-center justify-center rounded-full">
                  
                  {
                   profilePicUrl ?
                   <img 
                     src={profilePicUrl}
                     onClick={()=>setShowImagePreview(true)}
                     className="w-20 h-20 rounded-xl object-cover object-center"
                     alt="profile"
                   />
                   :
                   <FaRegCircleUser size={50}/>
                  }
                  
                  </div>
                  
                  </div>
                  
                  
                  
                  
                  
                  </div>
                                       <div className="w-full flex flex-col   ">
                                        <div  className="flex items-center justify-between ">
                                          
                                          <p className="font-semibold text-xl">{user.name}</p>
                                          <button onClick={()=> setIsEditing(true)} className="text-white font-medium hover:bg-green-300 bg-green-500 px-2 py-1 rounded-lg flex items-center gap-x-2">Edit<FaPencilAlt /></button>
                                        </div>
                                      
                                      <p>{user.email}</p>
                                      <p>{user.role}</p>
                                  
                                   </div>
                                   </div>
                                     
                                      <div className="flex gap-2 ">
                  
                             
                  <label
                  className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded-lg"
                  >
                  Upload
                  
                  
                  <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                  />
                  
                  </label>
                  
                  
                  
                  {
                  profilePicUrl &&
                  
                  <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                  Remove
                  </button>
                  
                  }
                  
                  
                  </div>
                                     
                                    </div>
                
                
            
                <form onSubmit={handleSubmit} className="w-full">
    <p className="text-xl pb-5 py-1">Personal Information</p>

    {/* Date of Birth */}
    <div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center p-2 bg-green-300">
        <label className="font-medium">Date of Birth</label>

        {isEditing ? (
            <input type="date" value={dob}  placeholder="Enter D.O.B" onChange={(e) => {
  const value = e.target.value;
  setDob(value);

  if (value) {
    setErrors((prev) => ({
      ...prev,
      dob: undefined,
    }));
  }
}}
                className="w-[90%] md:w-[50%] focus:ring-2 focus:ring-green-500 bg-white text-black outline-none p-2 rounded-lg"
            />
        ) : (
            <label className="w-[90%] md:w-[50%]">{ dob || "Not Provided"}</label>
        )}
    </div>

    {errors.dob && (
        <p className="text-red-500 text-xs mb-2">{errors.dob}</p>
    )}

    {/* Phone */}
    <div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center p-2 bg-white">
        <label className="  font-medium">Phone</label>
       <div className="w-[90%] md:w-[50%] ">
          {isEditing ? (
             <div className="flex items-center">
              <select
    value={country}
    onChange={(e) => {
        const selectedCountry = countryCodes.find(
            (item) => item.name === e.target.value
        );

        if (selectedCountry) {
            setCountry(selectedCountry.name);
            setCountryCode(selectedCountry.code);
        }
    }}
    className="w-[30%] border-2 border-green-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
>
    {countryCodes.map((item) => (
        <option key={item.name} value={item.name}>
             {item.name}
        </option>
    ))}
</select>

              <span className="font-medium px-1">-</span>
              <input type="tel" value={phone}   placeholder="Enter Phone No." onChange={(e) => {
    const value = e.target.value;
    setPhone(value);

    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        phone: undefined,
      }));
    }
  }}
                className="w-[90%] md:w-[50%] focus:ring-2 focus:ring-green-500 border-2 border-green-300 outline-none p-2 rounded-lg"
            />
             </div>
            
        ) : (
            <label>{phone || "Not Provided"}</label>
        )}
       </div>
       
    </div>

    {errors.phone && (
        <p className="text-red-500 text-xs mb-2">{errors.phone}</p>
    )}

    {/* Address */}
    <div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center  p-2 bg-green-300">
        <label className="font-medium ">Address</label>

        {isEditing ? (
            <textarea value={address}  placeholder="Enter Address" onChange={(e) => {
  const value = e.target.value;
  setAddress(value);

  if (value.trim()) {
    setErrors((prev) => ({
      ...prev,
      address: undefined,
    }));
  }
}}
                className="w-[90%] md:w-[50%] focus:ring-2 focus:ring-green-500 bg-white outline-none p-2 rounded-lg"
            />
        ) : (
            <label className="w-[90%] md:w-[50%]">{address || "Not Provided"}</label>
        )}
    </div>

    {errors.address && (
        <p className="text-red-500 text-xs mb-2">{errors.address}</p>
    )}

<div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center p-2 bg-white">
    <label className="font-medium">License Number</label>

    {isEditing ? (
        <input
            value={licenseNumber}
             placeholder="Enter License No."
          onChange={(e) => {
  const value = e.target.value;
  setLicenseNumber(value);

  if (value.trim()) {
    setErrors((prev) => ({
      ...prev,
      licenseNumber: undefined,
    }));
  }
}}
            className="w-[90%] md:w-[50%] outline-none border-2 border-green-300 p-2 rounded-lg"
        />
    ) : (
        <label  className="w-[90%] md:w-[50%]">{licenseNumber || "Not Provided"}</label>
    )}
</div>
   {errors.licenseNumber && (
  <p className="text-red-500 text-xs mb-2">{errors.licenseNumber}</p>)}

    <div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center  p-2 bg-green-300">
    <label className="font-medium">Specialization</label>

{isEditing ? (
    <select
        value={specialization}
       
        onChange={(e) => {
  const value = e.target.value;

  setSpecialization(value);
  setDepartment(specializationDepartments[value] ?? "");

  if (value) {
    setErrors((prev) => ({
      ...prev,
      specialization: undefined,
      department: undefined,
    }));
  }
}}
        className="w-[90%] md:w-[50%] bg-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
    >
        <option value="">Select Specialization</option>

        {specializations.map((item) => (
            <option key={item} value={item}>
                {item}
            </option>
        ))}
    </select>
) : (
    <label className="w-[90%] md:w-[50%]">
        {specialization || "Not Provided"}
    </label>
)}</div>
    {errors.specialization && (
        <p className="text-red-500 text-xs mb-2">{errors.specialization}</p>
    )}
   <div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center  p-2 bg-white">
    <label className="font-medium">Department</label>

    {isEditing ? (
        <input
            value={department}
            placeholder="Enter Department"
          onChange={(e) => {
  const value = e.target.value;
  setDepartment(value);

  if (value.trim()) {
    setErrors((prev) => ({
      ...prev,
      department: undefined,
    }));
  }
}}
            className="w-[90%] md:w-[50%] border-2 border-green-300 outline-none p-2 rounded-lg"
        />
    ) : (
        <label  className="w-[90%] md:w-[50%]">{department || "Not Provided"}</label>
    )}
</div>
{errors.department && (
        <p className="text-red-500 text-xs mb-2">{errors.department}</p>
    )}
  <div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center p-2 bg-green-300">
    <label className="font-medium">Total Experience</label>

    {isEditing ? (
        <input
            type="number" min="1" max="100"
            value={totalExp}
            placeholder="Enter Total Years of Expierence "
          onChange={(e) => {
  const value = e.target.value;

  setTotalExp(value === "" ? "" : Number(value));

  if (value !== "") {
    setErrors((prev) => ({
      ...prev,
      totalExp: undefined,
    }));
  }
}}
            className="w-[90%] md:w-[50%] outline-none focus:ring-2 focus:ring-green-500 bg-white p-2 rounded-lg"
        />
    ) : (
        <label  className="w-[90%] md:w-[50%]">{totalExp || "0"} Years</label>
    )}
</div>
  {errors.totalExp && (
        <p className="text-red-500 text-xs mb-2">{errors.totalExp}</p>
    )}
   {isEditing && (
  <div className="flex justify-center gap-4 py-4">
    <button
      type="submit"
      disabled={loading}
      className={`px-4 py-2 rounded-lg text-white transition ${
        loading
          ? "bg-green-300 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {loading ? "Saving..." : "Save"}
    </button>

    <button
      type="button"
      onClick={handleCancel}
      disabled={loading}
      className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
    >
      Cancel
    </button>
  </div>
)}
</form>
             </div>

             
             {
showImagePreview && profilePicUrl && (

<div className="fixed inset-0 bg-black/30 backdrop-blur flex items-center justify-center z-50">

    <div className="relative">

        <button
        onClick={()=>setShowImagePreview(false)}
        className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-8 h-8 text-xl"
        >
        ×
        </button>


        <img
        src={profilePicUrl}
        className="max-w-[80vw] max-h-[90vh] rounded-xl object-contain"
        alt="preview"
        />

    </div>

</div>

)
}    
               
             
             
    </div>
  )

}

export default DoctorProfile;