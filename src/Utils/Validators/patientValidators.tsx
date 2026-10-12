

export interface PatientProfileData {
    id:number;
    name:string;
    email:string;
  dob: string;
  phone: string;
  address: string;
  aadharNumber: string;
  bloodGroup: string;
  allergies: string[];
  chronicDisease: string[];
}

export interface PatientProfileErrors {
    id?:number;
    name?:string;
    email?:string;
    dob?: string;
    phone?: string;
    address?: string;
    aadharNumber?: string;
    bloodGroup?: string;
    allergies?: string;
    chronicDisease?: string;
}

export const validatePatientProfile = (
    data: PatientProfileData
): PatientProfileErrors => {

    const errors: PatientProfileErrors = {};

    // Date of Birth
    if (!data.dob) {
        errors.dob = "Date of Birth is required";
    }

    // Phone
 const phoneParts = data.phone.split("-");

if (phoneParts.length !== 2 || !phoneParts[1].trim()) {
    errors.phone = "Phone number is required";
}
else if (!/^\+\d{1,4}-\d{6,15}$/.test(data.phone)) {
    errors.phone = "Enter a valid phone number";
}

    // Address
    if (!data.address.trim()) {
        errors.address = "Address is required";
    } else if (data.address.length < 10) {
        errors.address = "Address must be at least 10 characters";
    }

    // Aadhar
    if (!data.aadharNumber.trim()) {
        errors.aadharNumber = "Aadhar number is required";
    } else if (!/^\d{12}$/.test(data.aadharNumber)) {
        errors.aadharNumber = "Aadhar number must contain exactly 12 digits";
    }

    // Blood Group
    if (!data.bloodGroup.trim()) {
        errors.bloodGroup = "Please select a blood group";
    }

    if (data.allergies.length === 0) {
    errors.allergies = "Please select at least one allergy or 'None'";
}

if (data.chronicDisease.length === 0) {
    errors.chronicDisease = "Please select at least one chronic disease or 'None'";
}

if (
    data.allergies.includes("None") &&
    data.allergies.length > 1
) {
    errors.allergies =
        "'None' cannot be selected with other allergies.";
}

if (
    data.chronicDisease.includes("None") &&
    data.chronicDisease.length > 1
) {
    errors.chronicDisease =
        "'None' cannot be selected with other diseases.";
}

    return errors;
};