import type { NavigateFunction } from "react-router";
import type { LoginFormData, RegisterFormData, VerifyOtpData } from "../Utils/Validators/authValidators";


import { setJwt } from "../reducer/Slices/jwtSlice";
import type { AppDispatch } from "../reducer/Store/store";
import { setUser } from "../reducer/Slices/userSlice";
import { apiConnector } from "./Interceptor";
import { userService } from "./api";







export const loginAPI=async (data:LoginFormData , navigate:NavigateFunction, dispatch:AppDispatch)=>{
             try{
              const result=await apiConnector({method:"POST",url:userService.LOGIN,body:data});
                   dispatch(setJwt(result.data.token));
                   dispatch(setUser(result.data.user));
                   const role=result.data.user.role;
                   switch(role){
                        case "ADMIN":{
                            navigate("/admin");
                            break;
                        }
                            
                         case "DOCTOR":{
                             navigate("/doctor");
                             break;
                         }
                            
                         case "PATIENT":{
                            navigate("/patient");
                            break;
                         }
                               
                   }
              console.log(result);
       }
       catch(err:any){
              throw err;
               
       }
}

export const forgotPasswordAPI = async (email: string) => {
    try {

        const result = await apiConnector({method: "POST",url: userService.FORGOT_PASSWORD,body: null,params: { email,},  });
        console.log(result);
        return result;

    } catch (err: any) {
      throw err;
    }
};

export const resetPasswordAPI = async ( token:string, password:string,navigate:NavigateFunction)=>{

    try{
 const result = await apiConnector({method:"POST",  url:userService.RESET_PASSWORD,  body:null,  params:{  token,  password  } });

        console.log(result);
         navigate("/login");
        return result;

    }
    catch(err:any){
       throw err;
    }
};


                  export const sendOtpAPI=async(data:RegisterFormData,navigate:NavigateFunction)=>{
                     try{
                               
                          const result=await apiConnector({method:"POST",url:userService.SEND_OTP,body:data});
                              sessionStorage.setItem( "verifyEmail", JSON.stringify({email:data.email,expiry: Date.now() + (1 * 60 * 1000) }) );

                          navigate("/verify-otp");
                          return result;
                     }
                     catch(err:any){
                            throw err;
                     }
            

                   }



                   export const verifyOtpAPI=async(data:VerifyOtpData,navigate:NavigateFunction)=>{

                             try {
                                   const result=await apiConnector({method:"POST",url:userService.VERIFY_OTP,body:data});
                                   console.log(result);
                                   sessionStorage.removeItem("verifyEmail");
                                   navigate("/login");
                                   return result;
                             } catch (err:any) {
                               throw err;
                             }

}


    export const resendOtpAPI = async(email:string)=>{

    try{

        const result = await apiConnector({method:"POST",url:userService.RESEND_OTP,body:null,params:{    email}  });
        return result;

    }
    catch(err:any){
        throw err;
    }

}