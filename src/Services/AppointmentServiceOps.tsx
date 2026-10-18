import { appointmentService } from "./api";
import { apiConnector } from "./Interceptor";

interface AppointmentPageResponse {
    content: any[];
    number: number;
    totalPages: number;
    totalElements: number;
}

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

export const getAllAppointmentsByPatientServiceAPI = async (patientId:number, page:number, size:number, filters:any):Promise<AppointmentPageResponse> => {

    
   try{
       const params = new URLSearchParams();

    params.append("page",String(page));
    params.append("size",String(size));


if(filters.status){

    params.append(
        "status",
        filters.status
    );

}


if(filters.fromDate){
    params.append("fromDate", filters.fromDate);
}

if(filters.toDate){
    params.append("toDate", filters.toDate);
}

    if(filters.sortBy){
        params.append("sortBy",filters.sortBy);
    }

    if(filters.sortDirection){
        params.append("sortDirection",filters.sortDirection);
    }


    const result = await apiConnector({ method:"GET", url:`${appointmentService.GET_ALL_BY_PATIENT}/${patientId}?${params.toString()}`, body:null});
           console.log(result.data);
    return result.data;
    } catch (err: any) {
        throw err;
    }
}

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

export const getAllAppointmentsByDoctorServiceAPI = async ( doctorId: number, page: number, size: number, filters: any): Promise<AppointmentPageResponse> => {

    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("size", String(size));

if(filters.status){

    params.append(
        "status",
        filters.status
    );

}


if(filters.fromDate){
    params.append("fromDate", filters.fromDate);
}

if(filters.toDate){
    params.append("toDate", filters.toDate);
}

    if (filters.sortBy) {
        params.append("sortBy", filters.sortBy);
    }

    if (filters.sortDirection) {
        params.append("sortDirection", filters.sortDirection);
    }

    if (filters.startDate) {
        params.append("startDate", filters.startDate);
    }

    if (filters.endDate) {
        params.append("endDate", filters.endDate);
    }

    try {
        const response = await apiConnector({
            method: "GET",
            url: `${appointmentService.GET_ALL_BY_DOCTOR}/${doctorId}?${params.toString()}`,
            body: null
        });
        console.log(response.data);
        return response.data;
    } catch (err: any) {
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

export const getPatientPrescriptionsServiceAPI = async ( patientId: number, page: number, size: number, filters: any) => {

    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("size", String(size));


    filters.doctorId && 
        params.append("doctorId", String(filters.doctorId));


    filters.startDate &&
        params.append("startDate", filters.startDate);


    filters.endDate &&
        params.append("endDate", filters.endDate);


    filters.sortBy &&
        params.append("sortBy", filters.sortBy);


    filters.sortDirection &&
        params.append("sortDirection", filters.sortDirection);


    try {

        const response = await apiConnector({ method:"GET",url:`${appointmentService.GET_PRESCRIPTIONS_BY_PATIENT}/${patientId}?${params.toString()}`,body:null });


        return response.data;

    }catch(err:any){
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
