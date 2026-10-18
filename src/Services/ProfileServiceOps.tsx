import type { DoctorProfileData } from "../Utils/Validators/doctorValidators";
import type { PatientProfileData } from "../Utils/Validators/patientValidators";
import { profileService } from "./api";
import { apiConnector } from "./Interceptor";


export const updateDoctorProfileServiceAPI=async(data:DoctorProfileData)=>{
         try{
             console.log(data);
        const result=await apiConnector({method:"PUT",url:profileService.UPDATE_DOCTOR_PROFILE,body:data});
                          
                           console.log(result);
         }
         catch(err : any){
          throw err;
         }
}


export const updatePatientProfileServiceAPI=async (data:PatientProfileData)=>{
        try{
             console.log(data);
        const result=await apiConnector({method:"PUT",url:profileService.UPDATE_PATIENT_PROFILE,body:data});
                          
                           console.log(result);
         }
         catch(err : any){
          throw err;
         }
}

export const getPatientProfileServiceAPI = async (id: number) => {
    try {
        const result = await apiConnector({method: "GET",url: `${profileService.GET_PATIENT_PROFILE}/${id}`,body: null, });

        return result.data;
    } catch (err : any) {
        throw err;

    }
};

export const getDoctorDropdownsServiceAPI = async () => {
    try {
        const result = await apiConnector({method: "GET",url: profileService.GET_DOCTOR_DROPDOWNS,body: null});

        return result.data;
    } catch (err :any) {
        throw err;
        
    }
};

export const getDoctorProfileServiceAPI= async (id: number) =>{
              try {
        const result = await apiConnector({method: "GET",url: `${profileService.GET_DOCTOR_PROFILE}/${id}`,body: null, });

        return result.data;
    } catch (err :any) {
     throw err;
        
    }
}

export const getAllDoctorsAPI = async ( page:number, size:number, filters:any)=>{
        
    try{   
          const params = new URLSearchParams();

         params.append("page", String(page));
         params.append("size", String(size));

         filters.departments.forEach((item:string)=>{
         params.append("departments", item);
         });
         filters.specializations.forEach((item:string)=>{
         params.append("specializations", item);
         });
         params.append("sortBy", filters.sortBy);
         params.append("sortDirection", filters.sortDirection);

          const result = await apiConnector({ method:"GET", url:`${profileService.GET_ALL_DOCTORS}?${params.toString()}`, body:null});

            console.log(result);
            return result.data;
    }catch(err : any){
         throw err;
    }
}

export const getAllPatientsAPI= async( page:number , size:number)=>{
        
    try{

            const params = new URLSearchParams();

         params.append("page", String(page));
         params.append("size", String(size));

            const result=await apiConnector({method:"GET", url:`${profileService.GET_ALL_PATIENTS}?${params.toString()}`,body:null});
            console.log(result);
            return result.data;
    }catch(err : any){
          throw err;
    }
}

export const updateDoctorProfilePictureAPI=async(id:number,mediaId:number | null)=>{
          
  
    try {

        let url =`${profileService.UPDATE_DOCTOR_PROFILE_PICTURE}/${id}`;


        if(mediaId !== null){
            url += `?mediaId=${mediaId}`;
        }


        await apiConnector({method:"PUT",url,body:null });


    } catch(err){
       throw err;
    }

   

}

export const updatePatientProfilePictureAPI=async( id:number,mediaId:number | null)=>{

    try {

        let url =`${profileService.UPDATE_PATIENT_PROFILE_PICTURE}/${id}`;


        if(mediaId !== null){
            url += `?mediaId=${mediaId}`;
        }


        await apiConnector({method:"PUT",url,body:null });


    } catch(err){
       throw err;
    }

}