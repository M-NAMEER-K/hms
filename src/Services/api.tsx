
const GATEWAY_SERVICE_URL=import.meta.env.VITE_GATEWAY_SERVICE_URL;



export const userService={
       REGISTER :GATEWAY_SERVICE_URL+"/user/register",
       LOGIN : GATEWAY_SERVICE_URL+"/user/login",

       FORGOT_PASSWORD: GATEWAY_SERVICE_URL + "/user/forgot-password",
       RESET_PASSWORD: GATEWAY_SERVICE_URL + "/user/reset-password",

       SEND_OTP:GATEWAY_SERVICE_URL+"/user/register/send-otp",
       VERIFY_OTP:GATEWAY_SERVICE_URL+"/user/register/verify-otp",
       RESEND_OTP:GATEWAY_SERVICE_URL+"/user/register/resend-otp"
}

export const profileService={
        GET_DOCTOR_PROFILE : GATEWAY_SERVICE_URL+"/profile/doctor/get",
        UPDATE_DOCTOR_PROFILE :GATEWAY_SERVICE_URL +"/profile/doctor/update",
        GET_DOCTOR_DROPDOWNS : GATEWAY_SERVICE_URL +"/profile/doctor/dropdowns",
        GET_BY_ID : GATEWAY_SERVICE_URL+ "/profile/doctor/get",


        GET_PATIENT_PROFILE : GATEWAY_SERVICE_URL+"/profile/patient/get",
        UPDATE_PATIENT_PROFILE : GATEWAY_SERVICE_URL +"/profile/patient/update",

        GET_ALL_DOCTORS : GATEWAY_SERVICE_URL + "/profile/doctor/getAll",
        GET_ALL_PATIENTS : GATEWAY_SERVICE_URL +"/profile/patient/getAll",


        UPDATE_DOCTOR_PROFILE_PICTURE:GATEWAY_SERVICE_URL+"/profile/doctor/profile-picture",
        UPDATE_PATIENT_PROFILE_PICTURE:GATEWAY_SERVICE_URL+"/profile/patient/profile-picture", 
      
}



export const appointmentService = {
   CREATE: GATEWAY_SERVICE_URL + "/appointment/report/create",
   UPDATE_REPORT: GATEWAY_SERVICE_URL + "/appointment/report/update",
  SCHEDULE: GATEWAY_SERVICE_URL + "/appointment/schedule",
  UPDATE: GATEWAY_SERVICE_URL + "/appointment/update",
  CANCEL: GATEWAY_SERVICE_URL + "/appointment/cancel",
  GET_ALL_BY_PATIENT: GATEWAY_SERVICE_URL + "/appointment/getAllByPatient",
  GET_ALL_BY_DOCTOR: GATEWAY_SERVICE_URL + "/appointment/getAllByDoctor",
  GET_DETAILS: GATEWAY_SERVICE_URL + "/appointment/get/details",

    GET_BY_APPOINTMENT:GATEWAY_SERVICE_URL +"/appointment/report/getByAppointmentId",
    GET_DETAILS_BY_APPOINTMENT:GATEWAY_SERVICE_URL +"/appointment/report/getDetailsByAppointmentId",
    GET_BY_ID: GATEWAY_SERVICE_URL + "/appointment/report/getById",
    GET_RECORDS_BY_PATIENT:GATEWAY_SERVICE_URL +"/appointment/report/getRecordsByPatientId",
    GET_PRESCRIPTIONS_BY_PATIENT:GATEWAY_SERVICE_URL +"/appointment/report/getPrescriptionsByPatientId",
    COUNT_REASON_BY_PATIENT: GATEWAY_SERVICE_URL + "/appointment/countReasonByPatient",
   
};

export const pharmacyService = {

    // Medicine
    ADD_MEDICINE: GATEWAY_SERVICE_URL + "/pharmacy/medicine/add",
    UPDATE_MEDICINE: GATEWAY_SERVICE_URL + "/pharmacy/medicine/update",
    GET_MEDICINE: GATEWAY_SERVICE_URL + "/pharmacy/medicine/get",
    GET_ALL_MEDICINES: GATEWAY_SERVICE_URL + "/pharmacy/medicine/getAll",

    // Inventory
    ADD_INVENTORY: GATEWAY_SERVICE_URL + "/pharmacy/inventory/add",
    UPDATE_INVENTORY: GATEWAY_SERVICE_URL + "/pharmacy/inventory/update",
    GET_INVENTORY: GATEWAY_SERVICE_URL + "/pharmacy/inventory/get",
    GET_ALL_INVENTORY: GATEWAY_SERVICE_URL + "/pharmacy/inventory/getAll",

    // Sales
    CREATE_SALE: GATEWAY_SERVICE_URL + "/pharmacy/sales/create",
    UPDATE_SALE: GATEWAY_SERVICE_URL + "/pharmacy/sales/update",
    GET_SALE: GATEWAY_SERVICE_URL + "/pharmacy/sales/get",
    GET_SALE_ITEMS: GATEWAY_SERVICE_URL + "/pharmacy/sales/getSaleItem",
    GET_ALL_SALES:GATEWAY_SERVICE_URL+"/pharmacy/sales/getAll"

};

export const mediaService={
         
    UPLOAD_FILE : GATEWAY_SERVICE_URL + "/media/upload",
    GET_FILE : GATEWAY_SERVICE_URL + "/media",
    DELETE_FILE: GATEWAY_SERVICE_URL + "/media"
}