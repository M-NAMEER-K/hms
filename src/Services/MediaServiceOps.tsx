
import { mediaService } from "./api";
import { apiConnector } from "./Interceptor";


export const uploadProfileImageAPI = async(file:File)=>{

    try{

        const formData=new FormData();

        formData.append("file",file);


        const result=await apiConnector({ method:"POST", url:mediaService.UPLOAD_FILE, body:formData,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });


        return result.data;

    }
    catch(err:any){
     throw err;
    }
}

export const getProfileImageAPI = async(id:number)=>{

    const result = await apiConnector({
        method:"GET",
        url:`${mediaService.GET_FILE}/${id}`,
        body:null
    });

    return result.data;

}

export const deleteProfileImageAPI = async(id:number)=>{

try{

  await apiConnector({method:"DELETE",url:`${mediaService.DELETE_FILE}/${id}`,body:null});


}
catch(err){

throw err;

}

}

export const replaceProfileImageAPI = async(   oldMediaId:number,   file:File)=>{

    try{

        const formData = new FormData();

        formData.append("file",file);


        const result = await apiConnector({ method:"PUT", url:`${mediaService.REPLACE_FILE}/${oldMediaId}`, body:formData,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });


        return result.data;

    }
    catch(err:any){

        throw err;

    }

}