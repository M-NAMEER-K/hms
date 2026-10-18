
import { Link, useNavigate } from "react-router";
import logReg from "../../assets/bgImages/logReg.jpg";
import { useState } from "react";
import { validateRegister } from "../../Utils/Validators/authValidators";
import {  sendOtpAPI } from "../../Services/UserServiceOps";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const Register=()=>{
  const navigate=useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

    const [role, setRole] = useState<"PATIENT" | "DOCTOR" | "ADMIN">("PATIENT");
    const [name,setName]=useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<{
      name?:string;
    email?: string;
    password?: string;
    confirmPassword?: string; 
    }>({});

 
  


  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

    const validationErrors = validateRegister({
    name,
    email,
    password,
    confirmPassword,
    role
});

setErrors(validationErrors);

if (Object.keys(validationErrors).length > 0) {
    return;
}

    
       setLoading(true);
    try{

    await sendOtpAPI(
       {name,email,password,confirmPassword,role},
       navigate
    );

}
catch(err:any){

           console.log(err.response.data);
            navigate("/login");
   

}
finally{

    setLoading(false);

}
};
  


   return(
  <div className="w-screen min-h-screen flex justify-center items-center bg-center bg-no-repeat bg-[length:100%_100%] sm:bg-[length:70%_70%] md:bg-[length:100%_100%] lg:bg-cover"
  style={{backgroundImage:`url(${logReg})`}}>
                     
                      


                 <form onSubmit={handleSubmit} className=" max-h-[95vh] overflow-y-auto w-[95%] sm:w-[90%] md:w-[60%] lg:w-[40%] border border-gray-200 flex flex-col items-center gap-y-3  rounded-lg   p-2">
                                                    <div className="text-white text-xl font-medium">Register</div>
                  <div className="w-full flex items-center border border-white rounded-lg p-1">

    <div 
        onClick={()=>setRole("PATIENT")} 
        className={`w-full text-white text-center rounded-lg p-2 cursor-pointer ${
            role==="PATIENT" ? "bg-pink-300" : "bg-none"
        }`}
    >
        Patient
    </div>


    <div 
        onClick={()=>setRole("DOCTOR")} 
        className={`w-full text-white text-center rounded-lg p-2 cursor-pointer ${
            role==="DOCTOR" ? "bg-pink-300" : "bg-none"
        }`}
    >
        Doctor
    </div>


    <div 
        onClick={()=>setRole("ADMIN")} 
        className={`w-full text-white text-center rounded-lg p-2 cursor-pointer ${
            role==="ADMIN" ? "bg-pink-300" : "bg-none"
        }`}
    >
        Admin
    </div>

</div>

                      <div className=" flex flex-col w-full ">
                      <label className="text-sm" >Name</label>
                      <div className="w-full ">
                         <input type="text" value={name}  onChange={(e) => {
    const value = e.target.value;
    setName(value);

    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        name: undefined,
      }));
    }
  }} placeholder="Enter your Name" className="w-full border border-white   rounded-lg  outline-none p-2" />
                        
                      </div>
                        {errors.name && (<p className="text-red-500 text-xs mt-1">{errors.name}</p>)}
                      </div>
                      
                      <div className=" flex flex-col w-full ">
                      <label className="text-sm" >Email</label>
                      <div className="w-full ">
                         <input type="text" value={email}  onChange={(e) => {
    const value = e.target.value;
    setEmail(value);

    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        email: undefined,
      }));
    }
  }} placeholder="Enter your Email" className="w-full border border-white   rounded-lg  outline-none p-2" />
                          
                      </div>
                      {errors.email && (<p className="text-red-500 text-xs mt-1">{errors.email}</p>)}
                      </div>

                      <div className=" flex flex-col  w-full">
                      <label  className="text-sm" >Password</label>
                      <div className="w-full flex border rounded-lg border-white px-1" >
                             <input type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => {
        const value = e.target.value;
        setPassword(value);

        if (value) {
          setErrors((prev) => ({
            ...prev,
            password: undefined,
          }));
        }
      }}
 placeholder="Enter your Password" className="w-full  rounded-lg  outline-none p-2"/>
         <button type="button" onClick={() => setShowPassword(!showPassword)} >
      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
    </button>

                           
                      </div>
            {errors.password && (<p className="text-red-500 text-xs mt-1">{errors.password}</p>)}            
                      </div>
                       
                       <div className=" flex flex-col  w-full">
                      <label  className="text-sm" > Confirm Password</label>
                      <div className="w-full flex px-1 border border-white rounded-lg">
                           <input type={showConfirmPassword ? "text" : "password"}  value={confirmPassword}   onChange={(e) => {
        const value = e.target.value;
        setConfirmPassword(value);

        if (value) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: undefined,
          }));
        }
      }} placeholder="Enter Confirm Password" className=" w-full     outline-none p-2"/>
                            <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      
    >
      {showConfirmPassword ? (
        <FaRegEyeSlash />
      ) : (
        <FaRegEye />
      )}
    </button>
                            
                      </div>
                       {errors.confirmPassword && (<p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>)}
                      </div>

                       <div className="w-full flex justify-center">
                           <button type="submit" disabled={loading} className={`p-2 rounded-lg text-white transition
                                ${ loading? "bg-pink-300 cursor-not-allowed": "bg-pink-500 hover:bg-pink-600"}`}>
                                 {loading ? "Registering..." : "Register"}
                                 </button>
                        </div>
                                                <div className="w-full text-center text-sm">Already have an account ? <Link to="/login" className="font-medium text-pink-600 underline">Login</Link></div>
                       
                      
                       
                 </form>
     </div>
   )
}
export default Register;