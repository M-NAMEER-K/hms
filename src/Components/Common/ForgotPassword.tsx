
import { useState } from "react";
import { forgotPasswordAPI } from "../../Services/UserServiceOps";
import { validateForgotPassword } from "../../Utils/Validators/authValidators";







   const ForgotPassword=()=>{


     const [email,setEmail]=useState<string>("");
     
     const [loading,setLoading] = useState<boolean>(false);
     const [errors,setErrors]=useState<{email?:string;}>({});
      
 
const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    
 
     const validationErrors = validateForgotPassword({email});


setErrors(validationErrors);



if(Object.keys(validationErrors).length>0){
    return;
}



    setLoading(true);

    try {

        await forgotPasswordAPI(email);

        

         }
     catch(err:any){
           console.log(err.response.data);
    

}
finally{

    setLoading(false);


}
};

  



return(
      <div className="w-screen min-h-screen  p-2">
       
          <h2 className="font-medium text-xl text-pink-500">
            Forgot Password
        </h2>
        <div className="w-full  flex flex-col p-2 justify-center items-center">

          
                    <div className=" w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%]   font-medium flex flex-col items-center gap-y-1">
                             <p> Don't worry, we are here to help you recover your account. </p>

            <p>   Enter your registered email address to receive a password reset link.  </p>

           <p> Check your Gmail inbox and follow the instructions to create a new password. </p>

            <p className="text-sm text-gray-500"> The password reset link will expire after 5 minutes for security reasons. </p>

                           </div>
        <form onSubmit={handleSubmit } className=" w-full flex flex-col items-center gap-y-1 p-2">
 
         <input  value={email} onChange={(e)=>{
      const value=e.target.value;
      setEmail(value);
          if(value.trim()){
         setErrors(prev=>({...prev,email:undefined}));}
}}
className="   w-[95%] sm:w-[90%] md:w-[60%] lg:w-[70%] outline-none border border-pink-500 p-2 rounded-lg"/>

{
errors.email &&<p className="text-red-500 text-xs">{errors.email}</p>
}
                  <button  disabled={loading}
              className={`px-3 py-2 rounded-lg text-white transition
              ${  loading ? "bg-green-300 cursor-not-allowed"  : "bg-pink-500 hover:bg-pink-300"}`}>
              { loading ? "Sending Reset Link...": "Send Reset Link"}
            </button>
            </form>
        </div>
                      

      </div>

)

}

export default ForgotPassword;