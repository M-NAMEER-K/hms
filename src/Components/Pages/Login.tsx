import { useState } from "react";
import { Link } from "react-router";
import logReg from "../../assets/bgImages/logReg.jpg";
import { validateLogin } from "../../Utils/Validators/authValidators";
import { loginAPI } from "../../Services/UserServiceOps";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";



const Login=()=>{
      
      const navigate=useNavigate();
      const dispatch=useDispatch();
        
      const [showPassword, setShowPassword] = useState(false);
    
       const [loading, setLoading] = useState(false);         // login button
      const [email, setEmail] = useState<string>("");
      const [password, setPassword] = useState<string>("");
      const [errors, setErrors] = useState<{
         email?: string;
         password?: string;
         confirmPassword?: string; 
         }>({});
     
      
     
     
       const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
           e.preventDefault();
     
         const validationErrors = validateLogin({
         email,
         password
     });
     
     setErrors(validationErrors);
     
     if (Object.keys(validationErrors).length > 0) {
         return;
     }
     
         
     
          setLoading(true);

    try {
        await loginAPI({ email, password }, navigate, dispatch);
    }
   catch(err:any){
           console.log(err.response.data);
 

}
finally{

    setLoading(false);

}
     };
       

     

     return(
     <div className="w-screen min-h-screen flex justify-center items-center bg-center bg-no-repeat bg-[length:100%_100%] sm:bg-[length:70%_70%] md:bg-[length:100%_100%] lg:bg-cover" style={{backgroundImage:`url(${logReg})`}}>
                            
                                

                 <form onSubmit={handleSubmit} className="max-h-[95vh] overflow-y-auto w-[95%] sm:w-[90%] md:w-[60%] lg:w-[40%] border border-gray-200 flex flex-col items-center gap-y-3  rounded-lg   p-2">
                         <div className="text-white text-xl font-medium">Login</div>
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

                     <div className=" flex flex-col  w-full ">
                      <label  className="text-sm" >Password</label>
                      <div className="w-full border flex border-white   rounded-lg px-1 ">
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
      }} placeholder="Enter your Password" className="w-full  outline-none p-2"/>
                              <button type="button" onClick={() => setShowPassword(!showPassword)} >
                                   {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                 </button>

                      </div>
                                                   {errors.password && (<p className="text-red-500 text-xs mt-1">{errors.password}</p>)}
                      </div>
                       
                       <div className="w-full flex justify-center">
                        <button type="submit" disabled={loading} className={`p-2 rounded-lg text-white outline-none transition
        ${loading  ? "bg-pink-300 cursor-not-allowed"  : "bg-pink-500 hover:bg-pink-600"}`}>
                           {loading ? "Logging in..." : "Login"}
</button>
                       </div>
                       <div>
                       <Link to="/forgot-password" className="bg-pink-500 text-white rounded-lg p-2 font-medium text-md">Forgot Password?</Link></div>
                        <div className="w-full text-center text-sm">Don't have an account ? <Link to="/register" className="font-medium text-pink-600 underline">Register</Link></div>
                       
                 </form>
     </div>
     )
}
export default Login;