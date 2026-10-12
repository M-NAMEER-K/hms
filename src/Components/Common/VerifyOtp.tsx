import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { resendOtpAPI, verifyOtpAPI } from "../../Services/UserServiceOps";
import { validateVerifyOtp } from "../../Utils/Validators/authValidators";
import Loader from "./Loader";



const VerifyOtp=()=>{


const navigate=useNavigate();


const [otp,setOtp]=useState("");
   
const [email,setEmail]=useState("");
const [errors,setErrors]=useState<{ otp?:string;}>({});
const [timer,setTimer]=useState(120);
const [canResend,setCanResend]=useState(false);
const [resendLoading,setResendLoading] = useState(false);
const [pageLoading, setPageLoading] = useState(true);
const [loading, setLoading] = useState(false);



useEffect(()=>{

    if(timer <= 0){
        setCanResend(true);
        return;
    }


    const interval=setInterval(()=>{

        setTimer(prev=>{

            if(prev <= 1){
                setCanResend(true);
                return 0;
            }

            return prev-1;

        });

    },1000);


    return ()=>clearInterval(interval);


},[canResend]);


useEffect(()=>{
    

    const data=sessionStorage.getItem("verifyEmail");
    if(!data){
        navigate("/register");
        return;
    }


    const parsed=JSON.parse(data);


    if(Date.now()>parsed.expiry){

        sessionStorage.removeItem("verifyEmail");
        navigate("/register");
        return;

    }
    setEmail(parsed.email);
     setPageLoading(false);
},[]);

const submit=async()=>{


    if(!otp){

        return;
    }
      

const validationErrors = validateVerifyOtp({ email, otp});



setErrors(validationErrors);



if(Object.keys(validationErrors).length>0){

    return;

}

    setLoading(true);


    try{


      await verifyOtpAPI({ email, otp},navigate);


    }
     catch(err:any){
           console.log(err.response.data);
  

}
finally{

    setLoading(false);

}


}

const resendOtp=async()=>{


try{

setResendLoading(true);


await resendOtpAPI(email);


setTimer(120);
setCanResend(false);


}
catch(err:any){

console.log(err);

}
finally{

setResendLoading(false);

}


}


 if (pageLoading) {
    return <Loader />;
} 


return(


<div className="w-screen min-h-screen flex items-center justify-center">

      

<div className="w-[90%] sm:w-[85%] md:w-[80%] flex flex-col items-center gap-y-4 p-4">


<h2 className="text-xl font-medium text-pink-500 text-center">Verify OTP</h2>



<div className="w-[90%] sm:w-[85%] md:w-[80%] flex flex-col  items-center justify-center text-gray-600 font-medium text-center">

<p>We have sent a verification OTP to your email.</p>

<p>Please enter the OTP to complete registration.</p>

<p className="text-sm text-gray-500">OTP will expire after 2 minutes.</p>

</div>




<input  type="text" maxLength={6} value={otp} onChange={(e)=>{
   const value=e.target.value; 
  setOtp(value);
if(value.trim()){
setErrors(prev=>({...prev,otp:undefined}));
}
}}
placeholder="Enter OTP" className="border border-pink-500 rounded-lg p-2 outline-none w-full text-center tracking-widest" />
{errors.otp && (<p className="text-red-500 text-xs text-center">{errors.otp}</p>)}



<button disabled={loading} onClick={submit} className={`p-2 rounded-lg text-white transition

${loading ?"bg-pink-300 cursor-not-allowed":"bg-pink-500 hover:bg-pink-600"}`}>
{loading?"Verifying OTP...":"Verify OTP"}
</button>

<div className="text-center">

{
canResend ?

<button
disabled={resendLoading}
onClick={resendOtp}
className="text-white bg-pink-500 rounded-lg p-2"
>
{resendLoading ? "Sending OTP..." : "Resend OTP"}
</button>

:

<p className="text-gray-500 text-sm">
Resend OTP available in {Math.floor(timer/60)}:
{String(timer%60).padStart(2,"0")}
</p>

}

</div>
</div>
</div>


)


}


export default VerifyOtp;