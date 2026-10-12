export interface DoctorProfileData {
    id:number;
    name:string;
    email:string;
    dob: string;
    phone: string;
    address: string;
    licenseNumber: string;
    specialization: string;
    department: string;
    totalExp: number | "";
}

export interface DoctorProfileErrors {
    id?:number;
    name?:string;
    email?:string;
    dob?: string;
    phone?: string;
    address?: string;
    licenseNumber?: string;
    specialization?: string;
    department?: string;
    totalExp?: string;
}

export const validateDoctorProfile = (
    data: DoctorProfileData
): DoctorProfileErrors => {

    const errors: DoctorProfileErrors = {};

    if (!data.dob) {
        errors.dob = "Date of Birth is required";
    }

    const phoneParts = data.phone.split("-");

if (phoneParts.length !== 2 || !phoneParts[1].trim()) {
    errors.phone = "Phone number is required";
}
else if (!/^\+\d{1,4}-\d{6,15}$/.test(data.phone)) {
    errors.phone = "Enter a valid phone number";
}

    if (!data.address.trim()) {
        errors.address = "Address is required";
    } else if (data.address.length < 10) {
        errors.address = "Address must be at least 10 characters";
    }

    if (!data.licenseNumber.trim()) {
        errors.licenseNumber = "License number is required";
    }

    if (!data.specialization.trim()) {
        errors.specialization = "Specialization is required";
    }

    if (!data.department.trim()) {
        errors.department = "Department is required";
    }

    if (data.totalExp === "") {
        errors.totalExp = "Experience is required";
    } else if (Number(data.totalExp) < 0) {
        errors.totalExp = "Experience cannot be negative";
    }

    return errors;
};