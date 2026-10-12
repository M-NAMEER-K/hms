import type { RootState } from "../../reducer/Store/store"; 
import { useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { validatePatientProfile, type PatientProfileErrors } from "../../Utils/Validators/patientValidators";
import { countryCodes } from "../../Utils/constants/CountryCodes";
import { chronicDiseases } from "../../Utils/constants/PatientProfile";
import { allergies as allergiesList } from "../../Utils/constants/PatientProfile";
import Select from "react-select";
import { getPatientProfileServiceAPI, updatePatientProfilePictureAPI, updatePatientProfileServiceAPI } from "../../Services/ProfileServiceOps";
import { FaRegCircleUser } from "react-icons/fa6";
import { deleteProfileImageAPI, getProfileImageAPI, uploadProfileImageAPI } from "../../Services/MediaServiceOps";
import Loader from "../Common/Loader";



const PatientProfile=()=>{
    
   const [savedProfile, setSavedProfile] = useState<any>(null);
    const [showImagePreview,setShowImagePreview] = useState(false);
   const [isEditing,setIsEditing]=useState<boolean>(false);
   const [errors, setErrors] = useState<PatientProfileErrors>({});
  const [dob, setDob] = useState<string>("");
const [phone, setPhone] = useState<string>("");
const [address, setAddress] = useState<string>("");
const [aadhar, setAadhar] = useState<string>("");
const [bloodGroup, setBloodGroup] = useState<string>("");
const [allergies, setAllergies] = useState<string[]>([]);
const [chronicDisease, setChronicDisease] = useState<string[]>([]);
const [country, setCountry] = useState("India");
const [countryCode, setCountryCode] = useState("+91");  
const [loading, setLoading] = useState(false);
const [pageLoading, setPageLoading] = useState(false); // full page

const [profilePicId,setProfilePicId]=useState<number|null>(null);
const [profilePicUrl,setProfilePicUrl]=useState<string|null>(null);


const handleImage=(id:number)=>{

setProfilePicId(id);

}

const user=useSelector((state:RootState)=>state.user);


const allergyOptions = allergiesList.map((item) => ({
  value: item,
  label: item,
}));

const diseaseOptions = chronicDiseases.map((item) => ({
  value: item,
  label: item,
}));


useEffect(() => {

    const loadProfile = async () => {

        setPageLoading(true);

        try {

            console.log("calling");

            const data = await getPatientProfileServiceAPI(user.profileId);

            console.log("x", data);

            if (data) {
                    setSavedProfile(data);
                setProfilePicId(data.profilePictureId ?? null);


                if(data.profilePictureId){

                    const imageUrl = await getProfileImageAPI(
                        data.profilePictureId
                    );

                    setProfilePicUrl(imageUrl);
                }


                setDob(data.dob ?? "");
                setPhone(data.phone ?? "");
                setAddress(data.address ?? "");
                setAadhar(data.aadharNumber ?? "");
                setBloodGroup(data.bloodGroup ?? "");
                setAllergies(data.allergies ?? []);
                setChronicDisease(data.chronicDisease ?? []);

            }

        } catch(err){

            console.log(err);

        } finally {

            setPageLoading(false);

        }

    };


    if (user.profileId) {
        loadProfile();
    }

}, [user.profileId]);


const handleCancel = () => {
    if(savedProfile){

        setDob(savedProfile.dob ?? "");
        setPhone(savedProfile.phone ?? "");
        setAddress(savedProfile.address ?? "");
        setAadhar(savedProfile.aadharNumber ?? "");
        setBloodGroup(savedProfile.bloodGroup ?? "");
        setAllergies(savedProfile.allergies ?? []);
        setChronicDisease(savedProfile.chronicDisease ?? []);

    }

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



await updatePatientProfilePictureAPI(
 user.profileId,
 mediaId
);


}

const handleRemoveImage = async()=>{

    if(!profilePicId)
        return;


    // First remove reference
    await updatePatientProfilePictureAPI(
        user.profileId,
        null
    );


    // Then delete media
    await deleteProfileImageAPI(profilePicId);


    setProfilePicId(null);
    setProfilePicUrl(null);

}

const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
      const formData = {
         id: user.profileId,
    name: user.name,
    email: user.email,
        dob,
        phone: `${countryCode}-${phone}`,
        address,
        aadharNumber:aadhar,
        bloodGroup,
        allergies,
        chronicDisease,
    };
    const validationErrors = validatePatientProfile(formData);
     
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
        return;
    }

    

     setLoading(true);

    try {
           await updatePatientProfileServiceAPI(formData);
            setSavedProfile(formData);
        console.log(formData);

        setIsEditing(false);
    } finally {
        setLoading(false);
    }
};

if(pageLoading){
    return <Loader />;
}

  return( 
    <div className="w-[90%] flex flex-col items-center h-screen   ">
             
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
                  <hr className="text-gray-300 my-1"/>
    <p className="text-xl pb-5 py-1">Personal Information</p>

    {/* Date of Birth */}
    <div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center p-2 bg-green-300">
        <label className="font-medium">Date of Birth</label>

        {isEditing ? (
            <input type="date" value={dob}  onChange={(e) => {
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
       <div className="w-full md:w-[50%] ">
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
              <input type="tel" value={phone} placeholder="Enter Phone No." onChange={(e) => {
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
    <div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center p-2 bg-green-300">
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
            <label className="w-[90%] md:w-[50%]]">{address || "Not Provided"}</label>
        )}
    </div>

    {errors.address && (
        <p className="text-red-500 text-xs mb-2">{errors.address}</p>
    )}

    {/* Aadhar */}
    <div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center p-2 bg-white">
        <label className="font-medium">Aadhar No.</label>

        {isEditing ? (
            <input type="text" value={aadhar}  placeholder="Enter Adhaar No." onChange={(e) => {
    const value = e.target.value;
    setAadhar(value);

    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        aadhar: undefined,
      }));
    }
  }}
                className="w-[90%] md:w-[50%] focus:ring-2 focus:ring-green-500 border-2 border-green-300 outline-none p-2 rounded-lg"
            />
        ) : (
            <label className="w-[90%] md:w-[50%]">{aadhar || "Not Provided"}</label>
        )}
    </div>

    {errors.aadharNumber && (
        <p className="text-red-500 text-xs mb-2">{errors.aadharNumber}</p>
    )}

    {/* Blood Group */}
    <div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center p-2 bg-green-300">
        <label className="font-medium">Blood Group</label>

        {isEditing ? (
            <select
                value={bloodGroup}
                 onChange={(e) => {
    const value = e.target.value;
    setBloodGroup(value);

    if (value) {
      setErrors((prev) => ({
        ...prev,
        bloodGroup: undefined,
      }));
    }
  }}
                className="w-full md:w-[50%] bg-white  rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-500"
            >
                <option value="">Select Blood Group</option>
                <option>A_POSITIVE</option>
                <option>A_NEGATIVE</option>
                <option>B_POSITIVE</option>
                <option>B_NEGATIVE</option>
                <option>AB_POSITIVE</option>
                <option>AB_NEGATIVE</option>
                <option>O_POSITIVE</option>
                <option>O_NEGATIVE</option>
            </select>
        ) : (
            <label className="w-[90%] md:w-[50%]">{bloodGroup || "Not Provided"}</label>
        )}
    </div>

    {errors.bloodGroup && (
        <p className="text-red-500 text-xs mb-2">{errors.bloodGroup}</p>
    )}

    {/* Allergies */}
    <div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center p-2 bg-white">
        <label className="font-medium">Allergies</label>

        {isEditing ? (
       <Select placeholder="Select Allergy"
  isMulti
  options={allergyOptions}
  value={allergyOptions.filter(option =>
    allergies.includes(option.value)
  )}
 onChange={(selected) => {
  let values = selected.map(option => option.value);

  // If "None" and another option are selected, remove "None"
  if (values.includes("None") && values.length > 1) {
    values = values.filter(item => item !== "None");
  }

  setAllergies(values);

  if (values.length > 0) {
    setErrors(prev => ({
      ...prev,
      allergies: undefined,
    }));
  }
}}
   className="w-full md:w-[50%] bg-white  rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-500"
/>
        ) : (
            <div className="w-[90%] md:w-[50%] flex flex-wrap gap-2">
  {allergies.length ? (
    allergies.map((item) => (
      <span
        key={item}
        className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
      >
        {item}
      </span>
    ))
  ) : (
    <span>None</span>
  )}
</div>
        )}
    </div>
    {errors.allergies && (
  <p className="text-red-500 text-xs mb-2">{errors.allergies}</p>)}

    {/* Chronic Disease */}
    <div className="flex flex-col w-full md md:flex-row md:justify-between md:items-center p-2 bg-green-300">
        <label className="font-medium">Chronic Disease</label>

        {isEditing ? (
           <Select placeholder="Select Chronic Disease"
  isMulti
  options={diseaseOptions}
  value={diseaseOptions.filter(option =>
    chronicDisease.includes(option.value)
   
  )}
 onChange={(selected) => {
  let values = selected.map(option => option.value);

  if (values.includes("None") && values.length > 1) {
    values = values.filter(item => item !== "None");
  }

  setChronicDisease(values);

  if (values.length > 0) {
    setErrors(prev => ({
      ...prev,
      chronicDisease: undefined,
    }));
  }
}}
   className="w-full md:w-[50%] bg-white  rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-500"
/>
        ) : (
          <div className="w-[90%] md:w-[50%] flex flex-wrap gap-2">
  {chronicDisease.length ? (
    chronicDisease.map((item) => (
      <span
        key={item}
        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
      >
        {item}
      </span>
    ))
  ) : (
    <span>None</span>
  )}
</div>
        )}
    </div>
    {errors.chronicDisease && (
  <p className="text-red-500 text-xs mb-2">{errors.chronicDisease}</p>)}
   {isEditing && (
  <div className="flex justify-center gap-4 py-4">
    <button
      type="submit"
      disabled={loading}
      className={`px-5 py-2 rounded-lg text-white transition
      ${
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
      className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
    >
      Cancel
    </button>
  </div>
)}
</form>
            

             
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

export default PatientProfile;