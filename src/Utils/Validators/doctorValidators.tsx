export interface Availability {
    day: string;
    startTime: string;
    endTime: string;
}


export interface DoctorProfileData {
    id:number;
    name:string;
    email:string;
    dob:string;
    phone:string;
    address:string;
    licenseNumber:string;
    specialization:string;
    department:string;
    totalExp:number | "";
    consultationFees?:number | "";
     currency:string;
    availability:Availability[];
}


export interface DoctorProfileErrors {

    dob?:string;
    phone?:string;
    address?:string;
    licenseNumber?:string;
    specialization?:string;
    department?:string;
    totalExp?:string;
     consultationFees?:string;

    currency?:string;
    availability?:{
        day?:string;
        startTime?:string;
        endTime?:string;
    }[];
}

export const validateDoctorProfile = (
    data: DoctorProfileData
): DoctorProfileErrors => {

    const errors: DoctorProfileErrors = {};


    // DOB
    if (!data.dob) {
        errors.dob = "Date of Birth is required";
    }


    // PHONE
    const phoneParts = data.phone.split("-");

    if (phoneParts.length !== 2 || !phoneParts[1].trim()) {

        errors.phone = "Phone number is required";

    } 
    else if (!/^\+\d{1,4}-\d{6,15}$/.test(data.phone)) {

        errors.phone = "Enter a valid phone number";

    }



    // ADDRESS
    if (!data.address.trim()) {

        errors.address = "Address is required";

    } 
    else if (data.address.trim().length < 10) {

        errors.address = "Address must be at least 10 characters";

    }



    // LICENSE
    if (!data.licenseNumber.trim()) {

        errors.licenseNumber = "License number is required";

    }



    // SPECIALIZATION
    if (!data.specialization.trim()) {

        errors.specialization = "Specialization is required";

    }



    // DEPARTMENT
    if (!data.department.trim()) {

        errors.department = "Department is required";

    }



    // EXPERIENCE
    if (data.totalExp === "") {

        errors.totalExp = "Experience is required";

    }
    else if (Number(data.totalExp) < 0) {

        errors.totalExp = "Experience cannot be negative";

    }
    else if(Number(data.totalExp) > 100){

        errors.totalExp = "Experience cannot exceed 100 years";

    }


// CONSULTATION FEES
if(!data.currency.trim()){

    errors.currency = "Currency is required";

}


if(data.consultationFees === ""){

    errors.consultationFees = "Consultation fees is required";

}
else if(Number.isNaN(Number(data.consultationFees))){

    errors.consultationFees = "Enter a valid consultation fee";

}
else if(Number(data.consultationFees) < 0){

    errors.consultationFees = "Consultation fees cannot be negative";

}
else if(Number(data.consultationFees) > 100000){

    errors.consultationFees = "Consultation fees is too high";

}


// AVAILABILITY
if(!data.availability || data.availability.length === 0){

    errors.availability = [
        {
            day:"At least one availability slot is required"
        }
    ];

}
else{

    // Check duplicate days
    const days = data.availability.map(a => a.day);

    const duplicateDay = days.some(
        (day,index)=> days.indexOf(day)!==index
    );


    if(duplicateDay){

        errors.availability = [
            {
                day:"Duplicate days are not allowed"
            }
        ];

    }


    const availabilityErrors = data.availability.map((item)=>{

        const slotError:{
            day?:string;
            startTime?:string;
            endTime?:string;
        } = {};


        if(!item.day){

            slotError.day = "Day is required";

        }


        if(!item.startTime){

            slotError.startTime = "Start time is required";

        }


        if(!item.endTime){

            slotError.endTime = "End time is required";

        }


        if(
            item.startTime &&
            item.endTime &&
            item.startTime >= item.endTime
        ){

            slotError.endTime = 
            "End time must be after start time";

        }


        return Object.keys(slotError).length > 0
            ? slotError
            : {};

    });


    if(
        availabilityErrors.some(
            error=>Object.keys(error).length>0
        )
    ){

        errors.availability = availabilityErrors;

    }

}



    return errors;

};