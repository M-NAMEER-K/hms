import { apiConnector } from "./Interceptor";
import { pharmacyService } from "./api";

import type { MedicineData, MedicineInventoryData } from "../Utils/Validators/medicineValidators";


export const addMedicineServiceAPI = async (  data: MedicineData) => {
    try {

        console.log(data);

        const result = await apiConnector({method: "POST",url: pharmacyService.ADD_MEDICINE,body: data  });

        console.log(result);

        return result.data;

    } catch (err:any) {
       throw err;
    
    }
};

export const getAllMedicinesAPI= async(page:number,size:number)=>{
      try {
          const params = new URLSearchParams();

        params.append("page", String(page));
        params.append("size", String(size));
          const result=await apiConnector({method:"GET" , url:`${pharmacyService.GET_ALL_MEDICINES}?${params.toString()}`,body:null});
          
          console.log(result);
          return result.data;
      } catch (err:any) {
         throw err;
      }
}


export const updateMedicineAPI=async(data:MedicineData)=>{
        try {

        console.log(data);

        const result = await apiConnector({method: "PUT",url: pharmacyService.UPDATE_MEDICINE,body: data  });

        console.log(result);

        return result.data;

    } catch (err:any) {
       throw err;
    
    }
}


export const addInventoryAPI = async (  data: MedicineInventoryData) => {

    try {
  const result = await apiConnector({ method: "POST", url: pharmacyService.ADD_INVENTORY, body: data    });

        return result.data;

    } catch (err) {
       throw err;
    }
};


export const updateInventoryAPI = async (  data: MedicineInventoryData) => {

    try {

        const result = await apiConnector({ method: "PUT", url: pharmacyService.UPDATE_INVENTORY, body: data });

        return result.data;

    } catch (err) {
        throw err;
    }
};


export const getAllInventoryAPI = async (page:number,size:number) => {

    try {
                   const params = new URLSearchParams();

    params.append("page",String(page));
    params.append("size",String(size));

        const result = await apiConnector({method: "GET",url:`${pharmacyService.GET_ALL_INVENTORY}?${params.toString()}`,body: null   });

        return result.data;

    } catch (err) {
       throw err;
    }
};

export const createSaleAPI = async (data:any)=>{

    try{

        const result = await apiConnector({method:"POST",url:pharmacyService.CREATE_SALE,body:data  });

        return result.data;

    }
    catch(err){
       throw err;
    }

}

export const getAllSalesAPI = async (page:number , size:number) => {

    try{  
           const params = new URLSearchParams();

    params.append("page",String(page));
    params.append("size",String(size));
    const result = await apiConnector({method:"GET",  url:`${pharmacyService.GET_ALL_SALES}?${params.toString()}`,  body:null });
    console.log(result);

    return result.data;
    }catch(err:any){
          throw err;
    }
   
}

export const getSaleItemsAPI = async (saleId:number)=>{

    try{

        const result = await apiConnector({ method:"GET", url: pharmacyService.GET_SALE_ITEMS + "/" + saleId, body:null });
              console.log(result);
        return result.data;

    }catch(err){
      throw err;
    }

}