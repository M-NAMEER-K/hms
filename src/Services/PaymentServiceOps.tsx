import { apiConnector } from "./Interceptor";
import { paymentService } from "./api";

export const createOrderAPI = async (data:any) => {

    try{

        const result = await apiConnector({  method:"POST",  url:paymentService.CREATE_ORDER, body:data });

        return result.data;

    }catch(err){

        throw err;

    }

};


export const verifyPaymentAPI = async(data:any)=>{

    try{

        const result = await apiConnector({ method:"POST", url:paymentService.VERIFY_PAYMENT, body:data  });

        return result.data;

    }catch(err){

        throw err;

    }

};