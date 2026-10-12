import axios from "axios";
import { jwtDecode } from "jwt-decode";



interface IParams{
    email?:string;
    token?:string;
    password?:string;
}

interface Iaxios{
      method:string;
     url:string;
     body:any;
     headers?:any;
     responseType?:any;
     params?:IParams;
}
const axiosInstance=axios.create({
     
     withCredentials:true
});

axiosInstance.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        try {

            const decoded: any = jwtDecode(token);

            if (decoded.exp * 1000 < Date.now()) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.href = "/login";

                return Promise.reject(new Error("Token Expired"));
            }

            config.headers.Authorization = `Bearer ${token}`;

        } catch (err) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";

            return Promise.reject(err);
        }
    }

    return config;
});

axiosInstance.interceptors.response.use(

    (response) => response,

    (error) => {

        if (
            error.response &&
            (error.response.status === 401 ||
             error.response.data?.message === "JWT_EXPIRED")
        ) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);



export const apiConnector=async({method , url , body,headers,responseType,params}:Iaxios)=>{
   return axiosInstance({method , url ,data:body,headers,responseType,params});
}


export default axiosInstance;