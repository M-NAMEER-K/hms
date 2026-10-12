
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

    try{

        const result = await apiConnector({ method:"GET",url:`${mediaService.GET_FILE}/${id}`,body:null,responseType:"blob"});


        const imageUrl = URL.createObjectURL(result.data);

        return imageUrl;

    }
    catch(err){

      throw err;

    }

}

export const deleteProfileImageAPI = async(id:number)=>{

try{

  await apiConnector({method:"DELETE",url:`${mediaService.DELETE_FILE}/${id}`,body:null});


}
catch(err){

throw err;

}

}