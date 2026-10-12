import { appointmentService } from "./api";
import { apiConnector } from "./Interceptor";


export const scheduleAppointmentServiceAPI = async (data: any) => {
    try{
        const result = await apiConnector({method: "POST",url: appointmentService.SCHEDULE,body: data});
        console.log(result);

  return result;
    }
    catch(err:any){
       throw err;
    }

};

export const getAllAppointmentsByPatientServiceAPI = async (  patientId: number) => {

      try{
             const result = await apiConnector({method: "GET",url: `${appointmentService.GET_ALL_BY_PATIENT}/${patientId}`,body:null});
         console.log(result);
  return result.data;
    }
    catch(err:any){
         throw err;
    }
  
};

export const cancelAppointmentServiceAPI = async (  appointmentId: number) => {
    try { 
         return apiConnector({ method: "PUT", url: `${appointmentService.CANCEL}/${appointmentId}`, body: null,});
        
    } catch (err:any) {
        throw err;
    }
   
};

export const updateAppointmentServiceAPI = async (data: any) => {
  try {
    const result = await apiConnector({ method: "PUT", url: appointmentService.UPDATE, body: data, });
    console.log(result);
    return result;
  } catch (err: any) {
    throw err;
    
  }
};

export const getAllAppointmentsByDoctorServiceAPI = async (doctorId: number) => {

    try {
         const response = await apiConnector(  {method:"GET",url:`${appointmentService.GET_ALL_BY_DOCTOR}/${doctorId}`   ,body:null});
              
    return response.data;
    } catch (err:any) {
         throw err;
    }
    
};

export const getAppointmentDetailsServiceAPI = async (appointmentId: number) => {
    try {
        const response = await apiConnector({ method: "GET", url: `${appointmentService.GET_DETAILS}/${appointmentId}`, body: null,   });

        return response.data;
    } catch (err) {
       throw err;
    }
};


export const createAppointmentReportServiceAPI = async (data: any) => {
    try {
        const result = await apiConnector({method: "POST", url: appointmentService.CREATE,body: data,});
        console.log(result);
        return result;
    } catch (err: any) {
       throw err;
    }
};

export const updateAppointmentReportServiceAPI = async (data: any) => {
    try {
        const result = await apiConnector({ method: "PUT", url: appointmentService.UPDATE_REPORT, body: data,  });
        console.log(result);
        return result;
    } catch (err: any) {
       throw err;
    }
};

export const getAppointmentReportByAppointmentIdServiceAPI = async (  appointmentId: number) => {
    try {
        const response = await apiConnector({ method: "GET", url: `${appointmentService.GET_DETAILS_BY_APPOINTMENT}/${appointmentId}`, body: null,    });

        return response.data;
    } catch (err: any) {
       throw err;
    }
};

export const getAppointmentReportDetailsServiceAPI = async (appointmentId: number) => {
    try {
        const response = await apiConnector({ method: "GET", url: `${appointmentService.GET_DETAILS_BY_APPOINTMENT}/${appointmentId}`,body: null, });

        return response.data;
    } catch (err: any) {
        throw err;
    }
};


export const getAppointmentReportByIdServiceAPI = async (  reportId: number) => {
    try {
        const response = await apiConnector({  method: "GET",   url: `${appointmentService.GET_BY_ID}/${reportId}`,body: null,  });

        return response.data;
    } catch (err: any) {
        throw err;
    }
};



export const getPatientRecordsServiceAPI = async ( patientId: number) => {
    try {
        const response = await apiConnector({  method: "GET",url: `${appointmentService.GET_RECORDS_BY_PATIENT}/${patientId}`, body: null,  });

        return response.data;
    } catch (err: any) {
        throw err;
    }
};

export const getPatientPrescriptionsServiceAPI = async ( patientId: number) => {
    try {
        const response = await apiConnector({ method: "GET", url: `${appointmentService.GET_PRESCRIPTIONS_BY_PATIENT}/${patientId}`, body: null, });

        return response.data;
    } catch (err: any) {
       throw err;
    }
};


export const getAppointmentReasonsByPatientServiceAPI = async (patientId: number) => {
    try {
         const response = await apiConnector({ method: "GET", url: `${appointmentService.COUNT_REASON_BY_PATIENT}/${patientId}`, body: null,});

    return response.data;
    } catch (err:any) {
         throw err;
    }
    
};
