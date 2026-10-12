import {useState} from "react";
import {useNavigate, useParams} from "react-router";
import { resetPasswordAPI } from "../../Services/UserServiceOps";
import { validateResetPassword } from "../../Utils/Validators/authValidators";




const ResetPassword=()=>{


const {token}=useParams();


const [password,setPassword]=useState("");
const navigate=useNavigate();
const [loading,setLoading]=useState<boolean>(false);
const [errors,setErrors]=useState<{password?:string;}>({});



const submit = async () => {

    if (!token) return;
     
    const validationErrors =validateResetPassword({password});


     setErrors(validationErrors);



if(Object.keys(validationErrors).length>0)
{
return;
}

    setLoading(true);

    try {

        await resetPasswordAPI(token, password,navigate);

     }
     catch(err:any){
           console.log(err.response.data);
  

}
finally{

    setLoading(false);
}
};



return(

<div className="w-screen h-screen p-2">
    
   
    <h2 className="font-medium text-xl text-pink-500">Reset Password</h2>
         
          

         <div className="w-full flex flex-col items-center justify-center p-2 ">
             <div className="w-[50%] font-medium flex items-center justify-center flex-col gap-y-1 text-gray-600 ">
        <p>Reset your password securely.</p>
        <p>Please enter a new password for your account.</p>
        <p>After changing your password, you can login with your new credentials.</p>
        <p className="text-sm text-gray-500">
            The reset link will expire after 5 minutes.
        </p>
    </div>
            <div className="w-[50%]  flex flex-col items-center gap-y-3 p-2">
           <input type="password" value={password} onChange={(e)=>{
            const value=e.target.value;
               setPassword(value);
           if(value){
              setErrors(prev=>({...prev,password:undefined}));}
}}
className="w-full outline-none border rounded-lg p-2 border-pink-500"/>


{
errors.password && <p className="text-red-500 text-xs">{errors.password}</p>
}
               <button  className={`p-2 rounded-lg text-white transition
              ${loading  ? "bg-pink-300 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-300"}`}onClick={submit} disabled={loading}>
                {loading ? "Changing Password..." : "Change Password"}
            </button>
            </div>
        </div>
  



</div>

)

}


export default ResetPassword;