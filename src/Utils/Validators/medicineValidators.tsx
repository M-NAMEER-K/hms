
export interface MedicineErrors{
    name?:string;
    dosage?:string;
    category?:string;
    type?:string;
    manufacturer?:string;
    unitPrice?:string;
}

export interface MedicineData{
    id?: number;
    name:string;
    dosage:string;
    category:string;
    type:string;
    manufacturer:string;
    unitPrice:string;
}

export const validateMedicine=(data:MedicineData):MedicineErrors=>{

    const errors:MedicineErrors={};

    if(!data.name.trim()){
        errors.name="Medicine name is required";
    }

    if(!data.dosage.trim()){
        errors.dosage="Dosage is required";
    }

    if(!data.category){
        errors.category="Please select a category";
    }

    if(!data.type){
        errors.type="Please select a type";
    }

    if(!data.manufacturer.trim()){
        errors.manufacturer="Manufacturer is required";
    }

    
   if (!data.unitPrice.trim()) {
    errors.unitPrice = "Unit price is required";
} else if (isNaN(Number(data.unitPrice))) {
    errors.unitPrice = "Unit price must be a valid number";
} else if (Number(data.unitPrice) <= 0) {
    errors.unitPrice = "Unit price must be greater than 0";
}

    return errors;
}



export interface MedicineInventoryErrors {
    medicineId?: string;
    batchNumber?: string;
    quantity?: string;
    expiryDate?: string;
}

export interface MedicineInventoryData {
    id?: number;
    medicineId: number;
    batchNumber: string;
    quantity: number;
    expiryDate: string;
}

export const validateMedicineInventory = (
    data: MedicineInventoryData
): MedicineInventoryErrors => {

    const errors: MedicineInventoryErrors = {};

    if (!data.medicineId || data.medicineId <= 0) {
        errors.medicineId = "Please select a medicine.";
    }

    if (!data.batchNumber.trim()) {
        errors.batchNumber = "Batch number is required.";
    }

    if (!data.quantity || data.quantity <= 0) {
        errors.quantity = "Quantity must be greater than 0.";
    }

    if (!data.expiryDate) {
        errors.expiryDate = "Expiry date is required.";
    } else {
        const selected = new Date(data.expiryDate);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selected <= today) {
            errors.expiryDate = "Expiry date must be in the future.";
        }
    }

    return errors;
};